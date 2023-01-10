import { useEffect, useState } from 'react'
import { web3, lotteryContract } from '../../utils/web3'

export default function useContent() {
  const [prizePot, setPrizePot] = useState(0) // amount in ether

  useEffect(() => {
    web3.eth.getBalance(lotteryContract.options.address).then((balance) => {
      const ether = web3.utils.fromWei(balance)
      setPrizePot(parseFloat(ether))
    })
  }, [])

  return {
    prizePot,
  }
}
