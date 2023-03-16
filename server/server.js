const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dbRouter = require("./routes/db_server");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3000;

//JUNAID AHMED
//ALL USERS CREATE A .ENV FILE IN THE ROOT DIRECTORY OF THE PROJECT
//IN THE .ENV FILE CREATE THIS: MONGO_URI="OUR URI KEY(IN THE SLACK)"
const URIkey = process.env.MONGO_URI;
const MONGO_URI = URIkey;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB FAIL");
  });

//handle request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  "/db/static",
  express.static(path.resolve(__dirname, "../client/sounds/"))
);

app.use("/db", dbRouter); //route all 3000 requests to db file

//catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("The page you are looking for does not exist")
);

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
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
