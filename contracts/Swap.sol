//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IERC20.sol"; 


contract Swap {

    address private owner;  
    IERC20 public usdt;


 constructor(address _address){

     usdt= IERC20(_address);
     owner= msg.sender;

 }

    function getBalance(address _address)public view returns (uint ){
          console.log(usdt.balanceOf(_address));
          return usdt.balanceOf(_address);
    }

}