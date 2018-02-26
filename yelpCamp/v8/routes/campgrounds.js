var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");



// INDEX show all campgrounds
router.get("/campgrounds", function(req, res) {
    
    Campground.find({}, function(err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE - add new campground to database
router.post("/campgrounds", isLoggedIn, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name:name , image:image, description: desc};
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});
   
// SHOW new campground create form 
router.get("/campgrounds/new",isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
   });
   
   
// SHOW ROUTE   more information about campground
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
  
});

//middleware
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;