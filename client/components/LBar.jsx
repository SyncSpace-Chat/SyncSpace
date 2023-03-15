import React from "react";
import ChatWindow from "./ChatWindow.jsx";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function LBar() {
    // Tim Muller
    //
    // State thing is added so that the channel can be updated
    const [newChannel, setChannel] = useState("");

    // WE NEED TO USE THE SERVER TO MAKE THIS SO IT UPDATES AUTOMATICALLY!!!!!
    const [channels, setChannels] = useState([]); //the channels that exist in db
    const [userChannels, setUserChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState("General"); //the current channel
    //==========dark mode===========
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        if (theme === "light") {
            document.body.style.background = "#222222";
            setTheme("dark");
        } else {
            document.body.style.background = "#0093e9";
            setTheme("light");
        }
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    //==========dark mode===========

    // Giles Steiner
    //
    // Purpose: pulls the list of channels that exist in the database
    // and only show the ones that match with the users cookie preference
    useEffect(() => {
        const intervalId = setInterval(() => {
            async function getChannels() {
                await fetch("./db/getChannels", {
                    headers: { "Content-Type": "application/json" },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setChannels(data);
                        const userChannels = data.filter((el) =>
                            Cookies.get("subscribedChannels").includes(el)
                        );
                        setUserChannels(userChannels);
                    })
                    .catch((error) => {
                        console.error("Error in grabbing chats from channel:", error);
                    });
            }
            getChannels();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // Tim Muller
    //
    // Whenever a string or anything is typed into the add channel box the channel name to be added is updated immediately
    const handleChannelName = (e) => {
        setChannel(e.target.value);
    };

    // Tim Muller
    //
    // When user clicks on the add channel button they will be directed to make a new channel which will then be shown on the screen and
    // Be able to be clicked. This will then call the server which will create a new channel in the database and add whichever user made
    // the channel
    const addChannel = async () => {
        console.log("hello!!!!");
        await fetch("./db/newChannel", {
            method: "POST",
            body: JSON.stringify({ channel: newChannel }),
            headers: { "Content-Type": "application/json" },
        });
    };

    //when users pressed log out button the cookie is cleared and window redirected to login
    function logOut() {
        Cookies.remove("user");
        Cookies.remove("ownedChannels");
        Cookies.remove("subscribedChannels");
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
    // When user clicks a new message from the drop down menu a PUT request is done to
    // db/subscribe subscribing the user to that channel and updating the cookie preference
    async function browseChannelClick() {
        // console.log("clicked: ", document.getElementById('browseChannelName').value);
        console.log("subscribing to new channel");
        await fetch("./db/subscribe", {
            method: "PUT",
            body: JSON.stringify({
                channel: document.getElementById("browseChannelName").value,
            }),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error in grabbing chats from channel:", error);
            });
    }

    // Giles Steiner
    //
    // channels.map is iterating through entire channels state and if an element is not already
    // in the users cookie preferences it is displayed on a dropdown menu as a new channel for the
    // user to subscrbie to

    // userChannels.map is iterating through userChannels state and rendering a button for each channel
    // in the users cookie prefences
    // onclick invokes click handler function which changes currentChannel state
    //
    // Chat window is rendered as a child component and the current channel is passed down
    // as a prop
    return (
        <>
            <div className="chatPage">

                <form id="browseChannels">
                    <h7>Subscribe to: </h7>
                    <select id="browseChannelName">
                        {channels.map((channel) => {
                            if (!Cookies.get("subscribedChannels").includes(channel)) {
                                return <option value={channel}>{channel}</option>;
                            }
                        })}
                    </select>
                    <button type="button" className="sendButton" onClick={browseChannelClick}>Subscribe</button>
                </form>

                <ChatWindow currentChannel={currentChannel} />

                <section id="channelList">
                    {userChannels.map((channel) => (
                        <motion.button
                            animate={{ x: 0, scale: 1 }}
                            initial={{ scale: 0 }}
                            transition={{ type: "tween", duration: 0.5 }}
                            whileHover={{ scale: 1.25 }}
                            className="channelButton"
                            onClick={() => changeChannelHandler(channel)}
                        >
                            {channel}
                        </motion.button>
                    ))}
                </section>
                
                <section className="addChannelBox">
                    <h7>Add a new channel!</h7>
                    <form className="channelForm">
                        <div className="channelNameBox">
                            <input type="text" id="inputChannel" onChange={handleChannelName}/>
                        </div>
                        <button id="addChannelButton" type="button" className="addChannelButton" onClick={addChannel}>Add New Channel</button>
                    </form>
                </section>

            </div>
            {/* removed logout and darkmode buttons formerly here */}
        </>
    );
}
