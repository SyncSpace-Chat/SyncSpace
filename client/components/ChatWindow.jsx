import React from 'react';
import { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble.jsx';
import Cookies from 'js-cookie';

export default function ChatWindow(props) {

  const [message, setMessage] = useState('');
  const { currentChannel } = props;
  const [chats, setChats] = useState([]);

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


  //TODO - do we have to use a setInterval / AJAX timing
  useEffect(() => {
    async function getMessages() {
      if (currentChannel != "") { //make sure a channel is selected
        await fetch('./db/getMessages', {
          method: 'POST',
          body: JSON.stringify({ channel: currentChannel }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('prop drilled down for currentChannel', currentChannel);
            setChats(data);
          })
          .catch((error) => {
            console.error('Error in grabbing chats from channel:', error);
          });
        console.log("hello");
      }
    }
    getMessages();
  });

  const chatBubbles = [];
  console.log('Console log results from post thing', chats);
  console.log('type of thing chats is ', Array.isArray(chats));
  chats.forEach((bubble) => {
    chatBubbles.push(
      <ChatBubble message={bubble.message} username={bubble.username} />
    );
  });

  return (
    <div className='chatWindow'>
      <div className='messageBox'>
        {chatBubbles}
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
