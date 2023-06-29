const User = require("../db/models/userModel");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  signup,
  login,
  logout,
  updateSubscription,
} = require("../services/authService");

const signupCtrl = async (req, res) => {
  const { email, password, subscription } = req.body;
  const userInBase = await User.findOne({ email });

  if (userInBase) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await signup(email, password, subscription);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginCtrl = async (req, res) => {
  const { email, password } = req.body;

  const userData = await login(email, password);

  if (!userData) throw HttpError(401, "Email or password is wrong");

  res.status(200).json(userData);
};

const getCurrentCtrl = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logoutCtrl = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json();
};

const updateSubscriptionCtrl = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await updateSubscription(_id, subscription);

  if (!updatedUser) {
    throw HttpError(401, "Not authorized");
  }

  res.json(updatedUser);
};

module.exports = {
  signupCtrl: ctrlWrapper(signupCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
  getCurrentCtrl: ctrlWrapper(getCurrentCtrl),
  logoutCtrl: ctrlWrapper(logoutCtrl),
  updateSubscriptionCtrl: ctrlWrapper(updateSubscriptionCtrl),
};
