const express = require("express");
const {
  getAllContacts,
  createContacts,
  getContact,
  updateContacts,
  deleteContacts,
} = require("../controller/contactController");
const authHandler = require("../middleware/authHandler");
const router = express.Router();

router.use(authHandler);
router.route("/").get(getAllContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContacts).delete(deleteContacts);

module.exports = router;
