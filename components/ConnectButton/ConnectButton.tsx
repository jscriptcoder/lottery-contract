import { CheckCircleFilled, LogoutOutlined } from '@ant-design/icons'
import { Button, Divider, Popover } from 'antd'
import { truncateAddress } from '../../utils/strings'
import Loading from '../Loading'
import useConnectButton from './useConnectButton'

interface ConnectButtonProps {
  label: string
}

export default function ConnectButton({ label }: ConnectButtonProps) {
  const { appState, connecting, clickConnect, clickDisconnect } =
    useConnectButton()

  // If we have address means the user is connected.
  // We'll had a small popover displaying some more
  // details of that address, plus a disconnect button.
  const ButtonContent = appState.address ? (
    <Popover
      placement="bottom"
      content={
        <div>
          <div className="flex flex-col">
            <strong>Wallet address:</strong>
            <span className="text-xs">{appState.address}</span>
          </div>

          <Divider className="my-2" />

          <div className="flex space-x-1 items-center">
            <strong>Balance:</strong>
            <span className="text-xs">{appState.balance} ETH</span>
          </div>

          <Divider className="my-2" />

          <div className="flex justify-center">
            <Button
              className="flex items-center"
              type="dashed"
              onClick={clickDisconnect}
            >
              <span>Disconnect</span>
              <LogoutOutlined />
            </Button>
          </div>
        </div>
      }
    >
      <span className="w-full space-x-2 flex items-center">
        <CheckCircleFilled />
        <strong>Connected to: </strong>
        <span>{truncateAddress(appState.address, 12)}</span>
      </span>
    </Popover>
  ) : (
    <span>{label}</span>
  )

  return (
    <div className="ConnectButton">
      <Button onClick={clickConnect}>{ButtonContent}</Button>
      <Loading
        show={connecting}
        title="Connecting to a wallet..."
        tip="Please wait"
      />
    </div>
  )
}
