const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const channelController = require('../controllers/channelController');
const bcrypt = require('bcryptjs');
const { javascript } = require('webpack');

// Express json preparations

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

// Gets messages and returns a json array of objects, each containing messages.  
// TODO Add usernames to the messages pulled from the messages  -M
router.post('/getMessages', channelController.getMessages, (req, res) => {
    console.log(res.locals.messages);
    res.status(200).json(res.locals.messages);
}) 

router.post('/sendMessage', channelController.sendMessage, (req, res) => {
    console.log('Sending messages');
    res.sendStatus(200);
})


module.exports = router;