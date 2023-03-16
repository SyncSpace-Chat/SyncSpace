const Channel = require("../models/channelModel");
const User = require("../models/userModel");

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
};

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
    username: username,
  });

  //update channel collection
  await Channel.findOneAndUpdate(
    { channelName: channel },
    { messages: messageArr }
  );
  return next();
};

/* Retrieves an array of every channel - M*/
channelController.getChannels = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return next();
  }
  const channelCollectionArr = await Channel.find({});
  const channelStringArr = channelCollectionArr.map((el) => el.channelName);
  const user = await User.findOne({ username });
  const userChannels = user.subscribedChannels;
  res.locals.channels = [channelStringArr, userChannels];
  return next();
};

/* Creates a new channel: takes in {channel: "channelname", username: "username"}  - M */

channelController.createChannel = async (req, res, next) => {
  console.log("Creating channel");
  if (res.locals.exists) {
    console.log("Channel Already Exists!");
    return next();
  }
  const { username, channel } = req.body;
  await Channel.create({
    channelName: channel,
    owner: username,
    messages: [],
    members: [username],
  });
  const user = await User.findOne({ username });
  const ownedChannels = user.ownedChannels;
  ownedChannels.push(channel);

  await User.findOneAndUpdate({ username }, { ownedChannels: ownedChannels });
  res.locals.channel = channel;
  /* This set adds the owned channel to the user's cookies.  This is actually a really big security flaw, maybe something
    for any iterators to fix - relying on cookies in the way we did for functionality does create security flaws */
  // res.cookie("ownedChannels", req.cookies.ownedChannels + req.body.channel);

  console.log("Channel created");
  return next();
};

channelController.consoleLog = async (req, res, next) => {
  console.log("DELETING: " + req.body.channel);
  return next();
};

/* Middleware that checks to see if a channel exists in the DB - M */

channelController.channelCheck = async (req, res, next) => {
  const { channel } = req.body;
  const check = await Channel.findOne({ channelName: channel });
  if (!check) {
    res.locals.exists = false;
    console.log("Channel does not exist");
    return next();
  }
  res.locals.exists = true;
  console.log("Channel exists");
  return next();
};

/* Deletes a currently existing channel - takes in user from cookie and a channel name.  Checks if the channel exists, then if the user is the owner, then proceeds to delete it - M */

channelController.deleteChannel = async (req, res, next) => {
  console.log("Deleting channel");
  const { channel, username } = req.body;
  if (!channel) return next();
  res.locals.channel = channel;
  console.log("DELETING: " + channel);

  if (res.locals.exists === false) {
    console.log("Channel does not exist!");
    return next();
  }

  const delChan = await Channel.findOne({ owner: username });
  if (delChan === null) {
    console.log("User does not own channel!");
  }
  // Remove channel from owned channels, then delete channel - M
  await User.findOneAndUpdate(
    { username },
    { $pull: { ownedChannels: delChan.channelName } }
  );
  await Channel.findOneAndDelete({ channelName: channel });

  return next();
};

/* Unsubscribes all users from a channel in preparation for deletion - M */

channelController.unsubscribeAll = async (req, res, next) => {
  console.log("Removing users from channel");

  if (res.locals.exists === false) {
    console.log("Channel did not exist, moving out of middleware");
    return next();
  }
  const { channel } = req.body;
  const channelObj = await Channel.findOne({ channelName: channel });
  const memberList = channelObj.members;
  memberList.forEach(async (member) => {
    // Removes channel from each user's subscriptions
    await User.findOneAndUpdate(
      { username: member },
      { $pull: { subscribedChannels: channelObj.channelName } }
    );
  });
  return next();
};
module.exports = channelController;
