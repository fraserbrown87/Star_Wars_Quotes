const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){

  if(err){
    console.log(err);
    return;
  }

  const db = client.db("star_wars");

  console.log("connected to database");

  server.post('/api/quotes', function(req, res){
    db.collection('quotes').save(req.body, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.status(201);
      res.json(result.ops[0]);

      console.log("saved to database");

    });
  })

  server.get('/api/quotes', function(req,res){
    db.collection('quotes').find().toArray(function(err, results){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.json(results);
    });
  });

  server.delete('/api/quotes', function(req, res){
    db.collection('quotes').deleteMany(function(err, results){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.status(204);
      // res.json(results);
      res.send();

      console.log("Saved to database.");

    });
  });

  server.put('/api/quotes/:id', function(req, res){
    db.collection('quotes').update({_id: ObjectID(req.params.id)}, req.body, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.status(204);
      // res.json(result);
      res.send();

      console.log("Saved to database.");

    });
  });



  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
});
