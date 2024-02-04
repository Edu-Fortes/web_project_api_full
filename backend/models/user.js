const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [2, "Name field must have at least 2 characters in length"],
      maxLength: [40, "Name field must have at maximun 40 character in length"],
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      minLength: [2, "About field must have at least 2 characters in length"],
      maxLength: [
        200,
        "About field must have at maximun 200 character in length",
      ],
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
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "Wrong e-mail format",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: 8,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    })
    .catch((err) => console.log({ message: err.message }));
};

module.exports = model("user", userSchema);
