var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");



// User.create ({
//   email: "bob@gmail.com",
//   name: "Bob Belcher"
// });


// Post.create({
//   title:"Ho wto cook the Best Burgers",
//   content: "blah blah blah blah blah"
// }, function(err, post) {
//     console.log(post);
// });

// Post.create({
//   title:"How to cook the Best Burgers - Part 4",
//   content: "Cut that cow up."
// }, function(err, post) {
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post.id);
//             foundUser.save(function(err, data){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

Post.create({
  title:"How to cook the Best Burgers - Part ",
  content: "Chop big chunks out of that cow!!"
}, function(err, post) {
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.posts.push(post.id);
            foundUser.save(function(err, data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// find user
//find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });