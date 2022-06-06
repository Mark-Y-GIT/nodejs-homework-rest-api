const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const getData = await fs.readFile(contactsPath, 'utf-8');

  console.log('listContacts ok');

  return JSON.parse(getData);
};

const getContactById = async contactId => {
  const getData = await listContacts();

  const getContactById = getData.find(dbContact => dbContact.id === contactId);

  console.log('getContactById ok');

  return getContactById || null;
};

const addContact = async body => {
  const { name, email, phone } = body;

  const getData = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  getData.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(getData, null, 2));
  console.log('addContact ok');
  return newContact;
};

const removeContact = async contactId => {
  const getData = await listContacts();
  const index = getData.findIndex(dbContact => dbContact.id === contactId);
  const deletedContact = getData[index];

  if (index !== -1) {
    getData.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(getData, null, 2));
    console.log('removeContact ok');
    return getData;
  }

  return deletedContact || null;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const getData = await listContacts();

  const index = getData.findIndex(dbContact => dbContact.id === contactId);

  const updatedContact = getData[index];

  if (index !== -1) {
    if (name) {
      getData[index].name = name;
    }
    if (email) {
      getData[index].email = email;
    }
    if (phone) {
      getData[index].phone = phone;
    }
  }

  await fs.writeFile(contactsPath, JSON.stringify(getData, null, 2));
  console.log('putContact ok');

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
