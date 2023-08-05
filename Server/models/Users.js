const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  division: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
