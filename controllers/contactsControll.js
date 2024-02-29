const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
  updateStatusContact,
} = require("../services/contactsSrvice.js");

const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchema.js");

const listContactsAll = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await listContacts(userId);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(id, userId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const deletedContact = await removeContact(id, userId);
  if (deletedContact) {
    res.status(200).json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.user._id;

  const { error } = createContactSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const newContact = await addContact(name, email, phone, userId);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const userId = req.user._id;

  if (!name && !email && !phone && Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const { error } = updateContactSchema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const updatedContact = await updateContactService(
    id,
    name,
    email,
    phone,
    userId
  );

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const patchUpdateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res
        .status(400)
        .json({ message: "Favorite must be a boolean value" });
    }
    const userId = req.user._id;
    const updatedContact = await updateStatusContact(id, favorite, userId);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(`Error updating contact status: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  listContactsAll,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  patchUpdateContact,
};
