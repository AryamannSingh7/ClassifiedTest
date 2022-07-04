//@ts-ignore
//@ts-nocheck
import React from "react";
// Customizable Area Start
// Customizable Area End
import { withRouter } from 'react-router';
import LandingPageController, {
  Props,
  configJSON
} from "./LandingPageController";

import {
  Box,
  Button,
} from "@material-ui/core";

//resources
import { Landing_Banner, Tenant_Logo } from "../src/assets";
//CSS
import "../../../web/src/assets/css/style.scss";

 class LandingPage extends React.Component {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <Box className="login-wrapper">
          <div className="row-banner">
            <img src={Landing_Banner} className="banner-img" alt="" />
          </div>
          <img src={Tenant_Logo} className="tenant-logo" alt="" />
          <h1>Manage your home  on<br></br>one platform</h1>
          <p>Your gateway to peaceful living...</p>
          <Box className="customButton row-btn">
            <Button size="large" variant="outlined"  
            onClick={() => {this.props.history.push('/EmailAccountLogin');}}>
            login</Button>
            <div className="mb"></div>
            <Button variant="contained">register</Button>
          </Box>
        </Box>
      </>
    );
  }
}
export default withRouter(LandingPage)

// Customizable Area Start
// Customizable Area End
