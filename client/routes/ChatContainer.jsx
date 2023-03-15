import React, { useState, useEffect } from "react";

import Header from "../components/Header.jsx";
import LBar from "../components/LBar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ChatBubble from "../components/ChatBubble.jsx";

export default function ChatContainer() {
  return (
    <div>
      <LBar />
      <div>
        <Header />
        {/* <ChatWindow /> */}
      </div>
    </div>
  )
}