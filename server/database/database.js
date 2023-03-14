const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://stabChatDB:Ad6ALymO2b9vEKlb@stabchat.frdx186.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
