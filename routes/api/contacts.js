const express = require("express");
const {
  listContactsCtrl,
  getByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
} = require("../../controllers/contactController");

const contactSchema = require("../../schemas/contactSchema");
const { validateBody } = require("../../middleware/validateBody");

const router = express.Router();

router.get("/", listContactsCtrl);
router.get("/:contactId", getByIdCtrl);
router.post("/", validateBody(contactSchema), addContactCtrl);
router.delete("/:contactId", removeContactCtrl);
router.put("/:contactId", validateBody(contactSchema), updateContactCtrl);

module.exports = router;
