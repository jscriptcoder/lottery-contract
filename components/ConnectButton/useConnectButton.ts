import { useCallback, useMemo, useState } from 'react'
import { useWalletContext } from '../../state/Wallet'
import { web3 } from '../../utils/web3'

export default function useConnectButton() {
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletState] = useWalletContext()

  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress])

  const clickConnect = useCallback(async () => {
    if (!isConnected) {
      setConnecting(true)

      try {
        const accounts = await web3.eth.requestAccounts()
        setWalletState(accounts[0])
      } finally {
        setConnecting(false)
      }
    }
  }, [])

  return {
    connecting,
    isConnected,
    walletAddress,
    clickConnect,
  }
}
