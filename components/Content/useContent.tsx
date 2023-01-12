import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, notification } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEventHandler,
  type ChangeEventHandler,
} from 'react'
import { useAppContext } from '../../context/AppState'
import {
  enterLottery,
  getContractBalance,
  pickWinner,
} from '../../utils/LotteryContract'

export default function useContent() {
  const [loading, setLoading] = useState(false)
  const [ether, setEther] = useState('0.01')
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

        appDispatch({ hasEntered: true, contractBalance })

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
  }, [])

  return {
    ether,
    loading,
    appState,
    isConnected,
    changeEther,
    confirmEnter,
    confirmPickWinner,
  }
}
