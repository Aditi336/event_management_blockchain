import React,{ useState } from 'react'


const BuyEventTickets = ({createNewEvent }) => {
    const [participantName,setparticipantName]=useState("")
    const [ID,setID]=useState("")
    const[ticketPrice,setticketPrice]=useState(0)
    const [totalTickets,settotalTickets]=useState(0)

    return (
        <div className="login-container">
            <h1>Create New event</h1>
            Event name: <input className='input-field' type= "text" placeholder='program name' value = {participantName} onChange={(e) => setparticipantName(e.target.value)}/><br></br>
            Program date<input className='input-field' type= "text" placeholder='program date' value = {ID} onChange={(e) => setID(e.target.value)}/><br></br>
            Ticket price<input className='input-field' type= "text" placeholder='ticket price' value = {ticketPrice} onChange={(e) => setticketPrice(e.target.value)}/><br></br>
            Total number of tickets<input className='input-field' type= "text" placeholder='total number of tickets' value = {totalTickets} onChange={(e) => settotalTickets(e.target.value)}/><br></br>


            <button className='action-button' onClick={() => createNewEvent(participantName,ID,ticketPrice,totalTickets)}>Create</button>
        </div>
    );
}

export default BuyEventTickets;
