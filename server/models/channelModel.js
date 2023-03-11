const mongoose = require('mongoose');
require('dotenv').config();

const URIkey = process.env.SHARK_DB_KEY;

const Schema = mongoose.Schema;

//create schema for user collection
const channelSchema = new Schema({
    channelName: { type: String, required: true },
    messages: [
        {
            message: { type: String },
            username: { type: String }
        }
    ]
});

//create a model based on the schema
module.exports = mongoose.model('Channel', channelSchema);