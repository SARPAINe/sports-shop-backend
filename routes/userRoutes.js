const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authrizePermissions,
} = require("../middleware/authentication");

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
} = require("../controllers/userController");

router
  .route("/")
  .get(authenticateUser, authrizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);

router.route("/updateUser").patch(authenticateUser, updateUser);

router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
