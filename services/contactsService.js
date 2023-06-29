const Contact = require("../db/models/contactModel");
const mongoose = require("mongoose");

const listContacts = async (owner, page, limit, favorite) => {
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite) {
    filter.favorite = true;
  }

  const contacts = await Contact.find(filter, null, { skip, limit });
  return contacts;
};

const getById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    return undefined;
  }
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
