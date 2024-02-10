const jwt = require("jsonwebtoken");
const HandleErrors = require("./errors");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new HandleErrors("Authorization needed", 401);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    throw new HandleErrors(err.message, 401);
  }
  req.user = payload;

  return next();
};
