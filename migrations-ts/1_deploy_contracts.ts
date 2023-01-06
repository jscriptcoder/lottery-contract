const Lottery = artifacts.require('Lottery')

const migration: Truffle.Migration = (deployer) => {
  deployer.deploy(Lottery)
}

module.exports = migration

// because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {}
