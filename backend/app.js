require("dotenv").config();

const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate, Joi, errors } = require("celebrate");

const { PORT = 3000 } = process.env;

const cards = require("./routes/cards");
const users = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(requestLogger);

// crash teste by TripleTen. Remove it before the revision
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

// Create new user
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);
// Authorize user
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.use(auth);
app.use("/", users);
app.use("/", cards);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Server error" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
