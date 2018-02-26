var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    methodOverride = require("method-override");
    
//Requiring Routes (which are broken into their own folders in the routes directory)
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    


mongoose.connect("mongodb://localhost/yelp_camp_v10");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// seedDB(); //Seed database

// PASSPORT CONFIGURATIOM

app.use(require("express-session")({
    secret: "I live with my wife susan",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passing currentUser to all routes (Middleware)
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


// it is possible to add a prefix address to each route in the corresponding routes folder using (app.use("/campgrounds", campgroundRoutse); 
// would put /campgrounds onto the beginning of each url address, the router file would need to be changed to take this off the beggining of each line

app.use(indexRoutes);
// I have added the prefix of the route for comments so we dont have to use the whole long address.
app.use(commentRoutes);
app.use(campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});