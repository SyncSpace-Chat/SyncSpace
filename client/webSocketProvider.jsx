import { useEffect, useState } from "react";
import { createContext } from "react"
// const wsRef = new WebSocket('ws://localhost:8082')
export const WsContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(WsContext);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8082');
    // const ws = ws; 
    // const ws  = 'test'
    ws.onopen = function(e) {
        console.log('connection established')
        ws.send('test from client')
    }

    setSocket(ws);

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <WsContext.Provider value={socket}>{children}</WsContext.Provider>
  );
};

export default WebSocketProvider;
