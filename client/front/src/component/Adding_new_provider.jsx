import React,{ useState,useEffect, use, useContext } from 'react'
import {AuthContext} from '../store/Auth'


const Add_new_provider = () => {
    const [providerAddress,setproviderAddress]=useState("")
    const {abc}=useContext(AuthContext)

    return (
        <div className="login-container">
            <input className='input-field' type= "text" placeholder='Provider Address' value = {providerAddress} onChange={(e) => setproviderAddress(e.target.value)}/>
            <button className='action-button' onClick={() => abc(providerAddress)}>Authorize Provider</button>
        </div>
    );
}

export default Add_new_provider;
