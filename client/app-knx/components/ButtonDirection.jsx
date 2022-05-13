import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

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
  }


  render() {
    return (
      <View>
        <Button style={
          {
            marginTop : 0.08*window.innerHeight,
            marginLeft : 0.08*window.innerWidth
          }}
          variant="contained" 
        onPress={() => this.changerSensChenillard()}
        title={this.state.button.nameButton}/>
 
      </View>
      
    );
  }
}