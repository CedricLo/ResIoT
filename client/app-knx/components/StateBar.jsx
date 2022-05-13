import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from "react-native";
//import { IconContext } from "react-icons";


export default class StateBar extends React.Component {
  etat = this.props.etat;
  lamps = this.props.lamps;

  getEtat(){
    this.etat = this.props.etat;
  }

  render() {
    this.getEtat();
    console.log('LAMPS' ,this.lamps)
    return (
      <View style={{
        flexDirection: "row",
        justifyContent : "space-around"
      }}>
        <Icon.Button 
        name="lightbulb-o"
        color={this.props.lamps[0] ? "yellow" : "black"}
        backgroundColor={"#0971f1"}
        size={75}
        onPress={()=> {
          this.props.setLampStatus(1,!this.lamps[0])
          this.props.httpPost({ 'lamp': 1, 'lampState' : this.lamps[0]})
        }}>
        </Icon.Button>
        <Icon.Button 
        name="lightbulb-o"
        color={this.props.lamps[1] ? "yellow" : "black"}
        backgroundColor={"#0971f1"}
        size={75}
        onPress={()=> {this.props.setLampStatus(2,!this.lamps[1])
          this.props.httpPost({ 'lamp': 2, 'lampState' : this.lamps[1]})
        }}>
        </Icon.Button>
        <Icon.Button 
        name="lightbulb-o"
        color={this.props.lamps[2] ? "yellow" : "black"}
        backgroundColor={"#0971f1"}
        size={75}
        onPress={()=> {this.props.setLampStatus(3,!this.lamps[2])
          this.props.httpPost({ 'lamp': 3, 'lampState' : this.lamps[2]})
        }}>
        </Icon.Button>
        <Icon.Button 
        name="lightbulb-o"
        color={this.props.lamps[3] ? "yellow" : "black"}
        backgroundColor={"#0971f1"}
        size={75}
        onPress={()=> {this.props.setLampStatus(4,!this.lamps[3])
          this.props.httpPost({ 'lamp': 4, 'lampState' : this.lamps[3]})
        }}>
        </Icon.Button>
        
      </View>
    );
  }
}
