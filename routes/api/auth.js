const express = require('express')
const router = express.Router();
const authenticate = require('../../middlewares/authenticate')
const ctrl = require('../../controllers/auth')
const  ctrlWrapper  = require("../../helpers/ctrlWrapper");

router.post("/users/signup", ctrlWrapper(ctrl.signup)); 
router.post("/users/login", ctrlWrapper(ctrl.login));
router.get("/users/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/users/logout", authenticate, ctrlWrapper(ctrl.logout));
module.exports = router