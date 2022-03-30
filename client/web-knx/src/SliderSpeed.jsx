import React from "react";
import Slider from '@mui/material/Slider'; 

export default class SliderSpeed extends React.Component {
  vitesse = this.props.vitesse;
  vitesseChange = this.props.vitesseChange;
  state = {
    button: {
      nameButton: "Accélerer"
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

  onChange =( value)=>{
    this.vitesseChange(value)
  }

  render() {
    return (

      <Slider aria-label="Vitesse" value={this.props.vitesse} onChange={this.onChange} />
    );
  }
}
