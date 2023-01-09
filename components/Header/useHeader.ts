import { useCallback, useMemo } from 'react'
import { useWalletContext } from '../../state/Wallet'
import { web3 } from '../../utils/web3'

export default function useHeader() {
  const [walletAddress, setWalletState] = useWalletContext()

  const clickConnect = useCallback(async () => {
    const accounts = await web3.eth.requestAccounts()
    setWalletState(accounts[0])
  }, [])

  const buttonLabel = useMemo(
    () => (walletAddress ? walletAddress : 'Connect to a Wallet'),
    [walletAddress],
  )

  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress])

  return {
    buttonLabel,
    isConnected,
    clickConnect,
  }
}
