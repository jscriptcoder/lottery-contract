import Image from 'next/image'
import { Layout, Typography } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'
import useContent from './useContent'
import { toPrice } from '../../utils/numeral'
import WinnerMask from '../WinnerMask'
import NoConnectedAlert from './NoConnectedAlert'
import AlreadyEnteredTitle from './AlreadyEnteredTitle'
import EnterForm from './EnterForm'

export default function Content() {
  const {
    ether,
    winner,
    loading,
    appState,
    isConnected,
    changeEther,
    confirmEnter,
    confirmPickWinner,
  } = useContent()

  let actionBox

  if (!isConnected) {
    // User must connect his/her wallet in order to participate.
    actionBox = <NoConnectedAlert />
  } else if (appState.hasEntered) {
    // User is connected but has already participated in the lottery.
    actionBox = <AlreadyEnteredTitle />
  } else {
    // User has connected his/her wallet and has not yet participated.
    // We're ready let him/her in.
    actionBox = (
      <EnterForm
        ether={ether}
        changeEther={changeEther}
        confirmEnter={confirmEnter}
        loading={loading}
      />
    )
  }

  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box">{actionBox}</div>

        <div className="glass-box">
          <Typography.Title className="text-shadow">Prize Pot</Typography.Title>
          <div className="flex space-x-4 flex-1 items-center">
            <span className="text-neon text-8xl">
              {toPrice(appState.contractBalance)}
            </span>
            <Image
              alt="Ethereum logo"
              src="/ethereum-diamond-logo.svg"
              width={54}
              height={0}
            />
          </div>

          {/* Only the manager can pick the winner when there is more than one participant */}
          {appState.isManager && appState.participants > 1 && (
            <button
              type="button"
              className="button text-center font-bold text-4xl px-8 py-4 text-slate-100 space-x-4"
              onClick={confirmPickWinner}
              disabled={loading}
            >
              <span>Pick Winner</span>
              <TrophyOutlined />
            </button>
          )}
        </div>
      </div>

      <WinnerMask winner={winner} />
    </Layout.Content>
  )
}
