// Customizable Area Start
import React from "react";
import "./MyTeam.web.css"
// @ts-ignore
import DOMPurify from 'dompurify'
import {
    Container,
    Typography,
    Link,
    Button,
    FormControl,
    Dialog,
    DialogActions,
    DialogTitle, IconButton, DialogContent, Backdrop, Fade, FormLabel, InputLabel, Modal,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import {chat, email, profileExp, telephone} from "./assets"
import {building, cancle, CheckIcon, email_icon, phone_icon, unit, user_icon} from "../../user-profile-basic/src/assets"
import Divider from '@material-ui/core/Divider';
// Icons
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Icons

import AddTeamModalController, {
  Props,
  configJSON,
} from "./AddTeamModalController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {withStyles} from "@material-ui/core/styles";
import {Field, Form, Formik} from "formik";

class AddTeamModal extends AddTeamModalController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
    const {t} = this.props
    return (
        <div style={dashBoard.paper}>
            <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:"10px"}}>
                <Typography variant="h5" className="bold-text addTeamModal" style={{fontWeight:"bold",fontSize:"22px"}}>
                    Create New Member
                </Typography>
                <IconButton onClick={this.handleModalClose}>
                    <img src={cancle}
                        //@ts-ignore
                         style={dashBoard.modalCacle}/>
                </IconButton>
            </Box>
            <Divider/>
                    <form className="commonForm ">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("User Name")}</FormLabel>
                                    <FormControl variant="outlined" >
                                                    <span className="frmLeftIcons">
                                                      <img src={user_icon} className="frm-icons" alt="User Icon" />
                                                    </span>
                                        <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Select User")}</InputLabel>
                                        <Select
                                            name="usertype"
                                            disabled={this.props.editId}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            style={{ paddingLeft: '45px' }}
                                            // label="Select User Type"
                                            onChange={(e) => {
                                                this.selectUser(e.target.value)
                                            }}
                                            value={this.state.userId}
                                        >
                                            <MenuItem  disabled value=" ">
                                                {t("User Name")}
                                            </MenuItem>
                                            {
                                                this.state.userList.length > 0 &&
                                                    this.state.userList.map((item:any,key:any)=> {
                                                        return(
                                                            <MenuItem value={item.id} key={key}>{item.attributes.full_name}</MenuItem>
                                                        )
                                                    })
                                            }
                                        </Select>
                                    </FormControl>
                                    <Typography variant="subtitle2" style={{color:"red"}}>{t(this.state.userError)}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Role")}</FormLabel>
                                    <FormControl variant="outlined" >
                                                    <span className="frmLeftIcons">
                                                      <img src={user_icon} className="frm-icons" alt="User Icon" />
                                                    </span>
                                        <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Select Role")}</InputLabel>
                                        <Select
                                            name="usertype"
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            style={{ paddingLeft: '45px' }}
                                            // label="Select User Type"
                                            onChange={(e) => {
                                               this.setState({roleId:e.target.value,roleError:""})
                                            }}
                                            value={this.state.roleId}
                                        >
                                            <MenuItem  disabled value=" ">
                                                {t("Select Role")}
                                            </MenuItem>
                                            {
                                                this.state.roleList?.length > 0 &&
                                                    this.state.roleList.map((item:any,key:any)=> {
                                                        return(
                                                            <MenuItem key={key} value={item.id}>{item.attributes.name}</MenuItem>
                                                        )
                                                    })
                                            }
                                        </Select>
                                    </FormControl>
                                    <Typography variant="subtitle2" style={{color:"red"}}>{this.state.roleError}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box className="formGroup">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Email Address")}</FormLabel>
                                    <input value={this.state.selectedUser.email} disabled name="email" type="text" placeholder={t("Email Address")} style={dashBoard.inviteInput} />
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
                                    <input value={this.state.selectedUser.phone} disabled name="phoneno" type="text" placeholder={t("Phone Number")} style={dashBoard.inviteInput} />
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
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Building")}</FormLabel>
                                    <FormControl variant="outlined" >
                                              <span className="frmLeftIcons">
                                                <img src={building} className="frm-icons" alt="Building Icon" />
                                              </span>
                                        <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Building")}</InputLabel>
                                        <Select
                                            name="building"
                                            disabled
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            style={{ paddingLeft: '45px' }}
                                            value={this.state.selectedUser.buildingId ? this.state.selectedUser.buildingId :"default"}
                                            // label="Select User Type"
                                        >
                                            <MenuItem  disabled value="default">
                                                {t("Building")}
                                            </MenuItem>
                                            <MenuItem  disabled value={this.state.selectedUser.buildingId}>
                                                {this.state.selectedUser.buildingName}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box className="formGroup customSelect">
                                    <FormLabel component="legend" style={dashBoard.labelsStyle}>{t("Unit")}</FormLabel>
                                    <FormControl variant="outlined" >
                                                    <span className="frmLeftIcons">
                                                      <img src={unit} className="frm-icons" alt="Unit Icon" />
                                                    </span>
                                        <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>{t("Unit")}</InputLabel>
                                        <Select
                                            name="unit"
                                            disabled
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            style={{ paddingLeft: '45px' }}
                                            value={this.state.selectedUser.unitId ? this.state.selectedUser.unitId :"default"}
                                        >
                                            <MenuItem  disabled value="default">
                                                {t("Unit Number")}
                                            </MenuItem>
                                            <MenuItem  disabled value={this.state.selectedUser.unitId}>
                                                {this.state.selectedUser.unitName}
                                            </MenuItem>
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
                        </Grid>
                        <Box style={{display:"flex",justifyContent:'flex-end'}}>
                            <DeclineButton size="large" style={{marginRight:"15px",width:"160px"}} onClick={this.handleModalClose}>{t("Cancel")}</DeclineButton>
                            <AcceptButton size="large" style={{width:"160px"}} onClick={this.handleSubmit}>{this.props.editId ? t("Update") : t("Create")}</AcceptButton>
                        </Box>
                    </form>
        </div>
      );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(dashBoard)(withRouter(AddTeamModal)));

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
        padding: "16px 32px 10px",
        width:"700px"
    },
    formLabels:{
        paddingLeft:35
    },
    labelsStyle:{
        color:"#212121",
        margin:"10px 0px 10px 0px",
        fontSize:"14px"
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

const DeclineButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        '&:hover': {
            backgroundColor: "white",
        },
    },
}))(Button);

const AcceptButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        '&:hover': {
            backgroundColor: "#2b6fed",
        },
    },
}))(Button);


// Customizable Area End
