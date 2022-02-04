// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721, Ownable {
  using Counters for Counters.Counter;
  using Strings for uint256;
  Counters.Counter tokenIds;
  mapping(uint256 => string) tokenURIs;
	string public baseURI;
	string public cID;
	uint256 public totalAmount;
	uint256 public price;
	address public fundAddress;

  struct RenderToken{
    uint256 id;
    string uri;
		address owner;
  }

	event minted(string _hash, uint256 _id);

  constructor(
		string memory _baseURI,
		string memory _cID,
		uint256 _totalAmount,
		uint256 _price
	) ERC721("Test", "TS") {
		
		cID = _cID;
		price = _price;
		baseURI = _baseURI;
		totalAmount = _totalAmount;		
		fundAddress = msg.sender;
	}

	function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
  	tokenURIs[_tokenId] = _tokenURI;
  }

	function setBaseURI(string memory _baseURI) public onlyOwner {
		baseURI = _baseURI;
	}

	function setFundAddress(address _addr) public onlyOwner {
		fundAddress = _addr;
	}

	function setPrice(uint256 _price) public onlyOwner {
		price = _price;
	}

	function setCID(string memory _cID) public onlyOwner {
		cID = _cID;
	}

	function setTotalAmount(uint256 _totalAmount) public onlyOwner {
		totalAmount = _totalAmount;
	}

	function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
	function getMintedAmount() public view returns(uint256) {
		return tokenIds.current();
	}

  function tokenURI(uint256 _tokenId) public view virtual override returns(string memory) {
	  require(_exists(_tokenId));
	  string memory _tokenURI = tokenURIs[_tokenId];
	  return _tokenURI;
  }

  function getAllTokens() public view returns(RenderToken[] memory) {
	  uint256 latestId = tokenIds.current();
		uint256 counter = 0;
	  RenderToken[] memory result = new RenderToken[](latestId); // latest id is the maximum size of the current tokens.

	  for(uint256 i = 0; i < latestId; i++) {
	    if(_exists(i)){
		    string memory uri = tokenURI(i);
		    result[counter ++] = RenderToken(i, uri, ownerOf(i));
	    }
	  }

	  return result;
  }

	function getMyTokens() public view returns(RenderToken[] memory) {
	  uint256 latestId = tokenIds.current();
		uint256 counter = 0;
		uint256 myCount = 0;
		uint256 i;

	  for(i = 0; i < latestId; i++) {
	    if(_exists(i) && ownerOf(i) == msg.sender) {
				myCount ++;
	    }
	  }

	  RenderToken[] memory result = new RenderToken[](myCount); // latest id is the maximum size of the current tokens.

		for(i = 0; i < latestId; i++) {
	    if(_exists(i) && ownerOf(i) == msg.sender) {
		    string memory uri = tokenURI(i);
		    result[counter ++] = RenderToken(i, uri, msg.sender);
	    }
	  }

	  return result;
  }

  function createNFT(uint256 _amount) public payable {
		require(_amount > 0, "Amount must be greater than zero");
		require(tokenIds.current() + _amount <= totalAmount, "Insufficient amount to mint");
		require(msg.value >= _amount * price, "Insufficient value");

		uint256 newId;
		string memory uri;

		for (uint256 i = 0; i < _amount; i++) {
			newId = tokenIds.current();
			uri = string(abi.encodePacked(baseURI, cID, '/', Strings.toString(newId + 1), '.json'));

		 	_mint(msg.sender, newId);
			_setTokenURI(newId, uri);
		  	tokenIds.increment();

			emit minted(uri, newId);
		}
  }

	function withdrawFund() public onlyOwner {
		uint256 balance = address(this).balance;
		require(balance > 0, "No fund to withdraw");

    	address payable _to = payable(fundAddress);
    	_to.transfer(balance);
	}
}