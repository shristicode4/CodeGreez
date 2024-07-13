import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Codingenv from "./pages/Codingenv";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/coding/:roomId" element={<Codingenv />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
