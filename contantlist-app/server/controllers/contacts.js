
const User = require("../models/User");
const Contact = require("../models/Contact");
const Error = require("../middlewares/error");

//@desc     Get all  your saved contact
//@route    Get  /api/contacts
//@access   Private
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.params.id }).sort({
            date: -1,
        });
        console.log(contacts)
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json(Error(error.message));
    }
};


exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        console.log(contact)
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json(Error(error.message));
    }
};
//res.data = conctacts

//@desc      Add a new contact in your user account
//@route     Post   /api/contacts
//@access    Private
exports.addContacts = async (req, res) => {
    try {
        const { name, email, phone} = req.body;
        console.log(req.user)
        const newContact = new Contact({
            user: req.params.id,
            name,
            email,
            phone,
        });
        const contact = await newContact.save();
      return  res.json({
            success: true,
            data: contact,
            msg: "Contact added",
        });
    } catch (error) {
      return  res.status(400).json(Error(error.message));
    }
};

//@desc      Update your existing contact
//@route     Put   /api/contacts/:id
//@access    Private
exports.updateContacts = async (req, res) => {
    const { name, email, phone} = req.body;
    // Build contact object
    const contactField = {};
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;


    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json(Error("Contact not found "));
        // make sure that user owns contact
        if (contact.user.toString() !== req.params.userid) {
            return res.status(401).json(Error("Not authorized"));
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, {
            $set: contactField,
        },
            { new: true });
     return   res.status(200).json(contact);
    } catch (error) {
        console.log(error.message);
       return res.status(500).json(Error("server error"));
    }
};

//@desc      Delete your existing contact
//@route     Delete   /api/contacts/:id
//@access    Private
exports.deleteContacts = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json(Error("Contact not Found"));
        }
        // make sure that user owns contact
        if (contact.user.toString() !== req.params.userid) {
            return res.status(401).json(Error("Not authorized"));
        }
        await Contact.findByIdAndRemove(req.params.id);
      return  res.status(200).json(Error("Contact removed"));
    } catch (error) {
        console.log(error.message);
      return  res.status(500).send("Server Error");
    }
};