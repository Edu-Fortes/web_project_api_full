const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      default: "Explorer",
    },
    avatar: {
      type: String,
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
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

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return user;
    });
  });
};

module.exports = model("user", userSchema);
