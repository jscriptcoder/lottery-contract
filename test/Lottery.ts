const Lottery = artifacts.require('Lottery')

contract('Lottery', (accounts) => {
  it('allows one account to enter', async () => {
    const lottery = await Lottery.deployed()
    lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether'),
    })

    const players = await lottery.getPlayers({
      from: accounts[0],
    })

    assert.equal(accounts[0], players[0])
    assert.equal(players.length, 1)
  })
})
