/*io.on('connection', function(socket) {
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
})*/




/*exports.sendMessage = (socket,message) =>{
    socket.emit('message',message);
    console.log("check")
};*/
       