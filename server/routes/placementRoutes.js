const express = require("express");
const router = express.Router();
const {
    getPlacements,
    addPlacement,
    updatePlacementStatus,
    deletePlacement,
} = require("../controllers/placementController");

router.get("/", getPlacements);
router.post("/", addPlacement);
router.put("/:id", updatePlacementStatus);
router.delete("/:id", deletePlacement);

module.exports = router;