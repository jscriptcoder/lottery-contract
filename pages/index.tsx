import { Layout, ConfigProvider, theme } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'

const { darkAlgorithm } = theme

export default function Index() {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}
    >
      <Layout className="h-full">
        <Header />
        <Content />
        <Footer />
      </Layout>
    </ConfigProvider>
  )
}
