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
  Popover ,
  Modal,
  Backdrop,
  Fade,
  InputLabel,
  FormLabel 
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
import CommunityUserProfileController, { Props } from "./communityManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

//resorces
import { invite, addgroup, newMember, info, cancle, user_icon, email_icon, phone_icon, building, unit } from "./assets";

class CommunityRequestManagement extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
   this.getUserType()
      }
  render() {
    const {t}: any = this.props
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
                        <Paper elevation={3} style={dashBoard.managementPaper}
                            onClick={this.handleOpen}>
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
                                    <h6 style={{lineHeight:"20px", margin:"12px"}}>{t("Info")}</h6>
                                    <img src={cancle}
                                    //@ts-ignore 
                                    style={dashBoard.cancleIcon} onClick={(e: any) => this.handleToolTip(e, "")}/>
                                </RequestManagementDetailPopover>
                            <h6>{t("Invite Member")}</h6>
                        </Paper>
                        <Paper elevation={3} style={dashBoard.managementPaper} 
                            onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/PendingRequest")}}>
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
                                    <h6 style={{lineHeight:"20px", margin:"12px"}}>{t("Info")}</h6>
                                    <img src={cancle}
                                    //@ts-ignore 
                                    style={dashBoard.cancleIcon} onClick={(e: any) => this.handleToolTip(e, "")}/>
                                </RequestManagementDetailPopover>
                            <Typography variant="h6" style={dashBoard.subHeading}>16</Typography>
                        </Paper>
                        <Paper elevation={3} style={dashBoard.managementPaper} 
                        onClick={() => {
                          //@ts-ignore
                          this.props.history.push("/AwaitingAcceptece")}}>
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
                                    <h6 style={{lineHeight:"20px", margin:"12px"}} onClick={(e: any) => this.handleToolTip(e, "")}>{t("Info")}</h6>
                                    <img src={cancle} 
                                    //@ts-ignore
                                    style={dashBoard.cancleIcon} onClick={(e: any) => this.handleToolTip(e, "")}/>
                                </RequestManagementDetailPopover>
                            <Typography variant="h6" style={dashBoard.subHeading}>67</Typography>
                        </Paper>
                    </div>
                  </Box>

                  <Box style={dashBoard.invitationReq}>
                    <Paper elevation={3} style={dashBoard.managementPaper}>
                        <Typography variant="h6" style={dashBoard.subHeading}>{t("Invitation Requests")}</Typography>
                        <hr />
                        <div>
                            <div style={dashBoard.facility}>
                                <h6 style={{color:"d3d3d3", margin:"20px 0px 10px 0px"}}>{t("Title")}</h6>
                                <h6 style={{color:"d3d3d3", margin:"20px 0px 10px 0px"}}>{t("Count")}</h6>
                            </div>
                            <div style={dashBoard.facility}  
                            onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/SentInvitation")}}>
                                <h6>{t("Total Sent Invitations")}</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>150</Typography>
                            </div>
                            <div style={dashBoard.facility}>
                                <h6>{t("Accepted Invitations by users")}</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>99</Typography>
                            </div>
                            <div style={dashBoard.facility}>
                                <h6>{t("Rejected Invitation by users")}</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>14</Typography>
                            </div>
                            <div style={dashBoard.facility}>
                                <h6 style={dashBoard.inviteTitle}>{t("Total received join requests")}</h6>
                                <Typography variant="h6" style={dashBoard.invitationCont}>50</Typography>
                            </div>
                        </div>
                    </Paper>
                  </Box>

                  {/* Invite Member modal */}
                  <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setOpen)}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setOpen)}>
                      <div style={dashBoard.paper}>
                        <img src={cancle}
                        onClick={this.handleClose}
                        //@ts-ignore 
                        style={dashBoard.modalCacle}/>
                        <Formik
                    initialValues={{
                      email: "",
                      usertype: "",
                      fullname: "",
                      phoneno: "",
                      building: " ",
                      unit:""
                    }}
                    validationSchema={this.InvitationSchema()}
                    validateOnMount={true}
                     onSubmit={(values) => {
                       console.log("valus=========>", values)
                       // same shape as initial values
                       this.invitationData(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue }) => (
                        <Form translate={true} className="commonForm ">
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Select User Type")}</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons">
                                      <img src={user_icon} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Select User Type")}</InputLabel> 
                                    <Select
                                      name="usertype"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: '45px' }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        (e.target.value != " ") && setFieldValue("usertype", e.target.value)
                                      }}
                                      value={values.usertype}
                                    >
                                      <MenuItem  disabled value=" ">
                                        {t("Select User Type")}
                                      </MenuItem>
                                      <MenuItem value={"user1"}>User1</MenuItem>
                                      <MenuItem value={"user2"}>User2</MenuItem>
                                      <MenuItem value={"user3"}>User3</MenuItem>
                                      <MenuItem value={"user4"}>User4</MenuItem>

                                      {/* {
                                        this.state?.userTypeData?.map((val, index) => (
                                          <MenuItem
                                            key={index}
                                            value={val?.name}
                                          >
                                            {val?.name}
                                          </MenuItem>
                                        ))
                                      } */}

                                    </Select>
                                  </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Member full name")}</FormLabel>
                              <Field name="fullname" type="text" placeholder={t("Member full name")} style={dashBoard.inviteInput} />
                              <span
                              //@ts-ignore 
                              style={dashBoard.formLeftIcn}>
                                <img src={user_icon} className="frm-icons" alt="User Icon" />
                              </span>
                            </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Email Address")}</FormLabel>
                              <Field name="email" type="text" placeholder={t("Email Address")} style={dashBoard.inviteInput} />
                              <span 
                              //@ts-ignore 
                              style={dashBoard.formLeftIcn}>
                                <img src={email_icon} className="frm-icons" alt="Email Icon" />
                              </span>
                            </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Phone Number")}</FormLabel>
                              <Field name="phoneno" type="text" placeholder={t("Phone Number")} style={dashBoard.inviteInput} />
                              <span 
                              //@ts-ignore 
                              style={dashBoard.formLeftIcn}>
                                <img src={phone_icon} className="frm-icons" alt="Phone Icon" />
                              </span>
                            </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Select Building")}</FormLabel>
                                <FormControl variant="outlined" >
                                  <span className="frmLeftIcons">
                                    <img src={building} className="frm-icons" alt="Building Icon" />
                                  </span>
                                  <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Select Building")}</InputLabel> 
                                  <Select
                                    name="building"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    style={{ paddingLeft: '45px' }}
                                    // label="Select User Type"
                                    onChange={(e) => {
                                      (e.target.value != " ") && setFieldValue("building", e.target.value)
                                    }}
                                    value={values.building}
                                  >
                                    <MenuItem  disabled value=" ">
                                      {t("Select Building")}
                                    </MenuItem>
                                    <MenuItem value={"building1"}>User1</MenuItem>
                                    <MenuItem value={"building2"}>User2</MenuItem>
                                    <MenuItem value={"building3"}>User3</MenuItem>
                                    <MenuItem value={"building4"}>User4</MenuItem>

                                    {/* {
                                      this.state?.userTypeData?.map((val, index) => (
                                        <MenuItem
                                          key={index}
                                          value={val?.name}
                                        >
                                          {val?.name}
                                        </MenuItem>
                                      ))
                                    } */}

                                  </Select>
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Select Unit")}</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons">
                                      <img src={unit} className="frm-icons" alt="Unit Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Select Unit")}</InputLabel> 
                                    <Select
                                      name="unit"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: '45px' }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        (e.target.value != " ") && setFieldValue("unit", e.target.value)
                                      }}
                                      value={values.unit}
                                    >
                                      <MenuItem  disabled value=" ">
                                        {t("Select Unit")}
                                      </MenuItem>
                                      <MenuItem value={"unit1"}>User1</MenuItem>
                                      <MenuItem value={"unit2"}>User2</MenuItem>
                                      <MenuItem value={"unit3"}>User3</MenuItem>
                                      <MenuItem value={"unit4"}>User4</MenuItem>

                                      {/* {
                                        this.state?.userTypeData?.map((val, index) => (
                                          <MenuItem
                                            key={index}
                                            value={val?.name}
                                          >
                                            {val?.name}
                                          </MenuItem>
                                        ))
                                      } */}

                                    </Select>
                                  </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                            </Grid>
                          </Grid>
                        </Form>
                        )}
                        </Formik>
                      </div>
                    </Fade>
                  </Modal>
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
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
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
modalCacle:{
  top:15,
  right:15,
  float:"right",
  cursor:"pointer"
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
  modal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: '10px',
    // boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    width:"700px"
},
  formLabels:{
    paddingLeft:35
},
  labelsStyle:{
    color:"#212121",
    margin:"10px 0px 10px 0px"
},
formLeftIcn:{
  position:"absolute",
  left: 20,
  top: 44,
  color: "#b9b9b9"
},
inviteInput:{
  padding: "18px 18px 18px 50px",
  color: "#b5b5b5",
  borderRadius: "10px",
  border: "1px solid #e9dede",
  backgroundColor: "#f9f9f9",
  fontSize: "16px",
  outline: 0,
  width:"100%"
}
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
