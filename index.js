var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var adress = socket.handshake.adress;
  console.log(adress + ' connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log(adress + ' disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
