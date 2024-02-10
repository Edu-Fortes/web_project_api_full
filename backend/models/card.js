const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      match: [
        /^https?:\/\/(www\.)?([-.~:/?#[\]@!$&'()*+,;=\w]*#?)/gi,
        "URL '{VALUE}' is not valid",
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = model("card", cardSchema);
