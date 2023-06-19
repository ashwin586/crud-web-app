const mongoose = require("mongoose");
const moment = require("moment-timezone");
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    toLowerCase: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: moment.tz(Date.now(), "Asia/Kolkata"),
  },
});

const User = mongoose.model('users',usersSchema)
module.exports = User