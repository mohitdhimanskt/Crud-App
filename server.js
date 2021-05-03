const express = require('express');
const app = express();
app.listen(3000, function() {
    console.log('listening on 3000')
  })
  
  // We normally abbreviate `request` to `req` and `response` to `res`.
app.get('/', function (req, res) {
    // do something here
  })
  
  app.get('/', (req, res) => {
    res.send('Hello World')
  })