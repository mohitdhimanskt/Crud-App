const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient
const app = express();

MongoClient.connect('mongodb-connection-string', (err, client) => {
  // ... do something here
})
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
