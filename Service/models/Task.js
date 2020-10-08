var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    projectid: String,
    userid: String,
    dated: {
        type: Date,
        default: Date.now
    },
    description: String,
    status: {
        type: String,
        default: "OPEN"
    },
    seqno: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Likes"
        }
    ]
});

module.exports = mongoose.model("Task", taskSchema);