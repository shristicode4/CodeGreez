import React, { useState } from "react";
import Client from "../components/Clients";
import Editor from "../components/Editor";

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
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn"> Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default Codingenv;
