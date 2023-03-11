const Channel = require('../models/channelModel');

const channelController = {};

// Giles Steiner
//
// Input: 
// req.body.channel contains the channel name 
//
// Purpose: Pulls an array of messages corrosponding to a specific channel  
// and adds them to res.locals.messages
//
// Output: null
channelController.getMessages = async (req, res, next) => {
    const channel = req.body.channel;
    const channelCollectionArr = await Channel.find({ channelName: channel })[0];
    res.locals.messages = channelCollectionArr.messages;
    return next();
}

// Giles Steiner
//
// Input: 
// req.body.message contains the message content 
// req.body.channel contains the channel name 
// req.cookies.user contains the username of who is sending the message
//
// Purpose: Adds a new message to the collection corrosponding to a specific channel 
//
// Output: null
channelController.sendMessage = async (req, res, next) => {
    const channel = req.body.channel;
    const message = req.body.message;
    const username = req.cookies.user;
    const channelCollectionArr = await Channel.find({ channelName: channel })[0];
    const messageArr = channelCollectionArr.messages;
    messageArr.push({
        message: message,
        username: username
    });

    //update channel collection
    await Channel.findOneAndUpdate({ channelName: channel },
        { messages: messageArr });
    return next();
}

module.exports = channelController;