import React from "react";
import { Button } from "@mui/material";

export default class ButtonDirection extends React.Component {
  //true : droite vers la gauche
  //false : Gauche vers la droite
  sens = this.props.sens;
  changeSens = this.props.sensChange;
  state = {
    button: {
      nameButton: "Changer la routine"
    }
  };

  changerSensChenillard() {
    const versGauche = "gauche";
    const versDroite = "droite";

    if (this.props.sens === versDroite) {
      this.changeSens(versGauche, true);
    } else {
      this.changeSens(versDroite, true);
    }
  }


  render() {
    return (
      <Button style={
        {marginTop : 0.08*window.innerHeight,
         marginLeft : 0.08*window.innerWidth}}
         variant="contained"
         onClick={() => this.changerSensChenillard()}>
        {this.state.button.nameButton}
      </Button>
    );
  }
}