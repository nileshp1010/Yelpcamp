var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campgrounds"),
	Comment = require("./models/comment"),
	User = require("./models/user");
	//seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
//seedDB();
//  Campground.create(
// 		 {	
// 			name: "Granite hill", 
// 			image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?			crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
// 			description: "This is a huge granite hill, no bathrooms , no water. Beautiful Granite"
			
// 		},function(err,campground){
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log("Newly Created Campground");
// 				console.log(campground);
// 			}
// 		});

app.use(require("express-session")({
	secret: "Rusty wins",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.use(indexRoutes);
app.use("/campgrounds" ,campgroundRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp Server has started!!!");
 });