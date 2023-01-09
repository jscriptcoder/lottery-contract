import { useCallback, useMemo } from 'react'
import { useWalletContext } from '../../state/Wallet'

export default function useConnectButton() {
  const [walletAddress, setWalletState] = useWalletContext()

  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress])

  const clickConnect = useCallback(async () => {
    if (!isConnected) {
      const accounts = await web3.eth.requestAccounts()
      setWalletState(accounts[0])
    }
  }, [])

  return {
    isConnected,
    walletAddress,
    clickConnect,
  }
}
