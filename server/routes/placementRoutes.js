const express = require("express");
const router = express.Router();
const {
    getPlacements,
    addPlacement,
} = require("../controllers/placementController");

router.get("/", getPlacements);
router.post("/", addPlacement);
module.exports = router;