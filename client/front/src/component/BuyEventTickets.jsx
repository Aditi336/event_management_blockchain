import React,{ useContext, useState } from 'react'
import { AuthContext } from '../store/Auth'
import { useLocation } from 'react-router-dom'
import './BuyEventTickets.css';
import { formatEther } from 'ethers';


const BuyEventTickets = () => {
    const [participantName,setparticipantName]=useState("")
    const [quantity,setquantity]=useState(0)
    const [total,settotal]=useState(0)
    const {events,createBuyer}=useContext(AuthContext)
    const location = useLocation();
    const { id } = location.state || {};

    const handleTotalAmount=async(price,q)=>{
      // const q1=BigInt(parseInt(q))  
      
      const totalAmount = Number(formatEther((price * 10n ** 18n).toString()))*(q); // simple JS multiplication
        settotal(totalAmount)
        console.log(price,"ssss")
    }
    const handleQuantityChange = (e, price) => {
        const q = e.target.value;
        setquantity(q);
        handleTotalAmount(price, q);
      };
      
    return (
        <div className="login-container">
  {
    events.filter(event=>event.id==id).map((event)=>(
       <div>
          <h1>Buy Tickets for-{event.name}</h1>

          Participant Name:<input className="input-field" type="text" placeholder="Participant Name" value={participantName} onChange={(e) => setparticipantName(e.target.value)} />
          Quantity:<input className="input-field" type="number" placeholder="Total Number of Tickets" value={quantity} onChange={(e) => handleQuantityChange(e, event.price)} />
          Amount:<input className="input-field" type="number" placeholder="Amount to pay" value={total} readOnly />
          <button className="action-button" onClick={() => createBuyer(participantName,quantity,total,id )}>
            Pay
          </button>
        </div>
    ))
  }

  
</div>

    );
}

export default BuyEventTickets;
