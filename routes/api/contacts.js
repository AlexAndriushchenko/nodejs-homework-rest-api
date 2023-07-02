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
const authenticate = require("../../middleware/authMiddlewares");

const router = express.Router();

router.get("/", authenticate, listContactsCtrl);
router.get("/:contactId", authenticate, getByIdCtrl);
router.post(
  "/",
  authenticate,
  validateBody("contactSchema", contactSchema),
  addContactCtrl
);
router.delete("/:contactId", authenticate, removeContactCtrl);
router.put(
  "/:contactId",
  authenticate,
  validateBody("contactSchema", contactSchema),
  updateContactCtrl
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody("contactStatusSchema", contactStatusSchema),
  updateStatusContactCtrl
);

module.exports = router;
