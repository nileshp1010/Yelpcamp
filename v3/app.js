var express = require("express");
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campgrounds"),
	seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

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

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
//	res.render("campgrounds",{campgrounds:campgrounds});
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
});


app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//campgrounds.push(newCampground);
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp Server has started!!!");
 });