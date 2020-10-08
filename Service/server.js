const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose=require("mongoose")
const app = express();
const compression = require('compression');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({extended:false})
);


// Database connction 
// Local Url install mondgodb
//const mongouri="mongodb://127.0.0.1:27017/TestDatabase";

// Mongodb Atlas url for connecting database
// Changes by Pradip Mehta
const mongouri="mongodb://kalp0402:kalp0402@cluster0-shard-00-00.dag01.mongodb.net:27017,cluster0-shard-00-01.dag01.mongodb.net:27017,cluster0-shard-00-02.dag01.mongodb.net:27017/TestDatabase?ssl=true&replicaSet=atlas-cktky5-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(mongouri, {
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,     
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Start Componenet Routes


app.use(compression()); //use compression 
app.use(express.static(path.join(__dirname, 'public')));

var Users =require("./routes/Users");
app.use("/users", Users);


var Profile =require("./routes/Profile");
app.use("/profiles", Profile);

var Project =require("./routes/Project");
app.use("/projects", Project);

var Task =require("./routes/Task");
app.use("/tasks", Task);


var Like =require("./routes/Like");
app.use("/likes", Like);

var Comment =require("./routes/Comment");
app.use("/comments", Comment);

// End Component Routes

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
