import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatBubble(props) {
  const { username, message, id } = props;
  const [bgColor, setBgColor] = useState("#D880B6"); //

  //Giles Steiner
  //
  //Make the user messages a different color than other messages
  useEffect(() => {
    if (id === username) {
      setBgColor("#80ABD8");
    }
  }, [username]);

  //PJ did some animation magic here
  return (
    <motion.div
      animate={{ x: 100, scale: 1 }}
      initial={{ scale: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div
        className="bubble"
      >
        <div
          className="user"
        >
          {username}
        </div>
        <div
          className="theMessage"
        >
          {message}
        </div>
      </div>
    </motion.div>
  );
}
