import React from "react";

export default class ButtonRalentir extends React.Component {
  vitesse = this.props.vitesse;
  vitesseChange = this.props.vitesseChange;
  state = {
    button: {
      nameButton: "Ralentir"
    }
  };

  ralentirChenillard() {
    if (this.props.vitesse > 0) {
      const vitesse = this.props.vitesse - 1;
      this.vitesseChange(vitesse);
    }
    console.log(this.props.vitesse);
  }

  render() {
    return (
      <button onClick={() => this.ralentirChenillard()}>
        {this.state.button.nameButton}
      </button>
    );
  }
}