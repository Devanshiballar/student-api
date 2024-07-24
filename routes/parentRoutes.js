const router = require("express").Router();
const { varifyStudent } = require("../config/auth");
const parentController = require("../controller/parentController");

router.post("/",varifyStudent, parentController.create);
router.get("/", parentController.index);

module.exports = router;
