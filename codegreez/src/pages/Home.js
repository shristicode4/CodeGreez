import React from "react";

const Home = () => {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          src="/cglogo.jpg"
          alt="codegreez-logo"
          style={{ width: "200px", height: "auto" }}
        />
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="ROOM ID" />
          <input type="text" className="inputBox" placeholder="USERNAME" />
          <button className="btn joinBtn">Join</button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a href="" className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          {" "}
          Built with love by{" "}
          <a href="https://www.linkedin.com/in/shristika-adhikari-9731ba235">
            Shristika
          </a>{" "}
        </h4>
      </footer>
    </div>
  );
};

export default Home;
