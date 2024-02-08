const winston = require("winston");
const expressWinston = require("express-winston");

module.exports = {
  // request log register
  requestLogger: expressWinston.logger({
    transports: [new winston.transports.File({ filename: "request.log" })],
    format: winston.format.json(),
  }),

  // error log register
  errorLogger: expressWinston.errorLogger({
    transports: [new winston.transports.File({ filename: "error.log" })],
    format: winston.format.json(),
  }),
};
