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
const wsLien = '://192.168.0.108:3030';
//const httpLien = 'https'+lien+ '/home';
const httpLien = 'http://192.168.0.108:8080/home';
const client = new W3CWebSocket('ws' + wsLien);


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#00BFFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default class App extends Component {
  state = {
    chenillard: {
      stateChenillard: false,
      sens: "droite",
      vitesse: 1,
      lamps : [false,false,false,false]
    }
  };

  changeEtat(etat,boolean) {
    this.setState({
      chenillard: {
        stateChenillard: etat,
        sens: this.state.chenillard.sens,
        vitesse: this.state.chenillard.vitesse,
        lamps : this.state.chenillard.lamps
      }
    });
    //client.send(JSON.stringify({'state' : !this.state.chenillard.stateChenillard}));
    if(boolean) this.httpPost({ 'state': !this.state.chenillard.stateChenillard });
    //console.log("Post Etat : ",!this.state.chenillard.stateChenillard);
  }

  changeVitesse(vit,boolean) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: this.state.chenillard.sens,
        vitesse: vit,
        lamps : this.state.chenillard.lamps
      }
    });
    //client.send(JSON.stringify({'speed' : this.state.chenillard.vitesse}));
    if(boolean) this.httpPost({ 'speed': this.state.chenillard.vitesse });
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
      if (parsedMessage.state !== undefined) {
        console.log('Server responsed : State ' + parsedMessage.state);
        this.changeEtat(parsedMessage.state,false);
      }
      else if (parsedMessage.speed !== undefined) {
        console.log('Server responsed : Speed ' + parsedMessage.speed);
        this.changeVitesse(parsedMessage.speed,false);
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
      <Stack>
        <Box sx={{
          width: 0.8 * window.innerWidth,
          height: 0.85 * window.innerHeight
        }}>
          <Grid style={{justifyContent : 'center'}} container spacing={2}>
            <Grid style={{marginBottom : '30px'}} item xs={12}> <h1>Paramètre ton chenillard</h1></Grid>
            <StateBar etat={this.state.chenillard.stateChenillard}
            lamps={this.state.chenillard.lamps}
            setLampStatus={(n,b)=>this.setLampStatus(n,b)}
            httpPost={(data)=> this.httpPost(data)}/>
            <Grid style={{marginTop : '15px'}} item xs={12}>
              <div style={{color : "#D8DFEF", fontSize: 25, fontFamily : 'revert', display : 'flex', justifyContent : 'center'}}>
                <div></div>{" etat : " +
                  (this.state.chenillard.stateChenillard ? "allumé" : "éteind") +
                  " | vitesse : " +
                  this.state.chenillard.vitesse +
                  " | sens : " +
                  this.state.chenillard.sens}
              </div>
            </Grid>
            <Grid item xs={6}>
              <ButtonAllumerEteindre
                etat={this.state.chenillard.stateChenillard}
                changeEtat={(etat,boolean) => {
                  this.changeEtat(etat,boolean);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <ButtonDirection
                sens={this.state.chenillard.sens}
                sensChange={(sens) => this.changeSens(sens)}></ButtonDirection>
            </Grid>

            <Grid item xs={12}>
              <SliderSpeed
                vitesse={this.state.chenillard.vitesse}
                vitesseChange={(vit,boolean) => this.changeVitesse(vit,boolean)}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    );
  }
}