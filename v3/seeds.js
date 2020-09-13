var mongoose = require("mongoose"),
	Campground = require("./models/campgrounds"),
	Comment = require("./models/comment");
var data = [
	{
	name: "Cloud's Rest", 
	image: "https://www.backpacker.com/.image/t_share/MTQ0OTE0MDA0NzQ4ODA1ODYx/bp0615nps100_ordelheide_cloudsrest_750x400.jpg",
	description: "blah"
	},
	{
		name: "Cloud's Rest 2", 
		image: "https://lh5.googleusercontent.com/-jNp4eNLUv20/Ugw-_j42TmI/AAAAAAAAJxU/XHXHvqnsPhw/s640/IMG_4179.jpg",
	 	description: "blah blah"
	},
	{
		name: "Cloud's Rest 3", 
		image: "https://images.rove.me/w_1920,q_85/puzwupv1f56nrteuntdw/yosemite-clouds-rest.jpg",
	 	description: "blah blah blah"
	}
]
function seedDB(){
	Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
	data.forEach(function(seed){
	Campground.create(seed,function(err,campground){
		if(err){
			console.log(err);
		} else {
			console.log("added a campground");
			Comment.create(
				{
					text: "This place is great, but i wish ther was internet",
					author: "Homer"
				},function(err,comment){
					if(err){
						console.log(err);
					}else{
						campground.comments.push(comment);
						campground.save();	
						console.log("Created new Comments");
					}
				});
		}
	});
	});
	});
}

module.exports = seedDB;