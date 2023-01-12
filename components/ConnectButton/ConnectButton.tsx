import { Button, Divider, Tooltip } from 'antd'
import Loading from '../Loading'
import useConnectButton from './useConnectButton'

interface ConnectButtonProps {
  label: string
}

export default function ConnectButton({ label }: ConnectButtonProps) {
  const { appState, connecting, isConnected, clickConnect } = useConnectButton()

  const ButtonContent = isConnected ? (
    <Tooltip
      placement="bottom"
      title={
        <div>
          <div className="flex flex-col">
            <strong>Connected to:</strong>
            <span className="text-xs">{appState.address}</span>
          </div>
          <Divider className="my-2" />
          <div className="flex space-x-1 items-center">
            <strong>Balance:</strong>
            <span className="text-xs">{appState.balance} ETH</span>
          </div>
        </div>
      }
    >
      <span className="truncate w-full">{appState.address}</span>
    </Tooltip>
  ) : (
    <span>{label}</span>
  )

  return (
    <div>
      <Button onClick={clickConnect} className="max-w-[200px]">
        {ButtonContent}
      </Button>
      <Loading
        show={connecting}
        title="Connecting to a wallet..."
        tip="Please wait"
      />
    </div>
  )
}
