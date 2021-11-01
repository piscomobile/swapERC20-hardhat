//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./IDaiToken.sol"; 

//https://solidity-by-example.org/app/erc20/

contract Swapper {

    address private fromToken;
    address private toToken;  
    IDaiToken public daiToken;


 constructor(address _fromToken ,address _toToken){

     fromToken = _fromToken;
     toToken = _toToken;

 }

    function provide(uint _amount) external {


    };


    function swap () external {


    }


    function getBalance(address _address)public view returns (uint ){
          console.log(daiToken.balanceOf(_address));
          return daiToken.balanceOf(_address);
    }

}