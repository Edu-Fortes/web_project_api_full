const express = require("express");

const app = express();
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

require("dotenv").config();

const cards = require("./routes/cards");
const { login, createUser, getUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.get("/user/me", getUser);

app.use("/", cards);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
