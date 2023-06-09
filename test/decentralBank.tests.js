const RWD = artifacts.require("RWD")
const Tether = artifacts.require("Tether")
const DecentralBank = artifacts.require("DecentralBank")

require("chai").use(require("chai-as-promised")).should()

contract("DecentralBank", ([owner, investor]) => {
  let tether, rwd, decentralBank

  function tokens(number) {
    return web3.utils.toWei(number, "ether")
  }

  before(async () => {
    // Load Contracts
    tether = await Tether.new()
    rwd = await RWD.new()
    decentralBank = await DecentralBank.new(rwd.address, tether.address)

    // Transfer all tokens to DecentralBank (1 million)
    await rwd.transfer(decentralBank.address, tokens("1000000"))

    // Transfer 100 mock Tethers to Customer
    await tether.transfer(investor, tokens("100"), { from: owner })
  })

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name()
      assert.equal(name, "Mock Tether Token")
    })
  })

  describe("Reward Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name()
      assert.equal(name, "Reward Token")
    })
  })

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name()
      assert.equal(name, "Decentral Bank")
    })
  })

  it("contract has tokens", async () => {
    let balance = await rwd.balanceOf(decentralBank.address)
    assert.equal(balance, tokens("1000000"))
  })

  describe("Yield Farming", async () => {
    it("rewards tokens for staking", async () => {
      let result

      // Check Investor Balance
      result = await tether.balanceOf(investor)
      assert.equal(result.toString(), tokens("100"), "investor mock wallet balance before staking")

      // Check Staking For Customer of 100 tokens
      await tether.approve(decentralBank.address, tokens("100"), {
        from: investor,
      })
      await decentralBank.depositTokens(tokens("100"), { from: investor })

      // Check Updated Balance of investor
      result = await tether.balanceOf(investor)
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor mock wallet balance after staking 100 tokens"
      )

      // Check Updated Balance of Decentral Bank
      result = await tether.balanceOf(decentralBank.address)
      assert.equal(
        result.toString(),
        tokens("100"),
        "decentral bank mock wallet balance after staking from investor"
      )

      // Is Staking Update
      result = await decentralBank.isStaking(investor)
      assert.equal(result.toString(), "true", "investor is staking status after staking")

      // Issue Tokens
      await decentralBank.issueTokens({ from: owner })

      // Ensure Only The Owner Can Issue Tokens
      await decentralBank.issueTokens({ from: investor }).should.be.rejected

      // Unstake Tokens
      await decentralBank.unstakeTokens({ from: investor })

      // Check Unstaking Balances
      result = await tether.balanceOf(investor)
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor mock wallet balance after unstaking"
      )

      // Check Updated Balance of Decentral Bank
      result = await tether.balanceOf(decentralBank.address)
      assert.equal(
        result.toString(),
        tokens("0"),
        "decentral bank mock wallet balance after staking from investor"
      )

      // Is Staking Update
      result = await decentralBank.isStaking(investor)
      assert.equal(result.toString(), "false", "investor is no longer staking after unstaking")
    })
  })
})
