import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWalletContext } from '../../state/Wallet'
import { web3, lotteryContract } from '../../utils/web3'

export default function useContent() {
  const [prizePot, setPrizePot] = useState(0) // amount in ether
  const [entering, setEntering] = useState(false)
  const [walletAddress, setWalletState] = useWalletContext()

  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress])

  const enterClick = useCallback(() => {
    if (isConnected) {
      setEntering(true)
    }
  }, [isConnected])

  useEffect(() => {
    web3.eth.getBalance(lotteryContract.options.address).then((balance) => {
      const ether = web3.utils.fromWei(balance)
      setPrizePot(parseFloat(ether))
    })
  }, [])

  return {
    entering,
    prizePot,
    isConnected,
    enterClick,
  }
}
