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
import ClassifiedController, { Props } from "./ClassifiedController.web";
//Customizable Area End
//resorces
import { Tenant_Logo, Building1, Grid_Icon, Setting_Icon, Filter_Icon } from "../src/assets";

class ClassifiedListing extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getClassifiedListing(this.state.sortBy, this.state.status)
  }
  render() {
    const { navigation } = this.props;
    console.log("this.state?.classifiedtListing==========>", this.state?.classifiedtListing)
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Classified</h4>
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
                        onClose={() => this.handleClose("", "")}
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
                      onClose={() => this.handleClose_1("", "")}
                    >
                      <MenuItem onClick={(e) => this.handleClose_1(e, "Unresolved")}>Unresolved</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "Resolved")}>Resolved</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "Pending Confirmation")}>Pending Confirmation</MenuItem>
                    </Menu>

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <div className="classified-header">
                      <Box className="customButton">
                        <Button variant="contained">All Classified</Button>
                      </Box>
                      <Box className="customButton btn-gray">
                        <Button variant="contained">My Classified</Button>
                      </Box>
                    </div>
                    {
                      this.state?.classifiedtListing?.map((val: any, index: any) => (
                        <>
                          <Card className="classified-card card"  style={{ position: "relative",zIndex: 1}} key={index} onClick={() => this.getIncidentDetails(val.id)}>
                            <CardContent className="costom-card-content">
                              <Box className="classified-card-header">
                                <Typography component="h4">
                                  Classified Title
                                </Typography>
                                <Button  style={{ position: "absolute",right:"10px" ,zIndex: 10}} aria-controls="simple-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick(e)}>
                                  <img src={Setting_Icon} className="grid-icon icons" alt="" />
                                </Button>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={this.state.anchorEl}
                                  keepMounted
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={() => this.handleClose("", "")}
                                >
                                  <MenuItem onClick={(e) => this.handleClose(e, "asc")}>Ascending</MenuItem>
                                  <MenuItem onClick={(e) => this.handleClose(e, "desc")}>Descending</MenuItem>
                                </Menu>
                              </Box>
                              <Typography className="sub-title h5-title" component="h5">
                                On the contrary,description of the services.On the contrary,description of the services.
                              </Typography>
                              <Typography component="span">
                                Available to buy:
                              </Typography>
                              <Typography className="sub-title h5-title" component="h5">
                                24-3-2022 to 24-3-2022
                              </Typography>
                              <hr />
                              <Box className="card-footer classified-footer">
                                <div className="left-block">
                                  {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                  <Typography component="h4">
                                    SR 500 - SR 650
                                  </Typography>
                                </div>
                                <Box className="customButton">
                                  <Button variant="contained" className="contain danger" type="submit" >Unresolved</Button>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </>
                      ))
                    }
                  </Box>
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => {
                      this.setState({ loading: true });//@ts-ignore
                      this.props.history.push("/ClassifiedType")
                    }} >Add New Incident</Button>
                  </Box>
                </Box>
                {/* <Box className="footer-main-block bottomBlock">
                   <h6 className="bottom-text">POWERED BY</h6>
                   <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                 </Box> */}
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

export default withRouter(ClassifiedListing)
