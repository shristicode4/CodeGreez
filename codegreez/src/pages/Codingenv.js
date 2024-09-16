import React, { useState } from "react";
import Client from "../components/Clients";

const Codingenv = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Shristi" },
    { socketId: 2, username: "Kashis" },
  ]);
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoimage" src="/cglogo.jpg" alt="logo" />
          </div>
          <h3> connected </h3>
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
      </div>
      <div className="editorWrap"> Editor goes here</div>
    </div>
  );
};

export default Codingenv;
