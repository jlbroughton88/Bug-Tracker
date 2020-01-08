
const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller.js")

router.get("/", user_controller.test)
// router.get("/error", user_controller.error)
router.get("/finduser/:email", user_controller.get_user) 
router.get("/newuser/:uid/:email/:given_name/:family_name/:nickname/:company/:role/:date_created/:time_created", user_controller.add_user_social);
router.get("/addname/:given_name/:family_name/:email", user_controller.add_name);

module.exports = router;