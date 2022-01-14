const router = require("express").Router();
const itemController = require("../controllers/item");

router.post("/create", itemController.create);
router.get("/get-all", itemController.findAll);
router.get("/:itemId", itemController.findOne);
router.put("/:itemId", itemController.update);
router.delete("/:itemId", itemController.delete);

module.exports = router;
