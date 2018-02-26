var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8457/7930235502_df747573ca.jpg"},
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8457/7930235502_df747573ca.jpg"},
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8457/7930235502_df747573ca.jpg"}
    ]

app.get("/", function(req,res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
   res.render("campgrounds", {campgrounds: campgrounds}) 
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs") 
});

app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name:name , image:image}
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});