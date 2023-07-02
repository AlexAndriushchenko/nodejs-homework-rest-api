const express = require("express");

const authController = require("../../controllers/authController");

const {
  signupSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/userSchema");
const { validateBody } = require("../../middleware/validateBody");
const authenticate = require("../../middleware/authMiddlewares");
const upload = require("../../middleware/upload");

const router = express.Router();

router.post(
  "/register",
  validateBody("signupSchema", signupSchema),
  authController.signupCtrl
);

router.post(
  "/login",
  validateBody("loginSchema", loginSchema),
  authController.loginCtrl
);

router.post("/logout", authenticate, authController.logoutCtrl);

router.get("/current", authenticate, authController.getCurrentCtrl);

router.patch(
  "/",
  authenticate,
  validateBody("subscriptionSchema", subscriptionSchema),
  authController.updateSubscriptionCtrl
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatarCtrl
);

module.exports = router;