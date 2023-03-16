import React from "react";
import Header from "../components/Header.jsx";
import LBar from "../components/LBar.jsx";
import ChatWindow from "../components/ChatWindow";
import { isLoggedInStore, userCredentialsStore } from "../store.js";
import { Navigate } from "react-router-dom";

export default function ChatContainer() {
  const { username } = userCredentialsStore();
  const { isLoggedIn } = isLoggedInStore();

  return !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <div className="chatPage">
      <h2>hey {username}</h2>
      <Header />
      <div className="midContainer">
        <LBar />
        <ChatWindow />
      </div>
    </div>
  );
}
