// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "./ERC20.sol";

contract SimpleERC20 is ERC20 {

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) ERC20(name, symbol) {

        _mint(msg.sender, totalSupply);
        
    }

}