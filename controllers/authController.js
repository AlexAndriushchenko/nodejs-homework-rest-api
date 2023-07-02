const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const User = require("../db/models/userModel");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const {
  signup,
  login,
  logout,
  updateSubscription,
} = require("../services/authService");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

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

const updateAvatarCtrl = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    const image = await Jimp.read(tempUpload);
    await image.cover(250, 250).write(resultUpload);
    await fs.unlink(tempUpload);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Error(error);
  }

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  signupCtrl: ctrlWrapper(signupCtrl),
  loginCtrl: ctrlWrapper(loginCtrl),
  getCurrentCtrl: ctrlWrapper(getCurrentCtrl),
  logoutCtrl: ctrlWrapper(logoutCtrl),
  updateSubscriptionCtrl: ctrlWrapper(updateSubscriptionCtrl),
  updateAvatarCtrl: ctrlWrapper(updateAvatarCtrl),
};
