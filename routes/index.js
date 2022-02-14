var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');


// Connection URL
const uri = 'mongodb+srv://posiadmin:Tavo_1980@cluster0.vhtsv.mongodb.net/eval?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {

  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    //console.log(collection);

    if(collection!=undefined){
      console.log('Connection ON');
    } else {
      console.log('Connection: FAIL');
    }
    
    client.close();
  });
  res.render('index', { title: 'Services ONLINE' });
});

module.exports = router;
