# Lottery Contract

Inspired by one of the ideas proposed in the course [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/), I decided to build it using latest web3 technologies and improve it with a more engaging UI. The idea behind this game is to have a prize pool and a list of participants. Each participan will enter the game sending an amount of ether to the contract. The manager (or owner of the contract) decides when to pick a winner. The total ether locked in the contract is then transfered to the lucky one.

## Demo
The Frontend is deployed in Vercel: https://lottery-contract-jet.vercel.app/. The contract has been deployed to Goerli testnet, in the following address: [0x891E790942610910A21C2E49B2A607D88f1bD619](https://goerli.etherscan.io/address/0x891E790942610910A21C2E49B2A607D88f1bD619)

## Technologies used
- Frontend
  - [React](https://reactjs.org/) 18.x
  - [Typescript](https://www.typescriptlang.org/)
  - [Ant Design](https://ant.design/) 5.x
  - [Tailwind.css](https://tailwindcss.com/)
  - [Next.js](https://nextjs.org/) 13.x
- Backend
  - [Solidity 0.8.17](https://docs.soliditylang.org/en/v0.8.17/)
  - [Truffle](https://trufflesuite.com/)
  - [Web3.js 1.2.11](https://web3js.readthedocs.io/en/v1.2.11/index.html)
- Testing
  - [Ganache](https://trufflesuite.com/ganache/)
  - [Mocha](https://mochajs.org/)
  - [ts-node](https://github.com/TypeStrong/ts-node)
- Wallet
  - [MetaMask](https://metamask.io/)
