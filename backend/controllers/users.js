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
          name: userBy.name,
          about: userBy.about,
          avatar: userBy.avatar,
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
    const { email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hash,
      });
      res.status(200).send({ data: { _id: newUser._id, email } });
    } catch (err) {
      if (err.code === 11000) {
        res.status(500).send({ message: "E-mail already exists" });
      }
      next(err);
    }
  },
  doesUserExist: async (req, res, next) => {
    const existUser = await User.findById(req.params.id);
    try {
      if (!existUser) {
        throw new HandleErrors("User ID not found", 404);
      }
      return res.status(200).send(existUser);
    } catch (err) {
      next(err);
    }
    return existUser;
  },
  updateUserInfo: async (req, res, next) => {
    try {
      const me = req.user._id;
      const { name, about } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        me,
        { name, about },
        {
          new: true,
        }
      ).orFail(new HandleErrors("User Id not found", 404));
      return res.status(200).send(updatedUser);
    } catch (err) {
      next(err);
    }
    return res;
  },
  updateAvatar: async (req, res) => {
    try {
      const { _id } = req.user;
      const { avatar } = req.body;
      const updateAvatar = await User.findByIdAndUpdate(
        _id,
        { avatar },
        { new: true, runValidators: true }
      ).orFail(new HandleErrors("User Id not found", 404));
      res.status(200).send(updateAvatar);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};
