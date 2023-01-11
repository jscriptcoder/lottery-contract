import { Layout, ConfigProvider, theme } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { WalletContextProvider } from '../state/Wallet'

const { darkAlgorithm } = theme
const darkTheme = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: '#87cefb',
    colorLinkHover: '#87cefb',
  },
}

export default function Index() {
  return (
    <ConfigProvider theme={darkTheme}>
      <WalletContextProvider>
        <Layout className="h-full">
          <Header title="Lottery Contract" />
          <Content />
          <Footer />
        </Layout>
      </WalletContextProvider>
    </ConfigProvider>
  )
}
