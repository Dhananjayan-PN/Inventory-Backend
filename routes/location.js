const router = require("express").Router();
const locationController = require("../controllers/location");

router.post("/create", locationController.create);
router.get("/get-all", locationController.findAll);
router.get("/:locationId", locationController.findOne);
router.put("/:locationId", locationController.update);
router.delete("/:locationId", locationController.delete);

module.exports = router;
