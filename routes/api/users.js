let express = require("express");
let router = express.Router();
const path = require("path");
const controller = require("../../controllers/api/apiUsersController");

router.get("/", controller.userList)
router.get("/:id", controller.userDetails)

module.exports = router;