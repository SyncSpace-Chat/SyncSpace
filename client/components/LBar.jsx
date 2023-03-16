import React from "react";
import { useEffect, useRef } from "react";
import { channelStore, userCredentialsStore } from "../store.js";

export default function LBar() {
  //JUNAID
  //all hooks removed from this component
  const {
    setCurrentChannel,
    setUserChannels,
    setChannels,
    channels,
    userChannels,
    newChannel,
    setNewChannel,
  } = channelStore();
  const { username } = userCredentialsStore();

  const addChannelText = useRef();
  const delChannelText = useRef();
  // Giles Steiner
  //
  // Purpose: pulls the list of channels that exist in the database
  // and only show the ones that match with the users cookie preference
  useEffect(() => {
    // const intervalId = setInterval(async () => {
    // async function getChannels() {
    fetch("./db/getChannels", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setChannels(data[0]);
        setUserChannels(data[1]);
      })
      .catch((error) => {
        console.error("Error in grabbing chats from channel lbar:", error);
      });
    // }
    // getChannels();
    // }, 5000);
    // return () => clearInterval(intervalId);
  }, []);

  // Tim Muller
  //
  // When user clicks on the add channel button they will be directed to make a new channel which will then be shown on the screen and
  // Be able to be clicked. This will then call the server which will create a new channel in the database and add whichever user made
  // the channel
  const addChannel = () => {
    console.log("adding new channel:", newChannel);
    const reqBody = {
      channel: newChannel,
      username,
    };
    if (newChannel.length) {
      fetch("./db/newChannel", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("added:", newChannel);
        channels.push(newChannel);
        userChannels.push(newChannel);
        setNewChannel("");
        setUserChannels(userChannels);
        setChannels(channels);
        addChannelText.current.value = "";
      });
    } else {
      alert("invalid input");
      return;
    }
  };

  const delChannel = async () => {
    console.log("DELETE CHANNEL FETCH");
    await fetch("./db/deleteChannel", {
      method: "POST",
      body: JSON.stringify({ channel: newChannel, username }),
      headers: { "Content-Type": "application/json" },
    });
    const newChannels = channels.filter((channel) => {
      return channel !== newChannel;
    });
    const newUserChannels = userChannels.filter((channel) => {
      return channel !== newChannel;
    });
    setUserChannels(newUserChannels);
    setChannels(newChannels);
    delChannelText.current.value = "";
  };

  // Giles Steiner
  //
  // When user clicks to change channel the currentChannel state is changed
  // and adds them to res.locals.messages
  function changeChannelHandler(newChannelName) {
    console.log("in here");
    setCurrentChannel(newChannelName);
  }

  // Giles Steiner
  //
  // When user clicks a new message from the drop down menu a PUT request is done to
  // db/subscribe subscribing the user to that channel and updating the cookie preference
  async function browseChannelClick() {
    console.log("subscribing to new channel: ", newChannel);
    await fetch("./db/subscribe", {
      method: "PUT",
      body: JSON.stringify({
        channel: newChannel,
        username,
      }),
      headers: { "Content-Type": "application/json" },
    });
    userChannels.push(newChannel);
    setUserChannels(userChannels);
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
    <div>
      <div className="channelSideBar">
        <div id="browseChannels">
          Browse Channels<br></br>
          {/* add onClick to the select drop-down menu below which will fetch query the server, rather than setTimeout every few seconds */}
          <select
            onChange={(e) => setNewChannel(e.target.value)}
            id="browseChannelName"
          >
            {channels.map((channel, index) => {
              if (!userChannels.includes(channel)) {
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
            Add a new channel
            <form className="channelForm">
              <div className="channelNameBox">
                <input
                  type="text"
                  id="inputChannel"
                  onChange={(e) => setNewChannel(e.target.value)}
                  ref={addChannelText}
                />
              </div>
              <button
                id="addChannelButton"
                type="button"
                className="addChannelButton"
                onClick={addChannel}
              >
                Add
              </button>
            </form>
          </section>
        </div>
        <div id="delChannelBox">
          <div>Delete a channel</div>
          <form className="channelForm">
            <div className="channelNameBox">
              <input
                type="text"
                id="inputChannelDel"
                onChange={(e) => setNewChannel(e.target.value)}
                ref={delChannelText}
              />
            </div>
            <button id="delChannelButton" type="button" onClick={delChannel}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
