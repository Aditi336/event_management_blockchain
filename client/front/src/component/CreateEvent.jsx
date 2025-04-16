import React,{ useContext, useState } from 'react'
import { AuthContext } from '../store/Auth'
import './CreateEvent.css';


const CreateEvent = () => {
    const [eventName,seteventName]=useState("")
    const [eventDate,seteventDate]=useState("")
    const[ticketPrice,setticketPrice]=useState(0)
    const [totalTickets,settotalTickets]=useState(0)
    const {createNewEvent,owner,Account}=useContext(AuthContext)
    
    // console.log(owner,Account)

    return (
        <div className="create-event-container">
            <h1>Create New event</h1>
            Event name: <input className='input-field' type= "text" placeholder='program name' value = {eventName} onChange={(e) => seteventName(e.target.value)}/><br></br>
            Program date<input className='input-field' type= "text" placeholder='program date' value = {eventDate} onChange={(e) => seteventDate(e.target.value)}/><br></br>
            Ticket price<input className='input-field' type= "text" placeholder='ticket price' value = {ticketPrice} onChange={(e) => setticketPrice(e.target.value)}/><br></br>
            Total number of tickets<input className='input-field' type= "text" placeholder='total number of tickets' value = {totalTickets} onChange={(e) => settotalTickets(e.target.value)}/><br></br>


            <button className='action-button' onClick={() => owner === Account? createNewEvent(eventName,eventDate,ticketPrice,totalTickets):alert( "not authorized")}>Create</button>
        </div>
    );
}

export default CreateEvent;
