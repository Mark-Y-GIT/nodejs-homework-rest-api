const { Contact } = require('../models/contactsModel');

const listContacts = async ({ query, id: userId }) => {
  const { page, limit, favorite = null } = query;

  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;

  if (favorite !== null) {
    return Contact.find(
      { owner: userId, favorite },
      {},
      { skip, limit: +limit },
    );
  }
  return Contact.find({ owner: userId }, {}, { skip, limit: +limit });
};

const contactById = async ({ contactId, id: userId }) => {
  return Contact.findOne({ owner: userId, contactId }).populate({
    path: 'owner',
    select: 'email',
  });
};

const addContact = async ({ body, id: userId }) => {
  return Contact.create({ ...body, owner: userId });
};

const removeContact = async ({ contactId, id: userId }) => {
  return Contact.findOneAndDelete({ owner: userId, contactId });
};

const updateContact = async ({ contactId, body, id: userId }) => {
  console.log(contactId, body, userId);
  return Contact.findOneAndUpdate({ contactId, owner: userId }, body, {
    new: true,
  });
};

const updateStatusContact = async ({ contactId, body, id: userId }) => {
  return Contact.findOneAndUpdate({ contactId, owner: userId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  contactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
