import React,{ useContext, useState } from 'react'
import { AuthContext } from '../store/Auth'
import { useLocation } from 'react-router-dom'
import './BuyEventTickets.css';



const BuyEventTickets = ({createNewEvent }) => {
    const [participantName,setparticipantName]=useState("")
    const [ID,setID]=useState("")
    const[ticketPrice,setticketPrice]=useState(0)
    const [totalTickets,settotalTickets]=useState(0)
    const {events}=useContext(AuthContext)
    const location = useLocation();
    const { id } = location.state || {};

    const [eventTicketPrice,seteventTicketPrice,]=useState(0)
    events.find()

    return (
        <div className="login-container">
  <h1>Buy Tickets for Event-{id}</h1>

  <input className="input-field" type="text" placeholder="Participant Name" value={participantName} onChange={(e) => setparticipantName(e.target.value)} />
  
  <input className="input-field" type="text" placeholder="Program Date" value={ID} onChange={(e) => setID(e.target.value)} />

  <input className="input-field" type="number" placeholder="Total Number of Tickets" value={totalTickets} onChange={(e) => settotalTickets(e.target.value)} />
  
  <input className="input-field" type="number" placeholder="Ticket Price" value={ticketPrice} onChange={(e) => setticketPrice(e.target.value)} />

  <button className="action-button" onClick={() => createNewEvent(participantName, ID, ticketPrice, totalTickets)}>
    Create
  </button>
</div>

    );
}

export default BuyEventTickets;
