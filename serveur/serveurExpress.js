var express = require('express');
const bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
const { client } = require('websocket');
// Importing the required modules
const WebSocketServer = require('ws');
 //127.0.0.1
 const cors = require('cors')


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

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.post('/home', (req,res) => {
    console.log('POST REQUETE /home : ',req);
    console.log('DATA',req.body);
    res.send('Ok')
    broadcast(req.body)
})

app.post('/', (req,res) => {
    console.log('POST REQUETE / : ',req);
    console.log('DATA',req.body);
    res.send('200')
})

app.get('/', (req,res) => {
    console.log('GET REQUEST / : ', req);
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

function broadcast(data){
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
    });
}


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
