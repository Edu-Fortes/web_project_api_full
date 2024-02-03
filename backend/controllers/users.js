const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const HandleErrors = require("../middlewares/errors");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  getUser: async (req, res, next) => {
    const userBy = await User.findOne({ _id: req.user._id });
    try {
      if (!userBy) {
        throw new HandleErrors("No user with this ID found", 404);
      }
      res.status(200).send({
        data: {
          _id: req.user._id,
          email: userBy.email,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    try {
      if (!user) {
        throw new HandleErrors("Incorrect e-mail or password", 401);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    } catch (err) {
      next(err);
    }
    return user;
  },
  createUser: async (req, res, next) => {
    // eslint-disable-next-line object-curly-newline
    const { name, about, avatar, email, password } = req.body;
    try {
      if (!email) {
        throw new HandleErrors("Email field is required", 400);
      }
      if (!password) {
        throw new HandleErrors("Password field is requered", 400);
      }
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
      res.status(200).send({ data: { _id: newUser._id, email } });
    } catch (err) {
      next(err);
    }
  },
  doesUserExist: async (req, res) => {
    const { users } = res;
    const { id } = req.params;
    const existUser = users.find((user) => user._id.toString() === id);

    if (!existUser) {
      return res.status(404).send({ message: "User ID not found" });
    }
    return res.status(200).send(existUser);
  },
  updateUserInfo: async (req, res) => {
    try {
      const me = req.user._id;
      const { name, about } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        me,
        { name, about },
        {
          new: true,
          runValidators: true,
        }
      ).orFail();
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const { _id } = req.user;
      const { avatar } = req.body;
      const updateAvatar = await User.findByIdAndUpdate(
        _id,
        { avatar },
        { new: true, runValidators: true }
      ).orFail();
      res.status(200).send(updateAvatar);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};
