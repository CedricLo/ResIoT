// Create a server socket and listen on port 3636
const socketio = require('socket.io');
const io = socketio.listen(3636);

var testRecu = require('debug')('testRecu');


io.on('connection', function(socket) {
    console.log('CONNECTED from ' + socket.id);
    socket.on('send', function(data) {
        msg = JSON.parse(data);
        testRecu('DATA received from ' + socket.remoteAddress + ':' + data);
        testRecu(msg.action);
        switch(msg.action){
            case 'client-hello': 
            break;

        }
    });
})




    exports.sendMessage = (socket,message) =>{
        socket.emit('message',message);
    };
       