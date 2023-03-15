import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import WebSocketProvider from './webSocketProvider';

render(
    <BrowserRouter>
        <WebSocketProvider>
            <App />
        </WebSocketProvider>
    </BrowserRouter>
    , document.getElementById('root')
);
