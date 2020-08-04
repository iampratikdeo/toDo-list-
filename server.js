const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
var workList = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  var days = ["Sunday","Monday", "tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday"];

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day_new = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle:day_new, Newitem: items});

});

app.post("/", function(req,res){
  console.log(req.body.list);
  var item = req.body.newItem;
  if(req.body.list === "Work"){
    workList.push(item);
    res.redirect("/work");

  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", Newitem: workList});
});

app.post("/work", function(req,res){
  var item = req.body.newItem;
  workList.push(item);
  res.redirect("/work");
});

app.listen("8080", function(){
  console.log("Server is running at port 8080");
});
