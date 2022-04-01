import ButtonAllumerEteindre from "./ButtonAllumerEteindre";
// import ButtonAccelerer from "./ButtonAccelerer";
// import ButtonRalentir from "./ButtonRalentir";
import ButtonDirection from "./ButtonDirection";
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './styles/myStyles.css'
import SliderSpeed from "./SliderSpeed";
import Elevation from "./RemoteHome";
import { Stack } from "@mui/material";

const client = new W3CWebSocket('ws://127.0.0.1:3030');
const requete = require("./requetes");
/*
const url = "https://c1e4-148-60-140-218.ngrok.io"
const url2 = "http://127.0.0.1:3030"

var io = require('socket.io-client');*/


export default class App extends Component {
  state = {
    chenillard: {
      stateChenillard: false,
      sens: "vers la gauche",
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
    client.send('C');
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
    client.send(JSON.stringify({'state' : this.state.chenillard.stateChenillard}));
  }


  constructor() {
    super()
    client.onopen = () => {
      client.send(JSON.stringify({'state' : this.state.chenillard.stateChenillard}));
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }
  render() {
    return (
      <Stack>

        <Elevation/>
        {/* 
        <header>
          <h1 className="primary">Réseau IoT</h1>
          </header>
        <header>
          <h1>Jouez avec le chenillard de votre maison!</h1>
        </header>
        <section className="firstSection">
        <article>
            <h3>
              Chenillard :{" "}
              {" etat : " +
                this.state.chenillard.stateChenillard +
                ", \n vitesse : " +
                this.state.chenillard.vitesse +
                ", \n sens : " +
                this.state.chenillard.sens}
            </h3>
            </article>
          <section className="secondSection">
          
            <article >
              <ButtonAllumerEteindre
                etat={this.state.chenillard.stateChenillard}
                changeEtat={(etat) => {
                  this.changeEtat(etat);
                }}
              />
            </article>
            <article  className="day-forecast">
              <ButtonDirection
                sens={this.state.chenillard.sens}
                sensChange={(sens) => this.changeSens(sens)}
              />
            </article>
          </section>
            <article id="vitesse"  className="section">
              <SliderSpeed
                vitesse={this.state.chenillard.vitesse}
                vitesseChange={(vit) => this.changeVitesse(vit)}
              />
            </article>
                        
            
          
          </section>*/}
      </Stack>
    );
  }
}