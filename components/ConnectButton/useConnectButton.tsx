import { Modal, notification } from 'antd'
import { useCallback, useState } from 'react'
import { useAppContext } from '../../context/AppState'
import {
  getContractDetails,
  requestAccounts,
} from '../../utils/LotteryContract'

function notifySuccessfulConnection(balance: string): void {
  notification.success({
    message: 'Successful connection.',
    description: (
      <div>
        Your wallet, with balance <strong>{balance} ETH</strong>, is now
        connected.
      </div>
    ),
  })
}

function notifySomethingWentWrong(error: unknown): void {
  notification.error({
    message: 'Something went wrong',
    description: `${error}`,
  })
}

export default function useConnectButton() {
  const [connecting, setConnecting] = useState(false)
  const [appState, appDispatch] = useAppContext()

  const clickConnect = useCallback(async () => {
    if (!appState.address) {
      setConnecting(true)

      try {
        // This will prompt the user for wallet connection
        const accounts = await requestAccounts()

        // Then we gather information to add to our global state
        const address = accounts[0]
        const { balance, isManager, hasEntered, participants } =
          await getContractDetails(address)

        appDispatch({ address, balance, hasEntered, isManager, participants })

        notifySuccessfulConnection(balance)
      } catch (err) {
        console.error(err)

        notifySomethingWentWrong(err)
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
  }, [])

  return {
    appState,
    connecting,
    clickConnect,
    clickDisconnect,
  }
}
