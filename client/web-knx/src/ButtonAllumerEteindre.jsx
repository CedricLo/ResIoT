import React from "react";

export default class ButtonAllumerEteindre extends React.Component {
  etat = this.props.etat;
  changeEtat = this.props.changeEtat;

  initButton() {
    const allumer = "Allumer le chenillard";
    const eteindre = "Eteindre le chenillard";
    if (this.props.etat) {
      return eteindre;
    } else {
      return allumer;
    }
  }

  state = {
    button: {
      nameButton: this.initButton()
    }
  };

  allumerChenillard() {
    const allumer = "Allumer le chenillard";
    const eteindre = "Eteindre le chenillard";
    if (this.props.etat) {
      this.setState({ button: { nameButton: eteindre } });
    } else {
      this.setState({ button: { nameButton: allumer } });
    }
    this.changeEtat(!this.props.etat);
    console.log(this.props.etat);
  }

  render() {
    return (
      <button onClick={() => this.allumerChenillard()}>
        {this.state.button.nameButton}
      </button>
    );
  }
}
