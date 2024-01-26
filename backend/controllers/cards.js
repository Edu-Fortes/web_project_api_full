const Card = require("../models/card");

module.exports = {
  getCards: async (req, res) => {
    try {
      const cards = await Card.find().orFail(
        () => new Error("File could not be found")
      );
      res.send(cards);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  },
  createCard: async (req, res) => {
    const { name, link } = req.body;
    try {
      const newCard = await Card.create({ name, link, owner: req.user._id });
      res.send(newCard);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  deleteCard: async (req, res) => {
    const { cardId } = req.params;
    try {
      const deletedCard = await Card.findByIdAndDelete(cardId).orFail();
      res.send(deletedCard);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  addLike: async (req, res) => {
    try {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        {
          $addToSet: { likes: req.user._id },
        },
        { new: true }
      ).orFail();
      res.status(200).send({ message: "Card liked" });
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  dislike: async (req, res) => {
    try {
      await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).orFail();
      res.status(200).send({ message: "Card disliked" });
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
};
