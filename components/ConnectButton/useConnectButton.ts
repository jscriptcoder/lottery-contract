import { notification } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useWalletContext } from '../../state/Wallet'
import { requestAccounts } from '../../utils/lotteryContract'

export default function useConnectButton() {
  const [connecting, setConnecting] = useState(false)
  const [walletAddress, setWalletState] = useWalletContext()

  const isConnected = useMemo(() => Boolean(walletAddress), [walletAddress])

  const clickConnect = useCallback(async () => {
    if (!isConnected) {
      setConnecting(true)

      try {
        const accounts = await requestAccounts()
        setWalletState(accounts[0])

        notification.success({
          message: 'Successful connection.',
          description: `Your wallet is now connected.`,
        })
      } catch (err) {
        console.error(err)

        notification.error({
          message: 'Something went wrong',
          description: `${err}`,
        })
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
