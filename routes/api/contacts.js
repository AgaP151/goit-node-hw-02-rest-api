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

const contactsRouter = express.Router();

contactsRouter.get("/", listContactsAll);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(patchSchema),
  patchUpdateContact
);

module.exports = contactsRouter;
