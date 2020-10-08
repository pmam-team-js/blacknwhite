var express = require("express");
var router = express.Router();
var tasks = require("../models/Task");
var comments = require("../models/Comment");
var profile = require("../models/Profile");
var user = require("../models/User");

router.post("/", function (req, res) {

    tasks.findById(req.body.id).exec(function (err, task) {
        if (err) {
            console.log(err);
            res.redirect("/task");
        } else {
            var commentObject = {
                text: req.body.text
            }
            comments.create(commentObject, function (err, comment) {
                if (err) {
                    //req.flash("error", "We encountered a System Error. Please try again later");
                    console.log("error")
                    console.log(err);

                } else {
                    user.findOne({ username: req.body.userid }).exec(function (err, userinfo) {
                        var author = {
                            id: userinfo._id,
                            username: userinfo.username
                        }

                        //add username and id to comment

                        comment.text = req.body.text;
                        comment.author.id = author.id;
                        comment.author.username = author.username;
                        profile.find({ username: author.username }).exec(function (err, profileinfo) {
                            if (err) {
                                console.log("ERROR" + err)
                                res.redirect("/task");
                            } else {
                                // console.log("profileinfo. 0th Element : " + profileinfo[0].Avatar)

                                comment.profile.push(profileinfo[0])
                                comment.save();
                                task.comments.push(comment);
                                task.save();
                                res.json({ success: 'Comments done.' })

                            }
                        });
                    });
                }
            });
        }
    });
});
router.get("/:id", function (req, res) {
    tasks.findById(req.params.id).populate({ path: 'comments', populate: { path: 'profile' } }).exec(function (err, thistask) {
        if (err) {
            console.log(err);
        } else {
            res.json({ task: thistask });
        }

    });
});
module.exports = router;