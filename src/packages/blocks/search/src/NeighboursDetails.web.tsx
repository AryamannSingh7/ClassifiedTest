//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import NeighboursController, { Props } from "./NeighboursController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//resorces
import {
  Tenant_Logo,
  Building1,
  Search_Icon,
  User1_Img,
  Chat_Icon,
  Contact_Icon,
  Setting_Icon,
  Email_Msg_Icon,
  Chat_Disable_Icon,
  Contact_Disable_Icon,
  Email_Disable_Icon,
  FB_Icon,
  Twitter_Icon,
  Instagram_Icon,
  Snapchat_Icon
}
  from "../src/assets";
class NeighboursDetails extends NeighboursController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    const id = localStorage.getItem("neighboursDetailsId");
    if (id)
      this.getNeighboursDetailsById(id);
    else
      this.props.history.push("/NeighboursListing")
  }

  render() {
    const { navigation } = this.props;
    const attributes = this.state?.getNeighboursDetails?.attributes;
    console.log("getNeighboursDetails=====>", this.state?.getNeighboursDetails)
    return (
      <>
        <Box className="login-wrapper incident-wrapper neighbour-listing-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>My Neighbours</h4>
                  </Box>
                  {/* <Button>
                    <img src={Setting_Icon} className="Search_Icon" alt="Search Icon" />
                  </Button> */}
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  {/* anonymous section */}
                  <Box className="anonymous-section">
                    <Card className="neighbour-card neighbour-detail-card card">
                      <CardContent>
                        <img src={User1_Img} className="info-icon" alt="info-icon" />
                        <Typography component="h4">
                          Anonymous
                        </Typography>
                        <Typography component="h5">
                          B-1405
                        </Typography>
                        <Box className="social-raw">
                          <Box className="blocks">
                            <img src={Chat_Disable_Icon} className="icons" alt="info-icon" />
                          </Box>
                          <Box className="blocks">
                            <img src={Contact_Disable_Icon} className="icons" alt="info-icon" />
                          </Box>
                          <Box className="blocks">
                            <img src={Email_Disable_Icon} className="icons" alt="info-icon" />
                          </Box>
                        </Box>
                        <Box className="note-row">
                          <Typography component="h5">
                            <span className="title">Note:</span> Resident doesn’t want to share his/her name.
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>


                  <Box className="neighbour-detail-section">
                    <Card className="neighbour-card neighbour-detail-card card">
                      <CardContent className="card-content">
                        <img src={User1_Img} className="info-icon" alt="info-icon" />
                        <Typography component="h4">
                          {attributes?.full_name}
                        </Typography>
                        <Box className="social-raw">
                          <Box className="blocks">
                            <img src={Chat_Icon} className="icons" alt="info-icon" />
                          </Box>
                          <Box className="blocks">
                            <img src={Contact_Icon} className="icons" alt="info-icon" />
                          </Box>
                          <Box className="blocks">
                            <img src={Email_Msg_Icon} className="icons" alt="info-icon" />
                          </Box>
                        </Box>
                        <Box className="relation-row">
                          <Box className="blocks">
                            <Typography component="h4">
                              Gender:
                              <span className="title">Male</span>
                            </Typography>
                          </Box>

                        </Box>
                        <Box className="bio-content-row">
                          <Box className="bio-row">
                            <Typography component="h4">
                              Bio
                            </Typography>
                            <Typography component="p">
                              Hello! I am Jaroslav Brabec living with my family in central park since 2015.
                              I am business analyst by profession. It would be nice to get in touch with you.
                            </Typography>
                          </Box>
                          <Box className="bio-row">
                            <Typography component="h4">
                              Hobbies
                            </Typography>
                            <Box className="customButton">
                              <Button variant="contained" className="contain warning">Travelling</Button>
                              <Button variant="contained" className="contain warning">Cooking</Button>
                              <Button variant="contained" className="contain warning">Garding</Button>
                            </Box>
                          </Box>
                          <Box className="social-data-row">
                            <Typography component="h4">
                              Follow me on:
                            </Typography>
                            <Box className="icons-row">
                              <Button href="https://www.w3schools.com" target="_blank">
                                <img src={FB_Icon} className="icon" alt="FB_Icon" />
                              </Button>
                              <Button href="https://www.w3schools.com" target="_blank">
                                <img src={Twitter_Icon} className="icon" alt="Twitter_Icon" />
                              </Button>
                              <Button href="https://www.w3schools.com" target="_blank">
                                <div style={{ backgroundColor: "#f6f6f6", height: "45px", width: "45px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  <img src={Instagram_Icon} style={{ height: "20px", width: "20px" }} alt="Instagram_Icon" />
                                </div>
                              </Button>
                              <Button href="https://www.w3schools.com" target="_blank">
                              <div style={{ backgroundColor: "#f6f6f6", height: "45px", width: "45px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  <img src={Snapchat_Icon} style={{ height: "20px", width: "20px" }} alt="Instagram_Icon" />
                                </div>
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                  {/* neighbour detail section */}
                </Box>
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

export default withRouter(NeighboursDetails)
