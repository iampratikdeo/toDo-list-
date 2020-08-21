const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

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





app.get("/", function(req, res){


  itemModel.find({}, function(err, foundItems){

      if(foundItems.length === 0 ){
        itemModel.insertMany(defaultItems, function(err){
          if(err){
            console.log(err);
          } else console.log("insert successful");
        });
        res.redirect("/");
      } else {
        res.render("list", {listTitle:"Today", Newitem: foundItems});
      }
  });



});

app.post("/", function(req,res){
    const itemName = req.body.newItem;

    const item = new itemModel({
      name: itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req,res){

  const deleteitemId = req.body.deleteItem;

  itemModel.findByIdAndRemove(deleteitemId, function(err){
    if(!err){
      console.log("deleted");
      res.redirect("/");
    } else console.log(err);
  });


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
