import { Layout } from 'antd'

export default function Footer() {
  return (
    <Layout.Footer className="text-center">
      Proudly made in 🇪🇸 by{' '}
      <a
        href="https://www.linkedin.com/in/jscriptcoder"
        target={'_blank'}
        rel={'noreferrer'}
      >
        Francisco Ramos
      </a>
    </Layout.Footer>
  )
}
