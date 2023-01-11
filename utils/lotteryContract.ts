import Web3 from 'web3'
import lotteryConfig from '../build/contracts/Lottery.json'

const devProvider = 'http://127.0.0.1:7545'

const CONTRACT_ABI = lotteryConfig.abi as unknown as AbiItem

const CONTRACT_ADDRESS = lotteryConfig.networks[5777].address

const web3 = new Web3(Web3.givenProvider || devProvider)

const lotteryContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

export async function requestAccounts(): Promise<string[]> {
  return web3.eth.requestAccounts()
}

export async function getContractBalance(): Promise<string> {
  const balanceWei = await web3.eth.getBalance(CONTRACT_ADDRESS)
  return web3.utils.fromWei(balanceWei)
}

export async function enterLottery(
  from: string,
  ether: string,
): Promise<string> {
  return lotteryContract.methods.enter().send({
    from,
    value: web3.utils.toWei(ether),
  })
}

export async function getPlayers(from: string): Promise<string[]> {
  if (from) {
    return lotteryContract.methods.getPlayers().call({ from })
  }

  return []
}
