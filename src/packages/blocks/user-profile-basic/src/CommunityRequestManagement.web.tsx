import React from "react";

//components
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
  InputAdornment,
  TextField,
  Paper,
  Popover 
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles';

import '../../dashboard/src/Dashboard.web.css';

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import CommunityUserProfileController, { Props } from "./CommunityUserProfileController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

//resorces
import { invite, addgroup, newMember, info, cancle } from "./assets";

class CommunityRequestManagement extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {t}: any = this.props
    const statusArray=["Unresolved", "Resolved", "Pending Confirmation"]
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
                      {t("Community Management")} / <Box component="span" style={{ color: "blue" }}> {t("Request Management")}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>{t("Request Management")}</Typography>
                  </Box>
                </Box>

                  {/* Request Management -- */}
                  <Box style={{marginTop:"20px"}}>
                    <div style={dashBoard.gaMemberCard}>
                        <Paper elevation={3} style={dashBoard.managementPaper}>
                            <div style={dashBoard.invitemember}>
                                <img src= {newMember} style={dashBoard.inviteIcon}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}><Typography variant="h6" style={dashBoard.subHeading}>{t("Invite a new Member")}</Typography>
                                <img
                                aria-owns={this.state.openToolTip ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onClick={(e: any) => this.handleToolTip(e, "dfdfdfdfddfdfdfd")}
                                onMouseEnter={(e: any) => this.handleToolTip(e, "dfdfdfdfdfdfdfd")} 
                                src= {info} style={{paddingLeft:"10px"}}/></div>
                                 <RequestManagementDetailPopover
                                    id="mouse-over-popover"
                                    open={this.state.openToolTip}
                                    anchorEl={this.state.anchorEl}
                                    disableRestoreFocus
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    onClose={(e: any) => this.handleToolTip(e, "fdfdfdfdfdfdfdfd")}
                                    >
                                    <h6 style={{lineHeight:"20px", margin:"12px"}}>This section will allow you to invite new owners, residents, and team members to join the platform and start engaging with the building community</h6>
                                    <img src={cancle}
                                    //@ts-ignore 
                                    style={dashBoard.cancleIcon} onClick={(e: any) => this.handleToolTip(e, "")}/>
                                </RequestManagementDetailPopover>
                            <h6>{t("Invite a new Member")}</h6>
                        </Paper>
                        <Paper elevation={3} style={dashBoard.managementPaper}>
                            <div style={dashBoard.imgRound}> 
                                <img src= {addgroup} style={dashBoard.mailIcon}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Typography variant="h6" style={dashBoard.subHeading}>{t("Pending Join request")}</Typography>
                                <img
                                aria-owns={this.state.openToolTip ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onClick={(e: any) => this.handleToolTip(e, "dfdfdfdfddfdfdfd")}
                                onMouseEnter={(e: any) => this.handleToolTip(e, "dfdfdfdfdfdfdfd")} 
                                src= {info} style={{paddingLeft:"10px"}}/></div>
                                 <RequestManagementDetailPopover
                                    id="mouse-over-popover"
                                    open={this.state.openToolTip}
                                    anchorEl={this.state.anchorEl}
                                    disableRestoreFocus
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    onClose={(e: any) => this.handleToolTip(e, "fdfdfdfdfdfdfdfd")}
                                    >
                                    <h6 style={{lineHeight:"20px", margin:"12px"}}>This section will allow you to invite new owners, residents, and team members to join the platform and start engaging with the building community</h6>
                                    <img src={cancle}
                                    //@ts-ignore 
                                    style={dashBoard.cancleIcon} onClick={(e: any) => this.handleToolTip(e, "")}/>
                                </RequestManagementDetailPopover>
                            <h6>{t("Invite a new Member")}</h6>
                            <Typography variant="h6" style={dashBoard.subHeading}>16</Typography>
                        </Paper>
                        <Paper elevation={3} style={dashBoard.managementPaper}>
                            <div style={dashBoard.imgRound}>
                                <img src= {invite} style={dashBoard.mailIcon}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Typography variant="h6" style={dashBoard.subHeading}>{t("Sent invitations awaiting acceptance")}</Typography>
                                <img
                                aria-owns={this.state.openToolTip ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onClick={(e: any) => this.handleToolTip(e, "dfdfdfdfddfdfdfd")}
                                onMouseEnter={(e: any) => this.handleToolTip(e, "dfdfdfdfdfdfdfd")} 
                                src= {info} style={{paddingLeft:"10px"}}/></div>
                                 <RequestManagementDetailPopover
                                    id="mouse-over-popover"
                                    open={this.state.openToolTip}
                                    anchorEl={this.state.anchorEl}
                                    disableRestoreFocus
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    onClose={(e: any) => this.handleToolTip(e, "fdfdfdfdfdfdfdfd")}
                                    >
                                    <h6 style={{lineHeight:"20px", margin:"12px"}} onClick={(e: any) => this.handleToolTip(e, "")}>This section will allow you to invite new owners, residents, and team members to join the platform and start engaging with the building community</h6>
                                    <img src={cancle} 
                                    //@ts-ignore
                                    style={dashBoard.cancleIcon} onClick={(e: any) => this.handleToolTip(e, "")}/>
                                </RequestManagementDetailPopover>
                                <h6>{t("Invite a new Member")}</h6>
                            <Typography variant="h6" style={dashBoard.subHeading}>67</Typography>
                        </Paper>
                    </div>
                  </Box>

                  <Box style={dashBoard.invitationReq}>
                    <Paper elevation={3} style={dashBoard.managementPaper}>
                        <Typography variant="h6" style={dashBoard.subHeading}>Invitation Requests</Typography>
                        <hr />
                        <div>
                            <div style={dashBoard.facility}>
                                <h6 style={{color:"d3d3d3", margin:"20px 0px 10px 0px"}}>Title</h6>
                                <h6 style={{color:"d3d3d3", margin:"20px 0px 10px 0px"}}>Count</h6>
                            </div>
                            <div style={dashBoard.facility}  
                            onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/SentInvitation")}}>
                                <h6>Total Sent Invitations</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>150</Typography>
                            </div>
                            <div style={dashBoard.facility}>
                                <h6>Accepted Invitations by users</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>99</Typography>
                            </div>
                            <div style={dashBoard.facility}>
                                <h6>Rejected Invitation by users</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>14</Typography>
                            </div>
                            <div style={dashBoard.facility}>
                                <h6 style={dashBoard.inviteTitle}>Total received join requests</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>50</Typography>
                            </div>
                        </div>
                    </Paper>
                  </Box>
              </Container>
            </Grid>
          </Box>
        </Box>
        {/* <Loader loading={this.state.loading} /> */}
      </>
    )
  }
}

