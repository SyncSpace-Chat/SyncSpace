import React from 'react'
import ChatWindow from './ChatWindow.jsx';
import { useState, useEffect } from 'react';

export default function LBar() {

    const [channels, setChannels] = useState(["General","Random"]); //the channels that exist in db
    const [currentChannel, setCurrentChannel] = useState("General"); //the current channel

    // Giles Steiner
    //
    // Purpose: When the lbar initial renders (only ran once), the channels that exist in 
    // the database are fetched and rendered on the screen 
    // useEffect(() => {
    //     async function getChannels() {
    //         await fetch('./db/getChannels')
    //         // .then(data => data.json())
    //         .then(data => {
    //             //TODO - once response returned with arr of channels from server set Channels state

    //         })
    //         .catch(err => { console.error(err) });
    //     }
    //     getChannels();
    // }, [])



    // Giles Steiner
    //
    // When user clicks to change channel the currentChannel state is changed
    // and adds them to res.locals.messages
    function changeChannelHandler(newChannelName){
        setCurrentChannel(newChannelName);
    }

    // Giles Steiner
    //
    // channels.map is iterating through channels array and rendering a button for each channel 
    // onclick invokes click handler function which changes currentChannel state
    // TODO - change to something more aesthetic later
    //
    // Chat window is rendered as a child component and the current channel is passed down
    // as a prop
    return (
        <div className="chatPage">
            <ChatWindow currentChannel={currentChannel}/>
            <div id="channelList">
                    {channels.map((channel) => <button className="channelButton" onClick={()=>changeChannelHandler(channel)}>{channel}</button>)}
            </div>
        </div>
    )
}
