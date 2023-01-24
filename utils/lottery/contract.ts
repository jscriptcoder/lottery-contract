import Web3 from 'web3'
import { EventData } from 'web3-eth-contract'
import lotteryJson from './contract.json'
import emitter from '../emitter'

type Address = string
type Amount = string // amounts are always presented as strings

type ContractDetails = {
  owner: Address
  players: Address[]
  balance: Amount
  isManager: boolean
  hasEntered: boolean
  participants: number
  contractBalance: Amount
}

// Network settings have more properties, but we're only interested in the `address`
type NetworkSettings = Record<string, { address: Address }>

const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

const networkSettings = lotteryJson.networks as NetworkSettings

const CONTRACT_ABI = lotteryJson.abi as unknown as AbiItem
const CONTRACT_ADDRESS = networkSettings[networkId ?? 5777].address as Address

export const web3 = new Web3(Web3.givenProvider ?? projectUrl)

export const lotteryContract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
)

// We want to inform to the Frontend when the contract emits WinnerPicked event
// passing the event object, which contains all the details sent in the event.
lotteryContract.events.WinnerPicked((error: Error, event: EventData) => {
  if (error) {
    emitter.emit('error-picking-winner', error)
  } else {
    emitter.emit('winner-picked', event)
  }
})

/**
 * @returns contract's deployed address
 */
export function getContractAddress(): Address {
  return CONTRACT_ADDRESS
}

/**
 * This function will prompt the user for permission to connect their wallet
 * @returns list of connected wallet's accounts
 */
export async function requestAccounts(): Promise<Address[]> {
  return web3.eth.requestAccounts()
}

/**
 * @param address we want to get the balance from
 * @returns the amount in that address
 */
export async function getBalance(address: Address): Promise<Amount> {
  const balanceWei = await web3.eth.getBalance(address)
  return web3.utils.fromWei(balanceWei)
}

/**
 * @returns the amount locked in the contract
 */
export async function getContractBalance(): Promise<Amount> {
  return getBalance(CONTRACT_ADDRESS)
}

/**
 * @returns address of the contract's owner
 */
export async function getContractOwner(): Promise<Address> {
  return lotteryContract.methods.owner().call()
}

/**
 * @param from address entering the game
 * @param ether amount sent to the pool by the participant
 */
export async function enterLottery(
  from: Address,
  ether: Amount,
): Promise<string> {
  return lotteryContract.methods.enter().send({
    from,
    value: web3.utils.toWei(ether),
  })
}

/**
 * @param from address querying the list of participants
 * @returns list of participants
 */
export async function getPlayers(from: Address): Promise<Address[]> {
  if (from) {
    return lotteryContract.methods.getPlayers().call({ from })
  }

  return []
}

/**
 * @param from address querying the number of participants
 * @returns number of participants
 */
export async function numPlayers(from: Address): Promise<number> {
  const players = await getPlayers(from)
  return players.length
}

/**
 * This funtion can only get called by the manager (owner of the contract).
 * It'll pick a random winner and send all the ether there was in the pool
 * to this lucky player.
 * @param from address calling this function
 */
export async function pickWinner(from: Address): Promise<void> {
  if (from) {
    return lotteryContract.methods.pickWinner().send({ from })
  }
}

/**
 * @param address address querying the contract's detail
 * @returns a promise with details about the contract
 */
export async function getContractDetails(
  address: Address,
): Promise<ContractDetails> {
  const [balance, players, owner, contractBalance] = await Promise.all([
    getBalance(address),
    getPlayers(address),
    getContractOwner(),
    getContractBalance(),
  ])

  const participants = players.length
  const hasEntered = players.includes(address)
  const isManager = owner === address

  return {
    owner,
    players,
    balance,
    isManager,
    hasEntered,
    participants,
    contractBalance,
  }
}
