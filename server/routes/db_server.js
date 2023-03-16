const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const channelController = require("../controllers/channelController");

//router.post('/signup')
router.post("/signup", userController.createUser, (req, res) => {
  if (res.locals.userCreated) {
    res.status(200).send("user created");
  } else {
    res.status(400).json("user creation failed");
  }
});

//do we want to redirect users to login after they register their account or just log them in automatically?  //- Log them in automatically ofc -M
//Would be slightly less coding to send them to the login page after account creation
router.post("/login", userController.verifyUser, (req, res) => {
  if (res.locals.foundUser) {
    res.status(200).send("user logged in");
  } else {
    res.status(400).json("login failed");
  }
});

/* CHANNEL ROUTES */

/* Gets messages and returns a json array of objects, each containing messages. - M */
router.post("/getMessages", channelController.getMessages, (req, res) => {
  res.status(200).json(res.locals.messages);
});

/* Sends messages, saves to DB, then returns the saved channel and message for monitoring/testing purposes - M */
router.post("/sendMessage", channelController.sendMessage, (req, res) => {
  console.log("Sending messages");
  res.sendStatus(200);
});

/* Returns an array of ALL of the channels- M */
router.get("/getChannels", channelController.getChannels, (req, res) => {
  console.log("Retrieving channels");
  res.status(200).json(res.locals.channels);
});

/* Subscribes users to a channel: takes in username and channel in req.body - M */
router.put("/subscribe", userController.subscribe, (req, res) => {
  console.log("Subscribing to channel");
  res.sendStatus(200);
});

/* Creates a new channel and subscribes the owner to it - M */
router.post(
  "/newChannel",
  channelController.channelCheck,
  channelController.createChannel,
  userController.subscribe,
  (req, res) => {
    console.log("Channel created");
    res.sendStatus(200);
  }
);

/* Deletes a channel if the user is the channel's owner - M */
router.post(
  "/deleteChannel",
  // channelController.consoleLog,
  channelController.channelCheck,
  channelController.unsubscribeAll,
  channelController.deleteChannel,
  (req, res) => {
    res.sendStatus(200);
  }
);
/* Unsubscribes from a channel - M */
router.post(
  "/unsubscribe",
  channelController.channelCheck,
  userController.unsubscribe,
  (req, res) => {
    console.log("Unsubscribed!");
    res.sendStatus(200);
  }
);
/* Returns an array of a users' owned channels - M */
router.get("/ownedChannels", userController.ownedChannels, (req, res) => {
  console.log("Returned user owned channels");
  res.status(200).json(res.locals.ownedChannels);
});

module.exports = router;
