import React from "react";
import Slider from '@mui/material/Slider'; 
import {Stack,Divider } from '@mui/material';

export default class SliderSpeed extends React.Component {
  vitesse = this.props.vitesse;
  vitesseChange = this.props.vitesseChange;
  state = {
    button: {
      nameButton: "Vitesse"
    }
  };

  accelererChenillard() {
    if (this.props.vitesse < 5) {
      const vitesse = this.props.vitesse + 1;
      this.vitesseChange(vitesse);
    }
    console.log(this.props.vitesse);
  }

  ralentirChenillard() {
    if (this.props.vitesse > 0) {
      const vitesse = this.props.vitesse - 1;
      this.vitesseChange(vitesse);
    }
    console.log(this.props.vitesse);
  }

  onChange =( event)=>{
    this.vitesseChange(event.target.value)
  }

  render() {
    return (
      <Stack 
      spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
        
          <h1>{this.state.button.nameButton}</h1>
        
          <Slider 
            aria-label="Vitesse" 
            value={this.props.vitesse} 
            onChange={this.onChange} 
            size = "medium"/>
          
      </Stack>
    );
  }
}
