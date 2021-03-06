// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";



contract TokenB is ERC20, Ownable {
    constructor() ERC20("TokenB","TKB") {}

    function mint(address to, uint256 amount) public onlyOwner {
        console.log("inside Token B mint");
        _mint(to, amount);
    }
}