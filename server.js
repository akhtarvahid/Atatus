var express = require('express');
var app= express();
var mongojs=require('mongojs');
var db=mongojs('testcases',['testcases']);
var bodyParser = require('body-parser');

const Nightmare = require('nightmare')
Nightmare({
    show: true,
    waitTimeout: 5000 // increase the default timeout to test things
})
    .goto('http://localhost:3333/')
    .evaluate(() => document.querySelector('input[name="login"]'))
    .end()
    .then(result => {
        console.log(`Fetching data from UI to store status in db:\n${result}`)
    })
    .catch(error => console.error(error))


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
