import React from "react";
import { Button } from "@mui/material";

export default class ButtonDirection extends React.Component {
  //true : droite vers la gauche
  //false : Gauche vers la droite
  sens = this.props.sens;
  changeSens = this.props.sensChange;
  state = {
    button: {
      nameButton: "Changer la direction"
    }
  };

  changerSensChenillard() {
    const versGauche = "gauche";
    const versDroite = "droite";

    if (this.props.sens === versDroite) {
      this.changeSens(versGauche);
    } else {
      this.changeSens(versDroite);
    }
    console.log(this.props.sens);
  }


  render() {
    return (
      <Button variant="contained" onClick={() => this.changerSensChenillard()}>
        {this.state.button.nameButton}
      </Button>
    );
  }
}