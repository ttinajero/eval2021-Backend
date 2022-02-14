var express = require('express');
const bodyParser= require('body-parser');
var router = express.Router();
const app = express();
const { MongoClient } = require('mongodb');
app.use(bodyParser.urlencoded({ extended: true }))


let db;
let collection;
MongoClient.connect('mongodb+srv://posiadmin:Tavo_1980@cluster0.vhtsv.mongodb.net/eval?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('eval')
    collection = db.collection('walletsCollection')
})

app.use(bodyParser.json());


/* GET users listing. */
router.get('/all', function(req, res, next) {
  db.collection('walletsCollection').find().toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
});


/* POST add new Wallet. */
router.post('/add', (req, res) => {
  console.log(req.body);
  collection.insertOne(req.body)
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error))
})

/* GET Find wallet details. */
router.get('/details/:address', (req, res) => {
  //console.log(req.params);
  db.collection('walletsCollection').findOne({ address: req.params.address })
      .then(result => { res.json(result); })
      .catch(error => console.error(error))

});


module.exports = router;