const express = require("express");
const validator = require("validator");
const { celebrate, Joi } = require("celebrate");

const {
  createCard,
  getCards,
  deleteCard,
  addLike,
  dislike,
} = require("../controllers/cards");

const router = express.Router();

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

router.get("/cards", getCards);
router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required().custom(validateUrl),
    }),
  }),
  createCard
);
router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().alphanum().length(24),
    }),
  }),
  deleteCard
);
router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().length(24),
    }),
  }),
  addLike
);
router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().length(24),
    }),
  }),
  dislike
);

module.exports = router;
