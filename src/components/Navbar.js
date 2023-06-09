import React, { Component } from "react"
import bank from "../bank.jpg"

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top shadow p-0"
        style={{ backgroundColor: "black", height: "50px" }}
      >
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          style={{ color: "white", fontSize: "18px" }}
        >
          <img src={bank} width="65" height="30" className="d-inline-block align-top" alt="bank" />
          &nbsp; <b>DAPP Yield Staking-Decentralized Banking</b>
        </a>
        <ul className="navbar-nav px-3">
          <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
            <small style={{ color: "	#FFFFFF" }}>
              Connected Account: {this.props.account.slice(0, 6)}...{this.props.account.slice(-4)}
            </small>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
