const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const channelController = require('../controllers/channelController');

const { javascript } = require('webpack');
const { restart } = require('nodemon');

//router.post('/signup')
router.post('/signup', userController.createUser, (req, res) => {
    console.log('Signing process started');
    res.status(200).json('User created');
});

//do we want to redirect users to login after they register their account or just log them in automatically?  //- Log them in automatically ofc -M
//Would be slightly less coding to send them to the login page after account creation
router.post('/login', userController.verifyUser, (req, res) => {
    console.log('Verifying User');
    res.status(200).json('User verified');
});

/* CHANNEL ROUTES */

/* Gets messages and returns a json array of objects, each containing messages. - M */
router.post('/getMessages', channelController.getMessages, (req, res) => {
    res.status(200).json(res.locals.messages);
});

/* Sends messages, saves to DB, then returns the saved channel and message for monitoring/testing purposes - M */
router.post('/sendMessage', channelController.sendMessage, (req, res) => {
    console.log('Sending messages');
    res.sendStatus(200);
})

/* Returns an array of ALL of the channels, user verification happens on the frontend - M */
router.get('/getChannels', channelController.getChannels, (req, res) => {
    console.log('Retrieving channels');
    res.status(200).json(res.locals.channels);
});

/* Subscribes users to a channel: takes in username and channel in req.body - M */
router.put('/subscribe', userController.subscribe, (req, res) => {
    console.log('Subscribing to channel');
    res.sendStatus(200);
});

/* Creates a new channel and subscribes the owner to it - M */
router.post('/newChannel', channelController.channelCheck, channelController.createChannel, userController.subscribe, (req, res) => {
    console.log('Channel created');
    res.sendStatus(200);
});

/* Deletes a channel if the user is the channel's owner - M */ 
router.post('/deleteChannel', channelController.channelCheck, channelController.unsubscribeAll, channelController.deleteChannel, (req, res) => {
    console.log('Channel SLAIN'); 
    res.sendStatus(200);
});

router.post('/unsubscribe', channelController.channelCheck, userController.unsubscribe, (req, res) => {
    console.log('Unsubscribed!');
    res.sendStatus(200); 
})

module.exports = router;