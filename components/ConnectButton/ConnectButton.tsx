import { Button, Modal, Spin, Tooltip } from 'antd'
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
    <div>
      <Button onClick={clickConnect} className="max-w-[200px]">
        {ButtonContent}
      </Button>
      <Modal
        open={connecting}
        footer={null}
        closable={false}
        title="Connecting to a wallet..."
      >
        <div className="p-4 text-center">
          <Spin size="large" tip="Please wait" />
        </div>
      </Modal>
    </div>
  )
}
