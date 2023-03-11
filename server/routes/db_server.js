const express = require('express');
const router = express.Router();

//test that server is set up correctly GS
router.get('/*', (req, res) => {
    console.log("in the server now")
    res.status(200).json("You reached server");
});

//router.post('/signup')
//do we want to redirect users to login after they register their account or just log them in automatically?
//Would be slightly less coding to send them to the login page after account creation

//router.get('/login')


module.exports = router;