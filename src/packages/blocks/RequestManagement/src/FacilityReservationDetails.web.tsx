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
  Bin,
  DeleteIcon,
  CROSS
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
    const id = localStorage.getItem("facilityReservationId");
    if(id)
       this.getFacilityReservationDetailsById(id);
   else 
   this.props.history.push("/FacilityReservationListing");
  }

  render() {
   //console.log("getFacilityReservationDetails===========>",this.state?.getFacilityReservationDetails)
    const { navigation } = this.props;
    const reservation  = localStorage.getItem("idOrName");
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
                    <h4>{reservation} Reservation</h4>
                  </Box>
                 {
                  attributes?.status==="Pending" ?
                  <Box className="incident-right-block blocks">
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Button onClick={() => { this.props.history.push({pathname: "/CreateFacilityReservation",//@ts-ignore
                    id}) }}>
                      <img src={Pencil} className="grid-icon icons" alt="" />
                    </Button>
                  </Box>
                  <Button  onClick={() => { this.setState({ deleteShowDialog: true }) }}>
                    <img src={Bin} className="filter-icon icons" alt="" />
                  </Button>
                </Box>
                  :
                  attributes?.status==="Upcoming" ?
                  <Box className="incident-right-block blocks">
                  <Button  onClick={() => { this.setState({ showDialog: true }) }}>
                    <img src={CROSS} className="filter-icon icons" alt="" />
                  </Button>
                </Box>
                :
                null
                 }
                 
                </Box>
                <Box className="content-block-wrapper facility-block-wrapper">
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
                          {attributes?.building?.name}
                        </Typography>
                        <Typography className="title-span" component="span">
                         Facility Reserved:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.common_area?.name}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Rent:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.rent}
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
                          {attributes?.start_time} - {attributes?.end_time}
                        </Typography>   
                      {
                          attributes?.status==="Completed"?<>
                         <Typography component="span">
                           Paid on:
                         </Typography>
                         <Typography className="sub-title" component="h5">
                           {attributes?.paid_on}
                         </Typography>  
                         </>
                          :null
                      }
                        
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

           {/* view status dialog */}
                <Dialog
                open={this.state?.showDialog}
                onClose={() => this.setState({ showDialog: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="diloag-wrapper"
                PaperProps={{
                  style: {
                    borderRadius: '15px',
                    width: "500px"
                  },
                }}
              >
                <Box className="diloag-body classified-dialouge-body desktop-ui ">
                  <Box className="diloag-header classified-header">
                    <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                      {""}
                    </DialogTitle>
                    {/* <Button onClick={() => this.setState({ showDialog: false })}>
                      <img src={Close_Icon} className="close-icon" />
                    </Button> */}
                  </Box>
                  <Box className="diloag-content classified-content diloag-management-content">
                    <img src={DeleteIcon} className="lock-logo" alt="Lock_Icon" />
                    <h3>Cancel Reservation</h3>
                    <p className="lead">Are you sure you want to cancel this reservation? If you proceed your reservation will be deleted and the manager will be notified</p>
                    <Box className="diloag-btn customButton">
                      <Button variant="outlined" onClick={() => { this.cancelUpcomingFacilityReservation(id , "Cancel")  }}>Yes, CANCEL</Button>
                      <Button variant="contained" onClick={() => { this.setState({ showDialog: false }) }} >No, don’t cancel</Button>
                    </Box>
                  </Box>
                </Box>
              </Dialog>

            {/* view status dialog */}
            <Dialog
                open={this.state?.deleteShowDialog}
                onClose={() => this.setState({ deleteShowDialog: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="diloag-wrapper"
                PaperProps={{
                  style: {
                    borderRadius: '15px',
                    width: "500px"
                  },
                }}
              >
                <Box className="diloag-body classified-dialouge-body desktop-ui ">
                  <Box className="diloag-header classified-header">
                    <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                      {""}
                    </DialogTitle>
                    {/* <Button onClick={() => this.setState({ deleteShowDialog: false })}>
                      <img src={Close_Icon} className="close-icon" />
                    </Button> */}
                  </Box>
                  <Box className="diloag-content classified-content diloag-management-content">
                    <img src={DeleteIcon} className="lock-logo" alt="Lock_Icon" />
                    <h3>Delete Pending Reservation Request?</h3>
                    <p className="lead"> Are you sure want to delete pending garden reservation request? Once deleted you will have to request reserving the facility again</p>
                    <Box className="diloag-btn customButton">
                      <Button variant="outlined" onClick={() => { this.deleteFacility(id)}}>Yes, DELETE</Button>
                      <Button variant="contained" onClick={() => { this.setState({ deleteShowDialog: false }) }} >No, don’t delete</Button>
                    </Box>
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
