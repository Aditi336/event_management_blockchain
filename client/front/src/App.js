import logo from './logo.svg';
import './App.css';
import React,{ useState,useEffect, use } from 'react'
import { BrowserProvider } from 'ethers';
import {ethers} from 'ethers';
import {contractAddress,contractAbi} from './constant/constant'
import Login from './component/Login';
import Connected from './component/Connected';
import Adding_new_provider from './component/Adding_new_provider';
import CreateEvent from './component/CreateEvent';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DisplayEvents from './component/DisplayEvents';

function App() {

  const [provider,setProvider]=useState(null);
  const [Signer,setSigner]=useState(null);
  const [account,setAccount]=useState(null);
  const [isConnected,setIsConnected]=useState(false);
  const [isOwner,setIsOwner]=useState(null)
  const [contract, setContract] = useState(null);

  // const [TicketStatus,setTicketStatus]=useState(true);
  // const [ListEvent,setListEvent]=useState([])
  // const [participats,setParticipants]=useState([])

  useEffect(()=>{
    // getEvents();

    
    if(window.ethereum){
      window.ethereum.on('accountsChanged',handleAccountsChanged);
    }
    return()=>{
      if(window.ethereum){
        window.ethereum.removeListener('accountsChanges',handleAccountsChanged);
      }
    }
  },[])
  

/*
  async function getEvents() {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    const signer = await provider.getSigner();
    const contractInstance=new ethers.Contract(
      contractAddress,contractAbi,signer
    );
    const event_status =await contractInstance.getAllEvents();
    const formattedEvents = event_status.map(event => ({
      organizer: event[0],
      name: event[1],
      date: Number(event[1]),
      price: ethers.formatUnits(event[3], "ether"),
      ticketCounter: Number(event[4]),
      ticketRemaining: Number(event[5])
  }));

  console.log(formattedEvents);
  // setListEvent(formattedEvents);
    
  }
  
  async function getremainingTickets(eventId) {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    const signer = await provider.getSigner();
    const contractInstance=new ethers.Contract(
      contractAddress,contractAbi,signer
    );
    const eventDetails = await contractInstance.events(eventId);
    return Number(eventDetails.ticketRemaining);
  }

  async function getparticipants_of_event(event_id) {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    const signer = await provider.getSigner();
    const contractInstance=new ethers.Contract(
      contractAddress,contractAbi,signer
    );
    const attendend=await contractInstance.attendee(event_id)
    setParticipants(attendend)
  }*/

  function handleAccountsChanged(accounts){
    if(accounts.length>0 && account!=accounts[0]){
      setAccount(accounts[0]);
    }else{
      setIsConnected(false);
      setAccount(null);
    }
  }
  async function connectToMetamask() {
    if(window.ethereum){
      try{
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts",[]);
        const signer = await provider.getSigner();
        const address=await signer.getAddress();
        setAccount(address);
        console.log("Metamask connected"+address);
        setIsConnected(true);
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        setContract(contract);

        // Ensure the signer is connected to the contract
        const ownerAddress = await contract.getOwner();
        // console.log(ownerAddress,"lkajdsbn",address)

        // Compare addresses (case-insensitive)
        setIsOwner(ownerAddress);
        console.log(isOwner)
        // localStorage.setItem("isOwner", ownerAddress);
        // localStorage.setItem("contractAbi", JSON.stringify(contractAbi));
        // localStorage.setItem("contractAddress", contractAddress);
        // localStorage.setItem("signer",signer);

      }catch(err){
        console.error(err);
      }
    }else{
      console.error("Metamask i not detected in the browser");
    }
  }
//   useEffect(() => {
//     const storedIsOwner = localStorage.getItem("isOwner");
//     const storedContractAbi = localStorage.getItem("contractAbi");
//     const storedContractAddress = localStorage.getItem("contractAddress");
//     const storedsigner = localStorage.getItem("signer");
//     if (storedIsOwner && storedContractAbi && storedContractAddress && storedsigner) {
//         setIsOwner(storedIsOwner.toLowerCase());
//         const parsedAbi = JSON.parse(storedContractAbi);
//         setSigner(storedsigner);
//         const contract = new ethers.Contract(storedContractAddress, parsedAbi, Signer);
//         console.log("askjdbhf",contract)
//         setContract(contract);
        
//     }
// }, []);

  const AP = async (providerAddress) => {
    // console.log(isOwner,providerAddress,contract)
   
        try {
          const provider = new BrowserProvider(window.ethereum);
          setProvider(provider);
          await provider.send("eth_requestAccounts",[]);
          const signer = await provider.getSigner();
          const address=await signer.getAddress();
          setAccount(address);
          setIsConnected(true);
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract);
            const tx = await contract.AuthorizeProvider(providerAddress);
            await tx.wait();
            alert(`Provider ${providerAddress} authorized successfully`);

        } catch(error) {
            console.error("Only contract owner can authorize different providers");
        }
   
}

async function createNewEvent( eventName, eventDate, ticketPrice, totalTickets) {
  try {
    // Validate inputs
    if (!eventName || eventName.trim() === "") {
      throw new Error("Event name cannot be empty");
    }
    
    // Convert date to Unix timestamp if it's a Date object
    let timestamp = eventDate;
    if (eventDate instanceof Date) {
      timestamp = Math.floor(eventDate.getTime() / 1000);
    }
    
    // Current timestamp for comparison
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (timestamp <= currentTimestamp) {
      throw new Error("Event date must be in the future");
    }
    
    if (totalTickets <= 0) {
      throw new Error("Total tickets must be greater than zero");
    }
    const provider = new BrowserProvider(window.ethereum);
    setProvider(provider);
    await provider.send("eth_requestAccounts",[]);
    const signer = await provider.getSigner();
    const address=await signer.getAddress();
    setAccount(address);
    setIsConnected(true);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    setContract(contract);
    // Call the contract method
    const tx = await contract.createEvent(
      eventName,
      timestamp,
      ticketPrice,
      totalTickets
    );
    
    console.log(`Transaction submitted: ${tx.hash}`);
    const receipt = await tx.wait();  
    console.log(`Event "${eventName}" created successfully in block ${receipt.blockNumber}`);
    
    return {
      success: true,
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      eventName: eventName,
      eventDate: timestamp,
      ticketPrice: ticketPrice,
      totalTickets: totalTickets
    };
  } catch (error) {
    console.error("Failed to create event:", error.message);
    
    // Check for specific error messages from the contract
    if (error.message.includes("you cann't create event for past data")) {
      console.error("Error: Cannot create an event for a past date");
    } else if (error.message.includes("ticket can't have 0 tickets")) {
      console.error("Error: Event must have at least one ticket");
    } else if (error.message.includes("You are not authorized")) {
      console.error("Error: You don't have permission to create events");
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

async function displayEvent(){
  try{

  }catch(error){
    console.log(error)
  }
}


  return (
    <Router>
      <Routes>
        <Route path="/" element={isConnected?(<Connected account={account} isOwner={isOwner}/>):(<Login connectWallet={connectToMetamask}/>)} />
        <Route path="/authorize-provider" element={<Adding_new_provider AP={AP}/>} />
        <Route path="/create_event" element={<CreateEvent createNewEvent={createNewEvent}/>}></Route>
        <Route path='/display_events' element={<DisplayEvents/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
