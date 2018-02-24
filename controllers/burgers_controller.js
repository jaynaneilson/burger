var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

// router.get("/", function(req,res){
// 	res.redirect("burgers")
});

router.get("/burgers", function(req,res){
	burgers.selectAll(function(data){
		var hbsObject = {
			burgers: data
		};
		
		res.render("index", hbsObject);
	});
});

router.post("/burgers/create", function(req,res){
	burgers.insertOne([
		"burger_name"
		],[
			req.body.burger_name
			], function(data){
				res.redirect("/burgers");
			});
});

router.put("/burgers/update/:id", function(req,res){
	var condition = "id = " + req.params.id;

	burgers.updateOne({
		devoured: true
	}, condition, function(result){
		res.redirect("/burgers")
	});
});

module.exports = router;