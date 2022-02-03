import React from "react";

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
    this.sendChangerSens();
    const versGauche = "vers la gauche";
    const versDroite = "vers la droite";

    if (this.props.sens === versDroite) {
      this.changeSens(versGauche);
    } else {
      this.changeSens(versDroite);
    }
    console.log(this.props.sens);
  }

  sendChangerSens() {
    //Ecrire la fonction qui envoie au serveur le message pour changer le sens
  }

  render() {
    return (
      <button onClick={() => this.changerSensChenillard()}>
        {this.state.button.nameButton}
      </button>
    );
  }
}