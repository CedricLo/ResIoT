import React from "react";
import Slider from '@mui/material/Slider'; 
import {Stack,Divider, createTheme } from '@mui/material';



const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

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
      this.vitesseChange(vitesse,true);
    }
    console.log(this.props.vitesse);
  }

  onChange =( event)=>{
    this.vitesseChange(event.target.value);
  }

  getVitesse(){
    this.vitesse = this.props.vitesse;
  }

  render() {
    this.getVitesse();
    return (
      <Stack style={{marginInline : "20%"}}
      spacing={2} 
      direction="column" 
      sx={{ mb: 1 }} 
      alignItems="center">
        
          <h1>{this.state.button.nameButton}</h1>
        
          <Slider 
            aria-label="Vitesse" 
            value={this.props.vitesse} 
            onChange={this.onChange}
            color = "primary" 
            size = "medium"/>
          
      </Stack>
    );
  }
}
