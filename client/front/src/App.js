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
import Temp1 from './component/Temp1';
import Auth from './store/Auth';
import BuyEventTickets from './component/BuyEventTickets'

function App() {

  const [provider,setProvider]=useState(null);
  const [Signer,setSigner]=useState(null);
  const [account,setAccount]=useState(null);
  const [isConnected,setIsConnected]=useState(false);
  const [isOwner,setIsOwner]=useState(null)
  const [contract, setContract] = useState(null);


  useEffect(()=>{
    
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
        console.log(ownerAddress,"this is owner")
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

  return (
    <Auth>
    <Router>
      <Routes>
        <Route path="/" element={isConnected?(<Connected account={account} isOwner={isOwner}/>):(<Login connectWallet={connectToMetamask}/>)} />
        <Route path="/authorize-provider" element={<Adding_new_provider />} />
        <Route path="/create_event" element={<CreateEvent/>}></Route>
        <Route path='/display_events' element={<DisplayEvents/>}></Route>
        <Route path='buy_events_ticket' element={<BuyEventTickets/>}></Route>
       <Route path='/temp_abc' element={<Temp1/>}/>
      </Routes>
    </Router>
    </Auth>
  );
}

export default App;
