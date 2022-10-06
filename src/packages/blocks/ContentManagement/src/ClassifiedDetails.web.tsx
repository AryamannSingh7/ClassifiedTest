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
import ClassifiedController, { Props } from "./ClassifiedController.web";
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
class ClassifiedDetails extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
    //@ts-ignore
    this.getClassifiedDetailsById(this.props.history.location?.id);
  }

  render() {
    console.log(",image: val===========>", this.state?.file)
    const { navigation } = this.props;
    const id = this.state?.getClassifiedDetails?.id;
    const attributes = this.state?.getClassifiedDetails?.attributes;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>{"Classified"}</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">

                    <Box className="incident-rows mt-15">
                      <h4>Classified Details</h4>
                    </Box>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography className="title-span" component="span">
                         Title:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.title}
                        </Typography>
                        <Typography className="title-span" component="span">
                        Description:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.Description}
                        </Typography>
                        <Typography className="title-span" component="span">
                         Price:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                        {attributes?.price_to}
                        </Typography>
                        <Typography component="span">
                        Duration:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {attributes?.duration_from} to {attributes?.duration_to}
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
                      <h4>Seller Details</h4>
                    </Box>
                    <Card className="incident-card reporting-card card">
                      <CardContent>
                        <Box className="reporting-row">
                          <img src={User_Icon.default} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Published by:</h5>
                            <h4 className="title">Mr. {attributes?.published_by?.full_name}</h4>
                          </Box>
                        </Box>
                        <Box className="reporting-row">
                          <img src={Calender_Icon.default} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Phone Number:</h5>
                            <h4 className="title">{attributes?.published_by?.full_phone_number}</h4>
                          </Box>
                        </Box>
                        <Box className="reporting-row">
                          <img src={Calender_Icon.default} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Published On:</h5>
                            <h4 className="title">{attributes?.published_by?.email}</h4>
                          </Box>
                        </Box>
                        <Box className="reporting-row">
                          <img src={Calender_Icon.default} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Email Address:</h5>
                            <h4 className="title">{attributes?.published_by?.email || "NA"}</h4>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                    {/* <Card className="incident-card reporting-card card">*/}
                    {/*</Card> */}
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

export default withRouter(ClassifiedDetails)
