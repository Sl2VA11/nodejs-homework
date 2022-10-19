const express = require("express");
const Joi = require("joi");
const Contacts = require("../../models/contacts");

const Сontacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await Сontacts.find();

  res.json({
    status: 200,
    contacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Сontacts.findById(contactId);

  if (contact === undefined) {
    res.json({ status: 404, message: "Not found" });
    return;
  }
  res.json({ status: 200, contact });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .min(3)
      .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
      .required(),
    favorite: Joi.boolean(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.json({
      status: 400,
      message: validation.error.details[0].message,
    });
  }

  const contact =  new Contacts({ name, email, phone });
  await contact.save();
  if (!contact) {
    return res.json({ status: 500, message: "Internal server error" });
  }
   res.json({ status: 201, contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const {contactId} = req.params
  const contact = await Contacts.findByIdAndRemove(contactId);
  if (contact === null) {
    res.json({ status: 404, message: "Not found" });
    return;
  }
  res.json({ status: 200, message: "contact deleted" });
});

router.put("/:contactId", async ({ params, body }, res, next) => {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string()
      .min(3)
      .max(100)
      .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .min(3)
      .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
      .required(),
    favorite: Joi.boolean(),
  });

  const validation = schema.validate(body);

  if (validation.error) {
    return res.json({
      status: 400,
      message: validation.error.details[0].message,
    });
  }

  const contact = await Contacts.findByIdAndUpdate(params.contactId, body, {
    new: true,
  });
  contact
    ? res.json({ status: 200, contact })
    : res.json({ status: 404, message: "Not found" });
});

router.put("/:contactId/favorite", async ({ params, body }, res, next) => {
  if (!body) {
    return res.json({ status: 400, message: "missing field favorite" });
  }
  const contact = await Contacts.findByIdAndUpdate(params.contactId, body, {
    new: true,
  });
  contact
    ? res.json({ status: 200, contact })
    : res.json({ status: 404, message: "Not found" });
});

module.exports = router;
