let express = require("express");
let router = express.Router();
const path = require("path");
const controller = require("../../controllers/api/apiUsersController");

router.get("/users", controller.userList)
router.get("/users/:id", controller.userDetails)

module.exports = router;