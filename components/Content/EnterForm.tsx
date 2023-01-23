import { LoginOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import Image from 'next/image'
import { ChangeEventHandler } from 'react'
import Loading from '../Loading'

interface EnterFormProps {
  ether: string
  changeEther: ChangeEventHandler<HTMLInputElement>
  confirmEnter: () => void
  loading: boolean
}

export default function EnterForm({
  ether,
  changeEther,
  confirmEnter,
  loading,
}: EnterFormProps) {
  return (
    <>
      <div>
        <Typography.Title level={3} className="text-shadow">
          How much Ether do you want to contribute with?
        </Typography.Title>
        <div className="input flex p-2 space-x-4">
          <input
            type="number"
            className="bg-transparent outline-none text-center font-bold text-2xl text-[#001529] flex-1"
            value={ether}
            onChange={changeEther}
            step={0.01}
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
          onClick={confirmEnter}
          disabled={loading}
        >
          <span>Enter</span>
          <LoginOutlined />
        </button>
        <Loading
          show={loading}
          title="Entering competetion..."
          tip="Please, wait for the transaction to be approved"
        />
      </div>
    </>
  )
}
