import { Modal, notification } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEventHandler,
} from 'react'
import { EventData } from 'web3-eth-contract'
import { useAppContext } from '../../context/AppState'
import emitter from '../../utils/emitter'
import {
  enterLottery,
  fromWei,
  getContractBalance,
  numPlayers,
  pickWinner,
} from '../../utils/LotteryContract'
import type { Winner } from '../WinnerMask/WinnerMask'

export default function useContent() {
  const [loading, setLoading] = useState(false)
  const [ether, setEther] = useState('0.01')
  const [winner, setWinner] = useState<Winner>()
  const [appState, appDispatch] = useAppContext()

  const isConnected = useMemo(
    () => Boolean(appState.address),
    [appState.address],
  )

  const enterOk = useCallback(async () => {
    if (isConnected) {
      setLoading(true)
      try {
        await enterLottery(appState.address, ether)
        const contractBalance = await getContractBalance()
        const participants = await numPlayers(appState.address)

        appDispatch({ hasEntered: true, participants, contractBalance })

        notification.success({
          message: 'Successful transaction.',
          description: (
            <div>
              Congratulations. You have just entered the Lottery Contract with{' '}
              <strong>{ether} ETH</strong>. Good luck!!
            </div>
          ),
        })
      } catch (err) {
        console.error(err)

        notification.error({
          message: 'Something went wrong',
          description: `${err}`,
        })
      } finally {
        setLoading(false)
      }
    }
  }, [isConnected, appState.address, ether])

  const confirmEnter = useCallback(() => {
    Modal.confirm({
      title: 'Confirm transaction',
      content: (
        <div>
          You are about to enter the Lottery Contract with{' '}
          <strong>{ether} ETH</strong>. Would you like to proceed?
        </div>
      ),
      okText: 'Yes',
      okType: 'default',
      cancelText: 'No',
      onOk: enterOk,
    })
  }, [ether, enterOk])

  const changeEther: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setEther(target.value)
    },
    [],
  )

  const pickWinnerOk = useCallback(async () => {
    if (isConnected && appState.isManager) {
      setLoading(true)
      try {
        await pickWinner(appState.address)
        const contractBalance = await getContractBalance()

        appDispatch({ hasEntered: true, contractBalance })

        // TODO
      } catch (err) {
        console.error(err)

        notification.error({
          message: 'Something went wrong',
          description: `${err}`,
        })
      } finally {
        setLoading(false)
      }
    }
  }, [isConnected, appState.isManager, appState.address])

  const confirmPickWinner = useCallback(() => {
    Modal.confirm({
      title: 'Confirm end of game',
      content: (
        <div>
          You are about to pick a winner for the Lottery Contract with a prize
          pot of <strong>{appState.contractBalance} ETH</strong>. Would you like
          to proceed?
        </div>
      ),
      okText: 'Yes',
      okType: 'default',
      cancelText: 'No',
      onOk: pickWinnerOk,
    })
  }, [appState.contractBalance, pickWinnerOk])

  useEffect(() => {
    getContractBalance().then((contractBalance) =>
      appDispatch({ contractBalance }),
    )

    const onErrorPickingWinner = (error: Error) => {
      console.error(error)

      notification.error({
        message: 'Something went wrong',
        description: `${error}`,
      })
    }

    const onWinnerPicked = (event: EventData) => {
      const { returnValues } = event
      setWinner({
        address: returnValues['winner'],
        prize: fromWei(returnValues['prize']),
      })
    }

    emitter.on('error-picking-winner', onErrorPickingWinner)
    emitter.on('winner-picked', onWinnerPicked)

    return () => {
      emitter.off('error-picking-winner', onErrorPickingWinner)
      emitter.off('error-picking-winner', onWinnerPicked)
    }
  }, [])

  return {
    ether,
    winner,
    loading,
    appState,
    isConnected,
    changeEther,
    confirmEnter,
    confirmPickWinner,
  }
}
