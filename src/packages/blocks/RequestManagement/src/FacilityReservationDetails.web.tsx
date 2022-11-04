import React from "react";
//components
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import moment from 'moment';
//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
//import SmartDisplayIcon from '@material-ui/icons/SmartDisplay';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import FullscreenIcon from '@material-ui/icons/Fullscreen';

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
  Tenant_Logo,
  Building1,
  Pencil,
  wrong,
  Bin
  // User_Icon,
  // Calender_Icon,
  // Info_Icon,
  // Clipboard_Icon,
  // Close_Icon
}
  from "../src/assets";
class FacilityReservationDetails extends FacilityReservationController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
     //@ts-ignore
    const id = this.props.history.location?.idOrName;
    if(id)
       this.getFacilityReservationDetailsById(id);
   else 
   this.props.history.push("/FacilityReservationListing");
  }

  render() {
   console.log("this.props.history getFacilityReservationDetails===========>",this.state?.getFacilityReservationDetails)
    const { navigation } = this.props;
    const id = this.state?.getFacilityReservationDetails?.id;
    const attributes = this.state?.getFacilityReservationDetails?.attributes;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>{attributes?.date}</h4>
                  </Box>

                  <Box className="incident-right-block blocks">
                     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                       <Button  onClick={() =>" " }>
                         <img src={Pencil} className="grid-icon icons" alt="" />
                       </Button>
                     </Box>
                     <Button  onClick={() => " "}>
                       <img src={Bin} className="filter-icon icons" alt="" />
                     </Button>
                   </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                   
                    <Box className="incident-rows mt-15">
                      <h4>{attributes?.date}</h4>
                    </Box>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography className="title-span" component="span">
                         Building Name:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.building_management_id}
                        </Typography>
                        <Typography className="title-span" component="span">
                         Facility Reserved:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.common_area_id}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Rent:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {id}
                        </Typography>
                        {/* <Typography className="title-span" component="span">
                          Expected Resolution Date:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          12-03-2021 13:45 {attributes?.expected_resolution_date}
                        </Typography> */}
                        <Typography component="span">
                          Hours:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.time_from} - {attributes?.time_to}
                        </Typography>   
                      </CardContent>
                    </Card>
                  </Box>
                  {/* <Box className="customButton ticket-conversion">
                    <Button variant="contained" onClick={() => this.createChatRoom(attributes?.id)}>start/ view ticket conversation</Button>
                  </Box> */}
                </Box>
                {/* <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
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
          <Dialog
            open={this.state.showDialog}
            onClose={() => this.setState({ showDialog: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="diloag-wrapper"
            PaperProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          >
            <Box className="diloag-body">
              <Box className="diloag-header">
                <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                  {this.state?.file?.name}
                </DialogTitle>
                <Button onClick={() => { this.setState({ showDialog: false }) }}>
                  <img src={"#"} className="close-icon" onClick={() => { this.setState({ showDialog: false }) }} />
                </Button>
              </Box>
              <Box className="diloag-content-body">
                {
                  this.state?.file?.type === "video/mp4" || this.state?.file?.type === "video/x-m4v" ?
                    <video className="incident-dialog-video" controls >
                      <source src={this.state?.file?.url} type={this.state?.file?.type} />
                    </video>
                    :
                    <Box>
                      <img src={this.state?.file?.url} className="incident-dialog-photo" alt="card-img" />
                    </Box>
                }
              </Box>
            </Box>
          </Dialog>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(FacilityReservationDetails)
