import Web3 from 'web3'
import { networks } from '../truffle-config'
import lotteryConfig from '../build/contracts/Lottery.json'

const { development } = networks
const devProvider = `http://${development.host}:${development.port}`

const CONTRACT_ADDRESS = lotteryConfig.networks[5777].address
const CONTRACT_ABI = lotteryConfig.abi as unknown as AbiItem

export const web3 = new Web3(Web3.givenProvider || devProvider)
export const lotteryContract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
)
