import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import ChatContainer from "./routes/ChatContainer";
// import LBar from "./components/LBar.jsx";
import Basepage from "./routes/Basepage.jsx";
import "./stylesheets/styles.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Basepage />} />
        <Route path="/window" element={<ChatContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
