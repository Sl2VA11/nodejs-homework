const express = require("express");
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", authenticate, ctrl.postContact);

router.put("/:contactId", ctrl.putById);

router.put("/:contactId/favorite", ctrl.putFavorite);

module.exports = router;
