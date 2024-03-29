const { channel } = require('diagnostics_channel');
const { resourceLimits } = require('worker_threads');
const { findOneAndDelete } = require('../models/channelModel');
const Channel = require('../models/channelModel');
const { exists } = require('../models/userModel');
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
    if (!req.cookies.user || !req.body.channel) return next();

    if (res.locals.exists === true) {
        console.log('Channel Already Exists!');
        return next();
    }

    await Channel.create({ channelName: req.body.channel, owner: req.cookies.user, messages: [], members: [req.cookies.user] });
    const user = await User.findOne({ username: req.cookies.user });
    const ownedChannels = user.ownedChannels;
    ownedChannels.push(req.body.channel);

    await User.findOneAndUpdate({ username: req.cookies.user }, { ownedChannels: ownedChannels });
    res.locals.channel = req.body.channel;
    /* This set adds the owned channel to the user's cookies.  This is actually a really big security flaw, maybe something
    for any iterators to fix - relying on cookies in the way we did for functionality does create security flaws */
    res.cookie('ownedChannels', req.cookies.ownedChannels + req.body.channel);

    console.log('Channel created');
    return next();
};

/* Middleware that checks to see if a channel exists in the DB - M */

channelController.channelCheck = async (req, res, next) => {

    const check = await Channel.findOne({ channelName: req.body.channel });

    if (check === null) {
        res.locals.exists = false;
        console.log('Channel does not exist');
        return next();
    }
    res.locals.exists = true;
    console.log('Channel exists');
    return next();
};

/* Deletes a currently existing channel - takes in user from cookie and a channel name.  Checks if the channel exists, then if the user is the owner, then proceeds to delete it - M */

channelController.deleteChannel = async (req, res, next) => {
    console.log('Deleting channel');
    if (!req.cookies.user || !req.body.channel) return next();
    res.locals.channel = req.body.channel;

    if (res.locals.exists === false) {
        console.log('Channel does not exist!');
        return next();
    };

    const delChan = await Channel.findOne({ owner: req.cookies.user}); 
    if (delChan === null) {
        console.log('User does not own channel!')
    };
    // Remove channel from owned channels, then delete channel - M
    await User.findOneAndUpdate({ username: req.cookies.user }, { $pull: { ownedChannels: delChan.channelName }});
    await Channel.findOneAndDelete({ channelName: req.body.channel });

    return next();
}

/* Unsubscribes all users from a channel in preparation for deletion - M */

channelController.unsubscribeAll = async (req, res, next) => {
    console.log('Removing users from channel'); 

    if (res.locals.exists === false) {
        console.log('Channel did not exist, moving out of middleware'); 
        return next(); 
    }

    const channelObj = await Channel.findOne({ channelName: req.body.channel });
    const memberList = channelObj.members; 
    console.log(memberList);
    memberList.forEach( async element => {
        console.log(element);
        // Removes channel from each user's subscriptions
        await User.findOneAndUpdate( { username: element }, { $pull: { subscribedChannels: channelObj.channelName }});
    })
    return next();
}
module.exports = channelController;