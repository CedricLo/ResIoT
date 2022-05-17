import React from "react";
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon } from 'react-native-elements';


export default class SliderSpeed extends React.Component {
  vitesse = this.props.vitesse;
  vitesseChange = this.props.vitesseChange;
  state = {
    button: {
      nameButton: "Vitesse"
    }
  };
 
  interpolate = (start, end) => {
    let k = (this.vitesse - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  color = () => {
    let r = this.interpolate(255, 0);
    let g = this.interpolate(0, 255);
    let b = this.interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  accelererChenillard() {
    if (this.props.vitesse < 5) {
      const vitesse = this.props.vitesse + 1;
      this.vitesseChange(vitesse);
    }
    console.log(this.props.vitesse);
  }

  ralentirChenillard() {
    if (this.props.vitesse > 0) {
      const vitesse = this.props.vitesse - 1;
      this.vitesseChange(vitesse);
    }
    console.log(this.props.vitesse);
  }

  onChange =( value)=>{
    this.vitesseChange(value)
  }

  getVitesse(){
    this.vitesse = this.props.vitesse;
  }

  render() {
    this.getVitesse();
    return (
      <View style={styles.contentView}> 
          <Text style={styles.componentTitle}>{this.state.button.nameButton}</Text>
          <Slider
          value={this.props.vitesse}
          onValueChange={this.onChange}
          maximumValue={100}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'white' }}
          
        />
          
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  componentTitle:{
    textAlign: "center",
    color: "white",
    margin: 0,
    
  }
})