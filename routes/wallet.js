var express = require('express');
const bodyParser= require('body-parser');
var router = express.Router();
const app = express();
const { MongoClient } = require('mongodb');
app.use(bodyParser.urlencoded({ extended: true }))
const axios = require('axios');

var key = '82999085a2810ce839d06ed3b1cd924a5f0dc178'; // key1 - gmail
//var key = '4e817ffae40c0d88c63de5ff939b7cef89768c9a'; //key3 - gmail

var wallet = '6207fb705526f30006790086'; // w1 - gmail
//var wallet = '620994fa5526f300067900a9'; //w2 - gmail


let db;
let collection;
MongoClient.connect('mongodb+srv://posiadmin:Tavo_1980@cluster0.vhtsv.mongodb.net/eval?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('eval')
    collection = db.collection('walletsCollection')
})

app.use(bodyParser.json());

/* Get Address Details. */
router.get('/:address', function(req, res, next) {

  axios({
    method:'get',
    url:'https://rest.cryptoapis.io/v2/blockchain-data/bitcoin/testnet/addresses/'+req.params.address,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key
    }
  })
  .then(response => {
    console.log(response.data);
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    res.status(400).send({
      message: 'error!'
   });
  });

});

/* Get Wallet Asset Details. */
router.get('/details/:walletid', function(req, res, next) {

  var url = 'https://rest.cryptoapis.io/v2/wallet-as-a-service/wallets/'+req.params.walletid+'/bitcoin/testnet';
  console.log(url);

  axios({
    method:'get',
    url: url,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key
    }
  })
  .then(response => {
    console.log(response.data);
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    res.status(400).send({
      message: 'error!'
   });
  });


});

/* POST Validate Address. */
router.post('/validate/:address', function(req, res, next) {

  const json = JSON.stringify({
      "context": "",
      "data": {
          "item": {
              "address": req.params.address
          }
      }
  });

  var url = 'https://rest.cryptoapis.io/v2/blockchain-tools/bitcoin/testnet/addresses/validate';

  axios.post(url,json,
    {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key
    }
  })
  .then(response => {
    console.log(response.data);
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    res.status(400).send({
      message: 'error!'
   });
  });
});

/* POST Transaction Request from Wallet. */
router.post('/trans/:address/:amount', function(req, res, next) {

  const json = JSON.stringify({
    "context": "",
    "data": {
        "item": {
            "callbackSecretKey": "",
            "callbackUrl": "https://www.kernel.com.mx",
            "feePriority": "standard",
            "note": "eval2021",
            "prepareStrategy": "minimize-dust",
            "recipients": [
                {
                    "address": req.params.address,
                    "amount": req.params.amount
                }
            ]
        }
    }
});

  var url = 'https://rest.cryptoapis.io/v2/wallet-as-a-service/wallets/6207fb705526f30006790086/bitcoin/testnet/transaction-requests';

  axios.post(url,json,
    {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key
    }
  })
  .then(response => {
    console.log(response.data);
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    res.status(400).send({
      message: 'error!'
   });
  });


});



module.exports = router;