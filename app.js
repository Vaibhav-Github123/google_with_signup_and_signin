require("dotenv").config();
require("./config/db");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");


const app = express();
const PORT = process.env.PORT || 3000;

const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  ttl: 1000 * 60 * 60 * 24 * 7, // = 14 days. Default
});

require("./config/passport")(passport)

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.Secret,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, console.log(`listening at ${PORT}`));
