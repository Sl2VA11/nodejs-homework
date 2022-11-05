const express = require('express')
const router = express.Router();
const { authenticate, upload } = require("../../middlewares");
const ctrl = require('../../controllers/auth')
const  ctrlWrapper  = require("../../helpers/ctrlWrapper");

router.post("/users/signup", ctrlWrapper(ctrl.signup)); 
router.post("/users/login", ctrlWrapper(ctrl.login));
router.get("/users/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/users/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch("/users/avatars", authenticate, upload.single('avatar') ,  ctrlWrapper(ctrl.updateAvatar));

module.exports = router