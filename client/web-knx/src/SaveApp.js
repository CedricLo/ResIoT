import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './styles/myStyles.css'

import { Stack } from "@mui/material";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SliderSpeed from './SliderSpeed';
import ButtonDirection from './ButtonDirection'
import ButtonAllumerEteindre from './ButtonAllumerEteindre';
import StateBar from './StateBar';

//const fetch = require('node-fetch');

const lien = '://localhost:8080';
//const httpLien = 'https'+lien+ '/home';
const httpLien = 'https://21df-2a02-8440-7210-39b8-83d-1264-bd9-2524.ngrok.io/home';
const client = new W3CWebSocket('ws'+lien);


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#00BFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "white"//theme.palette.text.secondary,
}));


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
    //client.send(JSON.stringify({'state' : !this.state.chenillard.stateChenillard}));
    this.httpPost({'state' : !this.state.chenillard.stateChenillard});
    //console.log("Post Etat : ",!this.state.chenillard.stateChenillard);
  }

  changeVitesse(vit) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: this.state.chenillard.sens,
        vitesse: vit
      }
    });
    //client.send(JSON.stringify({'speed' : this.state.chenillard.vitesse}));
    this.httpPost({'speed' : this.state.chenillard.vitesse});
    //console.log("Post Vitesse : ",this.state.chenillard.vitesse);
  }

  changeSens(sens) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: sens,
        vitesse: this.state.chenillard.vitesse
      }
    });
    //client.send(JSON.stringify({'sens' : this.state.chenillard.sens}));
    this.httpPost({'sens' : this.state.chenillard.sens});
  }

  /**
   * Creating HTTP client
   */
  httpPost(data) {
    fetch("http://localhost:8080/home", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response)
    .then(data => console.log(data));
    console.log("POST : ", data)
  }


  /**
   * Creating and setting listeners of websocket client
   */
  constructor() {
    super()
    client.onopen = () => {
      //client.send(JSON.stringify({'state' : this.state.chenillard.stateChenillard}));
      console.log('WebSocket Client Connected');
    };
    
    client.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      if(parsedMessage.state !== undefined) {
        console.log('Server responsed : State ' + parsedMessage.state);
      }
      else if(parsedMessage.speed !== undefined) {
        console.log('Server responsed : Speed ' + parsedMessage.speed);
      }
      else if(parsedMessage.sens !== undefined) {
        console.log('Server responsed : Sens ' + parsedMessage.sens);
      }
      else {
          console.log(`Unrecognized message`)
      }
    };
  }


  render() {
    return (
      <Stack>

<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          <Item>Controle Your Chenillard</Item>
      <Grid item xs={20}>
          <Item>
            <StateBar etat={(this.state.chenillard.stateChenillard ? true : false)}/>
              Chenillard :{" "}
              {" etat : " +
                (this.state.chenillard.stateChenillard ? "allumé" : "éteind") +
                ", \n vitesse : " +
                this.state.chenillard.vitesse +
                ", \n sens : " +
                this.state.chenillard.sens}
            </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
              <ButtonAllumerEteindre
                etat={this.state.chenillard.stateChenillard}
                changeEtat={(etat) => {
                  this.changeEtat(etat);
                }}
              />
            </Item>
          
        </Grid>
        <Grid item xs={6}>
          <Item>
              <ButtonDirection
                sens={this.state.chenillard.sens}
                sensChange={(sens) => this.changeSens(sens)}
              /></Item>
        </Grid>
        
        <Grid item xs={12}>
          <Item>
            
            <SliderSpeed
            vitesse={this.state.chenillard.vitesse}
            vitesseChange={(vit) => this.changeVitesse(vit)}
          />

          </Item>
        </Grid>
      </Grid>
    </Box>
      </Stack>
    );
  }
}