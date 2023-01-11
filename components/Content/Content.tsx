import Image from 'next/image'
import { Alert, Layout, Typography } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import useContent from './useContent'
import Loading from '../Loading'

export default function Content() {
  const {
    ether,
    entering,
    prizePot,
    hasEntered,
    isConnected,
    clickEnter,
    changeEther,
  } = useContent()

  let formBox

  if (isConnected) {
    if (!hasEntered) {
      // User has connected his/her wallet and has not yet participated.
      // We're ready let him/her in.
      formBox = (
        <>
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
                value={ether}
                onChange={changeEther}
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
              onClick={clickEnter}
              disabled={entering}
            >
              <span>Enter</span>
              <LoginOutlined />
            </button>
            <Loading
              show={entering}
              title="Entering competetion..."
              tip="Please wait for the transaction to be approved"
            />
          </div>
        </>
      )
    } else {
      // User is connected but has already participated in the lottery.
      // We inform the user of his/her participation.
      formBox = <div className="flex h-full items-center">TODO</div>
    }
  } else {
    // At this point the user has not yet connected his/her wallet.
    formBox = (
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

  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box">{formBox}</div>

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
