const knx = require('knx');
const exitHook = require('async-exit-hook');
const readline = require('readline');
const { stdin: input, stdout: output, exit, stderr, mainModule } = require('process');
const { set } = require('express/lib/application');
const { jsonp } = require('express/lib/response');

var wssLoc;
var connection;

module.exports = {
    serveurKnxInit: function (wss) {
        wssLoc = wss;
    },

    knxConnection: function () {
        connectionKnx()
    },

    knxDeconnection: function () {
        deconnectionKnx()
    },

    chenillardSpeed: function (speed) {
        chenillardSpeed(speed);
    },

    allumerLamp:function(lamp){
        switch(lamp){
            case '1' :
                allumerL(light1);
            break ;
            case '2' :
                allumerL(light2);
            break ;
            case '3' :
                allumerL(light3);
            break ;
            case '4' :
                allumerL(light4);
            break ;
        }
    },

    eteindreLamp:function(lamp){
        switch(lamp){
            case '1' :
                eteindreL(light1);
            break ;
            case '2' :
                eteindreL(light2);
            break ;
            case '3' :
                eteindreL(light3);
            break ;
            case '4' :
                eteindreL(light4);
            break ;
            
        }
    }

}
connectionKnx()
//main();
function main(){
    
const rl = readline.createInterface({ input, output });
   
   //declarationLampes()
    var intervalRoutineID;
    rl.on('line', (data)=>{
        switch(data){
            case 'd' :
                declarationLampes();
            break ;
            case 'l1o' :
                eteindreL(light1);
            break ;
            case 'l2o' :
                eteindreL(light2);
            break ;
            case 'l3o' :
                eteindreL(light3);
            break ;
            case 'l4o' :
                eteindreL(light4);
            break ;
            case 'l1a' :
                allumerL(light1);
            break ;
            case 'l2a' :
                allumerL(light2);
            break ;
            case 'l3a' :
                allumerL(light3);
            break ;
            case 'l4a' :
                allumerL(light4);
            break ;
            case 'chen' :
                intervalRoutineID = routineSpeed(50, chenillardSens1, intervalRoutineID)
            break ;
            case 'sens' :
                intervalRoutineID = routineSpeed(50, chenillardSens2, intervalRoutineID)
            break ;
            case 'stop' :
                chenillardStop(intervalRoutineID);
            break ;
            case 'close' :
                rl.close()
                deconnectionKnx();
            break ;
            
            default :
                console.log("pas compris ")
            break;
        }
    })

    

    
}




function connectionKnx() {
    connection = new knx.Connection({
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
            connected: function () {
                console.log('KNX is connected');
                
                // WRITE an arbitrary boolean request to a DPT1 group address
                //connection.write("0/0/1",1)
                // you also WRITE to an explicit datapoint type, eg. DPT9.001 is temperature Celcius
               // connection.write("2/1/0", 22.5, "DPT9.001");
                // you can also issue a READ request and pass a callback to capture the response
                connection.read("1/0/1", (src, responsevalue) => {
                    console.log("src : ", src)
                    console.log("response value : ", responsevalue)
                });
            },
            // get notified for all KNX events:
            event: function (evt, src, dest, value) {
                valueParse = JSON.parse(JSON.stringify(value))
                console.log(
                    "event: %s, src: %j, dest: %j, value: %j",
                    evt, src, dest, value
                );

                switch(dest){
                    case "1/0/2" :
                        if(valueParse.data[0] === 0){
                            allumerL2()
                        }
                        else{
                            eteindreL2()
                        }
                        break;
                }



            },
            // get notified on connection errors
            error: function (connstatus) {
                console.log("**** ERROR: %j", connstatus);
            }
        }
    });
       // declare a simple binary control datapoint
    var binary_control = new knx.Datapoint({ ga: '0/0/1', dpt: 'DPT1.001' });
    // bind it to the active connection
    binary_control.bind(connection);
    // write a new value to the bus
    binary_control.write(true); // or false!
    // send a read request, and fire the callback upon response
    binary_control.read(function (response) {
        console.log("KNX response: %j", response);
    });
    // or declare a dimmer control
    var dimmer_control = new knx.Datapoint({ ga: '1/2/33', dpt: 'DPT3.007' });
    // declare a binary STATUS datapoint, which will automatically read off its value
    var binary_status = new knx.Datapoint({ ga: '1/0/1', dpt: 'DPT1.001', autoread: true });


    connection.Connect();
    

   // allumerL3();
   declarationLampes(main);
    deconnectionKnx();
    // Write raw buffer to a groupaddress with dpt 1 (e.g light on = value true = Buffer<01>) with a bitlength of 1
   // connection.writeRaw('1/0/0', Buffer.from('01', 'hex'), 1)
    // Write raw buffer to a groupaddress with dpt 9 (e.g temperature 18.4 °C = Buffer<0730>) without bitlength
    //connection.writeRaw('1/0/0', Buffer.from('0730', 'hex'))
}

/**
 * Regule
 * @param {*} speed 
 */
function routineSpeed(speed, routine, intervallRoutineID) {
    chenillardStop(intervallRoutineID)
    
    let realSpeed = 50000 / speed;
    routine(realSpeed);
        
    intervallRoutineID =  setInterval(() => {
        routine(realSpeed)}, realSpeed);
    return intervallRoutineID;
    
}

function chenillardSens1(realSpeed){
    let id = setTimeout(() => { allumerL(light1) }, 0);
        setTimeout(() => { eteindreL(light1) }, realSpeed / 4)
        setTimeout(() => { allumerL(light2) }, realSpeed / 4);
        setTimeout(() => { eteindreL(light2) }, 2 * realSpeed / 4)
        setTimeout(() => { allumerL(light3) }, 2 * realSpeed / 4);
        setTimeout(() => { eteindreL(light3) }, 3 * realSpeed / 4)
        setTimeout(() => { allumerL(light4) }, 3 * realSpeed / 4);
        setTimeout(() => { eteindreL(light4) }, realSpeed)
    return id
}
function chenillardSens2(realSpeed){
        let id = setTimeout(()=>{ allumerL(light4) }, 0);
        setTimeout(() => { eteindreL(light4) }, realSpeed / 4)
        setTimeout(() => { allumerL(light3) }, realSpeed / 4);
        setTimeout(() => { eteindreL(light3) }, 2 * realSpeed / 4)
        setTimeout(() => { allumerL(light2) }, 2 * realSpeed / 4);
        setTimeout(() => { eteindreL(light2) }, 3 * realSpeed / 4)
        setTimeout(() => { allumerL(light1) }, 3 * realSpeed / 4);
        setTimeout(() => { eteindreL(light1) }, realSpeed)
        return id;
}

function chenillardStop(intervallID){
    //console.log(intervallID)
    if(intervallID!== undefined && intervallID!== null ){
       clearInterval(intervallID)
       
       intervallID=null;

    }
}

function allumerL(lamp){
    lamp.switchOn()
}
function eteindreL(lamp){
    lamp.switchOff()
}

function declarationLampes(callBack) {
    var light1 = new knx.Devices.BinarySwitch({ ga: '0/0/1', status_ga: '0/0/101' }, connection);
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

    var light3 = new knx.Devices.BinarySwitch({ ga: '0/0/3', status_ga: '0/1/3'}, connection);
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

    //light3.switchOn()
    setTimeout(()=>{main()},3000)

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