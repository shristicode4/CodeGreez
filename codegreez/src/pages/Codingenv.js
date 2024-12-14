import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import * as cocossd from "@tensorflow-models/coco-ssd";
//import CountDown from "./CountDown";
import Client from "../components/Clients";
import Editor from "../components/Editor";
import { useLocation } from "react-router-dom";

const Codingenv = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  const [faceModel, setFaceModel] = useState(null);
  const [objectModel, setObjectModel] = useState(null);
  const [warning, setWarning] = useState(false);
  const [clients, setClients] = useState([
    { socketId: 1, username: "Shristi" },
    { socketId: 2, username: "Kashis" },
  ]);

  // Load BlazeFace and COCO-SSD models
  useEffect(() => {
    const loadModels = async () => {
      const loadedFaceModel = await blazeface.load();
      const loadedObjectModel = await cocossd.load();
      setFaceModel(loadedFaceModel);
      setObjectModel(loadedObjectModel);
    };
    tf.ready().then(() => {
      loadModels();
    });
  }, []);

  // Draw oval for proctoring
  const drawOval = (ctx, centerX, centerY, width, height) => {
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Check if face is within oval
  const isWithinOval = (face, ovalBounds) => {
    const [x, y, width, height] = face;
    const [ovalX, ovalY, ovalWidth, ovalHeight] = ovalBounds;
    const faceCenterX = x + width / 2;
    const faceCenterY = y + height / 2;

    const dx = faceCenterX - ovalX;
    const dy = faceCenterY - ovalY;
    const distance = Math.sqrt(
      (dx * dx) / (ovalWidth * ovalWidth) +
        (dy * dy) / (ovalHeight * ovalHeight)
    );

    return distance <= 1;
  };

  // Process video stream for proctoring
  useEffect(() => {
    const processVideo = async () => {
      if (faceModel && objectModel && webcamRef.current && canvasRef.current) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, videoWidth, videoHeight);

        // Draw oval
        // Draw oval
        const ovalX = videoWidth / 2;
        const ovalY = videoHeight / 2;
        const ovalWidth = 240; // Constant width
        const ovalHeight = 160; // Constant height
        drawOval(ctx, ovalX, ovalY, ovalWidth, ovalHeight);

        // Detect faces
        const facePredictions = await faceModel.estimateFaces(video, false);
        let userInFrame = false;
        for (const prediction of facePredictions) {
          const start = prediction.topLeft;
          const end = prediction.bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];

          if (
            isWithinOval(
              [start[0], start[1], size[0], size[1]],
              [ovalX, ovalY, ovalWidth / 2, ovalHeight / 2]
            )
          ) {
            userInFrame = true;
            break;
          }
        }

        // Detect objects
        const objectPredictions = await objectModel.detect(video);
        console.log("Detected objects:", objectPredictions);

        setWarning(!userInFrame);
      }
      requestAnimationFrame(processVideo);
    };

    processVideo();
  }, [faceModel, objectModel]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoimage" src="/cglogo.jpg" alt="logo" />
          </div>
          <h3> Connected </h3>
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

      <div
        className="proctoring-container"
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        <div
          className="webcam-container"
          style={{ position: "relative", width: "320px", height: "240px" }}
        >
          <Webcam
            ref={webcamRef}
            className="webcam"
            style={{ width: "100%", height: "100%", border: "2px solid black" }}
          />
          <canvas
            ref={canvasRef}
            className="canvas"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        {warning && (
          <div
            className="error-message"
            style={{
              position: "absolute",
              bottom: "-50px",
              left: 0,
              width: "320px",
              background: "white",
              border: "1px solid red",
              padding: "8px",
              borderRadius: "4px",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            <h4 style={{ color: "red", margin: 0 }}>
              Please stay in the frame!
            </h4>
            <p style={{ color: "black", margin: 0 }}>
              Stabilize your head to remove error.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Codingenv;
