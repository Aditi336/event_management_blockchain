import React,{ useContext, useState } from 'react'
import { AuthContext } from '../store/Auth'
import { useLocation } from 'react-router-dom';

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
            <h1>Buy tickets for event-{id}</h1>
            Participant name: <input className='input-field' type= "text" placeholder='program name' value = {participantName} onChange={(e) => setparticipantName(e.target.value)}/><br></br>
            Program date<input className='input-field' type= "text" placeholder='program date' value = {ID} onChange={(e) => setID(e.target.value)}/><br></br>
            Total number of tickets<input className='input-field' type="number"  value = {totalTickets} onChange={(e) => settotalTickets(e.target.value)}/><br></br>
            Ticket price<input className='input-field' type= "number" placeholder='ticket price' value = {totalTickets} onChange={(e) => setticketPrice(e.target.value)}/><br></br>


            <button className='action-button' onClick={() => createNewEvent(participantName,ID,ticketPrice,totalTickets)}>Create</button>
        </div>
    );
}

export default BuyEventTickets;
