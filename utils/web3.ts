import Web3 from 'web3'
import lotteryConfig from '../build/contracts/Lottery.json'

const devProvider = 'http://127.0.0.1:7545'

const CONTRACT_ADDRESS = lotteryConfig.networks[5777].address
const CONTRACT_ABI = lotteryConfig.abi as unknown as AbiItem

export const web3 = new Web3(Web3.givenProvider || devProvider)
export const lotteryContract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
)
