import { Fireworks } from '@fireworks-js/react'
import { Typography } from 'antd'
import Image from 'next/image'
import { toPrice } from '../../utils/numeral'

export interface Winner {
  address: string
  prize: string
}

interface WinnerMaskProps {
  winner?: Winner
}

export default function WinnerMask({ winner }: WinnerMaskProps) {
  if (winner) {
    return (
      <Fireworks
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
          },
        }}
        className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-[#000]/80"
      >
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 space-y-10">
          <Typography.Title>
            <div className="text-neon text-8xl text-center space-y-4">
              <div>🎉 We have a winner! 🎊</div>
              <div>🥳</div>
            </div>
          </Typography.Title>

          <Typography.Title
            level={2}
            className="flex flex-col justify-center items-center space-y-4 text-redish-shadow"
          >
            <div className="flex space-x-4 flex-1 items-center">
              <span className="text-8xl">{toPrice(winner.prize)}</span>
              <Image
                alt="Ethereum logo"
                src="/ethereum-diamond-logo.svg"
                width={54}
                height={0}
              />
            </div>
            <div>Transferred to...</div>
            <div className="text-4xl">{winner.address}</div>
          </Typography.Title>
        </div>
      </Fireworks>
    )
  }

  return null
}
