const express = require('express');
const {auth} = require('../middlewares/auth');
const {loggedInUser,Login,registerUser} = require('../controllers/auth')
const { getContact } = require('../controllers/contacts');
const router = express.Router();

router.get("/",auth,loggedInUser);
router.post("/",Login);
router.post("/register",registerUser);
router.get("/:id", getContact)
module.exports = router;