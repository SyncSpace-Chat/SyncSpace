const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema for user collection
const channelSchema = new Schema({
  channelName: { type: String, required: true },
  owner: { type: String, required: true },
  members: [String],
  messages: [
    {
      message: { type: String },
      username: { type: String },
    },
  ],
});

//create a model based on the schema
module.exports = mongoose.model("Channel", channelSchema);
