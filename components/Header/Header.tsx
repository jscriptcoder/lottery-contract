import { MoneyCollectOutlined } from '@ant-design/icons'
import { Layout, Button } from 'antd'

export default function Header() {
  return (
    <Layout.Header className="flex justify-between items-center">
      <div className="space-x-2 flex items-center">
        <MoneyCollectOutlined className="text-3xl" />
        <span className="text-2xl">Lottery Contract</span>
      </div>
      <Button>Connect to a Wallet</Button>
    </Layout.Header>
  )
}
