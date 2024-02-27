const { isValidObjectId } = require("mongoose");
const HttpError = require("./HttpError");

const isValidId = (req, _, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(new HttpError(404));
  }
};

module.exports = isValidId;
