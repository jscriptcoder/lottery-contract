import { Button, Tooltip } from 'antd'
import Loading from '../Loading'
import useConnectButton from './useConnectButton'

interface ConnectButtonProps {
  label: string
}

export default function ConnectButton({ label }: ConnectButtonProps) {
  const { connecting, isConnected, walletAddress, clickConnect } =
    useConnectButton()

  const ButtonContent = isConnected ? (
    <Tooltip
      placement="bottom"
      title={
        <div className="space-y-4">
          <div className="flex flex-col">
            <strong>Connected to:</strong>
            <span>{walletAddress}</span>
          </div>
          <div className="flex space-x-1">
            <strong>Balance:</strong>
            <span>100</span>
          </div>
        </div>
      }
    >
      <span className="truncate w-full">{walletAddress}</span>
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
