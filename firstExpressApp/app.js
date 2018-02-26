var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) {
    res.send("Hi There!");
});
// "/bye" => "Goodbye"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});

// "/dog" => "Meow!!"

app.get("/dog", function(req, res) {
    res.send("Meow!!!");
});

// when going to any other page use *

app.get("*", function(req, res) {
    res.send("You are a star!!!");
});

// Tell Express to listen for requests (START SERVER)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
