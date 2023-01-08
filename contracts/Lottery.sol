// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Lottery {
    address public owner;
    address payable[] public players;
    
    constructor() {
        // Address of the person deploying the contract
        owner = msg.sender;
    }

    // Enforces a minimun amount of ether to be sent to a function
    modifier minimum(uint value) {
        string memory requiredMsg = string.concat("The minimum value required is ", Strings.toString(value));
        require(msg.value >= value, requiredMsg);
        _;
    }

    // Makes sure the owner is the only one who can call a function
    modifier restricted() {
        require(msg.sender == owner, "Only the owner of this contract can call the function");
        _;
    }

    function enter() public payable minimum(.01 ether) {
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        // See https://medium.com/0xcode/hashing-functions-in-solidity-using-keccak256-70779ea55bb0
        // See https://docs.soliditylang.org/en/v0.8.17/abi-spec.html
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function pickWinner() public restricted returns (uint, uint, address) {
        // Compute the (pseudo)random index of the winner
        uint index = random() % players.length;
        
        uint prize = address(this).balance;
        address payable winner = players[index];

        // Transfer the total amount to the winner
        winner.transfer(prize);

        // Empty the list of players
        players = new address payable[](0);

        return (index, prize, winner);
    }
}
