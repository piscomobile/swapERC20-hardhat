//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IDaiToken {
    function transfer(address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
}