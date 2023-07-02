const jwt = require("jsonwebtoken");
const User = require("../db/models/userModel");
const HttpError = require("../helpers/HttpError");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const userInBase = await User.findById(id);
    if (!userInBase || !userInBase.token || userInBase.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = userInBase;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
