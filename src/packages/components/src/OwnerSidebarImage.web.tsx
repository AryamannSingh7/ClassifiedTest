import React, { Component } from "react";
import { Box } from "@material-ui/core";
//import { BuildingImage } from "./assets";

export default class OwnerSidebarImage extends Component {
  render() {
    return (
      <Box className="right-block right-image" display={{ xs: "none", md: "flex" }}>
        <img src={BuildingImage.default} className="building-logo" alt="" />
      </Box>
    );
  }
}
