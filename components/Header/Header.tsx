import { MoneyCollectOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import ConnectButton from '../ConnectButton'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <Layout.Header className="flex justify-between items-center">
      <div className="space-x-2 flex items-center">
        <MoneyCollectOutlined className="text-3xl" />
        <span className="text-2xl">{title}</span>
      </div>
      <ConnectButton label="Connect to your wallet" />
    </Layout.Header>
  )
}
