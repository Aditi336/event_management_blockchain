import React,{ useState } from 'react'


const Adding_new_provider = ({createNewEvent }) => {
    const [eventName,seteventName]=useState("")
    const [eventDate,seteventDate]=useState("")
    const[ticketPrice,setticketPrice]=useState(0)
    const [totalTickets,settotalTickets]=useState(0)

    return (
        <div className="login-container">
            <h1>Create New event</h1>
            Event name: <input className='input-field' type= "text" placeholder='program name' value = {eventName} onChange={(e) => seteventName(e.target.value)}/><br></br>
            Program date<input className='input-field' type= "text" placeholder='program date' value = {eventDate} onChange={(e) => seteventDate(e.target.value)}/><br></br>
            Ticket price<input className='input-field' type= "text" placeholder='ticket price' value = {ticketPrice} onChange={(e) => setticketPrice(e.target.value)}/><br></br>
            Total number of tickets<input className='input-field' type= "text" placeholder='total number of tickets' value = {totalTickets} onChange={(e) => settotalTickets(e.target.value)}/><br></br>


            <button className='action-button' onClick={() => createNewEvent(eventName,eventDate,ticketPrice,totalTickets)}>Create</button>
        </div>
    );
}

export default Adding_new_provider;
