const express = require('express');
const { addContacts,getContacts,updateContacts,deleteContacts} = require('../controllers/contacts');
const router = express.Router();


router.post("/:id", addContacts)
router.get("/:id", getContacts)
router.put("/:id/edit/:userid", updateContacts)
router.delete("/:id/:userid",deleteContacts);

module.exports = router;