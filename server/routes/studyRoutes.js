const express = require("express");
const router = express.Router();
const {
    addStudyHour,
    getStudyHours,
} = require("../controllers/studyController");

router.post("/", addStudyHour);
router.get("/", getStudyHours);

module.exports = router;