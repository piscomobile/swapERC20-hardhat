//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IERC20.sol"; 


contract Swap {

    address private owner;
    IERC20 private fromToken;
    IERC20 private toToken;

    constructor(address _fromToken , address _toToken){
        fromToken = IERC20(_fromToken);
        toToken = IERC20(_toToken);
    }

    /*function provide(uint _amount){
        fromToken.approve()
    }
*/
}