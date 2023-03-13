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

  const subscriber = await User.findOne({ username: req.cookies.user });
  if (!subscriber) {
    console.log('Error - User does not exist');
    return res.redirect('login');
  };

  //Check to see if channel exists 
  const found = await Channel.findOne({ channelName: req.body.channel })
  if (!found) {
    console.log('Channel not found!')
    return next();
  };

  const subChannels = subscriber.subscribedChannels;
  if (subChannels.includes(req.body.channel)) {
    console.log('Channel already subscribed');
    return next();
  }

  subChannels.push(req.body.channel);

  await User.findOneAndUpdate({ username: req.cookies.user }, { subscribedChannels: subChannels });
  return next();
}
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