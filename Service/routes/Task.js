const express = require("express")
const cors = require("cors")
var router = express.Router();
var task = require("../models/Task");
var profile = require("../models/Profile");
var project = require("../models/Project");
var timetrack = require("../models/TimeTrack");
var user = require("../models/User");

router.use(cors())

router.post("/", function (req, res) {

    var projectid = req.body.projectid;
    var userid = req.body.userid;
    var description = req.body.description;
    var seqno = 1 //"req.body.TaskCounter" + 1

    profile.findOne({ username: userid }).populate('Projects').exec(function (err, profileinfo) {
        if (profileinfo != null) {
            if (profileinfo.Projects.length > 0) {
                projectid = profileinfo.Projects[0]._id;
                var newTask = { projectid: projectid, userid: userid, description: description, seqno: seqno }
                task.create(newTask, function (err, newlyCreated) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(newlyCreated);
                    }
                });
            }
            else
                res.json({ error: 'Project not assigned' })
        }
        else
            res.json({ error: 'Project not assigned' })
    });
});

// router.get("/:username", async (req, res, next) => {

//     var d = new Date(),
//         hour = d.getHours(),
//         min = d.getMinutes(),
//         month = d.getMonth() + 1,
//         year = d.getFullYear(),
//         sec = d.getSeconds(),
//         day = d.getDate();
//     var projectid = ""
//     var timetrackcount = 0;
//     var countTimeTrack = 0;
//     await timetrack.find({ 'author.username': req.params.username, 'play': true, 'TimeLogged': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, todaysTime) {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             var iCtr = 0;
//             var dt1;
//             var dt2;
//             var sumtime = 0;
//             if (todaysTime.length > 0) {
//                 for (iCtr = 0; iCtr < todaysTime.length; iCtr++) {
//                     if (iCtr != 0) {
//                         dt2 = todaysTime[iCtr].TimeLogged;
//                         sumtime += getTimeDifference(dt1, dt2)
//                         //console.log("Sum Time in Hours EVEN: ", sumtime );
//                         dt1 = todaysTime[iCtr].TimeLogged;
//                     }
//                     else {
//                         dt1 = todaysTime[iCtr].TimeLogged;
//                     }

//                 }
//                 //sumtime=getTimeDifference(todaysTime[0].TimeLogged,todaysTime[todaysTime.length-1].TimeLogged)
//                 // if (((iCtr + 1) % 2) != 0) {
//                 //     //console.log("ODD HENCE ADDING TILL CURRENT TIME..............................................................")
//                 //     sumtime += getTimeDifference(dt1, new Date())

//                 // }

//             }
//         }

//         //console.log("Sum Time in Hours: ", sumtime );
//         timetrackcount = sumtime;
//     }).sort('TimeLogged');
//     await timetrack.find({ 'author.username': req.params.username, 'TimeLogged': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }).countDocuments(function (err, count) {
//         countTimeTrack = count;
//     });

//     await profile.findOne({ username: req.params.username }).populate('Projects').exec(function (err, profileinfo) {
//         if (profileinfo.Projects[0] != undefined) {
//             projectid = profileinfo.Projects[0]._id;

//             task.find({ 'userid': req.params.username, 'projectid': projectid, 'dated': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, mytask) {
//                 task.find({ 'userid': { '$nin': [req.params.username] }, 'projectid': projectid, 'dated': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, othertask) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         res.json({ tasks1: mytask, tasks2: othertask, timetrackcount: timetrackcount, countTimeTrack: countTimeTrack });
//                     }
//                 }).sort('userid');
//             }).sort('userid');
//         }
//         else {
//             res.json({ tasks1: {}, tasks2: {} });
//         }
//     });
// });

router.delete("/:id", function (req, res) {
    //res.send("you are trying to delete something")
    task.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.json(error);
            // res.send('task deleted.....')
        } else {
            res.json({ success: 'Task deleted.' })
        }
    });
});
router.put("/", function (req, res) {
    //find the campground with provided ID
    task.findOneAndUpdate({ "_id": req.body.Id }, { "$set": { "status": req.body.TaskStatus } })
        .exec(function (err, updatedtask) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 'Task status updated.' })
            }
        });
});
router.post("/reports", function (req, res) {
    //console.log("Project List Inside Get")
    var dated = req.body.date;
    //console.log("Project List Inside Else")
    var d = new Date(dated),
        month = d.getMonth() + 1,
        year = d.getFullYear(),
        day = d.getDate();

    var projectid = 0;
    project.find({ ProjectName: req.body.projectName }).exec(function (err, projectInfo) {
        projectid = projectInfo[0]._id
        var date = new Date();
        // add a day
        var nextday = new Date();
        nextday.setDate(d.getDate() + 1);
        nyear = nextday.getFullYear();
        nday = nextday.getDate();
        nmonth = nextday.getMonth() + 1;

        // find all userid from users
        task.find({ 'userid': req.body.username, 'projectid': projectid, 'dated': { $lt: new Date(nyear + ',' + nmonth + ',' + nday), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, mytask) {
            task.find({ 'userid': { '$nin': [req.body.username] }, 'projectid': projectid, 'dated': { $lt: new Date(nyear + ',' + nmonth + ',' + nday), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, othertask) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ tasks1: mytask, tasks2: othertask });
                }
            }).sort('userid');
        }).sort('userid');
    });

});
router.post("/timetrack", function (req, res) {
    user.findOne({ username: req.body.userid }).exec(function (err, userinfo) {
        var author = {
            id: userinfo._id,
            username: userinfo.username
        }
        var timetrackelement = { author: author, play: req.body.play }
        timetrack.create(timetrackelement, function (err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                res.json(newlyCreated)
            }
        });
    });
});

