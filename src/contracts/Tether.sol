// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract Tether {
  // State Variables
  string public name = "Mock Tether Token";
  string public symbol = "mUSDT";
  uint256 public totalSupply = 1000000000000000000000000;
  uint8 public decimals = 18;

  // Events
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owner, address indexed _spender, uint _value);

  // Mapping
  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  // Constructor
  constructor() {
    balanceOf[msg.sender] = totalSupply;
  }

  // Transfer
  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  // Approve
  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  // Transfer From
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}
