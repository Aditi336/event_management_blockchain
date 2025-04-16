import React from "react";
import './Connected.css';
import { FaUserShield } from 'react-icons/fa';  // Owner icon
import { FaEthereum } from 'react-icons/fa';    // Ethereum icon

const Connected = (props) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">🦊 You are connected to MetaMask</h1>
            <p className="connected-account">
                <FaEthereum className="icon" /> <strong>Account:</strong> {props.account}
            </p>
            <p className="connected-account">
                <FaUserShield className="icon" /> <strong>Owner of contract:</strong> {props.isOwner==props.account ? 'Yes 👑' : 'No'}
            </p>
        </div>
    );
}

export default Connected;
