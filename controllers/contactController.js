const { HttpError } = require("../helpers");

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsServices");

const listContactsCtrl = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getByIdCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultContact = await getById(contactId);
    if (!resultContact) {
      throw HttpError(404, "Not found");
    }
    res.json(resultContact);
  } catch (error) {
    next(error);
  }
};

const addContactCtrl = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContactCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultContact = await updateContact(contactId, req.body);
    if (!resultContact) {
      throw HttpError(404, "Not found");
    }
    res.json(resultContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContactsCtrl,
  getByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
};
