var express = require("express");
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campgrounds"),
	Comment = require("./models/comment"),
	seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
seedDB();
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
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});


app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
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
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new",{campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});









app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp Server has started!!!");
 });