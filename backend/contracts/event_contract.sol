// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/Ownable.sol";

/*
player pays 2eth 
player>=3
organizer has 3 ether can pick winner
winner player gets money
*/
contract Event_ord{
    // list of events
    struct Event{
        address organizer;
        string name;
        uint date;
        uint price;
        uint ticketCounter;
        uint ticketRemaining;
    }
    struct Buyers{
        address participants;
        string name;
        uint quantity;
        uint price;
        uint timestamp;  
        uint event_id;
    }
    mapping (uint=>Event)public events;//creating mapping to store events
    mapping (uint=>Buyers[])public people;//participants who attend event
   
    uint public  nextId;
    mapping(uint => address[]) public attendees; // Stores attendees per event
   
    mapping(address =>  bool) public authorizeProvider;
    address owner;
     constructor() {
        owner = msg.sender;
        authorizeProvider[msg.sender]=true;
    }
    modifier onlyOwner(){
        require(msg.sender==owner,"you are not owner");
        _;
    }
    
    modifier onlyAuthorized(address _user){
        require(authorizeProvider[_user], "You are not authorized");
        _;
    }
     function AuthorizeProvider(address provider) public onlyOwner {
        authorizeProvider[provider] = true; // Set authorized for this event
    }
    
    // new organizer is creating event
    function createEvent(string memory name,uint date, uint price,uint ticketCounter)public onlyAuthorized(msg.sender) {
        require(block.timestamp<date,"you cann't create event for past data");
        require(ticketCounter>0 ,"ticket can't have 0 tickets");
        events[nextId]=Event(msg.sender,name,date,price,ticketCounter,ticketCounter);
        nextId++;
    }
    function buyTicket(uint id,uint quantity,string calldata name) external  payable {
        require(events[id].date!=0,"Event doesn't exits");//if event exits then only it can buy ticket
        require(events[id].date>block.timestamp,"event has ended");//so here blocktimestamp is the time when the block created by the user to pay for event. After block is created it goes to waiting stage to check if the blocktimestamp is less than event date
        
        Event storage _event=events[id];//we created new storage to store the event[id] then we are taking price of event and than we are multiplying it with ticketCounter which is quantity
        
        require(msg.value==(_event.price *quantity),"not enough");
        
        require(_event.ticketRemaining>=quantity,"not enough tockets left");
        
        people[id].push(Buyers(msg.sender,name,quantity,msg.value,block.timestamp,id));
        _event.ticketRemaining-=quantity;
        
        

    }
    
    function getAllEvents()public view returns(Event[] memory){
        Event[] memory eventList=new Event[](nextId);
        for(uint i=0;i<nextId;i++){
            eventList[i]=events[i];
        }
        return eventList;
        // generates the list of event details
    }
    function attendee(uint id)public view returns (Buyers[] memory){
        return people[id];
    }
     function getOwner() public view returns (address) {
        return owner;
    }
    
}