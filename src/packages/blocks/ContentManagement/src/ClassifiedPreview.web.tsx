import React from "react";
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
  MenuItem,
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";
//Customizable Area End

//resorces
import { Tenant_Logo, Building1, Close_Icon, Grid_Icon, Filter_Icon, User_Icon, Calender_Icon } from "../src/assets";
import { NetworkLockedOutlined } from "@material-ui/icons";

class ClassifiedPreview extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getCurrencyList();
 }

  render() {
    const { navigation } = this.props;
    const classifiedFromData = JSON.parse(localStorage.getItem("classifiedPreview") || '{}')
    const classifiedUserType = localStorage.getItem("classifiedUserType")
    
    const currency = this.state?.getCurrencyList?.filter((val : any) => val.id === classifiedFromData.currency);
    console.log("currency===============>",currency[0]?.attributes?.currency);
    console.log("classifiedFromData===============>",classifiedFromData);
    if (!classifiedFromData && !classifiedUserType) {
      //@ts-ignore
      this.props.history.replace("/CreateClassified");
      return null;
    }

    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    {classifiedUserType === "buyer" ? <h4>Buyers Request </h4>
                      : classifiedUserType === "seller" ? <h4>Sellers Request</h4>
                        : <h4>Generic Request</h4> 
                    }
                   
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <Box className="incident-rows">
                    {classifiedUserType === "buyer" ? <h4>Buyers Request Preview</h4>
                      : classifiedUserType === "seller" ? <h4>Sellers Request Preview</h4>
                        : <h4>Generic Request Preview</h4> 
                    }
                    </Box>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography component="span">
                          Moblie Number:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                        {classifiedFromData?.selectCode} {classifiedFromData?.phone}
                        </Typography>
                        <Typography component="span">
                          Email Id:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                          {classifiedFromData?.email}
                        </Typography>
                        <Typography component="span">
                          Title:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                          {classifiedFromData?.classifiedTitle}
                        </Typography>

                        <Typography component="span">
                        Description:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                          {classifiedFromData?.description}
                        </Typography>

                        {
                        classifiedFromData?.price  ?
                          <>
                       <Typography className="title-span" component="span">
                            Price:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                        {classifiedFromData?.price} {currency[0]?.attributes?.currency}
                        </Typography>
                          </> 
                          :null
                        }

                        {
                        classifiedFromData?.paymentDetail  ?
                          <>
                       <Typography className="title-span" component="span">
                       Payment Detail:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                       {classifiedFromData?.paymentDetail} {currency[0]?.attributes?.currency}
                        </Typography>
                          </> 
                          :null
                        }

                        {
                        classifiedFromData?.priceFrom  && classifiedFromData?.priceTo  ?
                          <>
                       <Typography className="title-span" component="span">
                            Price:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                        {classifiedFromData?.priceFrom} {currency[0]?.attributes?.currency} - {classifiedFromData?.priceTo} {currency[0]?.attributes?.currency}
                        </Typography>
                          </> 
                          :null
                        }

                        {
                          classifiedFromData?.timeFrom ?
                            <Box className="card-rows">
                              <Typography className="title-span" component="span">
                               From Time:
                              </Typography>
                              <Typography className="h5-title" component="h5">
                                {classifiedFromData?.timeFrom}
                              </Typography>
                            </Box>
                            :
                            null
                        }

                      { 
                          classifiedFromData?.timeTo ?
                            <Box className="card-rows">
                              <Typography className="title-span" component="span">
                                 To Time:
                              </Typography>
                              <Typography className="h5-title" component="h5">
                                {classifiedFromData?.timeTo}
                              </Typography>
                            </Box>
                            :
                            null
                        }
                        
                        {
                          classifiedFromData?.startDate ?
                          <Box className="card-rows">
                          <Typography component="span">
                            From Date:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                          {classifiedFromData.startDate} 
                        </Typography>
                        </Box>
                        :null
                        }
                          {
                          classifiedFromData?.endDate ?
                          <Box className="card-rows">
                          <Typography component="span">
                            To Date:
                        </Typography>
                        <Typography className="h5-title" component="h5">
                          {classifiedFromData.endDate}
                        </Typography>
                        </Box>
                        :null
                        }
               {
                          classifiedFromData?.media.length !== 0 ?
                            <>
                              <Typography component="span">
                                Photos
                              </Typography>
                              <CardActions className="card-img-row">
                                {
                                  classifiedFromData?.media?.map((val:any, index:any) => (
                                    val?.file.type === "video/mp4" || val?.file.type === "video/x-m4v" ?
                                      <Box className="video-img" key={index} onClick={() => { this.setState({ showDialog: true, file: { url: val.url, type: val?.file.type, name: val?.file?.name } }) }}>
                                        <Box className="img-layer"></Box>
                                        <video className="incident-dialog-video"   >
                                          <source src={val.url} type={val.file.type} />
                                        </video>
                                        <FullscreenIcon className="play-icon" />
                                      </Box>
                                      :
                                      <Box className="video-img" key={index} onClick={() => { this.setState({ showDialog: true, file: { url: val.url, type: val?.file.type, name: val?.file?.name } }) }}>
                                        <Box className="img-layer"></Box>
                                        <img src={val.url} className="card-img" alt="card-img" />
                                        <FullscreenIcon className="play-icon" />
                                      </Box>
                                  ))
                                }
                              </CardActions>
                            </>
                            : null
                        }
                        {/* <hr /> */}
                       
                      </CardContent>
                    </Card>
                  </Box>
                  <Box className="customButton preview-submit">
                    <Button variant="contained" onClick={() => this.createClassified(classifiedFromData, classifiedUserType)}>submit</Button>
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
                    <video className="incident-dialog-video"  controls >
                      <source src={this.state?.file?.url} type={this.state?.file?.type} />
                    </video>
                    :
                    <Box>
                      <img src={this.state?.file?.url} className="incident-dialog-photo" alt="card-img" />
                      {/* <FullscreenIcon className="play-icon" /> */}
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

export default withRouter(ClassifiedPreview)
