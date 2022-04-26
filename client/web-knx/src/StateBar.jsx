import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { Stack } from "@mui/material";
import { IconContext } from "react-icons";


export default class StateBar extends React.Component {
  etat = this.props.etat;

  render() {
    return (
      <Stack>
        <IconContext.Provider value={{ color: this.etat ? "black" : "yellow", size : '12em', className: "global-class-name" }}>
          <FaRegLightbulb/>
        </IconContext.Provider>
      </Stack>
    );
  }
}
