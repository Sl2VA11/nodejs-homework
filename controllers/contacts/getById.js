const Contacts = require("../../models/contacts");

const getById = async (req, res, next) => {
   const { contactId } = req.params;
   
  const contact = await Contacts.findById(contactId);

  if (contact === undefined) {
    res.json({ status: 404, message: "Not found" });
    return;
  }
  res.json({ status: 200, contact });
};

module.exports = getById;
