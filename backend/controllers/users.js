const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  getUsers: async (req, res) => {
    res.status(200).send(res.users);
  },
  createUser: async (req, res) => {
    const { name, about, avatar, email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        about,
        avatar,
        email,
        hash,
      });
      res.status(200).send(newUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
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
