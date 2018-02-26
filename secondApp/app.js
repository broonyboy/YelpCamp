var express = require("express");
var app = express();

app.get("/", function(req, res) {
   res.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:animal", function(req, res) {
    var animalType = req.params.animal.toLowerCase();
   var sound = {
       pig : "oink",
       cow : "moo",
       dog : "WOOF WOOF!!",
       cat : "Meow!",
       goldfish : "..."
   };
   res.send("The " + animalType + " says '" + sound[animalType] + "'"); 
});

app.get("/repeat/:greet/:num", function(req, res) {
    var greeting = req.params.greet;
    var nums = Number(req.params.num);
    var string = "";
    for (var i = 0; i < nums; i++) {
        string = string + greeting + " ";
    }
    res.send(string);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
