const router = require("express").Router();
const StudentController = require("../controller/studentController");

const upload = require("../utils/fileUpload");

router.post("/", upload.single("std_profile"), StudentController.create);
router.get("/", StudentController.index);
router.delete("/:id", StudentController.trash);
router.put("/:id", upload.single("std_profile"), StudentController.update);

router.get("/sendmail", StudentController.forget);
router.post("/sendOtp", StudentController.sendOtp);
router.post("/changeUser", StudentController.changeUser);
router.post("/login", StudentController.login);


module.exports = router;
