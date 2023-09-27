const UserController = require("../controllers/User.controller");
const express = require("express");

const router = express.Router();

router.post("/", UserController.store);


module.exports = router;
