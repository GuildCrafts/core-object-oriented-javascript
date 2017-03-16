const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(res, req){
  res.render('index');
})




const server = app.listen(3000, function(){
  console.log("Listening on ", server.address().port)
});
