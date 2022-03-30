import React, { Component }  from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SliderSpeed from './SliderSpeed';
import ButtonDirection from './ButtonDirection'
import ButtonAllumerEteindre from './ButtonAllumerEteindre';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ff6',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "orange"//theme.palette.text.secondary,
}));

export default class Elevation extends Component {

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
      }
    
      

render(){
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          <Item>Controle Your Chenillard</Item>
      <Grid item xs={20}>
          <Item>
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
  );
}
}
