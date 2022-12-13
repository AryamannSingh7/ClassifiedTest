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
import { 
  Building1, 
  Grid_Icon, 
} from "../src/assets";
class FacilityReservationListing extends FacilityReservationController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    //@ts-ignore
    const reservation = localStorage.getItem("idOrName");
    if (reservation)
      this.getFacilityReservationListing(this.state?.sortBy)
    else
      this.props.history.push("/FacilityReservation");
  }

  render() {
    const { navigation } = this.props;
    const reservation = localStorage.getItem("idOrName");
    console.log("this.props?.history.location?.reservation==========>", this.state?.facilityReservationListing)
    let facilityReservationListing: any;

    if (reservation === "Previous") {
      facilityReservationListing = this.state?.facilityReservationListing?.filter((val: any) => val?.attributes?.status === 'Completed')
    }
    else {
      facilityReservationListing = this.state?.facilityReservationListing?.filter((val: any) => val?.attributes?.status === reservation)
    }
    console.log("ressklt facilityReservationListing==========>", facilityReservationListing)
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => this.props.history.push("/FacilityReservation")}><KeyboardBackspaceIcon /></Box>
                    <h4>{reservation} Reservation</h4>
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
                    {/* <Button aria-controls="fade-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick_1(e)}>
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
                    </Menu> */}

                  </Box>
                </Box>
                <Box className="content-block-wrapper facility-block-wrapper">
                  <Box className="incident-content-wrapper">
                    {
                      facilityReservationListing?.length !== 0 ?
                        facilityReservationListing?.map((val: any, index: any) => (
                          <>
                            <Card className="incident-card facility-card card" key={index} onClick={() => this.getFacilityReservationDetails(val.id)}>
                              <CardContent className="costom-card-content">
                                {/* <Typography component="h4">
                                 {val?.attributes?.date}
                               </Typography> */}
                                {/* <Typography component="span">
                                 Facility Reserved:
                               </Typography> */}
                                <Typography className="sub-title h5-title" component="h4">
                                  {val?.attributes?.date}
                                </Typography>
                                <Box className="card-listing-row">
                                  <Typography component="span" className="span-subtitle">
                                    Facility Reserved:
                                  </Typography>
                                  <Typography component="span" className="span-subtitle">
                                    Building Name:
                                  </Typography>
                                </Box>
                                <Box className="card-listing-row">
                                  <Typography className="facility-subtitle" component="h5">
                                    {val?.attributes?.common_area?.name}
                                  </Typography>
                                  <Typography className="facility-subtitle" component="h5">
                                    {val?.attributes?.building?.name}
                                  </Typography>
                                </Box>
                                <hr />
                                <CardActions className="card-footer">
                                  <Typography className="sub-title h5-title" component="h5">
                                    {"Rent"}
                                  </Typography>
                                  <Box className="customButton">
                                    <Button variant="contained" className="contain blue" type="submit" >{val?.attributes?.rent}</Button>
                                  </Box>
                                  {/* <Button className="success">Resolved</Button> */}
                                </CardActions>
                              </CardContent>
                            </Card>
                          </>
                        ))
                        :
                        <Box style={{ marginLeft: "25px" }}>
                          <Typography variant={"body1"} style={{ fontWeight: "bold" }} color="textSecondary" >
                            No Data Found
                          </Typography>
                        </Box>
                    }
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

export default withRouter(FacilityReservationListing)
