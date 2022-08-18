//@ts-ignore
//@ts-nocheck
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
  DialogTitle,
} from "@material-ui/core";
import '../../dashboard/src/Dashboard.web.css'
import {
  House_Icon, keyrented, money, location, account,
  registered, activemembers, members, overdue, Cardcalendar, awated, Check_Mark, xmark
}
  from "../../dashboard/src/assets"

import { Formik, Form, Field, ErrorMessage } from "formik";

import CloseIcon from '@material/icons/Close';

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
import IncidentManagementController, { Props } from "./IncidentManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";

//resorces
import { Close_Icon, Bank_Icon, Box_Icon, Building1 } from "./assets";
//import IncidentChatDrawer from "./IncidentChatDrawer.web";

class IncidentManagementDetail extends IncidentManagementController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    const id = localStorage.getItem("incidentManagementDetailId")
    if (id)
      this.getIncidentDetailsById(id);
    else
      this.props.history.push("/IncidentManagement")
  }
  render() {
    const statusArray = ["Unresolved", "Resolved", "Pending Confirmation"]
    const id = this.state?.getIncidentDetails?.id;
    const attributes = this.state?.getIncidentDetails?.attributes;
    const apartmentManagementId = attributes?.apartment_management?.apartment_management_id;

    // console.log("providerListing-==================>",this.state?.providerListing);
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
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      My Dashboard / General Dashboard / Incidents/<Box component="span" style={{ color: "blue" }}> Incidents Detail</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>Incidents Details</Typography>
                  </Box>
                  <Box>
                    <FormControl style={dashBoard.YearMain} className='yearTab'>
                      <NativeSelect className='yearSelection'
                        value={this.state.Year}
                        onChange={this.handleChange}
                      >
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                        <option value={2019}>2019</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </Box>
                <Box className="content-block-wrapper incident-detail-card-block">
                  <Card className="incident-detail-card card">
                    <Box className="card-header">
                      <Typography component="h4">
                        {attributes?.incident_related?.incident_title}
                      </Typography>
                      <Box className={this.state?.statusDetail === 'Pending Confirmation' ? "formGroup customSelect warning" :
                        this.state?.statusDetail === 'Resolved' ? 'formGroup customSelect success' : 'formGroup customSelect danger'}>
                        <FormControl variant="outlined" >
                          <Select
                            name="statusDetail"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => { this.onChange(e) }}
                            value={this.state?.statusDetail}

                          >
                            <MenuItem disabled value=" ">
                              Select Status
                            </MenuItem>
                            {
                              statusArray?.map((val, index) => (
                                <MenuItem
                                  key={index}
                                  value={val}
                                >
                                  {val}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    <CardContent className="card-content">
                      <Box className="row-block">
                        <Box className="card-rows">
                          <h5>Affected Area: </h5>
                          <h4>{attributes?.common_area?.name}</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Incident is related to: </h5>
                          <h4>{attributes?.incident_related?.name}</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Incident Number: </h5>
                          <h4>{id}</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Building: </h5>
                          <h4>{attributes?.apartment_management?.building_name}</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Unit: </h5>
                          <h4>{attributes?.apartment_management?.apartment_name}</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Acknowledge by Manager: </h5>
                          <h4>No</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Latest update from management: </h5>
                          <h4>10-10-2020</h4>
                        </Box>
                        <Box className="card-rows">
                          <h5>Description: </h5>
                          <h4>{attributes?.description}</h4>
                        </Box>
                      </Box>
                      {
                        attributes?.attachments.length !== 0 ?
                          <>
                            <Box className="card-rows">
                              <h5>Photos: </h5>
                            </Box>
                            <Box className="card-img-row photos-row">
                              {
                                attributes?.attachments?.map((val, index) => (
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
                      }

                      <Box className="incident-button-row customButton">
                        <Box className="user-btn-box">
                          <h6 className="user-title">johnathan doe</h6>
                          <Link href="#">change</Link>
                        </Box>
                        <Button variant="outlined"
                          onClick={() => this.providerList(apartmentManagementId)}
                        >assign incident to provider</Button>
                        <Button variant="contained" type="submit">start/view ticket conversation</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Container>
              {/* view assgin provider dialog */}
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
                <Box className="provider-dialouge-body desktop-ui">
                  <Box className="dialouge-header">
                    <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                      Assign Incident to Provider
                    </DialogTitle>
                    <Button>
                      <img src={Close_Icon} className="close-icon" onClick={() => { this.setState({ showDialog: false }) }} />
                    </Button>
                  </Box>
                  <Box className="diloag-content">
                    <Box className="formGroup customSelect">
                      <FormControl variant="outlined" >
                        <Select
                          name="providerWork"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => { this.onChange(e) }}
                          value={this.state.providerWork}
                        >
                          <MenuItem disabled value=" ">
                            Provider
                          </MenuItem>
                          {
                            this.state?.providerListing?.map((val, index) => (
                              <MenuItem
                                key={index}
                                value={`${apartmentManagementId},${val}`}
                              >
                                {val}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="formGroup customSelect">
                      <FormControl variant="outlined" >
                        <Select
                          name="ProviderName"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => { this.onChange(e) }}
                          value={this.state.ProviderName}
                        >
                          <MenuItem disabled value=" ">
                            Provider Name
                          </MenuItem>
                          {
                            this.state?.providerNameListing?.map((val, index) => (
                              <MenuItem
                                key={index}
                                value={`${val?.id}`}
                              >
                                {val?.attributes?.full_name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="customButton">
                      <Button variant="outlined"
                        onClick={() => { this.setState({ showDialog: false }) }}
                      >cancel</Button>
                      <Button variant="contained" onClick={() => this.assginProvider()}>assign incident</Button>
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
                  },
                }}
              >
                <Box className="diloag-body">
                  <Box className="diloag-header">
                    <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                      Update Status
                    </DialogTitle>
                    <Button onClick={() => { this.setState({ statusShowDialog: false }) }}>
                      <img src={Close_Icon} className="close-icon" />
                    </Button>
                  </Box>
                  <Box className="diloag-content">
                    CONFIMR MENTION
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

const dashBoard = {
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

export default withRouter(IncidentManagementDetail)