const express = require("express");
const router = express();
const { clearDB } = require("../controllers/clearDB");
const {
    authenticateUser,
    authrizePermissions,
} = require("../middleware/authentication");

router.delete("/", authenticateUser, authrizePermissions("admin"), clearDB);
module.exports = router;
