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
    DialogTitle, IconButton, Modal, Backdrop, Fade, DialogContent,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import {chat, email, profileExp, telephone} from "./assets"
import Divider from '@material-ui/core/Divider';
// Icons
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Icons
import {building,user_icon} from "../../user-profile-basic/src/assets"
import {calendar} from "../../invitefriends/src/assets"
import MyTeamController, {
  Props,
  configJSON,
} from "./MyTeamController";
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
import AddTeamModal from "./AddTeamModal.web";
import {CheckIcon} from "../../user-profile-basic/src/assets"

class MyTeamCore extends MyTeamController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
    const {t} = this.props
    return (
      <>
    <Box style={{background: "#E5ECFF"}}>
        <DashboardHeader {...this.props}/>
        <Box style={{display: "flex"}}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
                <ChairmanSidebar {...this.props}/>
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
            <Container className="link-decoration">
                <Box className="navigation">
                    <Box>
                        <Typography variant="body1" >
                        My Team / Team Members / <Box component="span" style={{color: "blue"}}>Name of user</Box>
                        </Typography>
                        <Typography variant="h4" className="subHeading" >Name of the user</Typography>
                        <Typography variant="h5" className="subHeading" >General Details</Typography>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Box style={{backgroundColor:"white",width:"100%"}}>
                            <Grid container>
                                <Grid item xs={12} sm={3} style={{borderRight: "1px solid gray"}}>
                                    <Box style={{width:"100%",display:'flex',justifyContent:"center",flexDirection:"column",margin:"30px 20px"}}>
                                        <img src={profileExp} height="100px" width="100px" style={{borderRadius:"100px"}}  />
                                        <Typography variant="h6" style={{fontWeight:"bold",marginBottom:"5px"}}>Marleah Eagleston</Typography>
                                        <Typography variant="h6" gutterBottom style={{marginBottom:"10px"}}>B-1405</Typography>
                                        <Grid container spacing={1} style={{width:"100%",display:"flex",alignItems:"center",marginTop:"5px"}}>
                                            <Grid item>
                                                <Typography variant="subtitle2" className={"statusOngoingBlue"} gutterBottom>Owner</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" className={"statusOngoingBlue"} gutterBottom>Chairman</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box style={{width:"100%",display:'flex',justifyContent:"flex-start",flexDirection:"column",margin:"30px 20px"}}>
                                        <Box style={{display:'flex'}}>
                                            <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}}>
                                                <img src={chat} />
                                            </IconButton>
                                            <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}}>
                                                <img src={email} />
                                            </IconButton>
                                            <IconButton style={{backgroundColor:"rgba(252,52,52,.1)"}}>
                                                <img src={telephone} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Box style={{margin:"30px 20px"}}>
                                                <Typography variant="subtitle1" color="textSecondary">About</Typography>
                                                <Typography variant="subtitle1" color="textPrimary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} sm={3}>
                                                    <Box style={{margin:"0px 20px"}}>
                                                        <Typography variant="subtitle1" color="textSecondary">Gender</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">Male</Typography>                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <Box style={{margin:"0px 20px"}}>
                                                        <Typography variant="subtitle1" color="textSecondary">DOB</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">20/05/1978</Typography>                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <Box style={{margin:"0px 20px"}}>
                                                        <Typography variant="subtitle1" color="textSecondary">Hobbies</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">20-05-1978</Typography>                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box style={{margin:"10px 20px"}}>
                                                <Typography variant="subtitle1" color="textSecondary">Social Media</Typography>
                                                <Box style={{display:'flex'}}>
                                                    <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}}>
                                                        <img src={chat} />
                                                    </IconButton>
                                                    <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}}>
                                                        <img src={email} />
                                                    </IconButton>
                                                    <IconButton style={{backgroundColor:"rgba(252,52,52,.1)"}}>
                                                        <img src={telephone} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box className="navigation">
                    <Box>
                        <Typography variant="h5" className="subHeading"  >Assigned Tasks</Typography>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Box style={{backgroundColor:"white",width:"100%"}}>
                            <Grid container>
                                <Grid item xs={12} >
                                    <Box style={{width:"95%",display:'flex',justifyContent:"space-between",alignItems:"center",margin:"10px 20px"}}>
                                        <Typography variant="h6" style={{fontWeight:"bold",marginBottom:"5px"}}>To Approve a budget report</Typography>
                                        <Typography variant="subtitle2" className={"statusOngoingRed"} gutterBottom>Pending</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box style={{width:"95%",display:'flex',justifyContent:"space-between",alignItems:"center",margin:"10px 20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={0}>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={building} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary">Building</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">Building 1</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={user_icon} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary">Assigned To</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">Marleah Esgleston</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={calendar.default} height="30px" width="30px" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary">Assigned On</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">20-05-1978</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={calendar.default} height="30px" width="30px"  />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary">Assigned To</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">20-05-1978</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </Grid>
        </Box>
    </Box>
    <Loader loading={this.state.loading} />
     </>
      );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(dashBoard)(withRouter(MyTeamCore)));

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


// Customizable Area End
