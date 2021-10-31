//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IDaiToken.sol"; 


contract Swap2 {

    address private owner;  
    IDaiToken public daiToken;


 constructor(address _address){

     daiToken= IDaiToken(_address);
     owner= msg.sender;

 }

    function getBalance(address _address)public view returns (uint ){
          console.log(daiToken.balanceOf(_address));
          return daiToken.balanceOf(_address);
    }

}