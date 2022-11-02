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
  changeRoute() {
    // console.log(window.location.href)
    this.props.history.push('/selecttype')
    // if (window.location.href.includes('owner')) {
    //   this.props.history.push('/selectowner');

    // } else {
    //   this.props.history.push('/register');
    // }

  }
  render() {
    console.log(Landing_Banner)
    return (
      <>
        <Box className="landing-wrapper">
          <Box className="content-block">
            <div className="row-banner">
              <img src={Landing_Banner.default} className="banner-img" alt="" />
            </div>
            <Box className="content-section">
              <img src={Tenant_Logo.default} className="tenant-logo" style={{ cursor: 'pointer'}} onClick={()=>window.open("https://www.TenantInt.com", '_blank').focus()} alt="" />
              <h1>Manage your home  on<br></br>one platform</h1>
              {/* <p>Your gateway to peaceful living...</p> */}
            </Box>
            <Box className="customButton row-btn">
              <Button size="large" variant="outlined"
                onClick={() => { this.props.history.push('/EmailAccountLogin'); }}>
                login</Button>
              <div className="mb"></div>
              <Button variant="contained" onClick={() => { this.changeRoute() }}>register</Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}
export default withRouter(LandingPage)

// Customizable Area Start
// Customizable Area End