function getTimeDifference(dtDate1, dtDate2) {
    var date1 = new Date(dtDate1);
    var date2 = new Date(dtDate2);
    var difference = Math.abs(date1.getTime() - date2.getTime());
    return difference;
}

router.get("/:username", function (req, res) {

    var d = new Date(),
        hour = d.getHours(),
        min = d.getMinutes(),
        month = d.getMonth() + 1,
        year = d.getFullYear(),
        sec = d.getSeconds(),
        day = d.getDate();
    var projectid = ""
    var timetrackcount = 0;
    var countTimeTrack = 0;
    var timetrackcountfalse = 0
    timetrack.find({ 'author.username': req.params.username, 'play': false, 'TimeLogged': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, todaysTime) {
        if (err) {
            console.log(err)
        }
        else {
            var iCtr = 0;
            var dt1;
            var dt2;
            var sumtime = 0;
            if (todaysTime.length > 0) {
                for (iCtr = 0; iCtr < todaysTime.length; iCtr++) {
                    if (iCtr != 0) {
                        dt2 = todaysTime[iCtr].TimeLogged;
                        sumtime += getTimeDifference(dt1, dt2)
                        //console.log("Sum Time in Hours EVEN: ", sumtime );
                        dt1 = todaysTime[iCtr].TimeLogged;
                    }
                    else {
                        dt1 = todaysTime[iCtr].TimeLogged;
                    }

                }
                //sumtime=getTimeDifference(todaysTime[0].TimeLogged,todaysTime[todaysTime.length-1].TimeLogged)
                // if (((iCtr + 1) % 2) != 0) {
                //     //console.log("ODD HENCE ADDING TILL CURRENT TIME..............................................................")
                //     sumtime += getTimeDifference(dt1, new Date())

                // }

            }
        }

        //console.log("Sum Time in Hours: ", sumtime );
        timetrackcount = sumtime;
    }).sort('TimeLogged');
    timetrack.find({ 'author.username': req.params.username, 'play': false, 'TimeLogged': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }).countDocuments(function (err, count) {
        countTimeTrack = count;
    });
    var playTime = true;
    timetrack.findOne({ 'author.username': req.params.username, 'TimeLogged': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }).sort({ _id: -1 }).limit(1).exec(function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            if (res != null)
                playTime = res.play;
        }
    });
    profile.findOne({ username: req.params.username }).populate('Projects').exec(function (err, profileinfo) {
        if (profileinfo != null) {
            if (profileinfo.Projects[0] != undefined) {
                projectid = profileinfo.Projects[0]._id;
                console.log(projectid)
                task.find({ 'userid': req.params.username, 'projectid': projectid, 'dated': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, mytask) {
                    task.find({ 'userid': { '$nin': [req.params.username] }, 'projectid': projectid, 'dated': { $lt: new Date(), $gte: new Date(year + ',' + month + ',' + day) } }, function (err, othertask) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ tasks1: mytask, tasks2: othertask, timetrackcount: timetrackcount, countTimeTrack: countTimeTrack, playTime: playTime });
                        }
                    }).sort('userid');
                }).sort('userid');
            }
            else {
                res.json({ tasks1: {}, tasks2: {} });
            }
        }
        else {
            res.json({ tasks1: {}, tasks2: {} });
        }
    });
});
router.post('/tasksearch', function (req, res) {
    profile.findOne({ username: req.body.username }).populate('Projects').exec(function (err, profileinfo) {
        if (profileinfo != null) {
            if (profileinfo.Projects[0] != undefined) {
                let projectid = profileinfo.Projects[0]._id;
                const title = req.body.txtsearch;
                var condition = title ? { description: { $regex: new RegExp(title), $options: "i" },'projectid': projectid } : {};
                task.find(condition, function (err, searchresults)
                //task.find({ 'description': req.body.txtsearch, 'projectid': projectid }, function (err, searchresults)
                //{description:{ '$in': [req.body.txtsearch]}},function(err,searchresults)
                {
                    if (err) {
                        res.json({ taskResult: {}, recordCount: 0 });
                    }
                    else {
                        res.json({ taskResult: searchresults, recordCount: searchresults.length }); //,{fileslist: files}      
                    }
                }).sort('dated');
            }
        }
        else
            res.json({ taskResult: {}, recordCount: 0 });
    });

});
module.exports = router;