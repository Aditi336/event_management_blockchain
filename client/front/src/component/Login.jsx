import React from "react";
import './Login.css';


const Login = ({ connectWallet, connectWalletConnect }) => {
    return (
        <main className="login-container fade-in">
            
            <h1 className="welcome-message">Welcome to Decentralized Voting Application</h1>
            <button className="login-button" onClick={connectWallet}>
                Login with MetaMask
            </button>
            <button className="walletconnect-button" onClick={connectWalletConnect}>
                Login with WalletConnect
            </button>
        </main>
    );
};

export default Login;
