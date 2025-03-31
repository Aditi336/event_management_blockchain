import React from "react";


const Connected = (props) => {
    return (
        <div className="login-container">
            <h1 className="connected-header">you are connected to metamask</h1>
            <p className="connected-account">Metamask Account:{props.account}</p>
           <p className="connected-account">owner of contract :{props.isOwner}</p> 
        </div>
    );
}

export default Connected;
