const Contacts = require("../../models/contacts");

const putFavorite = async ({ params, body }, res, next) => {
  if (!body) {
    return res.json({ status: 400, message: "missing field favorite" });
  }
  const contact = await Contacts.findByIdAndUpdate(params.contactId, body, {
    new: true,
  });
  contact
    ? res.json({ status: 200, contact })
    : res.json({ status: 404, message: "Not found" });
};
module.exports = putFavorite;
