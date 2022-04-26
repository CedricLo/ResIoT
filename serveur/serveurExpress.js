var express = require('express');
var app = express();
var fs = require("fs");
const { client } = require('websocket');
// Importing the required modules
const WebSocketServer = require('ws');
 //127.0.0.1

 /**
  * Chenillard initialisation
  */
 class Chenillard {
    Chenillard(state,speed,sens){
        this.state = state;
        this.speed = speed;
        this.sens = sens;
    }

    setState(newState){
        this.state = newState;
        console.log('chenillard state : ' +this.state)
    }

    setSpeed(newSpeed){
        this.speed = newSpeed;
    }

    setSens(newSens){
        this.sens = newSens;
    }
}

var knxChenillard = new Chenillard(false,1,'gauche');


app.post('/', (req,res) => {
    console.log('REQUETE',req);
    console.log('DATA',req.data);
    res.send('Ok')
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(JSON.parse(req.body)));
    });
})

//Creating an HTTP server
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
 })

 server.on('upgrade', function (_, socket){
     console.log('upgrade event fired', socket);
 });

// Creating a new websocket server
const wss = new WebSocketServer.Server({ address : "https://dc30-2a02-8440-7210-39b8-83d-1264-bd9-2524.ngrok.io" ,port: 3030 });

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};


// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    ws.id = wss.getUniqueID();
/*
    wss.clients.forEach(function each(client) {
        console.log('Client.ID: ' + client.id);
    });*/

    ws.on("message", data => {
        console.log(`Client ${ws.id} has sent us: ${data}`)
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(JSON.parse(data)));
        });

        parsedData = JSON.parse(data);
        if(parsedData.state != undefined) {
            knxChenillard.setState(parsedData.state);
        }
        else if(parsedData.speed != undefined) {
            knxChenillard.setSpeed(parsedData.speed);
        }
        else if(parsedData.sens != undefined) {
            knxChenillard.setSens(parsedData.sens);
        }
        else {
            console.log(`Unrecognized message`)
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        console.log(wss.clients);
    });

    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 3030");
