// import React from "react";
import React, { useState } from 'react';
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem
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
import FacilityReservationController, { Props } from "./FacilityReservationController.web";
//Customizable Area End
//resorces
import { Tenant_Logo, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
class FacilityReservation extends FacilityReservationController {
  constructor(props: Props) {
    super(props);
  }
  //    componentDidMount():any {
  //      this.getIncidentListing(this.state.sortBy, this.state.status)
  //    }
  render() {
    const { navigation } = this.props;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>FacilityReservation</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper facility-block-wrapper">
                  <Box className="incident-content-wrapper">
                    <Card className="incident-card card" >
                      <CardContent className="costom-card-content">
                        <Typography component="h4">
                          Upcoming Reservations
                        </Typography>
                        <CardActions className="card-footer">
                          {/* <Button className="success">Resolved</Button> */}
                          <Button variant="contained">{67}</Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => {
                      this.setState({ loading: true });//@ts-ignore
                      this.props.history.push("/CreateIncident")
                    }} >Add New Incident</Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* desktop footer block */}
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

export default withRouter(FacilityReservation)
