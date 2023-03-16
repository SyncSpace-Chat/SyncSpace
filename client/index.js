import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WebSocketProvider from './webSocketProvider';
import App from "./App.jsx";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <WebSocketProvider>
            <App />
        </WebSocketProvider>
    </BrowserRouter>
);
