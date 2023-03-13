import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble.jsx';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

export default function ChatWindow(props) {

  const [message, setMessage] = useState('');
  const { currentChannel } = props;
  const [chats, setChats] = useState([]);
  const messageBoxRef = useRef(null);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    await fetch('./db/sendMessage', {
      method: 'POST',
      body: JSON.stringify({ message: message, channel: currentChannel }),
      headers: { 'Content-Type': 'application/json' },
    });
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      async function getMessages() {
        if (currentChannel != "") {
          await fetch('./db/getMessages', {
            method: 'POST',
            body: JSON.stringify({ channel: currentChannel }),
            headers: { 'Content-Type': 'application/json' }
          })
            .then((response) => response.json())
            .then((data) => {
              setChats(data);
            })
            .catch((error) => {
              console.error('Error in grabbing chats from channel:', error);
            });
        }
      }
      getMessages();
    }, 500);

    return () => clearInterval(intervalId);
  }, [currentChannel]);


  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const messageCache = {};
  const chatBubbles = [];
  chats.forEach((bubble) => {
    if (messageCache[bubble._id]) {

    } else {
      messageCache[bubble._id] = true;
      chatBubbles.push(
        <ChatBubble message={bubble.message} username={bubble.username} id={Cookies.get('user')}/>
      );
    }
  });


  return (
    <div className='chatWindow'>
      <div className='messageBox'>
        {chatBubbles}
        <div ref={messageBoxRef}></div>
      </div>
      <div className='submitBox'>
        <form className='messageForm'>
          <p className='inputHeader'>Send New Message:</p>
          <div className='textBox'>
            <input type='text' id='inputMessage' onChange={handleMessage} />
          </div>
          <button type='button' className='sendButton' onClick={handleSubmit}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
