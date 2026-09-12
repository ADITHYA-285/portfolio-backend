const express = require("express");

const { getSkills } = require("../controller/skillcontroller");

const router = express.Router();

router.get("/", getSkills);

module.exports = router;