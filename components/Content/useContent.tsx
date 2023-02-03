import { Modal, notification } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEventHandler,
} from 'react'
import { EventData } from 'web3-eth-contract'
import { useAppContext } from '../../context/appStore'
import emitter from '../../utils/emitter'
import {
  enterLottery,
  getContractBalance,
  getContractDetails,
  pickWinner,
  web3,
} from '../../utils/lottery/contract'
import { toPrice } from '../../utils/numeral'
import type { Winner } from '../WinnerMask/WinnerMask'

function notifySuccessfulTransaction(ether: string): void {
  notification.success({
    message: 'Successful transaction.',
    description: (
      <div>
        Congratulations. You have just entered the Lottery Contract with{' '}
        <strong>{ether} ETH</strong>. Good luck!!
      </div>
    ),
  })
}

// TODO: we have same function in ConnectButton component.
//       Refactor and reuse.
function notifySomethingWentWrong(error: unknown): void {
  notification.error({
    message: 'Something went wrong',
    description: `${error}`,
  })
}

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

        // After the user enters the lottery, we need to
        // make updates in the UI and notify about the transaction.
        const { balance, hasEntered, participants, contractBalance } =
          await getContractDetails(appState.address)

        appDispatch({ balance, hasEntered, participants, contractBalance })

        notifySuccessfulTransaction(ether)
      } catch (err) {
        console.error(err)

        notifySomethingWentWrong(err)
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
      setEther(toPrice(target.value))
    },
    [],
  )

  const pickWinnerOk = useCallback(async () => {
    if (isConnected && appState.isManager) {
      setLoading(true)
      try {
        await pickWinner(appState.address)

        // After picking a winner, contract's state is reset,
        // and we need to also update the UI.
        // Question is:
        //   do we reset the UI manually or we query the contract?
        const { balance, hasEntered, participants, contractBalance } =
          await getContractDetails(appState.address)

        appDispatch({ balance, hasEntered, participants, contractBalance })

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
        prize: web3.utils.fromWei(returnValues['prize']),
      })
    }

    emitter.on('error-picking-winner', onErrorPickingWinner)
    emitter.on('winner-picked', onWinnerPicked)

    return () => {
      emitter.off('error-picking-winner', onErrorPickingWinner)
      emitter.off('winner-picked', onWinnerPicked)
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
