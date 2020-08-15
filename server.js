const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
var items = [];
var workList = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true , useUnifiedTopology: true});
const itemSchema = new mongoose.Schema({
  name: String
});

const itemModel = mongoose.model("Item", itemSchema);

const item1 = new itemModel({
  name: "Buy Grcoeries"
});

const item2 = new itemModel({
  name: "FInish mongoose"
});

const item3 = new itemModel({
  name: "Eat food"
});
const defaultItems = [item1, item2, item3];

itemModel.insertMany(defaultItems, function(err){
  if(err){
    console.log(err);
  } else console.log("insert successful");
});

app.get("/", function(req, res){

  res.render("list", {listTitle:"Today", Newitem: items});

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

app.get("/about", function(req, res){
  res.render("about");
});

app.listen("8080", function(){
  console.log("Server is running at port 8080");
});
