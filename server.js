const express = require("express");
const bodyParser = require("body-parser");
// const MongoClient = require('mongodb').MongoClient
const app = express();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mohit:<password>@cluster0.rsuak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("star-wars-quotes").collection("devices")
  const quotesCollection = db.collection('quotes')
  app.use(/* ... */);
  app.get(/* ... */);
  app.post(/* ... */);
  app.listen(/* ... */);
  // perform actions on the collection object
  client.close();
});

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

// We normally abbreviate `request` to `req` and `response` to `res`.
// app.get('/', function (req, res) {
//     // do something here
//   })

//   app.get('/', (req, res) => {
//     res.send('Hello World')
//   })
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});
app.post("/quotes", (req, res) => {
  console.log(req.body);
});
app.listen(3000, function() {
  console.log("listening on 3000");
});
