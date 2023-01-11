import { Modal, Spin } from 'antd'

interface LoadingProps {
  show: boolean
  title?: string
  tip?: string
}

export default function Loading({ show, title = '', tip = '' }: LoadingProps) {
  return (
    <div>
      <Modal open={show} footer={null} closable={false} title={title}>
        <div className="p-4 text-center">
          <Spin size="large" tip={tip} />
        </div>
      </Modal>
    </div>
  )
}
