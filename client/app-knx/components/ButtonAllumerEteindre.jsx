import React from "react";
import { View, Switch,Text, StyleSheet } from "react-native";


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

  allumerChenillard(boolean) {
    const allumer = "Allumer le chenillard";
    const eteindre = "Eteindre le chenillard";
    if (this.props.etat) {
      this.setState({ button: { nameButton: allumer } });
    } else {
      this.setState({ button: { nameButton: eteindre } });
    }
    this.changeEtat(!this.props.etat,boolean);
  }

  getEtat(){
    this.etat = this.props.etat;
  }

  render() {
    this.getEtat();
    return (
      <View style={styles.container}>
      
        <Text style={styles.componentStyle}>{this.state.button.nameButton}</Text>

        <Switch 
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.props.etat ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => this.allumerChenillard(true)}
          
          value={this.props.etat}
         />
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  componentStyle : {
    textAlign: "center",
    color: "white",
    margin: 0,
  }
  
})