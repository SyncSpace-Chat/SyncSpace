const mongoose = require('mongoose');
require('dotenv').config();

const URIkey = process.env.SHARK_DB_KEY;
const MONGO_URI = URIkey;

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
const userSchema = ({
    username: { type: String, required: true },
    password: { type: String, required: true },
    subscribedChannels: [String]
});

//create a model based on the schema
const User = mongoose.model('users', userSchema);

module.exports = User;