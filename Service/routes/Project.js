const express = require("express")
const cors = require("cors")
var router = express.Router();
var project = require("../models/Project");
router.use(cors())

// Get Project List
router.get("/", function (req, res) {
    //findByIdAndRemove
    project.find().exec(function (err, projects) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.json(projects);
        }
    });
});

function getdate(strdate)
{
    //convert to date time
    var d = new Date(strdate),
    startmonth = d.getMonth()+1,
    startyear = d.getFullYear(),
    startday = d.getDate();
    return new Date(startyear+','+startmonth+','+startday);   
}

// Add New Project
router.post("/add", function (req, res) {
    var projectname = req.body.ProjectName;
    var startdate = getdate(req.body.StartDate);
    var finishdate = getdate(req.body.FinishDate);
    var description = req.body.ProjectDescription;
    var type = req.body.Type;
    var client = req.body.Client;

    //res.redirect("/project");
    var newproject = {
        ProjectName: projectname, ProjectDescription: description,
        StartDate: startdate,
        FinishDate: finishdate,
        Type: type,
        Client: client
    }

    // Create a new campground and save to DB
    project.create(newproject, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.json(newlyCreated);
        }
    });
});
router.delete("/:id", function (req, res) {
    //res.send("you are trying to delete something")
    project.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.json(error);
            // res.send('task deleted.....')
        } else {
            res.json({ success: 'Project deleted.' })
        }
    });
});
module.exports = router;