//@ts-ignore
export default withTranslation()(withStyles(dashBoard)(withRouter(CommunityRequestManagement))); 

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    // marginTop: 15,
  },
  invitationCont:{
    fontWeight: 600,
    margin:'10px 0px 10px 0px'
  },
  inviteTitle:{
    margin:'10px 0px 10px 0px'
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    padding: 5,
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  searchButton:{
    margin:8
  },
  backColor:{
   backgroundColor: "#2D6EED",
   padding:"9px 16px"
  },
  boxStyling:{
    display:"flex",
    alignItems:"center",
    marginTop:20
  },
  gaMemberCard:{
    display: "grid",
    gridTemplateColumns: "4fr 4fr 4fr",
    gap: 20
  },
  managementPaper:{
    padding:20
  },
  imgRound:{
    border: "2px solid #F7F9FE",
    borderRadius: "100%",
    height: 50,
    width: 50
},
mailIcon:{
    padding:8
},
invitemember:{
    border: "2px solid #F7F9FE",
    borderRadius: "100%",
    height: 50,
    width: 50,
    backgroundColor:"#FC8434"
},
inviteIcon:{
    padding:13
},
cancleIcon:{
    position:"absolute",
    top:15,
    right:15
},
invitationReq:{
    marginTop:30
},
facility: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom:"1px solid #f8f8f8",
    cursor:"pointer"
  },
};

const RequestManagementDetailPopover = withStyles({
    paper: {
      color: 'rgba(4, 60, 116, 1)',
      fontWeight: 600,
      fontFamily: 'SFProDisplay',
      fontSize: '20px',
      backgroundColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0px 2px 4px 0px #64646430",
      minWidth: 300,
      maxWidth: 255,
      borderRadius: 8,
      padding: '5px 10px',
      overflowX: "unset",
      overflowY: "unset",
      position:"absolute",
      "&::before": {
        backgroundColor: "rgba(255, 255, 255, 1)",
        content: '""',
        display: "block",
        position: "absolute",
        width: 14,
        height: 14,
        top: -6,
        transform: "rotate(45deg)",
        left: "calc(50% - 10px)",
      },
      "@media (max-width: 980px)": {
        width: '68%',
      }
    }
  })(Popover);

// Customizable Area End
