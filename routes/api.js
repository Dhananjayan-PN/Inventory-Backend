const router = require("express").Router();
const itemRoute = require("./item");
const locationRoute = require("./location");

router.use("/item", itemRoute);
router.use("/location", locationRoute);

module.exports = router;
