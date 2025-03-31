import React,{ useState,useEffect, use } from 'react'


const Adding_new_provider = ({AP }) => {
    const [providerAddress,setproviderAddress]=useState("")

    return (
        <div className="login-container">
            <input className='input-field' type= "text" placeholder='Provider Address' value = {providerAddress} onChange={(e) => setproviderAddress(e.target.value)}/>
            <button className='action-button' onClick={() => AP(providerAddress)}>Authorize Provider</button>
        </div>
    );
}

export default Adding_new_provider;
