import { Button, Tooltip } from 'antd'
import useConnectButton from './useConnectButton'

interface ConnectButtonProps {
  label: string
}

export default function ConnectButton({ label }: ConnectButtonProps) {
  const { isConnected, walletAddress, clickConnect } = useConnectButton()

  const ButtonContent = isConnected ? (
    <Tooltip
      placement="bottom"
      title={
        <div className="flex flex-col">
          <strong>Connected to:</strong>
          <span>{walletAddress}</span>
        </div>
      }
    >
      <span className="truncate w-full">{walletAddress}</span>
    </Tooltip>
  ) : (
    <span>{label}</span>
  )

  return (
    <Button onClick={clickConnect} className="max-w-[200px]">
      {ButtonContent}
    </Button>
  )
}
