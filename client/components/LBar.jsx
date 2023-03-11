import React from 'react'
import ChatWindow from './ChatWindow.jsx';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function LBar() {
    // Tim Muller
    //
    // State thing is added so that the channel can be updated
    const [channel, setChannel] = useState('');

    // WE NEED TO USE THE SERVER TO MAKE THIS SO IT UPDATES AUTOMATICALLY!!!!!
    const [channels, setChannels] = useState(["General", "Random"]); //the channels that exist in db


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


    // Tim Muller
    //
    // Whenever a string or anything is typed into the add channel box the channel name to be added is updated immediately
    const handleChannelName = (e) => {
        setChannel(e.target.value);
    }
    // Tim Muller
    //
    // When user clicks on the add channel button they will be directed to make a new channel which will then be shown on the screen and
    // Be able to be clicked. This will then call the server which will create a new channel in the database and add whichever user made
    // the channel
    async function addChannel() {
        console.log('hello!!!!');
        // await fetch('./db/addChannel', {
        //     method: 'POST',
        //     body: JSON.stringify({ channelName: channel }),
        //     headers: { 'Content-Type': 'application/json' },
        // });
    };

    //when users pressed log out button the cookie is cleared and window redirected to login
    function logOut() {
        Cookies.remove('user');
        window.location.href = "/login";
    }

    // Giles Steiner
    //
    // When user clicks to change channel the currentChannel state is changed
    // and adds them to res.locals.messages
    function changeChannelHandler(newChannelName) {
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
        <>
            <div className="chatPage">
                <ChatWindow currentChannel={currentChannel} />
                <div id="channelList">
                    {channels.map((channel) => <button className="channelButton" onClick={() => changeChannelHandler(channel)}>{channel}</button>)}
                    <div className='addChannelBox'>
                        <div>Add a new channel!</div>
                        <form className='channelForm'>
                            <div className='channelNameBox'>
                                <input type='text' id='inputChannel' onChange={handleChannelName} />
                            </div>
                            <button type='button' className='addChannelButton' onClick={addChannel}>
                                Add New Channel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <button className="btn btn-secondary logoutButton" type='button' onClick={logOut}> Logout </button>
        </>
    )
}
