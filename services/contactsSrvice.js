const Contact = require("../schemas/mongoSchema.js");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

async function getContactById(id) {
  try {
    const contact = await Contact.findById(id);
    return contact || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(id) {
  try {
    const removedContact = await Contact.findByIdAndDelete(id);
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

async function updateContactService(id, name, email, phone) {
  try {
    const existingContact = await Contact.findById(id);

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

async function updateStatusContact(id, favorite) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
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
