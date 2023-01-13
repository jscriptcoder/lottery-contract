import { Alert } from 'antd'

export default function NoConnectedAlert() {
  return (
    <div className="flex h-full items-center">
      <Alert
        className="rounded-md"
        message="No connected"
        description="Please, connect to your wallet"
        type="warning"
        banner
      />
    </div>
  )
}
