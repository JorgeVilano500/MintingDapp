// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/access/Ownable.sol';


contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply; 
    uint256 public maxSupply; 
    uint256 public maxPerWallet; 
    bool public isPublicMintEnabled; 
    string internal baseTokenUri; 
    address payable public withdrawWallet; // would be able to withdraw from the wallet. 
    mapping(address=> uint256) public walletMints;// keeps tracks of the mints that have happened


    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3; 
        //set withdraw wallet address
    }


    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner { //onlyOwner comes from the ownable contract. only the owner is the same as the deployer
        isPublicMintEnabled = isPublicMintEnabled_;

    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner { // call data means its only being read in this function 
        baseTokenUri = baseTokenUri_; // url that has the images for the nfts
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) { // there is already a tokenURI already so we need to override to make sure this function is called
        require(_exists(tokenId_), 'token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), '.json'));// will get the images URL's and displays them into a json function so we can see them all 
        // '.json' creates the json file for this type of file.
    }// have to make sure that the correct url is being called. so tokenId needs to exist first 
    // will call tokenURI for each token so all images load

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quantity_) public payable {// payable means that money can be sent to this function in the smart contract to deal with a transaction
        // most valuable part since it is payable 
        require(isPublicMintEnabled, 'Minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceeded max wallet'); // allows the users to not get more minted nfts than they should 
        require(msg.sender != address(0x0));

        for(uint256 i = 0; i < quantity_; i++ ) {
            uint256 _newTokenId = totalSupply + 1;
            totalSupply ++;
            _safeMint(msg.sender, _newTokenId); // comes from ERC 721 for the mint to happen. also prevents reentrancy attack because the total supply is added beforels 
        }


    }

}
