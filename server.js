var express = require('express');
var app= express();
var mongojs=require('mongojs');
var db=mongojs('testcases',['testcases']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/"))
app.use(bodyParser.json());

app.post('/testcases',function(req,res) {
	//console.log(req.body);
	db.testcases.insert(req.body,function(err,doc){
		res.json(doc);
	})
})

app.get('/testcases',function(req, res){
	db.testcases.find(function(err, docs){
		//console.log(docs);
		res.json(docs);
	});
});

app.get('/testcases/:id',function(req,res){
   var id=req.params.id;
   //console.log(id);
   db.testcases.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
   	res.json(doc);
   });
});

app.put('/testcases/:id',function(req,res){
	var id = req.params.id;
	db.testcases.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update :{$set:{title:req.body.title,description:req.body.description}},
    new:true},function(err, doc){
    	res.json(doc);
    	// refresh();
 });
});




app.listen(3333);
console.log("server running on port 3333");
