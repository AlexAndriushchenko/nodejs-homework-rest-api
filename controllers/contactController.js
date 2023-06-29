const HttpError = require("../helpers/HttpError");

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const listContactsCtrl = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const contacts = await listContacts(owner, page, limit, favorite);
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
    const { _id: owner } = req.user;
    const newContact = await addContact({ ...req.body, owner });
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

const updateStatusContactCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultContact = await updateStatusContact(contactId, req.body);
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
  updateStatusContactCtrl,
};
