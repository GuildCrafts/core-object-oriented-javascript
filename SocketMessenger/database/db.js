const fs = require('fs')
const pgp = require('pg-promise')()

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString)

const GET_ALL_USER_CHATS = "SELECT * FROM client_chat_room JOIN chat_room ON chat_room_id = chat_room.id WHERE client_id = $1"

const GET_ALL_CHAT_ROOM_MESSAGES = "SELECT * FROM message WHERE chat_room_id = $1 ORDER BY created_at ASC"

const GET_CHAT_ROOM_ID_BY_NAME = "SELECT id FROM chat_room WHERE name = $1"

const CREATE_NEW_CHAT_ROOM ='INSERT INTO chat_room(name) VALUES ($1)'

const SUBSCRIBE_TO_CHAT_ROOM ='INSERT INTO client_chat_room(client_id, chat_room_id) VALUES($1, $2)'

const ADD_NEW_MESSAGE = 'INSERT INTO message(chat_room_id, client_id, message_body) VALUES($1, $2, $3)'

const UNSUBSCRIBE_FROM_CHATROOM = 'DELETE FROM client_chat_room where client_id=$1 AND chat_room_id=$2'

const LOOK_UP_CHAT_ROOM = 'SELECT * FROM chat_room WHERE name LIKE $1'



const Chatroom = {
  suscribe: (user_id, chat_room_id) => db.none(SUBSCRIBE_TO_CHAT_ROOM, [user_id, chat_room_id]),
  unsubscribe: (user_id, chat_room_id) => db.none(UNSUBSCRIBE_FROM_CHATROOM, [user_id, chat_room_id]),
  getAllMessages: (chat_room_id) => db.any(GET_ALL_CHAT_ROOM_MESSAGES, [chat_room_id]),
  getChatroomIDByName: (chat_room_name) => db.one( GET_CHAT_ROOM_ID_BY_NAME, [chat_room_name])
}

const User = {
  getAllChats: (user_id) => db.any(GET_ALL_USER_CHATS, [user_id]),
  sendMessage: (chat_room_id, client_id, message_body) => db.none(ADD_NEW_MESSAGE, [chat_room_id, client_id, message_body])
}

module.exports = {User, Chatroom}
