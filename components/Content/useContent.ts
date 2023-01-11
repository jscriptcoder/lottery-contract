import { notification } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEventHandler,
  type ChangeEventHandler,
} from 'react'
import { useAppContext } from '../../context/AppState'
import { enterLottery, getContractBalance } from '../../utils/LotteryContract'

export default function useContent() {
  const [entering, setEntering] = useState(false)
  const [ether, setEther] = useState('0.01')
  const [appState, appDispatch] = useAppContext()

  const isConnected = useMemo(
    () => Boolean(appState.address),
    [appState.address],
  )

  const clickEnter: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (isConnected) {
        setEntering(true)
        try {
          await enterLottery(appState.address, ether)
          const contractBalance = await getContractBalance()

          appDispatch({ hasEntered: true, contractBalance })

          notification.success({
            message: 'Successful transaction.',
            description: `Congratulations. You have entered the Lottery with ${ether} ETH. Good luck!!`,
          })
        } catch (err) {
          console.error(err)

          notification.error({
            message: 'Something went wrong',
            description: `${err}`,
          })
        } finally {
          setEntering(false)
        }
      }
    }, [isConnected, appState.address, ether])

  const changeEther: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setEther(target.value)
    },
    [],
  )

  useEffect(() => {
    getContractBalance().then((contractBalance) =>
      appDispatch({ contractBalance }),
    )
  }, [])

  return {
    ether,
    entering,
    appState,
    isConnected,
    clickEnter,
    changeEther,
  }
}
