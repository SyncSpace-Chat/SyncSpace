const express = require('express');
const router = express.Router();

//test that server is set up correctly GS
router.get('/*', (req, res) => {
    console.log("in the server now")
    res.status(200).json("You reached server");
});

module.exports = router;