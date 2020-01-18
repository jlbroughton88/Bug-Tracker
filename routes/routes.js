
const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller.js")

router.get("/", user_controller.test);
// router.get("/error", user_controller.error)
router.get("/finduser/:email", user_controller.get_user) ;
router.get("/newuser/:uid/:email/:given_name/:family_name/:nickname/:company/:role/:date_created/:time_created", user_controller.add_user_social);
router.get("/addname/:given_name/:family_name/:email", user_controller.add_name);
router.get("/addcomprole/:company/:role/:email", user_controller.add_comp_role);
router.post("/issue/post", user_controller.post_issue);
router.get("/issues/:user_uid", user_controller.get_user_issues);
router.get("/getallissues", user_controller.get_all_issues);
router.get("/getissue/:uid", user_controller.get_selected_issue);
router.get("/deleteissue/:uid", user_controller.delete_selected_issue);
router.post("/addcomment/:issueuid", user_controller.add_comment);
router.get("/getcomments/:issueuid", user_controller.get_comments);
router.get("/getvotes/:issueuid", user_controller.get_votes);
router.post("/postvote", user_controller.post_vote);
router.get("/updatevote/:upvoted/:downvoted/:issue_uid/:user_uid", user_controller.update_vote);

module.exports = router;