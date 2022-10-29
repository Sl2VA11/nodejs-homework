const Joi = require("joi");
const Contacts = require("../../models/contacts");

const postContact = async (req, res) => {
  console.log(req.user);
  // const { name, email, phone } = req.body;
  const { _id: owner } = req.user;
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

  const contact = new Contacts({ ...req.body, owner });
  console.log(owner);
  await contact.save();
  if (!contact) {
    return res.json({ status: 500, message: "Internal server error" });
  }
  res.json({ status: 201, contact });
};

module.exports = postContact;
