import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ButtonAllumerEteindre from './components/ButtonAllumerEteindre';
import ButtonDirection from './components/ButtonDirection';
import SliderSpeed from './components/SliderSpeed';

//const fetch = require('node-fetch');
const wsLien = '://localhost:3030';
//const httpLien = 'https'+lien+ '/home';
const httpLien = 'http://localhost:8080/home';
const client = new W3CWebSocket('ws' + wsLien);

export default class App extends Component {
  state = {
    chenillard: {
      stateChenillard: false,
      sens: "droite",
      vitesse: 1,
      lamps : [false,false,false,false]
    }
  };
  changeEtat(etat) {
    this.setState({
      chenillard: {
        stateChenillard: etat,
        sens: this.state.chenillard.sens,
        vitesse: this.state.chenillard.vitesse,
        lamps : this.state.chenillard.lamps
      }
    });
    //client.send(JSON.stringify({'state' : !this.state.chenillard.stateChenillard}));
    this.httpPost({ 'state': !this.state.chenillard.stateChenillard });
    //console.log("Post Etat : ",!this.state.chenillard.stateChenillard);
  }

  changeVitesse(vit) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: this.state.chenillard.sens,
        vitesse: vit,
        lamps : this.state.chenillard.lamps
      }
    });
    //client.send(JSON.stringify({'speed' : this.state.chenillard.vitesse}));
    this.httpPost({ 'speed': this.state.chenillard.vitesse });
    //console.log("Post Vitesse : ",this.state.chenillard.vitesse);
  }

  changeSens(sens) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: sens,
        vitesse: this.state.chenillard.vitesse,
        lamps : this.state.chenillard.lamps
      }
    });
    //client.send(JSON.stringify({'sens' : this.state.chenillard.sens}));
    this.httpPost({ 'sens': this.state.chenillard.sens });
  }

  /**
   * Set the lamp status of the lamp n depending on b
   * @param {int} n number of the lamp
   * @param {boolean} b  status of the lamp
   */
  setLampStatus(n,b){
    var newLamps = this.state.chenillard.lamps;
    newLamps[n-1] = b;
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: this.state.chenillard.sens,
        vitesse: this.state.chenillard.vitesse,
        lamps : newLamps
      }
    })
  }
  
  /**
   * Creating HTTP client
   */
   httpPost(data) {
    fetch(httpLien, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response)
    // .then(data => console.log(data));
    //console.log("POST : ", data)
  }

  constructor() {
    super()
    client.onopen = () => {
      //client.send(JSON.stringify({'state' : this.state.chenillard.stateChenillard}));
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      if (parsedMessage.state !== undefined) {
        console.log('Server responsed : State ' + parsedMessage.state);
      }
      else if (parsedMessage.speed !== undefined) {
        console.log('Server responsed : Speed ' + parsedMessage.speed);
      }
      else if (parsedMessage.sens !== undefined) {
        console.log('Server responsed : Sens ' + parsedMessage.sens);
      }
      else if(parsedMessage.lamp !== undefined) {
        this.setLampStatus(parsedMessage.lamp,parsedMessage.lampState)
      }
      else {
        console.log(`Unrecognized message`)
      }
    };
  }
  render() {
    return (
     
      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column"
      }]}>
        <View style={styles.item}>
          <Text style={styles.titleApp}>
            CONTROLE YOUR CHENILLARD</Text>
        </View>
        <View style = {styles.item}>
          <Text style={styles.title}>
            Chenillard :{" "}
              {" etat : " +
                (this.state.chenillard.stateChenillard ? "allumé" : "éteind") +
                ", \n vitesse : " +
                this.state.chenillard.vitesse +
                ", \n sens : " +
                this.state.chenillard.sens}</Text>
        </View>


      <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "row"
      }]}>
        <View style={styles.item}>
            <ButtonAllumerEteindre
                  etat={this.state.chenillard.stateChenillard}
                  changeEtat={(etat) => {
                    this.changeEtat(etat);
                  }}
                />
          
          </View> 
        <View style={styles.item}>
            <ButtonDirection
                  sens={this.state.chenillard.sens}
                  sensChange={(sens) => this.changeSens(sens)}
                />
          </View>
          </View>
        <View style={styles.item}>
          <SliderSpeed
              vitesse={this.state.chenillard.vitesse}
              vitesseChange={(vit) => this.changeVitesse(vit)}
              
            />

          </View> 
    </View>

      
    
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 20,
    marginVertical: 8,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor : "orange",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    alignItems: "center"
  },
  titleApp: {
    fontSize: 32,
    alignItems: "center",
    
  },
});