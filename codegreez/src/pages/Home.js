import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room for you");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID & username is required");
      return;
    }

    //redirect
    navigate(`/coding/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    // console.log("event", e.code);
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="Homelogo"
          src="/cglogo.jpg"
          alt="codegreez-logo"
          //style={{ width: "200px", height: "auto" }}
        />
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="RoomId"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="UserName"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <button onClick={createNewRoom} href="" className="createNewBtn">
              new room
            </button>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          {" "}
          Feel free to connect with{" "}
          <a href="https://www.linkedin.com/in/shristika-adhikari-9731ba235">
            Shristi
          </a>{" "}
          for any queries{" "}
        </h4>
      </footer>
    </div>
  );
};

export default Home;
