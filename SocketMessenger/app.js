const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.set('view engine', 'pug')
app.use(express.static( path.join(__dirname, 'public') ));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.render('landing', {title: 'Messager'})
})

app.get('/message', function (req, res) {
  res.render('home', {title: 'SocketChat'})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
