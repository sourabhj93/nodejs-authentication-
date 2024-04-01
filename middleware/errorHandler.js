const { constants, constantTitles } = require("../constants");

const errorHandler = (err, req, res, next) => {
  console.log("res", res.statusCode);
  const statusCode = res.statusCode
    ? res.statusCode
    : constants.SERVER_NOT_AVAILBLE;
  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: constantTitles.BAD_REQUEST,
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: constantTitles.UNAUTHORIZED,
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: constantTitles.FORBIDDEN,
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: constantTitles.NOT_FOUND,
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_NOT_AVAILBLE:
      res.json({
        title: constantTitles.SERVER_NOT_AVAILBLE,
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      res.json({
        title: "Unhandled Error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
  }
};

module.exports = errorHandler;
