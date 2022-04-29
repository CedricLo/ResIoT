import React from "react";
import './styles/switchStyles.css'
import { Stack } from "@mui/material";


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
      this.setState({ button: { nameButton: allumer } });
    } else {
      this.setState({ button: { nameButton: eteindre } });
    }
    this.changeEtat(!this.props.etat);
  }

  render() {
    return (
      <Stack
      spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
        <h1>{this.state.button.nameButton}</h1>

        <input type="checkbox"
         id="switch" 
         onChange={() => this.allumerChenillard()}
         checked = {this.props.etat} />
        <label for="switch">Toggle</label>
      </Stack>
    );
  }
}
