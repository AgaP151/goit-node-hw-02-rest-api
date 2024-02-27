const Contact = require("../schemas/mongoSchema.js");

const listContacts = async (owner) => {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

async function getContactById(contactId, userId) {
  try {
    const contact = await Contact.findById({ _id: contactId });
    const contactOwner = contact.owner;

    if (userId.toString() !== contactOwner.toString()) {
      throw new Error("Not authorized. It is not your contact!");
    }
    return contact || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId, userId) {
  try {
    const removedContact = await Contact.findByIdAndDelete({ _id: contactId });
    const contactOwner = removedContact.owner;
    if (userId.toString() !== contactOwner.toString()) {
      throw new Error("Not authorized. It is not your contact!");
    }
    return removedContact || null;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = await Contact.create({ name, email, phone });
    return newContact;
  } catch (error) {
    return null;
  }
}

async function updateContactService(contactId, name, email, phone) {
  try {
    const existingContact = await Contact.findById({ _id: contactId });

    if (!existingContact) {
      return null;
    }

    existingContact.name = name || existingContact.name;
    existingContact.email = email || existingContact.email;
    existingContact.phone = phone || existingContact.phone;

    await existingContact.save();

    return existingContact;
  } catch (error) {
    return null;
  }
}

async function updateStatusContact(contactId, favorite) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error(`Error updating contact status: ${error}`);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
  updateStatusContact,
};
