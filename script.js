const express = require("express");
const app = express();
const Port = 3000;
const session = require("express-session");
const { v4: uuid } = require("uuid");
const router = require("./routes/router");
const nocache = require("nocache");
const mongoose = require("mongoose");
app.use(nocache());

mongoose
  .connect("mongodb://127.0.0.1:27017/usersDb")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", router);
app.listen(Port);
