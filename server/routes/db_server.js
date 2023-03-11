const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const channelController = require('../controllers/channelController');
const bcrypt = require('bcryptjs');

// Express json preparations
//test that server is set up correctly GS
router.get('/*', (req, res) => {
    console.log("in the server now")
    res.status(200).json("You reached server");
});

//router.post('/signup')
router.post('/signup', userController.createUser, (req, res) => {
    console.log('Signing process started');
    res.status(200).json('User created');
});
//do we want to redirect users to login after they register their account or just log them in automatically?  //- Log them in automatically ofc -M
//Would be slightly less coding to send them to the login page after account creation
router.post('/login', userController.verifyUser, (req, res) => {
    console.log('Verifying User');
    res.status(200).json('User verified')
});


module.exports = router;