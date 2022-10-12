const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.json({
    status: 200,
    contacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

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
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.json({
      status: 400,
      message: validation.error.details[0].message,
    });
  }

  const contact = await addContact({ name, email, phone });

  
  if (!contact) {
    return res.json({ status: 500, message: "Internal server error" });
  }
   res.json({ status: 201, contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact === null) {
    res.json({ status: 404, message: "Not found" });
    return;
  }
  res.json({ status: 200, message: "contact deleted" });
});

router.put("/:contactId", async ({ params, body }, res, next) => {
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
  });

  const validation = schema.validate(body);

  if (validation.error) {
    return res.json({
      status: 400,
      message: validation.error.details[0].message,
    });
  }

  const contact = await updateContact(params.contactId, body);
  contact
    ? res.json({ status: 200, contact })
    : res.json({ status: 404, message: "Not found" });
});

module.exports = router;
