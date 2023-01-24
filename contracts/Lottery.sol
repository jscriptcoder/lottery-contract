// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Lottery game
 * @author Francisco Ramos
 * @notice Simple web3 game based on Udemy course 
 * https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/
 */
contract Lottery {
    // Stores the owner of the contract
    address public owner;

    // keeps track of the people who enter the game
    address payable[] public players;

    // We use it to emit some details about the pickWinner transaction
    event WinnerPicked(
        uint index,
        uint prize,
        address winner
    );
    
    /**
     * @dev Stores the address of the person deploying the contract
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Enforces a minimun amount of ether to be sent to a function
     * @param value The minimum amount to send
     */
    modifier minimum(uint value) {
        string memory requiredMsg = string.concat("The minimum value required is ", Strings.toString(value));
        require(msg.value >= value, requiredMsg);
        _;
    }

    /**
     * @dev Makes sure the owner is the only one who can call a function
     */
    modifier restricted() {
        require(msg.sender == owner, "Only the owner of this contract can call the function");
        _;
    }

    /**
     * @dev Will be called by the player who enters de game sending ether
     * and makes sure he/she is sending a minumun of 0.01 ether
     */
    function enter() public payable minimum(.01 ether) {
        players.push(payable(msg.sender));
    }

    /**
     * @dev Generates a pseudo random number
     * https://medium.com/0xcode/hashing-functions-in-solidity-using-keccak256-70779ea55bb0
     * https://docs.soliditylang.org/en/v0.8.17/abi-spec.html
     * @return index of the player within our list 
     */
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    /**
     * @dev Gets the list of players currently in the game
     * @return players
     */
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    /**
     * @dev Called by the manager, it picks a winner
     * emitting WinnerPicked event
     */
    function pickWinner() public restricted {
        // Compute the (pseudo)random index of the winner
        uint index = random() % players.length;
        
        uint prize = address(this).balance;
        address payable winner = players[index];

        // Transfer the total amount to the winner
        winner.transfer(prize);

        // Empty the list of players
        players = new address payable[](0);

        // Emit event with details of the result
        emit WinnerPicked(
            index,
            prize,
            winner
        );
    }
}
