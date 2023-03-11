const mongoose = require('mongoose');
require('dotenv').config();

const URIkey = process.env.SHARK_DB_KEY;

const MONGO_URI = URIkey;
require('dotenv').config();
//TODO - connect to mongoose URI below
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'shark-db'
})
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

//create schema for user collection
const channelSchema = ({
    channelName: { type: String, required: true },
    messages: [
        {
            message: { type: String },
            username: { type: String }
        }
    ]
});