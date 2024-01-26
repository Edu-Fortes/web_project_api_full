const express = require("express");
const {
  createCard,
  getCards,
  deleteCard,
  addLike,
  dislike,
} = require("../controllers/cards");

const router = express.Router();

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", addLike);
router.delete("/cards/:cardId/likes", dislike);

module.exports = router;
