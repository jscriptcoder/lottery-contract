import { notification } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { useAppContext } from '../../context/AppState'
import {
  getBalance,
  getPlayers,
  requestAccounts,
} from '../../utils/LotteryContract'

export default function useConnectButton() {
  const [connecting, setConnecting] = useState(false)
  const [appState, appDispatch] = useAppContext()

  const clickConnect = useCallback(async () => {
    if (!appState.address) {
      setConnecting(true)

      try {
        const accounts = await requestAccounts()
        const address = accounts[0]
        const balance = await getBalance(address)
        const players = await getPlayers(address)
        const hasEntered = players.includes(address)

        appDispatch({ address, balance, hasEntered })

        notification.success({
          message: 'Successful connection.',
          description: (
            <div>
              Your wallet, with balance <strong>{balance} ETH</strong>, is now
              connected.
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
        setConnecting(false)
      }
    }
  }, [appState.address])

  const clickDisconnect = useCallback(async () => {}, [appState.address])

  return {
    appState,
    connecting,
    clickConnect,
    clickDisconnect,
  }
}
