const User = require('../models/userModel');
const Channel = require('../models/channelModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userController = {};

/* Creates a user -> Takes in a username and password, hashes via bcrypt, then adds General to subscribedChannels - M */

userController.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    User.create({ username: req.body.username, password: hash, subscribedChannels: ["General"], ownedChannels: [] })
      .then(() => {
        console.log('successfully added user to the database');
        return next();
      })
      .catch((err) => {
        console.log('error in the createUser middleware');
        return next(err);
      })
  })
}

/* Verifies user on login page.  Finds user that matches the username, redirects if no user is found, compares the PW if the username is found & sores cookie if it matches properly - M*/

userController.verifyUser = async (req, res, next) => {
  //verification logic
  console.log(req.body);
  const results = await User.findOne({ username: req.body.username })
  if (!results) {
    console.log('user not found');
    res.redirect('/login');
    return;
  }
  const comparison = await bcrypt.compare(req.body.password, results.password)
  if (comparison) {
    console.log('correct password');
    //store the username as a cookie value
    res.cookie('user', req.body.username);
    res.cookie('subscribedChannels', results.subscribedChannels.join(''));
    res.cookie('ownedChannels', results.ownedChannels.join(''));
    return next();
  } else {
    console.log('wrong password');
    res.redirect('/login');
  }
}

/* Subscribes users to a channel "channel" passed into the body in form {channel: "channelname", username: "username"}  -> retrieves entry from DB, pushes channel onto array, then updates DB entry - M*/

userController.subscribe = async (req, res, next) => {
  // Check for failed channel creation - M 
  if (res.locals.exists) return next();

  //Querying the subscriber
  const subscriber = await User.findOne({ username: req.cookies.user });

  if (!subscriber) {
    console.log('Error - User does not exist');
    return res.redirect('login');
  };

  //Secondary check for channel existence (don't remove this - unrelated to res.locals.exists) 
  const found = await Channel.findOne({ channelName: req.body.channel })
  if (!found) {
    console.log('Channel not found!')
    return next();
  };
  // The subscription list for the user
  const subChannels = subscriber.subscribedChannels;
  // The list of members for the channel
  const memberList = found.members; 

  if (subChannels.includes(req.body.channel)) {
    console.log('Channel already subscribed');
    return next();
  }
  // Adds channel to array
  subChannels.push(req.body.channel);
  memberList.push(req.cookies.user);

  // Updates the entries
  await User.findOneAndUpdate({ username: req.cookies.user }, { subscribedChannels: subChannels });
  await Channel.findOneAndUpdate({ channelName: req.body.channel }, { members: memberList});

  const cookieContents = req.cookies.user;
  res.cookie('subscribedChannels', req.cookies.subscribedChannels + req.body.channel);

  return next();
};
/* Unscription functionality - takes in username from cookies and channel from body */ 

userController.unsubscribe = async (req, res, next) => {
  if (res.locals.exists === false) return next(); 

  const subscriber = await User.findOne({ username: req.cookies.user });
  const chan = await Channel.findOne({ channelName: req.body.channel });

  // Check to see if owner -> if owner, must delete the channel 
  if (subscriber.username === chan.owner) {
    console.log('Owner cannot unsubscribe from channel, must delete!');
    return next(); 
  }

  await User.findOneAndUpdate({ username: subscriber.username }, { $pull: { subscribedChannels: chan.channelName }});
  await Channel.findOneAndUpdate({ channelName: chan.channelName }, { $pull: { members: subscriber.username}});

  return next();
}
/* Returns an array of a user's owned channels - used to determine where to render delete channel buttons */ 

userController.ownedChannels = async (req, res, next) => {
  
  const owner = await User.findOne({ username: req.cookies.user}); 
  const ownChan = owner.ownedChannels; 

  res.locals.ownedChannels = ownChan; 
  
  return next(); 
}

/* THE BADLANDS - ABORTED OAUTH ATTEMPT */ 

// userController.verifyUser = async (req, res, next) => {
//   //verification logic
//   const results = await User.findOne({username: req.body.username })
//   const comparison = await bcrypt.compare(req.body.password, results.password)
//   if (comparison) {
//     console.log('correct password');
//     //store the username as a cookie value
//     res.cookie('user', req.body.username);
//     return next();
//   } else {
//     console.log('wrong password');
//     res.redirect('/signin');
//   }
// }

module.exports = userController;