var express = require('express');
var app= express();
var mongojs=require('mongojs');
var db=mongojs('testcases',['testcases']);
var bodyParser = require('body-parser');

const Nightmare = require('nightmare')

app.use(express.static(__dirname + "/"))
app.use(bodyParser.json());

app.post('/testcases',function(req,res) {
    
    Nightmare()
    .goto('http://localhost:3333/')
    .wait(5000)
    .evaluate(() => document.querySelector('#commond').innerText)
    .end()
    .then(result => {
      if(result == req.body.description){
            req.body.status=true;
      }else{
        console.log('error');
      }
        
    })
    .catch(error => console.error(error))
   

	db.testcases.insert(req.body,function(err,doc){
    res.json(doc);
	})
})

app.get('/testcases',function(req, res){
	db.testcases.find(function(err, docs){
    res.json(docs);
	});
});

app.get('/testcases/:id',function(req,res){
   var id=req.params.id;
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
