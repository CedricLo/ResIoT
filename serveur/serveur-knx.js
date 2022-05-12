const knx = require('knx');
const exitHook = require('async-exit-hook');
const readline = require('readline');
const { stdin: input, stdout: output, exit, stderr, mainModule } = require('process');
const { resolve } = require('path');
const { rejects } = require('assert');

var wssLoc;
var intervalRoutineID;
var chenillardState = false;
var speed;
var sens;


var connection = new knx.Connection({
    // ip address and port of the KNX router or interface
    ipAddr: '192.168.0.201', ipPort: 3671,
    
    // the KNX physical address we'd like to use
    physAddr: '15.15.15',
    // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
    loglevel: 'info',
    
    // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
    forceTunneling: true,
    // wait at least 10 millisec between each datagram
    minimumDelay: 10,
    // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
    suppress_ack_ldatareq: false,
    // 14/03/2020 In tunneling mode, echoes the sent message by emitting a new emitEvent, so other object with same group address, can receive the sent message. Default is false.
    localEchoInTunneling: false,
    // define your event handlers here:
    handlers: {
      // wait for connection establishment before sending anything!
      connected: function() {
        console.log('Hurray, I can talk KNX!');
        // WRITE an arbitrary boolean request to a DPT1 group address
        connection.write("1/0/0", 1);
        // you also WRITE to an explicit datapoint type, eg. DPT9.001 is temperature Celcius
        connection.write("2/1/0", 22.5, "DPT9.001");
        // you can also issue a READ request and pass a callback to capture the response
        //connection.read("1/0/1", (src, responsevalue) => { ... });
      },
      // get notified for all KNX events:
      event: function(evt, src, dest, value) { console.log(
          "event: %s, src: %j, dest: %j, value: %j",
          evt, src, dest, value
        );
      },
      // get notified on connection errors
      error: function(connstatus) {
        console.log("**** ERROR: %j", connstatus);
      }
    }
  });


var light1 = new knx.Devices.BinarySwitch({ ga: '0/0/1', status_ga: '0/0/1' }, connection);
console.log("The current light status is %j", light1.status.current_value);
light1.control.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 1 control changed from: %j to: %j", oldvalue, newvalue);
});
light1.status.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 1 status changed from: %j to: %j", oldvalue, newvalue);
});

var light2 = new knx.Devices.BinarySwitch({ ga: '0/0/2', status_ga: '0/1/2' }, connection);
console.log("The current light status is %j", light2.status.current_value);
light2.control.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 2 control changed from: %j to: %j", oldvalue, newvalue);
});
light2.status.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 2 status changed from: %j to: %j", oldvalue, newvalue);
});

var light3 = new knx.Devices.BinarySwitch({ ga: '0/0/3', status_ga: '0/1/3' }, connection);
console.log("The current light status is %j", light3.status.current_value);
light3.control.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 3 control changed from: %j to: %j", oldvalue, newvalue);
});
light3.status.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 3 status changed from: %j to: %j", oldvalue, newvalue);
});

var light4 = new knx.Devices.BinarySwitch({ ga: '0/0/4', status_ga: '0/1/4' }, connection);
console.log("The current light status is %j", light4.status.current_value);
light4.control.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 4 control changed from: %j to: %j", oldvalue, newvalue);
});
light4.status.on('change', function (oldvalue, newvalue) {
    console.log("**** LIGHT 4 status changed from: %j to: %j", oldvalue, newvalue);
});


var button1 = new knx.Devices.BinarySwitch({ ga: '1/0/1', status_ga: '1/1/1' }, connection);
console.log("The current button status is %j", light1.status.current_value);
button1.control.on('change', function (oldvalue, newvalue) {


    let oldvalueParsed = JSON.parse(JSON.stringify(oldvalue));
    let newvalueParsed = JSON.parse(JSON.stringify(newvalue));
    console.log("**** BUTTON 1 control changed from:", oldvalueParsed, " to", newvalueParsed);
    if (newvalueParsed) {
        intervalRoutineID = routineSpeed(50, chenillardSens1, intervalRoutineID)
    } else {
        //chenillardStop(intervalRoutineID);
    }


});
button1.status.on('change', function (oldvalue, newvalue) {
    console.log("**** BUTTON 1 status changed from: %j to: %j", oldvalue, newvalue);
});

var button2 = new knx.Devices.BinarySwitch({ ga: '1/0/2', status_ga: '1/1/2' }, connection);
console.log("The current button status is %j", light2.status.current_value);
button2.control.on('change', function (oldvalue, newvalue) {
    let oldvalueParsed = JSON.parse(JSON.stringify(oldvalue));
    let newvalueParsed = JSON.parse(JSON.stringify(newvalue));
    console.log("**** BUTTON 1 control changed from:", oldvalueParsed, " to", newvalueParsed);
    if (newvalueParsed) {
        chenillardStop(intervalRoutineID);
    }
});
light2.status.on('change', function (oldvalue, newvalue) {
    console.log("**** BUTTON 2 status changed from: %j to: %j", oldvalue, newvalue);
});

var button3 = new knx.Devices.BinarySwitch({ ga: '1/0/3', status_ga: '1/1/3' }, connection);
console.log("The current button status is %j", light3.status.current_value);
button3.control.on('change', function (oldvalue, newvalue) {
    console.log("**** BUTTON 3 control changed from: %j to: %j", oldvalue, newvalue);
});
button3.status.on('change', function (oldvalue, newvalue) {
    console.log("**** BUTTON 3 status changed from: %j to: %j", oldvalue, newvalue);
});

