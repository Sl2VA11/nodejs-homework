const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  fs.readFile(contactsPath, "utf-8");
  try {
    const data = await fs.readFile(contactsPath);
    const contact = JSON.parse(data).find(
      (contact) => contact.id.toString() === contactId.toString()
    );

    if (contact) {
      return contact;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    if (
      parsedData.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      console.log(`${name} is already in contacts`);
      return;
    }
    const contact = { id: uuidv4(), name, email, phone };
    parsedData.push(contact);

    fs.writeFile(contactsPath, JSON.stringify(parsedData));
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contact = await JSON.parse(data).find(
      (contact) => contact.id.toString() === contactId.toString()
    );
    if (contact) {
      const filterContacts = JSON.parse(data).filter(
        (contact) => contact.id.toString() !== contactId.toString()
      );

      await fs.writeFile(contactsPath, JSON.stringify(filterContacts));

      return contact;
    }
  } catch (error) {
    console.error(error.message);
  }
};
const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactsFilter = await JSON.parse(data).filter(
      (contact) => contact.id.toString() !== contactId.toString()
    );

    const { name, phone, email } = body;

    const contact = {
      id: contactId,
      name,
      email,
      phone,
    };
    contactsFilter.push(contact);
    contactsFilter.sort((a, b) => a.id - b.id);
    await fs.writeFile(contactsPath, JSON.stringify(contactsFilter));

    return contact;
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
