require("dotenv").config();

const express = require("express");

const app = express();
const mongoose = require("mongoose");

const { PORT } = process.env;

const cards = require("./routes/cards");
const users = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", users);

app.use("/", cards);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(err.statusCode)
    .send({ message: statusCode === 500 ? "Server error" : message });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
