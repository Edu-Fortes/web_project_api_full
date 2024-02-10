module.exports = class HandleErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
