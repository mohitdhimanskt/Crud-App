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
  const db = client.db("star-wars-quotes");
  const quotesCollection = db.collection("quotes");

  app.set("view engine", "ejs");
  app.use(bodyParser.json());
  // app.use(/* ... */);
  // app.get(/* ... */);
  // app.post(/* ... */);
  // app.listen(/* ... */);
  // // perform actions on the collection object
  // client.close();
  // })
  // app.get("/", (req, res) => {
  //   db.collection("quotes")
  //     .find()
  //     .toArray()
  //     .then((results) => {
  //       console.log(results);
  //     })
  //     .catch(/* ... */);
  //   // ...
  // });
  // app.get("/", (req, res) => {
  //   db.collection("quotes")
  //     .find()
  //     .toArray()
  //     .then(/* ... */)
  //     .catch(/* ... */);
  //   res.render("index.ejs", {});
  // });

  app.get("/", (req, res) => {
    db.collection("quotes")
      .find()
      .toArray()
      .then((results) => {
        res.render("index.ejs", { quotes: results });
      })
      .catch(/* ... */);
  });
  app.post("/quotes", (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((error) => console.error(error));
  });
  app.put("/quotes", (req, res) => {
    quotesCollection
      .findOneAndUpdate(
        { name: "Yoda" },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        {
          upsert: true,
        }
      )
      .then((result) => res.json("Success"))
      .catch((error) => console.error(error));
  });
  
    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })
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

app.listen(3000, function() {
  console.log("listening on 3000");
});
