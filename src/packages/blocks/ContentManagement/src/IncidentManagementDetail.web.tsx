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
  Drawer,
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
import { Close_Icon, Bank_Icon, Box_Icon, Building1,Tick_Circle_Icon } from "./assets";
import IncidentChatWeb from "../../customform/src/IncidentChat.web";
//import IncidentChatDrawer from "./IncidentChatDrawer.web";
import AlertErrorWeb from "../../../components/src/AlertError.web"

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
    const statusArray = ["Unresolved", "Resolved", "Pending Confirmation","Ongoing"]
    const id = this.state?.getIncidentDetails?.id;
    const attributes = this.state?.getIncidentDetails?.attributes;
    const apartmentManagementId = attributes?.apartment_management?.apartment_management_id;

    // console.log("providerListing-==================>",this.state?.providerListing);
    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#F7F9FE" }}>
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
                      <Link href="DashboardGeneral"  color="inherit"> My Dashboard</Link> /
                      <Link href="DashboardGeneral"  color="inherit"> General Dashboard</Link> / 
                      <Link href="IncidentManagement"color="inherit"> Incidents</Link> / 
                      <Box component="span" style={{ color: "#2c6fed" }}>
                        <Link href="IncidentManagementDetail" color="inherit"> Incidents Details</Link>
                      </Box>
                    </Typography>
                    <Typography variant="h5" className="bold-text" style={dashBoard.subHeading}>Incident Details</Typography>
                  </Box>
                 
                </Box>
                <Box className="content-block-wrapper incident-detail-card-block">
                  <Card className="incident-detail-card card">
                    <Box className="card-header">
                      <Typography component="h4" className="bold-text">
                        {attributes?.incident_title}
                      </Typography>
                      <Box className={this.state?.statusDetail === 'Unresolved' ? "formGroup customSelect danger" :
                        this.state?.statusDetail === 'Resolved' ? 'formGroup customSelect success' : 'formGroup customSelect warning'}>
                        <FormControl variant="outlined" >
                          <Select
                            name="statusDetail"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => { this.onChange(e) }}
                            value={this.state?.statusDetail}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null,
                            }}
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
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                          Affected Area:
                        </Typography>
                          <h4 className="bold-text">{attributes?.common_area?.name}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                         Incident is related to:
                        </Typography>
                          <h4 className="bold-text">{attributes?.incident_related?.name}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                        Incident Number:
                        </Typography>
                          <h4 className="bold-text">{id}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                          Building:
                        </Typography>
                          <h4 className="bold-text">{attributes?.apartment_management?.building_name}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                           Unit:
                        </Typography>
                          <h4 className="bold-text">{attributes?.apartment_management?.apartment_name}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                         Reported on:
                        </Typography>
                          <h4 className="bold-text">{attributes?.reported_on}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                         Acknowledge by Manager:
                        </Typography>
                          <h4 className="bold-text">{attributes?.acknoledged_by_manager}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                        Latest update from management:
                        </Typography>
                          <h4 className="bold-text">{attributes?.last_update_from_management}</h4>
                        </Box>
                        <Box className="card-rows" style={{borderBottom:'1px solid #f4f6fb',marginBottom:'0.5rem'}}>
                        <Typography className="title-span" component="span">
                        Description:
                        </Typography>
                          <h4 className="bold-text">{attributes?.description}</h4>
                        </Box>
                      </Box>
                      {
                        attributes?.attachments.length !== 0 ?
                          <>
                            <Box className="card-rows">
                            <Typography className="title-span" component="span">
                             Photos:
                           </Typography>
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
                    
                    </CardContent>
                  </Card>
                </Box>

                <Box className="incident-button-row customButton" style={{padding:"30px"}}>
                        {
                          attributes?.assign_incidents?.data === null ?
                            <Button variant="outlined"
                              onClick={() => this.providerList(apartmentManagementId)}
                            >assign incident to provider</Button>
                            :
                            <Box className="user-btn-box">
                              <h6 className="user-title bold-text" style={{color:"#fc8434"}}>{attributes?.assign_incidents?.data?.attributes?.provider?.full_name}</h6>
                              <Button className="change-btn" style={{color:"#3769fc"}} onClick={() => this.providerList(apartmentManagementId)}>change</Button>
                            </Box>
                        }
                        <Button variant="contained" onClick={() => this.createChatRoom(this.state?.getIncidentDetails?.id)}>start/view ticket conversation</Button>
                      </Box>
              </Container>
              {/* chat */}
       
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
                     <h3 className="bold-text">Assign Incident to Provider</h3> 
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
                          value={this.state?.providerWork}
                        >
                          <MenuItem disabled value=" ">
                            Provider
                          </MenuItem>
                          {
                            this.state?.providerListing?.data?.map((val, index) => (
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
                          name="providerName"
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => { this.onChange(e) }}
                          value={this.state?.providerName}
                        >
                          <MenuItem disabled value=" ">
                            Provider Name
                          </MenuItem>
                          {
                            this.state?.providerNameListing?.map((val, index) => (
                              <MenuItem
                                key={index}
                                value={val?.id}
                              >
                                {val?.attributes?.full_name}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="incident-Listing-wrapper">
                      <Box className="incident-button-row customButton" style={{paddingTop:"0px"}}>
                      <Button variant="outlined" 
                        onClick={() => { this.setState({ showDialog: false }) }}
                      >cancel</Button>
                        {
                        attributes?.assign_incidents?.data === null ?
                          <Button variant="contained" onClick={() => this.assginProvider()}>assign incident</Button>
                          :
                          <Button variant="contained" onClick={() => this.updateProvider(attributes?.assign_incidents?.data?.id)}>assign incident</Button>
                      }
                      </Box>
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
                onClose={() => this.setState({ statusShowDialog: false ,statusDetail: attributes?.incident_status})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="diloag-wrapper"
                PaperProps={{
                  style: {
                    borderRadius: '15px',
                  },
                }}
              >
                <Box className="diloag-body desktop-ui" style={{padding:"50px"}}>
                  <Box className="diloag-content diloag-management-content">
                  <img src={Tick_Circle_Icon} className="lock-logo" alt="Lock_Icon" />
                  <br/>
                  <h3 className="bold-text">Update Status</h3>
                  <p> Are you sure you want to change the status to {this.state?.statusDetail} ?</p>
                  <br/>
                  <Box className="incident-Listing-wrapper">
                   <Box className="incident-button-row customButton" style={{paddingTop:"0px",paddingLeft:"54px"}}>
                   <Button variant="outlined" style={{padding:"10px 60px"}}
                      onClick={() => { this.setState({ statusShowDialog: false , statusDetail: attributes?.incident_status}) }}>Close</Button>
                   <Button variant="contained" style={{padding:"10px 60px"}} onClick={() =>this.updateStatus(this.state?.statusDetail)}>Confirm</Button>
                   </Box>
                   {/* <Box className="diloag-btn customButton">
                   <Button variant="outlined" onClick={() => { this.setState({ statusShowDialog: false , statusDetail: attributes?.incident_status}) }}>Close</Button>
                   <Button variant="contained" onClick={() =>this.updateStatus(this.state?.statusDetail)}>Confirm</Button>
                   </Box> */}
                  </Box>
                  </Box>
                </Box>
              </Dialog>
            </Grid>
          </Box>
        </Box>
        {/* <IncidentChatDrawer /> */}
        <Loader loading={this.state.loading} />
        <Drawer
            anchor='right'
            open={this.state.chatDrawer}
            onClose={()=>this.setState({chatDrawer:false})}
          >
             <IncidentChatWeb onClose={()=>this.setState({chatDrawer:false})}/>  
          </Drawer>
          <AlertErrorWeb show={this.state.showError} handleClose={()=> this.setState({showError:false,error:null})} message={this.state.error} />  
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
