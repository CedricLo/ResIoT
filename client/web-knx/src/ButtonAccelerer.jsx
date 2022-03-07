import React from "react";
const requete = require("./requetes");

export default class ButtonAccelerer extends React.Component {
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
      requete.postChenillardState();
    }
    console.log(this.props.vitesse);
  }

  render() {
    return (
      <button onClick={() => this.accelererChenillard()}>
        {this.state.button.nameButton}
      </button>
    );
  }
}
