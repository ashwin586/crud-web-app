// const { render } = require("ejs");
let express = require("express");
let router = express.Router();
const usersController = require("../controllers/usersControllers");
const adminController = require("../controllers/adminControllers");

// Users GET methods
router.get("/", usersController.userLoginGet);
router.get("/dashboard", usersController.userSignedIn);
router.get("/signup", usersController.usersSignupGet);
router.get("/invalid", usersController.userSignedOutError);

// Users POST methods
router.post("/login", usersController.userLoginPost);
router.post("/signup", usersController.userSignupPost);
router.post("/logout", usersController.userLoggedOut);

// Admin GET methods
router.get("/adminLogin", adminController.adminLoginGet);
router.get("/admin", adminController.adminSignedIn);
router.get("/add_user", adminController.adminAddUserGet);
router.get("/adminLogout", adminController.adminSignedOut);
router.get("/edit/:id", adminController.userEditGet);
router.get("/delete/:id", adminController.deleteUserGet);
// Admin POST methods
router.post("/adminLogin", adminController.adminLoginPost);
router.post("/add_user", adminController.adminAddUserPost);
router.post("/update/:id", adminController.userEditPost);

module.exports = router;
