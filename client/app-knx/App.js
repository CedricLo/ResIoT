import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ButtonAllumerEteindre from './components/ButtonAllumerEteindre';
import ButtonDirection from './components/ButtonDirection';
import SliderSpeed from './components/SliderSpeed';

const client = new W3CWebSocket('ws://6ff3-148-60-65-167.ngrok.io/');


export default class App extends Component {
  state = {
    chenillard: {
      stateChenillard: false,
      sens: "gauche",
      vitesse: 1
    }
  };

  changeEtat(etat) {
    this.setState({
      chenillard: {
        stateChenillard: etat,
        sens: this.state.chenillard.sens,
        vitesse: this.state.chenillard.vitesse
      }
    });
    client.send(JSON.stringify({'state' : this.state.chenillard.stateChenillard}));
    console.log("Post Etat : ",this.state.chenillard.stateChenillard);
  }

  changeVitesse(vit) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: this.state.chenillard.sens,
        vitesse: vit
      }
    });
    client.send(JSON.stringify({'speed' : this.state.chenillard.vitesse}));
    console.log("Post Vitesse : ",this.state.chenillard.vitesse);
  }

  changeSens(sens) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: sens,
        vitesse: this.state.chenillard.vitesse
      }
    });
    client.send(JSON.stringify({'sens' : this.state.chenillard.sens}));
  }


  constructor() {
    super()
    client.onopen = () => {
      client.send(JSON.stringify({'state' : this.state.chenillard.stateChenillard}));
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      if(parsedMessage.state != undefined) {
        console.log('Server responsed : State ' + parsedMessage.state);
      }
      else if(parsedMessage.speed != undefined) {
        console.log('Server responsed : Speed ' + parsedMessage.speed);
      }
      else if(parsedMessage.sens != undefined) {
        console.log('Server responsed : Sens ' + parsedMessage.sens);
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