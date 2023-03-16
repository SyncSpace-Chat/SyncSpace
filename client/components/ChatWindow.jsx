import React, { useState, useEffect, useRef, useContext } from 'react';
import ChatBubble from './ChatBubble.jsx';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { WsContext } from '../webSocketProvider.jsx';

export default function ChatWindow(props) {

  // const wsRef = new WebSocket('ws://localhost:8082')
  //Giles Steiner
  //
  //Chat window state
  const [message, setMessage] = useState('');
  const { currentChannel } = props;
  const [chats, setChats] = useState([]);
  const messageBoxRef = useRef(null);
  const webSocket = useContext(WsContext);
  const testRef = useRef(webSocket);
  const [ws, setWs] = useState(webSocket);

  // const [ws, setWs] = useState(new WebSocket("ws://localhost:8082"))
  // useEffect(() => {
    webSocket.onmessage = ({ data }) => {
      const parsed = JSON.parse(data)
      if (parsed.messages) {
        const newMessage = parsed.messages[parsed.messages.length - 1]
        console.log(parsed.messages[parsed.messages.length - 1])
        const newChats = [...chats];
        newChats.push({ message: newMessage.message, username: newMessage.username })
        setChats(newChats)
    }
      console.log('server sent this')
    }
  // }, [chats])


  useEffect(() => {
    // if (!ws && webSocket) {
    //   setWs(webSocket);
    // }
    console.log('mount', testRef.current, webSocket)
    setWs(webSocket)

    if (webSocket) {
      // setWs(ws)
      webSocket.onopen = function(e) {
        console.log('connection established')
      }
      //   console.log('clicked2')
      //   ws.addEventListener("open", (e) => {
      //     ws.send('message'.toString())
      //   })
    }

  }, [])

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
  const handleSubmit = async (e) => {
    // await fetch('./db/sendMessage', {
    //   method: 'POST',
    //   body: JSON.stringify({ message: message, channel: currentChannel }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    const user = document.cookie.split('; ').find(e => e.startsWith("user="))?.split("=")[1]
    webSocket.send(JSON.stringify({ message, currentChannel, user }))
    setMessage('');
    let stuff = document.getElementById('inputMessage');
    stuff.value = '';
    const audio = new Audio("db/static/iphone_woosh.mp3");
    audio.play();
  };

  const handleUnsubscribe = async () => {
    await fetch('./db/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ channel: currentChannel }),
      headers: { 'Content-Type': 'application/json' },
    });
  }


  //Giles Steiner 
  //
  // Every 500 seconds a fetch request is done to db/getMessages to get all the current messages in 
  // the channel the user is currently in. The chats state is concurrently updated
  useEffect(() => {
    // const intervalId = setInterval(() => {
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
    // }, 500);

    return () => clearInterval(intervalId);
  }, [currentChannel]);


  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log("chat's changed")
  }, [chats]);

  const messageCache = {};
  const chatBubbles = [];
  chats.forEach((bubble) => {
    chatBubbles.push(
      <ChatBubble message={bubble.message} username={bubble.username} id={Cookies.get('user')} />
    );
  });
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    console.log('click', testRef, webSocket, ws)
    if (webSocket instanceof WebSocket) {
      console.log('click2', webSocket)
      webSocket.addEventListener('message', (e) => {
        console.log(e.data)
      })
    }
  }, [flag])

  return (
    <div className='chatWindow'>
      <div className='topWindow'>
        <p id='channelNameHeader'>{currentChannel}</p>
        <button type='button' className='unsubscribe' onClick={handleUnsubscribe}>Unsubscribe</button>
      </div>
      <button onClick={() => { setFlag(state => !state) }}>click</button>
      <div className='messageBox'>
        {chatBubbles}
        <div ref={messageBoxRef}></div>
      </div>
      <div className='submitBox'>
        <div className='messageForm'>
          <p className='inputHeader'>Send New Message:</p>
          <div className='textBox'>
            <input type='text' id='inputMessage' onChange={handleMessage} />
          </div>
          <button type='button' className='sendButton' onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
