import { Typography } from 'antd'

export default function AlreadyEnteredTitle() {
  return (
    <Typography.Title
      level={3}
      className="flex flex-col h-full justify-center text-center !text-[#001529] input !m-0 space-y-8 overflow-auto"
    >
      <div>
        You&#39;ve entered the Lottery Contract. Soon the Manager will randomly
        pick a winner.
      </div>
      <div className="text-4xl">
        <div>🤞 Good luck!! 🤞</div>
      </div>
    </Typography.Title>
  )
}
