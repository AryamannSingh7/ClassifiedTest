import React from "react";
//components
import {
  Box,
  Button,
  Link,
  Grid
} from "@material-ui/core";

//resources

import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
//Customizable Area End

//resorces
import SuggestionController,{Props} from "./SuggestionController.web";
import { Building1, Building_Logo, Tick_Circle_Icon } from "../../ContentManagement/src/assets";

class NewRequestSuggestion extends SuggestionController {
  constructor(props: Props) {
    super(props);
  }

  render() {

   //@ts-ignore
   let data:any=JSON.parse(localStorage.getItem('selectSuggestion'))

    return (
      <>
        <Box className="login-wrapper auth-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
        
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block change-password-mainblock">
                  <Box className="header-block header-block-changepassword">
                    <img src={Tick_Circle_Icon} className="lock-logo" alt="Lock_Icon" />
                    <h1>Suggestion Sent 
<br></br>Successfully</h1>
                    <p>Your suggestion has been sent successfully. 
Your ticket id for sent suggestion is {data?.id}. </p>
                  </Box>
                </Box>
                <Box className="footer-block desktop-ui">
                  <Box className="row-btn customButton">
                    <Button variant="contained" onClick={() => {
                      //@ts-ignore
                      this.props.history.push("/SuggestionListing");
                    }}>OkAY</Button>
                  </Box>
                </Box>
                {/* desktop footer block */}
              
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(NewRequestSuggestion)
