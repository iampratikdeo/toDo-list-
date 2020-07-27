const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.get("/", function(req, res){
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  var days = ["Sunday","Monday", "tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday"];
  // if(today.getDay() === 6 || today.getDate() === 0){
  //   day = "weekend";
  //   res.render("list", {KindOfDay: day});
  //
  // }else {
  //   day = "weekday";
  //   res.render("list", {KindOfDay: day});
  // }

  for(var i = 0; i < 7; i++){

    if(i == currentDay){
      day = days[i];
      break;
    }
  }
  console.log(today);
  res.render("list", {KindOfDay:day});

});

app.listen("8080", function(){
  console.log("Server is running at port 8080");
});
