import Image from 'next/image'

interface EtherIconProps {
  width: number
  height?: number
}

export default function EtherIcon({ width, height = 0 }: EtherIconProps) {
  return (
    <Image
      alt="Ethereum icon"
      src="/ethereum-icon.svg"
      width={width}
      height={height}
    />
  )
}
