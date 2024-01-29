const express = require("express");
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

// All users object response
router.get("/users", getUsers);

// User by ID
router.get("/users/:id", doesUserExist);

// Update user info
router.patch("/users/me", updateUserInfo);

// Update user avatar
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
