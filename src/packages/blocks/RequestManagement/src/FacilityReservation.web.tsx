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
import { Tenant_Logo, Building1, Grid_Icon, Filter_Icon, upcoming, pending, previous } from "../src/assets";
class FacilityReservation extends FacilityReservationController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getFacilityReservationCount()
  }
  render() {
    const { navigation } = this.props;
    console.log("getFacilityReservationCount=======>", this.state.facilityCount)
    const { total_upcoming_count, total_pending_count, total_completed_count, total_cancelled_count, total_rejected_count } = this.state?.facilityCount;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={this.redirectToDashboard}><KeyboardBackspaceIcon /></Box>
                    <h4>Facility Reservation</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper facility-block-wrapper">
                  <Box className="incident-content-wrapper">
                    <Card className="card facilityReserve-card" onClick={() => this.getFacilityReservationDetails("Upcoming")}>
                      <CardContent className="costom-card-content">
                        <img src={upcoming} className="frm-icons" alt="House Icon" />
                        <Typography component="h4">
                          Upcoming Reservations
                        </Typography>
                        <Typography component="h5">
                          Total
                        </Typography>
                        <CardActions className="card-footer">
                          <Box className="customButton">
                            <Button variant="contained" className="contain warning">{total_upcoming_count}</Button>
                          </Box>
                        </CardActions>
                      </CardContent>
                    </Card>

                    <Card className="card facilityReserve-card" onClick={() => this.getFacilityReservationDetails("Pending")}>
                      <CardContent className="costom-card-content">
                        <img src={pending} className="frm-icons" alt="House Icon" />
                        <Typography component="h4">
                          Pending Reservations
                        </Typography>
                        <Typography component="h5">
                          Total
                        </Typography>
                        <CardActions className="card-footer">
                          <Box className="customButton">
                            <Button variant="contained" className="contain warning" >{total_pending_count}</Button>
                          </Box>
                        </CardActions>
                      </CardContent>
                    </Card>

                    <Card className="card facilityReserve-card" onClick={() => this.getFacilityReservationDetails("Previous")}>
                      <CardContent className="costom-card-content">
                        <img src={previous} className="frm-icons" alt="House Icon" />
                        <Typography component="h4">
                          Previous Reservations
                        </Typography>
                        <Typography component="h5">
                          Total
                        </Typography>
                        <CardActions className="card-footer">
                          {/* <Button className="success">Resolved</Button> */}
                          <Box className="customButton">
                            <Button variant="contained" className="contain warning" >{total_completed_count}</Button>
                          </Box>
                        </CardActions>
                      </CardContent>
                    </Card>

                    <Card className="card facilityReserve-card" onClick={() => this.getFacilityReservationDetails("Rejected")}>
                      <CardContent className="costom-card-content">
                        <img src={previous} className="frm-icons" alt="House Icon" />
                        <Typography component="h4">
                          Reject Reservations
                        </Typography>
                        <Typography component="h5">
                          Total
                        </Typography>
                        <CardActions className="card-footer">
                          {/* <Button className="success">Resolved</Button> */}
                          <Box className="customButton">
                            <Button variant="contained" className="contain warning" >{total_rejected_count}</Button>
                          </Box>
                        </CardActions>
                      </CardContent>
                    </Card>

                    <Card className="card facilityReserve-card" onClick={() => this.getFacilityReservationDetails("Cancelled")}>
                      <CardContent className="costom-card-content">
                        <img src={previous} className="frm-icons" alt="House Icon" />
                        <Typography component="h4">
                          Cancelled Reservations
                        </Typography>
                        <Typography component="h5">
                          Total
                        </Typography>
                        <CardActions className="card-footer">
                          {/* <Button className="success">Resolved</Button> */}
                          <Box className="customButton">
                            <Button variant="contained" className="contain warning" >{total_cancelled_count}</Button>
                          </Box>
                        </CardActions>
                      </CardContent>
                    </Card>

                  </Box>
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => {
                      this.setState({ loading: true });//@ts-ignore
                      this.props.history.push("/CreateFacilityReservation")
                    }} >BOOK A FACILITY</Button>
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
