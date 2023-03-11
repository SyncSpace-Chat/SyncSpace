const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dbRouter = require('./routes/db_server');

const PORT = 3000;

//handle request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/db', dbRouter); //route all 3000 requests to db file

//catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('The page you are looking for does not exist'));

//global error handler 
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;