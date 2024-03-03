const express = require("express");
const {
  listContactsAll,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  patchUpdateContact,
} = require("../../controllers/contactsControll.js");

const validateBody = require("../../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
  patchSchema,
} = require("../../schemas/contactsSchema");

const isValidId = require("../../helpers/isValidId.js");
const authenticate = require("../../services/authenticate.js");
const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, listContactsAll);

contactsRouter.get("/:id", authenticate, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  validateBody(patchSchema),
  patchUpdateContact
);

module.exports = contactsRouter;
