//@ts-ignore
//@ts-nocheck
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
import IncidentController, { Props } from "./IncidentController.web";
//Customizable Area End

//resorces
import {
  Tenant_Logo,
  Building1,
  Grid_Icon,
  Filter_Icon,
  User_Icon,
  Calender_Icon,
  Info_Icon,
  Clipboard_Icon,
  Close_Icon
}
  from "../src/assets";
class IncidentDetails extends IncidentController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
    //@ts-ignore
    this.getIncidentDetailsById(this.props.history.location?.id);
  }

  render() {
   
    const id = this.state?.getIncidentDetails?.id;
    const attributes = this.state?.getIncidentDetails?.attributes;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>{attributes?.incident_title}</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block" style={{backgroundColor:"F7F9FE"}}>
                  <Box className="incident-content-wrapper">
                    {
                      attributes?.incident_status === 'Pending Confirmation' ?
                        <Card className="incident-card confirmation-card card">
                          <CardContent className="confirmation-card-content">
                            <Box className="info-row">
                              <img src={Info_Icon} className="info-icon" alt="info-icon" />
                            </Box>

                            <Typography component="h4">
                              Is your raised incident<br></br>resolved?
                            </Typography>

                            <Typography component="p">
                              {attributes?.incident_related?.name} is claiming to have resolved
                              you incident for ticket id {id}.
                              Please confirm if it is resolved.
                            </Typography>
                            <Box className="customButton">
                              <Box className="formGroup">
                                <Button variant="outlined" className="reject-closure-btn" onClick={() => this.confirmOrRejectIncident(id, "reject")} >reject closure</Button>
                                <Button variant="contained" className="confirm-closure-btn" onClick={() => this.confirmOrRejectIncident(id, "confirm")} >confirm closure</Button>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card> :
                        null
                    }
                    <Box className="incident-rows mt-15">
                      <h4>Incident Details</h4>
                     <ButtonStatus attributes={attributes}></ButtonStatus>
                    </Box>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography className="title-span" component="span">
                          Affected Area:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.common_area?.name}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Incident is related to:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.incident_related?.name}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Incident Number:
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
                          Building:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.apartment_management?.building_name}
                        </Typography>
                        <Typography component="span">
                          Unit:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.apartment_management?.apartment_name}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Latest update from management:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.last_update_from_management}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Ackwnolodged by Manager:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.acknoledged_by_manager}
                        </Typography>
                        {
                          attributes?.attachments.length !== 0 ?
                            <>
                              <Typography className="title-span" component="span">
                                Photos
                              </Typography>
                              <CardActions className="card-img-row">
                                {
                                  attributes?.attachments?.map((val:any, index:any) => (
                                    val?.content_type === "video/mp4" || val?.content_type === "video/x-m4v" ?
                                      <Box className="video-img" key={index} onClick={() => { this.setState({ showDialog: true, file: { url: val.url, type: val?.content_type, name: val?.file_name } }) }}>
                                        <Box className="img-layer"></Box>
                                        <video className="incident-dialog-video"  >
                                          <source src={val?.url} type={val?.file?.type} />
                                        </video>
                                        <PlayCircleOutlineIcon className="play-icon" />
                                      </Box>
                                      :
                                      <Box className="video-img" key={index} onClick={() => { this.setState({ showDialog: true, file: { url: val.url, type: val?.content_type, name: val?.file_name } }) }}>
                                        <Box className="img-layer"></Box>
                                        <img src={val.url} className="card-img" alt="card-img" />
                                        <FullscreenIcon className="play-icon" />
                                      </Box>
                                  ))
                                }

                                {/* <Box className="video-img" onClick={() => { this.setState({ showDialog: true }) }}>
                                  <PlayCircleOutlineIcon className="play-icon" />
                                  <img src={Building1.default} className="card-img" alt="card-img" />
                                  <Box className="img-layer"></Box>
                                </Box>
                                <Box className="video-img" onClick={() => { this.setState({ showDialog: true }) }}>
                                  <PlayCircleOutlineIcon className="play-icon" />
                                  <img src={Building1.default} className="card-img" alt="card-img" />
                                  <Box className="img-layer"></Box>
                                </Box> */}
                              </CardActions>
                              <hr />
                            </>
                            :
                            null
                        }
                        <Typography className="title-span" component="span">
                          Description:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                         {attributes?.description}
                        </Typography>
                      </CardContent>
                    </Card>
                    {/* <Box className="commonForm">
                      <Box className="formGroup textarea">
                        <img src={Clipboard_Icon} className="clipboard-icon" alt="Clipboard_Icon" />
                        <TextareaAutosize
                          maxRows={10}
                          aria-label="maximum height"
                          // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                          disabled
                          value={attributes?.description}
                        />
                      </Box>
                    </Box> */}
                    <Box className="incident-rows mt-20">
                      <h4>Reporting Details</h4>
                    </Box>
                    <Card className="incident-card reporting-card card">
                      <CardContent>
                        <Box className="reporting-row">
                          <img src={User_Icon.default} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Reported By:</h5>
                            <h4>Mr. {attributes?.reported_by?.full_name}</h4>
                          </Box>
                        </Box>
                        <Box className="reporting-row">
                          <img src={Calender_Icon.default} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Reported On:</h5>
                            <h4>{attributes?.reported_on}</h4>
                          </Box>
                        </Box>
                        {attributes?.resolved_on ?
                          <Box className="reporting-row">
                            <img src={Calender_Icon.default} className="icons" alt="" />
                            <Box className="reporting-right-block">
                              <h5>Resolved On:</h5>
                              <h4 >{attributes?.resolved_on}</h4>
                            </Box>
                          </Box> : null
                        }
                      </CardContent>
                    </Card>
                    {/* <Card className="incident-card reporting-card card">*/}
                    {/*</Card> */}
                  </Box>
                  <Box className="customButton ticket-conversion">
                    <Button variant="contained" onClick={() => this.createChatRoom(id)}>{attributes?.incident_status === 'Resolved' ? 'View ticket conversation':'Start/ View ticket conversation' }</Button>
                  </Box>
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
                  <img src={Close_Icon} className="close-icon" onClick={() => { this.setState({ showDialog: false }) }} />
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

const ButtonStatus=(props:any)=>{
  const attributes = props?.attributes
  return(
    <>
     <Box className="customButton">
                        <Button variant="contained" className={attributes?.incident_status === 'Unresolved' ? "contain danger" : attributes?.incident_status === 'Resolved' ? 'contain success' : 'contain warning'}  > {attributes?.incident_status}</Button>
                      </Box>
    </>
  )
}

export default withRouter(IncidentDetails)
