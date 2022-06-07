const { Contact } = require('../models/contactsModel');

const listContacts = async () => {
  return Contact.find();
};

const contactById = async contactId => {
  return Contact.findById(contactId);
};

const addContact = async body => {
  return Contact.create(body);
};

const removeContact = async contactId => {
  return Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  contactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
