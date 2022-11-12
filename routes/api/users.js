const express = require("express");
const router = express.Router();

const { ctrlWrapper, validation, auth, upload } = require("../../middlewars");
const { users: ctrl } = require("../../controllers");
const {
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
  verifyJoiSchema,
} = require("../../models/user");

router.post("/signup", validation(signupJoiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.login));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(verifyJoiSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
