const express = require("express");
const User = require("../models/user");
const {
  getUsers,
  createUser,
  doesUserExist,
  updateUserInfo,
  updateAvatar,
} = require("../controllers/users");

const router = express.Router();

// Create new user
router.post("/users", createUser);

// Get users list from database
router.use(async (req, res, next) => {
  try {
    const users = await User.find().orFail(
      () => new Error("File could not be found")
    );
    res.users = users;
    next();
  } catch (error) {
    res.status(404).send({ messagem: error.message });
  }
});

// All users object response
router.get("/users", getUsers);

// User by ID
router.get("/users/:id", doesUserExist);

// Update user info
router.patch("/users/me", updateUserInfo);

// Update user avatar
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
