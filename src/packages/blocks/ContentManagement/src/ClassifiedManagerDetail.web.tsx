import React from "react";
//components
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  withStyles,
  TextareaAutosize,
  DialogTitle,
} from "@material-ui/core";
import '../../dashboard/src/Dashboard.web.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedManagerController, { Props } from "./ClassifiedManagerContorller.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
//resorces
import { Close_Icon, Classified_CorrectIcon, Tick_Circle_Icon } from "./assets";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
class ClassifiedManagerDetail extends ClassifiedManagerController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    const id = localStorage.getItem("classifiedManagerDetailId")
    if (id)
      this.getClassifiedDetailsById(id);
    else
      this.props.history.push("/ClassifiedManagerListing")
  }
  render() {
    const { t, classes }: any = this.props;
    const statusArray = ["Unresolved", "Resolved", "Pending Confirmation"]
    const id = this.state?.getIncidentDetails?.id;
    const attributes = this.state?.getClassifiedDetails?.attributes;
    const apartmentManagementId = attributes?.apartment_management?.apartment_management_id;

    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#E5ECFF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box className={classes.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      My Dashboard / General Dashboard / Incidents/<Box component="span" style={{ color: "blue" }}> Incidents Detail</Box>
                    </Typography>
                    <Typography variant="h5" className={classes.subHeading}>Incidents Details</Typography>
                  </Box>
                </Box>
                <Box className="content-block-wrapper incident-detail-card-block">
                  <Card className="incident-detail-card card">
                    <Box className="card-header">
                      <Typography component="h4">
                        {attributes?.title}
                      </Typography>
                      <Box className="customButton">
                        <Button variant="contained" className={attributes?.classified_status === 'Pending Approved' ? "contain warning" : attributes?.classified_status === 'Published' ? 'contain success' : 'contain danger'} type="submit">
                          {attributes?.classified_status}</Button>
                      </Box>
                    </Box>
                    <CardContent className="card-content">
                      <Box className="row-block">
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            Type:
                          </Typography>
                          <h4>{attributes?.classified_type}</h4>
                        </Box>
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            Mobile Number:
                          </Typography>
                          <h4>{attributes?.full_phone_number}</h4>
                        </Box>
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            Email Id:
                          </Typography>
                          <h4>{attributes?.email}</h4>
                        </Box>
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            Title:
                          </Typography>
                          <h4>{attributes?.title}</h4>
                        </Box>
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            Description:
                          </Typography>
                          <h4>{attributes?.description}</h4>
                        </Box>
                        <Box className="card-rows">
                          {
                            attributes?.classified_type === "generic" ?
                              <Typography className="title-span" component="span">
                                Payment Details:
                              </Typography>
                              :
                              <Typography className="title-span" component="span">
                                Price:
                              </Typography>
                          }
                          <h4>{attributes?.price_from} to {attributes?.price_to}</h4>
                        </Box>
                        {
                          attributes?.classified_type === "generic" ?
                            <Box className="card-rows">
                              <Typography className="title-span" component="span">
                                From Time:
                              </Typography>
                              <h4>{attributes?.time_from}</h4>
                            </Box>
                            :
                            null
                        }
                        {
                          attributes?.classified_type === "generic" ?
                            <Box className="card-rows">
                              <Typography className="title-span" component="span">
                                To Time:
                              </Typography>
                              <h4>{attributes?.time_to}</h4>
                            </Box>
                            :
                            null
                        }
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            From:
                          </Typography>
                          <h4>{attributes?.duration_from}</h4>
                        </Box>
                        <Box className="card-rows">
                          <Typography className="title-span" component="span">
                            To:
                          </Typography>
                          <h4>{attributes?.duration_to}</h4>
                        </Box>
                      </Box>
                      {/* {
                        attributes?.attachments.length !== 0 ?
                          <>
                            <Box className="card-rows">
                            <Typography className="title-span" component="span">
                             Photos:
                           </Typography>
                            </Box>
                            <Box className="card-img-row photos-row">
                              {
                                attributes?.attachments?.map((val: any, index: any) => (
                                  val?.content_type === "video/mp4" || val?.content_type === "video/x-m4v" ?
                                    <Box className="video-img" key={index} onClick={() => { this.setState({ imageShowDialog: true, file: { url: val.url, type: val?.content_type, name: val?.file_name } }) }}>
                                      <Box className="img-layer"></Box>
                                      <video className="incident-dialog-video"  >
                                        <source src={val?.url} type={val?.file?.type} />
                                      </video>
                                      <PlayCircleOutlineIcon className="play-icon" />
                                    </Box>
                                    :
                                    <Box className="video-img" key={index} onClick={() => { this.setState({ imageShowDialog: true, file: { url: val.url, type: val?.content_type, name: val?.file_name } }) }}>
                                      <Box className="img-layer"></Box>
                                      <img src={val.url} className="card-img" alt="card-img" />
                                      <FullscreenIcon className="play-icon" />
                                    </Box>
                                ))
                              }
                            </Box>
                          </>
                          : null
                      } */}
                      <Box className="incident-button-row customButton">
                        <Button variant="outlined"
                          onClick={() => this.setState({ showDialog: true })}
                        >REJECT</Button>
                        <Button variant="contained"
                          onClick={() => this.setState({ statusShowDialog: true })}
                        >Published</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Container>
              {/* view reject dialog */}
              <Dialog
                open={this.state.showDialog}
                onClose={() => this.setState({ showDialog: false, addNote: null })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="diloag-wrapper"
                PaperProps={{
                  style: {
                    borderRadius: '15px',
                  },
                }}
              >
                <Box className="provider-dialouge-body classified-dialouge-body desktop-ui">
                  <Box className="dialouge-header">
                    <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                      Reject Classified Request
                    </DialogTitle>
                    <Button>
                      <img src={Close_Icon} className="close-icon" onClick={() => { this.setState({ showDialog: false, addNote: null }) }} />
                    </Button>
                  </Box>
                  <Box className="diloag-content">
                    <Box className="commonForm">
                      <Box className="formGroup textarea">
                        <TextareaAutosize
                          name="addNote"
                          maxRows={20}
                          aria-label="maximum height"
                          placeholder="Add Note"
                          onChange={(e: any) => this.onChange(e)}
                          value={this.state?.addNote}
                        />
                      </Box>
                    </Box>
                    <Box className="customButton">
                      <Button variant="outlined"
                        onClick={() => { this.setState({ showDialog: false, addNote: null }) }}
                      >Cancel
                      </Button>
                      <Button variant="contained" onClick={() => this.rejectedOrPublished("Rejected")}>Confirm</Button>
                    </Box>
                  </Box>
                </Box>
              </Dialog>

              {/* view large image dialog */}
              <Dialog
                open={this.state?.imageShowDialog}
                onClose={() => this.setState({ imageShowDialog: false })}
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
                    <Button onClick={() => { this.setState({ imageShowDialog: false }) }}>
                      <img src={Close_Icon} className="close-icon" />
                    </Button>
                  </Box>
                  <Box className="diloag-content">
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

              {/* view status dialog */}
              <Dialog
                open={this.state?.statusShowDialog}
                onClose={() => this.setState({ statusShowDialog: false })}
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
                    {/* <Button onClick={() => this.setState({ statusShowDialog: false })}>
                      <img src={Close_Icon} className="close-icon" />
                    </Button> */}
                  </Box>
                  <Box className="diloag-content classified-content diloag-management-content">
                    <img src={Classified_CorrectIcon} className="lock-logo" alt="Lock_Icon" />
                    <h3>Approve Classified Request</h3>
                    <p className="lead"> Are you sure you want to publish this classified</p>
                    <Box className="diloag-btn customButton">
                      <Button variant="outlined" onClick={() => { this.setState({ statusShowDialog: false }) }}>Close</Button>
                      <Button variant="contained" onClick={() => this.rejectedOrPublished("Published")}>Confirm</Button>
                    </Box>
                  </Box>
                </Box>
              </Dialog>
            </Grid>
          </Box>
        </Box>
        {/* <IncidentChatDrawer /> */}
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

const dashBoard: any = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  cardBottom: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  bottomColor: {
    color: "red"
  },
  bottomTwoSpan: {
    display: "flex",
    gap: 20,
    marginTop: 10
  },
  Cards: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingBottom: 25,
    background: "#fff",
    borderRadius: 10,
  },
  CardsIcons: {
    border: "1px solid #d9d4d3",
    borderRadius: "50%",
    width: 25,
    height: 25,
    padding: 15,
    color: "#054c94",
  },
  EventsHeading: {
    fontWeight: 600,
    marginTop: 50,
  },
  EventsCards: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    background: "#fff",
    borderRadius: 10,
  },
  EventsTitle: {
    fontWeight: 600,
    fontSize: 18,
    marginTop: 10,
  },
  EventsIconsText: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
    fontSize: 14,
  },
  EventsIconsData: {
    display: "flex",
    alignItems: "center",
    gap: 25,
    marginTop: 15,
  },
  EventsIconsDataBox: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PricePaid: {
    marginRight: 70,
    background: "#dcf5f0",
    padding: 6,
    borderRadius: 30,
    color: "green",
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
};

// Customizable Area End

export default withTranslation()(withStyles(dashBoard)(withRouter(ClassifiedManagerDetail)));