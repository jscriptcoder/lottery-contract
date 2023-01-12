import { Modal, notification } from 'antd'
import { useCallback, useState } from 'react'
import { useAppContext } from '../../context/AppState'
import {
  getBalance,
  getContractOwner,
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

        const owner = await getContractOwner()
        const isManager = owner === address

        appDispatch({ address, balance, hasEntered, isManager })

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

  const clickDisconnect = useCallback(async () => {
    Modal.info({
      content: 'Not yet implemented',
      footer: null,
      closable: true,
      maskClosable: true,
    })
  }, [appState.address])

  return {
    appState,
    connecting,
    clickConnect,
    clickDisconnect,
  }
}
