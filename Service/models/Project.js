var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    ProjectName: String,
    ProjectDescription: String,
    StartDate: Date,
    FinishDate: Date,
    Type: String,
    Client: String
});

module.exports = mongoose.model("Project", ProjectSchema);