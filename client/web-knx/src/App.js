import ButtonAllumerEteindre from "./ButtonAllumerEteindre";
import ButtonAccelerer from "./ButtonAccelerer";
import ButtonRalentir from "./ButtonRalentir";
import ButtonDirection from "./ButtonDirection";
import React from "react";
import './styles/myStyles.css'

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
    });
    requete.postChenillardState(this.state.chenillard.stateChenillard,this.state.chenillard.vitesse,this.state.chenillard.sens);
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

  

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="primary">Réseau IoT</h1>
          </header>
        <header>
          <h1>Jouez avec le chenillard de votre maison!</h1>
        </header>
        <section>
          <article>
            <h3>
              Chenillard :{" "}
              {" etat : " +
                this.state.chenillard.stateChenillard +
                ", \n vitesse : " +
                this.state.chenillard.vitesse +
                ", \n sens : " +
                this.state.chenillard.sens}
            </h3>
            </article>
            <article className="day-forecast">
              <ButtonAllumerEteindre
                etat={this.state.chenillard.stateChenillard}
                changeEtat={(etat) => {
                  this.changeEtat(etat);
                }}
              />
            </article>
            <article  className="section">
              <ButtonAccelerer
                vitesse={this.state.chenillard.vitesse}
                vitesseChange={(vit) => this.changeVitesse(vit)}
              />
            </article>
            <article  className="day-forecast">
              <ButtonRalentir
                vitesse={this.state.chenillard.vitesse}
                vitesseChange={(vit) => this.changeVitesse(vit)}
              />
            </article>
            
            <article  className="day-forecast">
              <ButtonDirection
                sens={this.state.chenillard.sens}
                sensChange={(sens) => this.changeSens(sens)}
              />
            </article>
          
          </section>
      </div>
    );
  }
}