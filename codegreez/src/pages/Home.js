import React from "react";
import { v4 as uuidV4 } from "uuid";

const Home = () => {
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    console.log(id);
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
          <input type="text" className="inputBox" placeholder="ROOM ID" />
          <input type="text" className="inputBox" placeholder="USERNAME" />
          <button className="btn joinBtn">Join</button>
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
