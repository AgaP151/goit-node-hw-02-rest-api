const Contact = require("../schemas/mongoSchema.js");
const HttpError = require("../helpers/HttpError.js");
const updateContact = require("../controllers/contactsControll.js");

const listContacts = async (userId) => {
  try {
    const contacts = await Contact.find({ owner: userId });
    return contacts;
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, owner: userId });

    if (!contact) {
      throw Error(404, "Contact not found");
    }
    return contact;
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const removeContact = async (contactId, userId) => {
  try {
    const removedContact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: userId,
    });
    if (!removeContact) {
      throw Error(404, "Contact not found");
    }
    return removedContact;
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const addContact = async (name, email, phone, userId) => {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      owner: userId,
    });
    return newContact;
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const updateContactService = async (contactId, name, email, phone, userId) => {
  try {
    const existingContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      { name, email, phone },
      { new: true }
    );
    if (!existingContact) {
      throw Error(404, "Contact not found");
    }
    return existingContact;
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

const updateStatusContact = async (contactId, favorite, userId) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      { favorite },
      { new: true }
    );
    if (!updateContact) {
      throw Error(404, "Contact not found");
    }
    return updatedContact;
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
  updateStatusContact,
};
