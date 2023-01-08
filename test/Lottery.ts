const Lottery = artifacts.require('Lottery')

contract('Lottery', (accounts) => {
  it('allows one account to enter', async () => {
    const lottery = await Lottery.new()

    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.01', 'ether'),
    })

    const players = await lottery.getPlayers({
      from: accounts[0],
    })

    assert.equal(accounts[0], players[0])
    assert.equal(players.length, 1)
  })

  it('requires a minimum value', async () => {
    const lottery = await Lottery.new()

    try {
      await lottery.enter({
        from: accounts[0],
        value: web3.utils.toWei('0.0099', 'ether'),
      })

      assert.fail('Should have raised exception "minimum value required"')
    } catch (e) {
      assert.ok(e, 'Exception "minimum value required" has been raised')
    }
  })

  it('allows multiple accounts to enter', async () => {
    const lottery = await Lottery.new()

    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    await lottery.enter({
      from: accounts[1],
      value: web3.utils.toWei('0.03', 'ether'),
    })

    await lottery.enter({
      from: accounts[2],
      value: web3.utils.toWei('0.04', 'ether'),
    })

    const players = await lottery.getPlayers({
      from: accounts[0],
    })

    assert.equal(accounts[0], players[0])
    assert.equal(accounts[1], players[1])
    assert.equal(accounts[2], players[2])

    assert.equal(3, players.length)
  })

  it('only the owner can call pickWinner method', async () => {
    const lottery = await Lottery.new()

    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    await lottery.enter({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    await lottery.enter({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    try {
      await lottery.pickWinner({
        from: accounts[1], // accounts[1] is not the owner
      })

      assert.fail('Should have raised exception "Not the owner"')
    } catch (err) {
      assert.ok(err, 'Exception "Not the owner" has been raised')
    }
  })

  it('sends money to the winner and resets the players array', async () => {
    const lottery = await Lottery.new()

    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    await lottery.enter({
      from: accounts[1],
      value: web3.utils.toWei('0.03', 'ether'),
    })

    await lottery.enter({
      from: accounts[2],
      value: web3.utils.toWei('0.04', 'ether'),
    })

    const tx = await lottery.pickWinner({
      from: accounts[0],
    })

    // Let's grab the event "WinnerPicked" emitted where
    // we have the details of this transaction
    const { logs } = tx

    assert.ok(Array.isArray(logs))
    assert.equal(logs.length, 1)

    const log = logs[0]

    assert.equal(log.event, 'WinnerPicked')

    const index = parseInt(log.args.index.toString(10), 10)
    const prize = parseFloat(web3.utils.fromWei(log.args.prize.toString(10))) // in ether

    assert.equal(prize, 0.09) // 0.02 + 0.03 + 0.04
    assert.equal(accounts[index], log.args.winner)

    // Make sure the list of players is empty
    const players = await lottery.getPlayers()

    assert.equal(0, players.length)
  })
})
