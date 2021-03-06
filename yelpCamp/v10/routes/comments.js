var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments new
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); 
        }
    });
   
});

//comments CREATE
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res) {
   // Lookup campground using id
   Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function (err, comment) {
               if (err) {
                   console.log(err);
               } else {
                   //add username and Id
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   
                   //save comment
                   comment.save();
                   campground.comments.push(comment._id);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
   });
   
});

//Edit Route

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});

//UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {

    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function (err) {
       if(err) {
        res.redirect("back");   
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});





module.exports = router;