//@ts-ignore
//@ts-nocheck
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
import IncidentController, { Props } from "./IncidentController.web";
//Customizable Area End

//resorces
import { Tenant_Logo, Building1, Grid_Icon, Filter_Icon } from "../src/assets";

class IncidentListing extends IncidentController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.getIncidentListing(this.state.sortBy, this.state.status)
  }
  render() {
    const { navigation } = this.props;
    console.log("this.state?.incidentListing==========>", this.state?.incidentListing)
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Incidents</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick(e)}>
                        <img src={Grid_Icon} className="grid-icon icons" alt="" />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.handleClose()}
                      >
                        <MenuItem onClick={(e) => this.handleClose(e, "asc")}>Ascending</MenuItem>
                        <MenuItem onClick={(e) => this.handleClose(e, "desc")}>Descending</MenuItem>
                      </Menu>
                    </Box>

                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick_1(e)}>
                      <img src={Filter_Icon} className="filter-icon icons" alt="" />
                    </Button>
                    <Menu
                      id="fade-menu"
                      anchorEl={this.state.anchorEl_1}
                      keepMounted
                      open={Boolean(this.state.anchorEl_1)}
                      onClose={() => this.handleClose_1()}
                    >
                      <MenuItem onClick={(e) => this.handleClose_1(e, "Unresolved")}>Unresolved</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "Resolved")}>Resolved</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "Pending Confirmation")}>Pending Confirmation</MenuItem>
                    </Menu>

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    {
                      this.state?.incidentListing?.map((val, index) => (
                        <>
                          <Card className="incident-card card" key={index} onClick={() => this.getIncidentDetails(val.id)}>
                            <CardContent className="costom-card-content">
                              <Typography component="h4">
                                {val?.attributes?.incident_title}
                              </Typography>
                              <Typography component="span">
                                Incident is related to:
                              </Typography>
                              <Typography className="sub-title h5-title" component="h5">
                                {val?.attributes?.incident_related?.name}
                              </Typography>
                              <Box className="card-listing-row">
                                <Typography component="span">
                                  Building:
                                </Typography>
                                <Typography component="span">
                                  Unit:
                                </Typography>
                              </Box>
                              <Box className="card-listing-row">
                                <Typography className="sub-title h5-title" component="h5">
                                  {val?.attributes?.apartment_management?.building_name}
                                </Typography>
                                <Typography className="sub-title h5-title" component="h5">
                                  {val?.attributes?.apartment_management?.apartment_name}
                                </Typography>
                              </Box>
                              <hr />
                              <CardActions className="card-footer">
                                <Typography className="sub-title h5-title" component="h5">
                                  {val?.attributes?.common_area?.name}
                                </Typography>
                                {
                                  val?.attributes?.incident_status === "Resolved" ?
                                    <Box className="customButton">
                                      <Button variant="contained" className="contain success" type="submit" >Resolved</Button>
                                    </Box>
                                    :
                                    (val?.attributes?.incident_status === "Pending Confirmation") ?
                                      <Box className="customButton">
                                        <Button variant="contained" className="contain warning" type="submit" >Pending Confirmation</Button>
                                      </Box>
                                      :
                                      <Box className="customButton">
                                        <Button variant="contained" className="contain danger" type="submit" >Unresolved</Button>
                                      </Box>
                                }
                                {/* <Button className="success">Resolved</Button> */}
                              </CardActions>
                            </CardContent>
                          </Card>
                        </>
                      ))
                    }
                  </Box>
                  <Box className="customButton">
                    <Button variant="contained" onClick={() => { this.setState({ loading: true }); this.props.history.push("/CreateIncident") }} >Add New Incident</Button>
                  </Box>
                </Box>
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
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

export default withRouter(IncidentListing)
