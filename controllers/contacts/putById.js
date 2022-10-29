const Joi = require("joi");
const Contacts = require("../../models/contacts");

const putById = async ({ params, body }, res, next) => {
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
};
module.exports = putById