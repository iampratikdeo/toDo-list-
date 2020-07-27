const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res){
  var today = new Date();

  if(today.getDay() === 6 || today.getDate() === 0){
    res.send("<h1>Yay it's the weekend!</h1>")
  }else {
    res.send("<h1>Boo! It's a weekday</h1>");
  }

});

app.listen("8080", function(){
  console.log("Server is running at port 8080");
});
