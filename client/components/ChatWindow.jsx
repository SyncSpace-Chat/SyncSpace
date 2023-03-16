import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble.jsx";
import Cookies from "js-cookie";
import { channelStore } from "../store.js";

export default function ChatWindow(props) {
  const { currentChannel } = channelStore();
  //Giles Steiner
  //
  //Chat window state
  const [message, setMessage] = useState("");
  // const { currentChannel } = props;
  const [chats, setChats] = useState([]);
  const messageBoxRef = useRef(null);

  //Giles Steiner
  //
  //Keeps the message state updated onChange
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  //Giles Steiner
  //
  //When the user send a message send a post request to /db/sendMessage route
  //route is caught in db_server
  const handleSubmit = async () => {
    await fetch("./db/sendMessage", {
      method: "POST",
      body: JSON.stringify({ message: message, channel: currentChannel }),
      headers: { "Content-Type": "application/json" },
    });
    let stuff = document.getElementById("inputMessage");
    stuff.value = "";
    const audio = new Audio("db/static/iphone_woosh.mp3");
    audio.play();
  };

  const handleUnsubscribe = async () => {
    await fetch("./db/unsubscribe", {
      method: "POST",
      body: JSON.stringify({ channel: currentChannel }),
      headers: { "Content-Type": "application/json" },
    });
  };

  //Giles Steiner
  //
  // Every 500 seconds a fetch request is done to db/getMessages to get all the current messages in
  // the channel the user is currently in. The chats state is concurrently updated
  useEffect(() => {
    const intervalId = setInterval(() => {
      async function getMessages() {
        if (currentChannel != "") {
          await fetch("./db/getMessages", {
            method: "POST",
            body: JSON.stringify({ channel: currentChannel }),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              setChats(data);
            })
            .catch((error) => {
              console.error("Error in :", error);
            });
        }
      }
      getMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentChannel]);

  //JUNAID
  //COMMENTED OUT SO THAT IT DOESNT SCROLL THE WINDOW DOWN EVERYTIME
  // useEffect(() => {
  //   if (messageBoxRef.current) {
  //     messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [chats]);

  const messageCache = {};
  const chatBubbles = [];
  chats.forEach((bubble, index) => {
    if (messageCache[bubble._id]) {
    } else {
      messageCache[bubble._id] = true;
      chatBubbles.push(
        <ChatBubble
          key={index}
          message={bubble.message}
          username={bubble.username}
          id={Cookies.get("user")}
        />
      );
    }
  });

  return (
    <div className="chatWindow">
      <div id="chatHeader">
        <p id="channelNameHeader">{currentChannel}</p>
        <button
          type="button"
          className="unsubscribe"
          onClick={handleUnsubscribe}
        >
          Unsubscribe
        </button>
      </div>
      <div id="chatMessages">
        {chatBubbles}
        <div ref={messageBoxRef}></div>
      </div>
      <div className="submitChats">
        <div id="messageForm">
          <input type="text" id="inputMessage" onChange={handleMessage} />
        </div>
        <div id="messageSubmit">
          <button type="button" className="sendButton" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
