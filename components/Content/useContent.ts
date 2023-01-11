import { notification } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEventHandler,
  type ChangeEventHandler,
} from 'react'
import { useWalletContext } from '../../state/Wallet'
import {
  enterLottery,
  getPlayers,
  getContractBalance,
} from '../../utils/lotteryContract'

export default function useContent() {
  const [prizePot, setPrizePot] = useState(0) // amount in ether
  const [entering, setEntering] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [ether, setEther] = useState('0.01')
  const [walletAddress] = useWalletContext()

  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress])

  const clickEnter: MouseEventHandler<HTMLButtonElement> =
    useCallback(async () => {
      if (isConnected) {
        setEntering(true)
        try {
          await enterLottery(walletAddress, ether)

          setHasEntered(true)

          notification.success({
            message: 'Successful transaction.',
            description: `Congratulations. You have entered the Lottery with ${ether} ethers. Good luck!!`,
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
    }, [isConnected, walletAddress, ether])

  const changeEther: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setEther(target.value)
    },
    [],
  )

  useEffect(() => {
    getContractBalance().then((balance) => setPrizePot(parseFloat(balance)))

    getPlayers(walletAddress).then((players) => {
      if (players.includes(walletAddress)) {
        setHasEntered(true)
      }
    })
  }, [walletAddress])

  return {
    ether,
    entering,
    prizePot,
    hasEntered,
    isConnected,
    clickEnter,
    changeEther,
  }
}
