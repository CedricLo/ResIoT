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



// Creating a new websocket server
const wss = new WebSocketServer.Server({ address : "https://6ff3-148-60-65-167.ngrok.io" ,port: 3030 })

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
