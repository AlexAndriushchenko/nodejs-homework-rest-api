const express = require("express");
const {
  listContactsCtrl,
  getByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
  updateStatusContactCtrl,
} = require("../../controllers/contactController");

const contactSchema = require("../../schemas/contactSchema");
const contactStatusSchema = require("../../schemas/contactStatusSchema");
const { validateBody } = require("../../middleware/validateBody");

const router = express.Router();

router.get("/", listContactsCtrl);
router.get("/:contactId", getByIdCtrl);
router.post("/", validateBody("contactSchema", contactSchema), addContactCtrl);
router.delete("/:contactId", removeContactCtrl);
router.put(
  "/:contactId",
  validateBody("contactSchema", contactSchema),
  updateContactCtrl
);
router.patch(
  "/:contactId/favorite",
  validateBody("contactStatusSchema", contactStatusSchema),
  updateStatusContactCtrl
);

module.exports = router;
