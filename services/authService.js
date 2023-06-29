const jwt = require("jsonwebtoken");
const User = require("../db/models/userModel");
const HttpError = require("../helpers/HttpError");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signup = async (email, password, subscription) => {
  const newUser = await User.create({
    email,
    password,
    subscription,
  });

  //question!
  //newUser.token = signToken(newUser.id);
  newUser.password = undefined;

  return newUser;
};

const login = async (email, password) => {
  const userInBase = await User.findOne({ email }).select("+password");
  if (!userInBase) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordIsValid = await userInBase.checkPassword(
    password,
    userInBase.password
  );
  if (!passwordIsValid) {
    throw HttpError(401, "Email or password is wrong");
  }
  userInBase.password = undefined;
  const token = signToken(userInBase.id);
  await User.findByIdAndUpdate(userInBase._id, { token });

  return {
    token,
    user: {
      email: userInBase.email,
      subscription: userInBase.subscription,
    },
  };
};

const logout = async (_id) => {
  const resultLogout = await User.findByIdAndUpdate(_id, { token: null });
  return resultLogout;
};

const updateSubscription = async (_id, subscription) => {
  const updatedUser = await User.findByIdAndUpdate({ _id }, { subscription });
  return updatedUser;
};

module.exports = { signup, login, logout, updateSubscription };
