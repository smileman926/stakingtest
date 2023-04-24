import React, { Component } from "react"
import tether from "../tether.png"
import Airdrop from "./Airdrop"

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "#FFFFFF" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "#FFFFFF", fontSize: "12px" }}>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, "Ether")} USDT</td>
              <td>{window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form
            onSubmit={event => {
              event.preventDefault()
              let amount
              amount = this.input.value.toString()
              amount = window.web3.utils.toWei(amount, "Ether")
              this.props.stakeTokens(amount)
            }}
            className="mb-3"
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="float-left" style={{ marginLeft: "15px", fontSize: "14px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "8px", fontSize: "14px" }}>
                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
              </span>
              <div className="input-group mb-4">
                <input
                  ref={input => {
                    this.input = input
                  }}
                  type="text"
                  placeholder="0"
                  required
                />
                <div className="input-group-open">
                  <div className="input-group-text" style={{ fontSize: "12px" }}>
                    <img src={tether} alt="tether" height="20" />
                    &nbsp;&nbsp;&nbsp; USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-info btn-lg btn-block"
                style={{ fontSize: "16px" }}
              >
                <b>Deposit</b>
              </button>
            </div>
          </form>
          <button
            type="submit"
            onClick={event => {
              event.preventDefault(this.props.unstakeTokens())
            }}
            className="btn btn-info btn-lg btn-block"
            style={{ fontSize: "16px" }}
          >
            <b>Withdraw</b>
          </button>
          <div className="card-body text-center" style={{ color: "#008b8b", fontSize: "16px" }}>
            <b>Airdrop</b>
            <Airdrop
              stakingBalance={this.props.stakingBalance}
              decentralBankContract={this.props.decentralBankContract}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Main
