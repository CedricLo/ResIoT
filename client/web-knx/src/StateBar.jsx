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
      <Stack direction={"row"}>
        <IconContext.Provider value={{ color: this.lamps[0] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb/>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: this.lamps[1] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb/>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: this.lamps[2] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb/>
        </IconContext.Provider>
        <IconContext.Provider value={{ color: this.lamps[3] ? "yellow" : "black", size : '12em', className: "global-class-name"}}>
          <FaRegLightbulb/>
        </IconContext.Provider>
      </Stack>
    );
  }
}
