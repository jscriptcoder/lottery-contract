import { MoneyCollectOutlined } from '@ant-design/icons'
import { Layout, Button } from 'antd'
import useHeader from './useHeader'

export default function Header() {
  const { buttonLabel, isConnected, clickConnect } = useHeader()

  return (
    <Layout.Header className="flex justify-between items-center">
      <div className="space-x-2 flex items-center">
        <MoneyCollectOutlined className="text-3xl" />
        <span className="text-2xl">Lottery Contract</span>
      </div>
      <Button onClick={clickConnect} disabled={isConnected}>
        {buttonLabel}
      </Button>
    </Layout.Header>
  )
}
