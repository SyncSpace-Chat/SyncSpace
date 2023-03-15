import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { currentChannelStore } from "../store.js";

export default function LBar() {
  const { setCurrentChannel } = currentChannelStore();
  // const setCurrentChannelz = currentChannelStore((state) => state.setCurrentChannel)
  // Tim Muller
  //
  // State thing is added so that the channel can be updated
  const [newChannel, setChannel] = useState("");

  // WE NEED TO USE THE SERVER TO MAKE THIS SO IT UPDATES AUTOMATICALLY!!!!!
  const [channels, setChannels] = useState([]); //the channels that exist in db
  const [userChannels, setUserChannels] = useState([]);

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

  const delChannel = async () => {
    console.log("DELETE CHANNEL FETCH");
    await fetch("./db/deleteChannel", {
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
        <div className="channelSideBar">
          <div id="browseChannels">
            Browse Channels<br></br>
            {/* add onClick to the select drop-down menu below which will fetch query the server, rather than setTimeout every few seconds */}
            <select id="browseChannelName">
              {channels.map((channel, index) => {
                if (!Cookies.get("subscribedChannels").includes(channel)) {
                  return (
                    <option key={index + 100} value={channel}>
                      {channel}
                    </option>
                  );
                }
              })}
            </select>
            <button
              type="button"
              className="sendButton"
              onClick={browseChannelClick}
            >
              Subscribe
            </button>
          </div>

          <div id="channelList">
            {userChannels.map((channel, index) => (
              <div
                className="channelButton"
                key={index}
                onClick={() => changeChannelHandler(channel)}
              >
                <strong># </strong>
                {channel.toLowerCase()}
              </div>
            ))}
          </div>

          <div id="addChannel">
            <section className="addChannelBox">
              <h2>Add a new channel!</h2>
              <form className="channelForm">
                <div className="channelNameBox">
                  <input
                    type="text"
                    id="inputChannel"
                    onChange={handleChannelName}
                  />
                </div>
                <button
                  id="addChannelButton"
                  type="button"
                  className="addChannelButton"
                  onClick={addChannel}
                >
                  Add New Channel
                </button>
              </form>
            </section>
          </div>
          <div className="delChannelBox">
            <div>Delete a channel!</div>
            <form className="channelForm">
              <div className="channelNameBox">
                <input
                  type="text"
                  id="inputChannelDel"
                  onChange={handleChannelName}
                />
              </div>
              <button
                id="delChannelButton"
                type="button"
                className="delChannelButton"
                onClick={delChannel}
              >
                Delete Channel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
