// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract TokenA is ERC20, Ownable {
    constructor() ERC20("TokenA","TKA") {}

    function mint(address to, uint256 amount) public onlyOwner {
        console.log("inside Token A mint");
        _mint(to, amount);
    }
}