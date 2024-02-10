const express = require("express");
const validator = require("validator");

const { celebrate, Joi } = require("celebrate");

const {
  getUser,
  doesUserExist,
  updateUserInfo,
  updateAvatar,
} = require("../controllers/users");

const router = express.Router();

// All users object response
router.get("/users/me", getUser);

// User by ID
router.get(
  "/users/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().alphanum().length(24),
    }),
  }),
  doesUserExist
);

// Update user info
router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(40),
      about: Joi.string().min(2).max(200),
    }),
  }),
  updateUserInfo
);

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Update user avatar
router.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateUrl),
    }),
  }),
  updateAvatar
);

module.exports = router;
