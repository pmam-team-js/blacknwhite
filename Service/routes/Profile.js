const express = require("express")
const cors = require("cors")
var router = express.Router({ mergeParams: true });
var profile = require("../models/Profile");
var user = require("../models/User");
var project = require("../models/Project");
router.use(cors())

router.post("/update", function (req, res) {
    //findByIdAndRemove
    var avatar = "";
    if (req.body.avatar != "none") {
        avatar = req.body.avatar;//"https://semantic-ui.com/images/avatar/small/" + req.body.avatar + ".jpg"
    }
    else {
        avatar = "none"
    }
    const opts = { new: true, upsert: true };

    user.findOne({ username: req.body.username }).exec(function (err, userinfo) {
        var user = {
            id: userinfo._id,
            username: userinfo.username
        }
        if (err) {
            console.log("ERROR" + err)
            //res.redirect("/task");
        } else {
            profile.findOneAndUpdate({ username: req.body.username }, {
                username: req.body.username, User: user, FirstName: req.body.FirstName,
                LastName: req.body.LastName, Role: req.body.Role, Avatar: req.body.Avatar
            }, opts).exec(function (err, updateprofile) {
                if (err) {
                    console.log("ERROR" + err)
                } else {
                    res.json(updateprofile);
                }
            });
        }
    });
    //res.render("profile")
});

router.get("/profile/:username", (req, res) => {
    profile.findOne({
        username: req.params.username
    })
        .then(profile => {
            if (profile) {
                res.json(profile);
            } else {
                res.send('User does not exists..')

            }
        })
        .catch(err => {
            res.send('error' + error)
        })
})
router.get("/", function (req, res) {

    profile.find().populate('Projects').exec(function (err, profileinfo) {
        var result = [];
        for(i in profileinfo){
            if(profileinfo[i].Projects.length>0)
            result.push({username: profileinfo[i].username,projectName:profileinfo[i].Projects[0].ProjectName});
            else
            result.push({username: profileinfo[i].username,projectName:""});
        } 
        if (err) {
            res.redirect("/profile");
        } else {
        // res.contentType('application/json');
        // res.send(JSON.stringify(result));
            res.json(result);
        }
    });
});

// Assing Project
router.put("", function (req, res) {
    //findByIdAndRemove

    //const opts = { new: true, upsert: true };
    profile.find(req.param.username).populate("projects").exec(function (err, profileInfo) {
        if (err) {
            console.log(err);
            res.redirect("/user");
        } else {
            project.find({ ProjectName: req.body.projectName }).exec(function (err, projectInfo) {
                if (err) {
                    console.log("NO RECORD FOUND")
                }
                else {
                    // Clear the Profile - Projects
                    //profileInfo.Projects.splice(0, profileInfo.Projects.length);

                    const opts = { new: true, upsert: true };
                    profile.findOneAndUpdate({ username: req.body.username }, {
                        Projects: projectInfo
                    }, opts).exec(function (err, updateprofile) {
                        if (err) {
                            console.log("ERROR" + err)
                        } else {
                            res.json(updateprofile);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;