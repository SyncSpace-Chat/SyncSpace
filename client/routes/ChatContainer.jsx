import React, { useEffect } from "react";
import Header from "../components/Header.jsx";
import LBar from "../components/LBar.jsx";
import ChatWindow from "../components/ChatWindow";
import { isLoggedInStore, userCredentialsStore } from "../store.js";
import { useNavigate } from "react-router-dom";

export default function ChatContainer() {
  const { username } = userCredentialsStore();
  const { isLoggedIn } = isLoggedInStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <div className="chatPage">
      <Header />
      <div className="midContainer">
        <LBar />
        <ChatWindow />
      </div>
    </div>
  );
}
