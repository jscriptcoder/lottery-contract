import Image from 'next/image'
import { Layout, Typography } from 'antd'
import useContent from './useContent'
import { LoginOutlined } from '@ant-design/icons'

export default function Content() {
  const { prizePot } = useContent()

  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box">
          <div>
            <Typography.Title level={3} className="text-shadow">
              How much Ether do you want to contribute with?
            </Typography.Title>
            <div className="input flex p-2 space-x-4">
              <input
                type="number"
                className="
                  bg-transparent
                  outline-none
                  text-center
                  font-bold
                  text-2xl 
                  text-[#001529] 
                  flex-1
                "
                defaultValue={0.01}
              />
              <div>
                <Image
                  alt="Ethereum icon"
                  src="/ethereum-icon.svg"
                  width={20}
                  height={0}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <button
              type="button"
              className="button text-center font-bold text-4xl px-8 py-4 text-slate-100 space-x-4"
            >
              <span>Enter</span>
              <LoginOutlined />
            </button>
          </div>
        </div>

        <div className="glass-box">
          <Typography.Title className="text-shadow">Prize Pot</Typography.Title>
          <div className="flex space-x-4 flex-1 items-center">
            <span className="text-neon text-9xl">{prizePot.toFixed(2)}</span>
            <Image
              alt="Ethereum logo"
              src="/ethereum-diamond-logo.svg"
              width={60}
              height={0}
            />
          </div>
        </div>
      </div>
    </Layout.Content>
  )
}
