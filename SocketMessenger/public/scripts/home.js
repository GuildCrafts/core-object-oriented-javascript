const updateChatroomName = (chatroom_name) => {
  $("span.current_convorsation").text(chatroom_name)
  $(".coversation_header").effect('bounce', 'slow')
}




$(document).ready(function() {
  $('.coversation').on('click', function(){
    const chatroom_name = $(this).text()
    //change chatroom name in view
    updateChatroomName(chatroom_name)
    $.ajax({
      url: "http://localhost:3000/home/chatroom",
      data: { chatroom_name }
    }).done( function(results){
      console.log('results:', results)
      for(let message in results){
        console.log('message:', message)
      }
    })
  })

// socket stuff
  var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('board', function(data){
      let newMessageTextDiv = $("<div>").addClass("message_text mine").text(data)
      $('.coversation_content').append(newMessageTextDiv)
    })

    socket.on('messages', function(data){
    })


  $('#newMessage').keypress(function(e){
    if (e.keyCode == 13  && !e.shiftKey ){
      e.preventDefault()

      let newMessage = $(this).val()
      $(this).val('')
      socket.emit('messages', newMessage)
    }
  })
})
