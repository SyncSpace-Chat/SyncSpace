const Channel = require('../models/channelModel');
const User = require('../models/userModel');

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
    const channelCollectionArr = await Channel.find({ channelName: channel });
    res.locals.messages = channelCollectionArr[0].messages;
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
    console.log(channel, message, username);
    const channelCollectionArr = await Channel.find({ channelName: channel });
    console.log(channelCollectionArr);
    const messageArr = channelCollectionArr[0].messages;
    messageArr.push({
        message: message,
        username: username
    });

    //update channel collection
    await Channel.findOneAndUpdate({ channelName: channel },
        { messages: messageArr });
    return next();
}
/* Retrieves an array of every channel - M*/

channelController.getChannels = async (req, res, next) => {
    let channelStringArr = [];
    const channelCollectionArr = await Channel.find({});
    channelStringArr = channelCollectionArr.map(el => el.channelName)
    res.locals.channels = channelStringArr;
    return next();
}

/* Creates a new channel: takes in {channel: "channelname", username: "username"}  - M */

channelController.createChannel = async (req, res, next) => {
    console.log('Creating channel');
    if (!req.body.username || !req.body.channel) return next();
    await Channel.create({ channelName: req.body.channel, owner: req.body.username, messages: [] });
    const user = await User.findOne({ username: req.body.username });
    const ownedChannels = user.ownedChannels;
    ownedChannels.push(req.body.channel);

    await User.findOneAndUpdate({ username: req.body.username }, { ownedChannels: ownedChannels });
    res.locals.channel = req.body.channel;
    console.log('Channel created');
    return next();
};

module.exports = channelController;