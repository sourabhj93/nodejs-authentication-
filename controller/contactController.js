/* to avoid writing try and catch inside async block */
const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactModel");

//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create Contact
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contacts = await Contacts.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contacts);
});

//@desc Get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.sendStatus(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.sendStatus(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.sendStatus(403);
    throw new Error("Not allowed");
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.sendStatus(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.sendStatus(403);
    throw new Error("Not allowed");
  }
  await Contacts.findOneAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  createContacts,
  getContact,
  updateContacts,
  deleteContacts,
};
