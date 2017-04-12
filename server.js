//APPLICANT NAME: CALEB TONY-ENWIN


var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var public = __dirname + "/public/";

app.use(function(req,res,next){
	console.log(req.method+" request for "+req.url);
	next();
});

//load home page
app.get("/", function(req,res){
	res.sendFile(path.join(public + "index.html"));
});

///loAD static files
app.use('/',express.static("./public"));
app.listen(listen(process.env.PORT || 3000), function(){console.log("Server is running on port 3000");});
