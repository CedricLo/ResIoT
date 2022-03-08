import ButtonAllumerEteindre from "./ButtonAllumerEteindre";
import ButtonAccelerer from "./ButtonAccelerer";
import ButtonRalentir from "./ButtonRalentir";
import ButtonDirection from "./ButtonDirection";
import React from "react";

const requete = require("./requetes");


export default class App extends React.Component {
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
    })
    requete.postChenillardState(this.state.chenillard.stateChenillard,this.state.chenillard.vitesse,this.state.chenillard.sens);
  }

  changeVitesse(vit) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: this.state.chenillard.sens,
        vitesse: vit
      }
    })
    requete.postChenillardState(this.state.chenillard.stateChenillard,this.state.chenillard.vitesse,this.state.chenillard.sens);

  }

  changeSens(sens) {
    this.setState({
      chenillard: {
        stateChenillard: this.state.chenillard.stateChenillard,
        sens: sens,
        vitesse: this.state.chenillard.vitesse
      }
    })
    requete.postChenillardState(this.state.chenillard.stateChenillard,this.state.chenillard.vitesse,this.state.chenillard.sens);
  }

  render() {
    return (
      <div className="App">
        <h1>Réseau IoT</h1>
        <h2>Jouez avec le chenillard de votre maison!</h2>
        <h3>
          Chenillard :{" "}
          {" etat : " +
            this.state.chenillard.stateChenillard +
            ", \n vitesse : " +
            this.state.chenillard.vitesse +
            ", \n sens : " +
            this.state.chenillard.sens}
        </h3>
        <ButtonAllumerEteindre
          etat={this.state.chenillard.stateChenillard}
          changeEtat={(etat) => {
            this.changeEtat(etat);
          }}
        />
        <ButtonAccelerer
          vitesse={this.state.chenillard.vitesse}
          vitesseChange={(vit) => this.changeVitesse(vit)}
        />
        <ButtonRalentir
          vitesse={this.state.chenillard.vitesse}
          vitesseChange={(vit) => this.changeVitesse(vit)}
        />
        <ButtonDirection
          sens={this.state.chenillard.sens}
          sensChange={(sens) => this.changeSens(sens)}
        />
      </div>
    );
  }
}