var button4 = new knx.Devices.BinarySwitch({ ga: '1/0/4', status_ga: '1/1/4' }, connection);
console.log("The current button status is %j", light4.status.current_value);
light4.control.on('change', function (oldvalue, newvalue) {
    console.log("**** BUTTON 4 control changed from: %j to: %j", oldvalue, newvalue);

});
button4.status.on('change', function (oldvalue, newvalue) {
    console.log("**** BUTTON 4 status changed from: %j to: %j", oldvalue, newvalue);
});

function allumerL(lamp) {
    lamp.switchOn()
}
function eteindreL(lamp) {
    lamp.switchOff()
}

function deconnectionKnx() {
    //disconnection
    exitHook(cb => {
        console.log('Disconnecting from KNX…');
        connection.Disconnect(() => {
            console.log('Disconnected from KNX');
            cb();
        });
    });
}

deconnectionKnx();

setTimeout(() => {
    main()
}, 3000);




module.exports = {
    serveurKnxInit: function (wss) {
        wssLoc = wss;
    },

    chenillardStart: function (newSpeed, wss) {
        wssLoc = wss;
        if (newSpeed == undefined || newSpeed == 0) newSpeed = 1
        if (sens == undefined) sens = true;
        chenillardState = true;
        speed = (101 - newSpeed) * 10 + 100;
        chenillardSens1(1);       //routineSpeed(speed, chenillardSens1)
        
    },

    chenillardSpeed: function (newSpeed, wss) {
        wssLoc = wss;
        if (newSpeed == 0) newSpeed = 1;
        speed = (101 - newSpeed) * 10 + 100;
    },

    chenillardStop: function (wss) {
        chenillardState = false;
        wssLoc = wss;
    },

    chenillardSetSens() {
        sens = !sens;
    },

    allumerLamp: function (lamp) {
        switch (lamp) {
            case '1':
                allumerL1();
                break;
            case '2':
                allumerL2();
                break;
            case '3':
                allumerL3();
                break;
            case '4':
                allumerL4();
                break;
        }
    },

    eteindreLamp: function (lamp) {
        switch (lamp) {
            case '1':
                eteindreL1();
                break;
            case '2':
                eteindreL2();
                break;
            case '3':
                eteindreL3();
                break;
            case '4':
                eteindreL4();
                break;

        }
    }

}


function main() {

    const rl = readline.createInterface({ input, output });
    // connectionKnx()
    rl.on('line', (data) => {
        switch (data) {
            case 'l1o':
                eteindreL1();
                break;
            case 'l2o':
                eteindreL2();
                break;
            case 'l3o':
                eteindreL3();
                break;
            case 'l4o':
                eteindreL4();
                break;
            case 'l1a':
                allumerL1();
                break;
            case 'l2a':
                allumerL2();
                break;
            case 'l3a':
                allumerL3();
                break;
            case 'l4a':
                allumerL4();
                break;
            case 'chen':
                intervalRoutineID = routineSpeed(50, chenillardSens1)
                break;
            case 'sens':
                intervalRoutineID = routineSpeed(50, chenillardSens2)
                break;
            case 'stop':
                routineStop(intervalRoutineID);
                break;
            case 'close':
                rl.close()
                break;

            default:
                console.log("pas compris ")
                break;
        }
    })

    // deconnectionKnx();


}

function verifEtat(addressObjet) {

}







function chenillardSens1(n) {
    if (chenillardState) {
        console.log(speed)
        if (sens) {
            setTimeout(() => {
                switch (n) {
                    case 1:
                        eteindreL4();
                        allumerL1();
                        break;
                    case 2:
                        eteindreL1();
                        allumerL2();
                        break;
                    case 3:
                        eteindreL2();
                        allumerL3();
                        break;
                    case 4:
                        eteindreL3();
                        allumerL4();
                        break;
                }
                if (n >= 4) {
                    chenillardSens1(1)
                }
                else chenillardSens1(n + 1);
            }, speed)
        }
        else {
            setTimeout(() => {
                switch (n) {
                    case 1:
                        eteindreL1();
                        allumerL4();
                        break;
                    case 2:
                        eteindreL4();
                        allumerL3();
                        break;
                    case 3:
                        eteindreL3();
                        allumerL2();
                        break;
                    case 4:
                        eteindreL2();
                        allumerL1();
                        break;
                }
                if (n >= 4) {
                    chenillardSens1(1)
                }
                else chenillardSens1(n + 1);
            }, speed)
        }
    }
    else {
        eteindreL1();
        eteindreL2();
        eteindreL3();
        eteindreL4();
    }
}

function broadcast(data) {
    wssLoc.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
    });
}

function allumerL1() {
    allumerL(light1);
    console.log("lampe 1 allumée ");
    broadcast({ 'lamp': 1, 'lampState': true })

}
function allumerL2() {
    allumerL(light2);
    console.log("lampe 2 allumée ");
    broadcast({ 'lamp': 2, 'lampState': true })
}
function allumerL3() {
    allumerL(light3);
    console.log("lampe 3 allumée ");
    broadcast({ 'lamp': 3, 'lampState': true })
}
function allumerL4() {
    allumerL(light4);
    console.log("lampe 4 allumée ");
    broadcast({ 'lamp': 4, 'lampState': true })
}

function eteindreL1() {
    eteindreL(light1);
    console.log("lampe 1 éteinte ");
    broadcast({ 'lamp': 1, 'lampState': false })
}
function eteindreL2() {
    eteindreL(light2);
    console.log("lampe 2 éteinte ");
    broadcast({ 'lamp': 2, 'lampState': false })
}
function eteindreL3() {
    eteindreL(light3);
    console.log("lampe 3 éteinte ");
    broadcast({ 'lamp': 3, 'lampState': false })
}
function eteindreL4() {
    eteindreL(light4);
    console.log("lampe 4 éteinte ");
    broadcast({ 'lamp': 4, 'lampState': false })
}






