const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      match: /^https?:\/\/(www\.)?([-.~:/?#[\]@!$&'()*+,;=\w]*#?)/gi,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "Wrong e-mail format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { versionKey: false }
);

module.exports = model("user", userSchema);
