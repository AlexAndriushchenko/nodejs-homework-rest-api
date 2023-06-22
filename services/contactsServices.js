const Contact = require("../db/models/contactsModel");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getById = async (id) => {
  const resultContact = await Contact.findById(id);
  return resultContact;
};

const addContact = async (contact) => {
  const newContact = await Contact.create(contact);
  return newContact;
};

const removeContact = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);
  return deletedContact;
};

const updateContact = async (id, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, body);
  return updatedContact;
};

const updateStatusContact = async (id, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, {
    favorite: body.favorite,
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
