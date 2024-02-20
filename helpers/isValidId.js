const { isValidObjectId } = require("mongoose");
const HttpError = require("./HttpError");

const isValidId = (req, _, next) => {
  if (!isValidObjectId(req.params.id)) {
    next(new HttpError(404));
    return;
  }

  next();
};

module.exports = isValidId;
