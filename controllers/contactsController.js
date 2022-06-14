const {
  contactsService: {
    listContacts,
    contactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
  },
} = require('../services');

const getAllContacts = async (req, res, next) => {
  try {
    const {
      query,
      user: { id },
    } = req;

    const allContacts = await listContacts({ query, id });
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { contactId } = req.params;

    const contact = await contactById({ contactId, id });

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
    const { id } = req.user;
    const { body } = req;

    const contact = await addContact({ body, id });

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
    const { id } = req.user;
    const { contactId } = req.params;

    const contact = await removeContact({ contactId, id });
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
    const { id } = req.user;
    const { contactId } = req.params;
    const { body } = req;

    const updatedContact = await updateContact({ contactId, body, id });

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
    const { body } = req;
    const { id } = req.user;

    const updatedContact = await updateStatusContact({ contactId, body, id });

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
