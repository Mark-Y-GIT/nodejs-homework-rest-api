const {
  listContacts,
  contactById,
  removeContact,
  addContact,
  updateContact,
} = require('../services');

const getAllContacts = async (_, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contactById(contactId);

    if (contact) {
      res.json(contact);
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    if (contact) {
      res.status(201).json(contact);
      return;
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await removeContact(contactId);
    if (contact) {
      res.json({ message: 'contact deleted' });
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      res.json(updatedContact);
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const favoriteContactToggle = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      res.json(updatedContact);
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  favoriteContactToggle,
};
