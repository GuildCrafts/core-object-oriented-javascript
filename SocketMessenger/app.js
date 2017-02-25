const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const {User, Chatroom} = require('./database/db.js')

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret:'mystinkyfarts',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static( path.join(__dirname, 'public') ));

app.get('/', function (req, res) {
  if( !req.session.user_id ){
    req.session.user_id = 1
  } else {
    console.log('req.session.user_id:',req.session.user_id )
  }

  res.render('landing', {title: 'Messager', n: req.session.user_id})
})

app.get('/home', function (req, res) {
  if( !req.session.user_id ){
    req.session.user_id = 1
  } else {
    console.log('req.session.user_id:',req.session.user_id )
  }

  console.log('User, Chatroom:', User, Chatroom)
  console.log('req.session.user_id:',req.session.user_id )
  let user_id = '1'
  console.log('typeof(user_id):', typeof(user_id))
  Promise.all([User.getAllChats(user_id), Chatroom.getAllMessages(1)])
  .then(results => {
    console.log('results:', results)
    res.render('home', {
      user_chat_rooms: results[0],
      chat_room_messages: results[1]
    })
  })
})

app.get('/home/chatroom', function( req, res) {
  console.log('req.query:', req.query)
  const { chatroom_name } = req.query
  //get the id for the
  Chatroom.getChatroomIDByName(chatroom_name)
  .then(result => {
    const {id} = result
    console.log('id:', id)
    Chatroom.getAllMessages(id)
    .then( messages => {
      res.send(messages)
    })
  })
})

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// ~ ~ ~ ~ Socket.io things ~ ~ ~ ~
io.on('connection', function(client) {
  console.log('client connetced...')

  client.on('join', function(data) {
    console.log(data)
    client.emit('messages', "Hello, from the sever...")
  })

  client.on('messages', function(data) {
    User.sendMessage(1, 1, data)
    .then(_ => {
      console.log('data:', data)
      io.emit('board', data)
    })
  })
})
