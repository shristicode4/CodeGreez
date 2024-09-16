import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Home from "./pages/Home";
import Codingenv from "./pages/Codingenv";
function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>

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
