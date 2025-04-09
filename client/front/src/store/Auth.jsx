import React, { useState, useEffect, createContext } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { contractAddress, contractAbi } from '../constant/constant';
export const AuthContext=createContext();
const Auth=({children})=>{
    const [Provider,setProvider]=useState(null)
    const [Signer,setSigner]=useState(null)
    const [Contract,setContract]=useState(null)
    const connectToMetaMask=async()=> {
        try {
          const provider = new BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          setProvider(provider)
          const signer = await provider.getSigner();
          setSigner(signer)
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract)
          console.log(signer)
        }catch(error){
            console.log(error)
        }
    }
        const abc=async(pAddress)=>{
            try{
                if(Contract){
                    const tx = await Contract.AuthorizeProvider(pAddress);
                    await tx.wait();
                    alert(`Provider ${pAddress} authorized successfully`);
        
                }
            }catch(err){
                console.error(err);
            }

        }
        // Creation of events
        const createNewEvent=async( eventName, eventDate, ticketPrice, totalTickets) =>{
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
            
            const tx = await Contract.createEvent(
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
        
        useEffect(()=>{
            connectToMetaMask()
        },[])

        // display of events
          const [events, setEvents] = useState([]);
          async function fetchEvents() {
            try {
              const provider = new BrowserProvider(window.ethereum);
              await provider.send("eth_requestAccounts", []);
              const signer = await provider.getSigner();
              const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      
              const eventCount = await contract.nextId(); // Assuming nextId is the count of events
              let eventList = [];
      
              for (let i = 0; i < eventCount; i++) {
                const event = await contract.events(i);
                eventList.push({
                  id: i,
                  organizer: event.organizer,
                  name: event.name,
                  date: new Date(Number(event.date) * 1000).toLocaleDateString(),
                  price: ethers.formatEther(event.price), // Convert from wei to ether
                  ticketRemaining: Number(event.ticketRemaining),
                  ticketCount: Number(event.ticketCounter),
                });
              }
      
              setEvents(eventList);
            } catch (error) {
              console.error("Error fetching events:", error);
            }
          }
          useEffect(() => {      
            fetchEvents();
          }, []);
        // user buys ticket

         
        const constantValues={
            connectToMetaMask,
            abc,
            Provider,
            Signer,
            Contract,
            createNewEvent,
            fetchEvents,
            events,
            // handleBuys
        }
        return(
            <AuthContext.Provider value={constantValues}>
            {children}
        </AuthContext.Provider>
        )

}
export default Auth;


