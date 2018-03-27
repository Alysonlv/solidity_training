pragma solidity ^0.4.17;

contract LotteryContract {
    address public manager;
    string public lotteryName;
    address[] public players; //Dynamic array of addresses
    address private thisContract;

    function LotteryContract(string name) public {
        //require(msg.value >= .01 ether);
        manager = msg.sender;
        lotteryName = name;
        thisContract = this;
    }
    
    function enter() public payable {
        require(msg.sender != manager);
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players)); //keccak256 or sha3() do a hash
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(thisContract.balance);
        players = new address[](0); //creating a new Dynamic array with 0 itens. Here we are reseting the contract
        
    }
    
    //Function modifier
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
    
}