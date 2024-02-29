// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Faucet {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);

    }

    function withdraw(uint _amount) payable public {
        //user can only withdraw -1 ETH at a time,

        require(_amount <=  100000000000000000 );
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "transfer failed");
    }

    function withdrawAll() onlyOwner public {
        //only owner can withdraw all the faucet 
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "failed to sent all ether");

    }

    function destroyFaucet() onlyOwner public {
        owner.transfer(address(this).balance);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can withdraw all the ether");
        _;
    }
}
