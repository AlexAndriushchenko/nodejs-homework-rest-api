const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../db/models/userModel");
const HttpError = require("../helpers/HttpError");
const { nanoid } = require("nanoid");
const sendEmail = require("../helpers/sendEmail");
require("dotenv").config();

const { BASE_URL } = process.env;

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signup = async (email, password, subscription) => {
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.password = undefined;

  sendEmail({
    to: email,
    subject: "Verify email",
    html: `Please, verify your email by clicking on <a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">this link</a>`,
  });

  return newUser;
};

const login = async (email, password) => {
  const userInBase = await User.findOne({ email }).select("+password");
  if (!userInBase) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!userInBase.verify) {
    throw HttpError(401, "Email not verified");
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
