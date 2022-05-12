import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { Stack } from "@mui/material";
import { IconContext } from "react-icons";


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
      <Stack direction={'row'}>
        <IconContext.Provider value={{ color: this.lamps[0] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb onClick={()=> {
            this.props.setLampStatus(1,!this.lamps[0])
            this.props.httpPost({ 'lamp': 1, 'lampState' : this.lamps[0]})
          }}/>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: this.lamps[1] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb onClick={()=> {this.props.setLampStatus(2,!this.lamps[1])
            this.props.httpPost({ 'lamp': 2, 'lampState' : this.lamps[1]})
          }}/>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: this.lamps[2] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb onClick={()=> {this.props.setLampStatus(3,!this.lamps[2])
            this.props.httpPost({ 'lamp': 3, 'lampState' : this.lamps[2]})
          }}/>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: this.lamps[3] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb onClick={()=> {this.props.setLampStatus(4,!this.lamps[3])
            this.props.httpPost({ 'lamp': 4, 'lampState' : this.lamps[3]})
          }}/>
        </IconContext.Provider>
      </Stack>
    );
  }
}
