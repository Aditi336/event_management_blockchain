import logo from './logo.svg';
import './App.css';
import React,{ useState,useEffect, use } from 'react'
import { BrowserProvider } from 'ethers';
import {ethers} from 'ethers';
import {contractAddress,contractAbi} from './constant/constant'
import Login from './component/Login';
import Connected from './component/Connected';
function App() {

  const [provider,setProvider]=useState(null);
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
        console.log(ownerAddress)

        // Compare addresses (case-insensitive)
        setIsOwner(account.toLowerCase() === ownerAddress.toLowerCase());

      }catch(err){
        console.error(err);
      }
    }else{
      console.error("Metamask i not detected in the browser");
    }
  }

  return (
    <div>
      {isConnected?(<Connected account={account} isOwner={isOwner}/>):(<Login connectWallet={connectToMetamask}/>)}
    </div>
  );
}

export default App;
