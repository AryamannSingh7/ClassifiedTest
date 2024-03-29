//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import IncidentController, { Props } from "./IncidentController.web";
//Customizable Area End
import AlertErrorWeb from "../../../components/src/AlertError.web"


//resorces
import { Tenant_Logo, Building_Logo, Tick_Circle_Icon, Building1 } from "../src/assets";

class IncidentReportedSuccessfully extends IncidentController {
  constructor(props: Props) {
    super(props);
  }

  render() {
   const { navigation } = this.props;
   const id = localStorage?.getItem("createIncidentId")
   console.log("id=====>",id );
    if (!id) {
      //@ts-ignore
      this.props.history.replace("/CreateIncident");
      return null;
    }
    return (
      <>
        <Box className="login-wrapper auth-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                {/* <Box className="backIcon" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box> */}
                <Box className="logo-block common-top-padding" display={{ xs: 'none', md: 'flex' }}>
                  <Link href="/EmailAccountLogin">
                    <img src={Building_Logo.default} className="head-logo" alt="" />
                    <h4>Building Name</h4>
                  </Link>
                </Box>
                <Box className="main-content-block change-password-mainblock" style={{height: "100%"}}>
                  <Box className="header-block header-block-changepassword" style={{height: "100%", padding: "0", justifyContent:"center"}}>
                    <img src={Tick_Circle_Icon} className="lock-logo" alt="Lock_Icon" />
                    <h1 className="bold-text">Incident Reported<br></br>Successfully</h1>
                    <p>Your incident has been reported successfully. Your ticket id for reported incident is<br></br><span className="id-title bold-text">{id}</span></p>
                  </Box>
                </Box>
                <Box className="footer-block desktop-ui">
                  <Box className="row-btn customButton" style={{margin:"0"}}>
                    <Button variant="contained" style={{boxShadow:"none"}} onClick={() => {
                      //@ts-ignore
                      this.createChatRoom(localStorage?.getItem("createIncidentId"))
                      localStorage.removeItem("createIncidentId");
                      localStorage.removeItem("incidentPreview");
                    }}>view ticket</Button>
                  </Box>
                </Box>
                {/* desktop footer block */}
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(IncidentReportedSuccessfully)
