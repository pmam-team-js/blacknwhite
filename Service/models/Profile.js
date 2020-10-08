const mongoose = require("mongoose");
var ProfileSchema = new mongoose.Schema({
    User: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    username: String,
    FirstName: String,
    LastName: String,
    Avatar: String,
    Role: String,
    Projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
});
module.exports = Profile = mongoose.model("Profile", ProfileSchema)