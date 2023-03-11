const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (req,res,next) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    User.create({username: req.body.username, password: hash, subscribedChannels: []})
    .then(() => {
      console.log('successfully added user to the database');
      res.cookie('user', req.body.username,);
      return next();
    })
    .catch((err) => {
      console.log('error in the createUser middleware');
      return next(err);
    })
  })
}

userController.verifyUser = async (req, res, next) => {
  //verification logic
  console.log(req.body);
  const results = await User.findOne({username: req.body.username })
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
    return next();
  } else {
    console.log('wrong password');
    res.redirect('/login');
  }
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