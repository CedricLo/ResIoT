const knx = require("knx")
const exitHook = require('async-exit-hook');



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

  var light1 = new knx.Devices.BinarySwitch({ ga: '0/0/1', status_ga: '0/1/1' }, connection);
  console.log("The current light status is %j", light1.status.current_value);
  light1.control.on('change', function (oldvalue, newvalue) {
      console.log("**** LIGHT 1 control changed from: %j to: %j", oldvalue, newvalue);
  });
  light1.status.on('change', function (oldvalue, newvalue) {
      console.log("**** LIGHT 1 status changed from: %j to: %j", oldvalue, newvalue);
  });

setTimeout(()=>{
    light1.switchOn()},3000);

exitHook(cb => {
  console.log('Disconnecting from KNX…');
  connection.Disconnect(() => {
    console.log('Disconnected from KNX');
    cb();
  });
});