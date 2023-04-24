// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier restrected() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint completed) public restrected {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restrected {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
