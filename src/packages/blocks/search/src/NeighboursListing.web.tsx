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
  Building_Icon,
  User1_Img,
  User2_Img,
  User3_Img,
  Chat_Icon,
  Contact_Icon,
  Email_Msg_Icon,
  Chat_Disable_Icon,
  Contact_Disable_Icon,
  Email_Disable_Icon
}
  from "../src/assets";
class NeighboursListing extends NeighboursController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    //  this.getIncidentDetailsById(this.props.history.location?.id);
  }

  render() {
    const { navigation } = this.props;

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
                  <Button>
                    <img src={Search_Icon} className="Search_Icon" alt="Search Icon" />
                  </Button>
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  <Box className="commonForm neighbour-form">
                    <Formik>
                      <Box className="formGroup customSelect">
                        <FormControl variant="outlined" >
                          <span className="frmLeftIcons">
                            <img src={Building_Icon} className="frm-icons" alt="House Icon" />
                          </span>
                          <Select
                            name="myApartment"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // onChange={(e) => {
                            //   (e.target.value != " ") && setFieldValue("myApartment", e.target.value)
                            // }}
                            value="Select Park"
                          >
                            <MenuItem value="1">
                              Central Park
                            </MenuItem>
                            <MenuItem value="2">
                              Central Park2
                            </MenuItem>
                          </Select>
                          <ErrorMessage className="text-error" component="Typography" name="myApartment" />
                        </FormControl>
                      </Box>
                    </Formik>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card className="neighbour-card card">
                        <CardContent className="card-content">
                          <img src={User1_Img} className="info-icon" alt="info-icon" />
                          <Typography component="h4">
                            Yasaman Foroutan
                          </Typography>
                          <Typography component="h5">
                            B-1405
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
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className="neighbour-card card">
                        <CardContent>
                          <img src={User1_Img} className="info-icon" alt="info-icon" />
                          <Typography component="h4">
                            Yasaman Foroutan
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
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className="neighbour-card card">
                        <CardContent>
                          <img src={User1_Img} className="info-icon" alt="info-icon" />
                          <Typography component="h4">
                            Yasaman Foroutan
                          </Typography>
                          <Typography component="h5">
                            B-1405
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
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className="neighbour-card card">
                        <CardContent>
                          <img src={User1_Img} className="info-icon" alt="info-icon" />
                          <Typography component="h4">
                            Yasaman Foroutan
                          </Typography>
                          <Typography component="h5">
                            B-1405
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
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className="neighbour-card card">
                        <CardContent>
                          <img src={User1_Img} className="info-icon" alt="info-icon" />
                          <Typography component="h4">
                            Yasaman Foroutan
                          </Typography>
                          <Typography component="h5">
                            B-1405
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
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card className="neighbour-card card">
                        <CardContent>
                          <img src={User1_Img} className="info-icon" alt="info-icon" />
                          <Typography component="h4">
                            Yasaman Foroutan
                          </Typography>
                          <Typography component="h5">
                            B-1405
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
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
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

export default withRouter(NeighboursListing)
