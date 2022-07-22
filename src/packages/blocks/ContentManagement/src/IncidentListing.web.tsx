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
                    <Box display={{ xs: 'flex', md: 'none' }} className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Incidents</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Button>
                        <img src={Grid_Icon} className="grid-icon icons" alt="" />
                      </Button>
                    </Box>
                    <Button><img src={Filter_Icon} className="filter-icon icons" alt="" /></Button>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography component="h4">
                          Incident Title
                        </Typography>
                        <Typography component="span">
                          Incident is related to:
                        </Typography>
                        <Typography className="sub-title" component="h4">
                          Plumbing
                        </Typography>
                        <hr />
                        <CardActions className="card-footer">
                          <Typography className="sub-title" component="h4">
                            Own apartment
                          </Typography>
                          <Box className="customButton">
                            <Button variant="contained" className="contain success" type="submit" >Resolved</Button>
                          </Box>
                          {/* <Button className="success">Resolved</Button> */}
                        </CardActions>
                      </CardContent>
                    </Card>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography component="h4">
                          Incident Title
                        </Typography>
                        <Typography component="span">
                          Incident is related to:
                        </Typography>
                        <Typography className="sub-title" component="h4">
                          Plumbing
                        </Typography>
                        <hr />
                        <CardActions className="card-footer">
                          <Typography className="sub-title" component="h4">
                            Own apartment
                          </Typography>
                          <Box className="customButton">
                            <Button variant="contained" className="contain warning" type="submit" >Pending Confirmation</Button>
                          </Box>
                          {/* <Button className="success">Resolved</Button> */}
                        </CardActions>
                      </CardContent>

                    </Card>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography component="h4">
                          Incident Title
                        </Typography>
                        <Typography component="span">
                          Incident is related to:
                        </Typography>
                        <Typography className="sub-title" component="h4">
                          Plumbing
                        </Typography>
                        <hr />
                        <CardActions className="card-footer">
                          <Typography className="sub-title" component="h4">
                            Own apartment
                          </Typography>
                          <Box className="customButton">
                            <Button variant="contained" className="contain danger" type="submit" >Unresolved</Button>
                          </Box>
                          {/* <Button className="success">Resolved</Button> */}
                        </CardActions>
                      </CardContent>

                    </Card>
                  </Box>
                  <Box className="customButton" display={{ xs: 'flex', md: 'none' }}>
                    <Button variant="contained" type="submit" >login</Button>
                  </Box>

                </Box>
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            {/* desktop footer block */}
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
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