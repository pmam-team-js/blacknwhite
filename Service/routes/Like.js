var express = require("express");
var router = express.Router();
var task = require("../models/Task");
var likes = require("../models/Like");
var user = require("../models/User");

//Likes Create
router.post("/", function (req, res) {
    task.findById(req.body.id, function (err, task) {
        if (err) {
            res.json(err)
        } else {
            var author = {}
            user.findOne({ username: req.body.userid }).exec(function (err, userinfo) {
                author = {
                    id: userinfo._id,
                    username: userinfo.username
                }
            })
            likes.create(author, function (err, like) {
                if (err) {
                    res.json(err)
                } else {
                    like.author = author;
                    like.save();
                    task.likes.push(like);
                    task.save();
                    res.json({ success: 'Likes done.' })

                }
            });
        }
    });
});

module.exports = router;