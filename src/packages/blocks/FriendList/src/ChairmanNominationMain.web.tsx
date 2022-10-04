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
    DialogTitle, IconButton, Modal, Backdrop, Fade, DialogContent, Paper, TextField, InputAdornment, TextareaAutosize,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import {chat, edit, email, profileExp, telephone} from "./assets"
import Divider from '@material-ui/core/Divider';
// Icons
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Icons
import {building, cancle, user_icon} from "../../user-profile-basic/src/assets"
import {calendar} from "../../invitefriends/src/assets"
import ChairmanNominationMainController, {
  Props,
  configJSON,
} from "./ChairmanNominationMainController";
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

class MyTeamCore extends ChairmanNominationMainController {
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
                    <Box style={{width: "100%"}}>
                        <Typography variant="body1" >
                        My Team / <Box component="span" style={{color: "blue"}}>Chairman and Vice Chairman Nomination</Box>
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography variant="h4" className="subHeading">Chairman and Vice Chairman Nomination</Typography>
                            {
                                this.state.onGoingNomination &&
                                    <AcceptButton disabled style={{marginTop:"20px"}} onClick={()=>this.setState({setOpen:true})}>Start Nomination Process</AcceptButton>
                            }
                        </Box>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}} onClick={()=> this.props.history.push(`/NominationDetails?id=${1}`)}>
                                <Grid container spacing={2} >
                                    <Grid item xs={9}>
                                        <Typography variant="h6" style={{fontWeight:"bold"}}>Chairman and Vice Chairman Nomination</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                        <Typography variant="subtitle2" className={"statusOngoingGreen"}>Active</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">Building:</Typography>
                                            <Typography variant="subtitle1" color="textPrimary">Building - 1</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">Complex Name:</Typography>
                                            <Typography variant="subtitle1" color="textPrimary">Star Heights</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">Duration:</Typography>
                                            <Typography variant="subtitle1" color="textPrimary">24-03-2022 to 24-04-2022</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">Total Nomination: </Typography>
                                            <Typography variant="subtitle1" color="textPrimary">32 Members</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} className={"nominationBlueBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                        <Typography variant="body1" style={{width:"100%"}} className="nominationBlueText" >NOMINATION STARTED</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                        <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}}>
                            <Grid container spacing={2} >
                                <Grid item xs={9}>
                                    <Typography variant="h6" style={{fontWeight:"bold"}}>Chairman and Vice Chairman Nomination</Typography>
                                </Grid>
                                <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingRed"}>Closed</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Building:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">Building - 1</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Complex Name:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">Star Heights</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Duration:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">24-03-2022 to 24-04-2022</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Total Nomination: </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">32 Members</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} className={"nominationGrayBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                    <Typography variant="body1" style={{width:"100%"}} className="nominationGrayText" >Voting Closed</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            </Grid>
        </Box>
        <Modal
            style={dashBoard.modal}
            open={Boolean(this.state.setOpen)}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={Boolean(this.state.setOpen)}>
                <div style={dashBoard.paper}>
                    <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:"10px"}}>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>
                            Chairman and Vice Chairman Nomination
                        </Typography>
                        <IconButton onClick={this.handleClose}>
                            <img src={cancle}
                                //@ts-ignore
                                 style={dashBoard.modalCacle}/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} style={{marginTop:"10px"}}>
                        <Grid item xs={12}>
                            <TextField label="Title" variant="outlined"
                               name="title"
                               id="Nomination Title"
                               style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                               inputProps={{
                                   maxLength: 40
                               }}
                               fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Date" variant="outlined"
                                placeHolder="Start Date"
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                type="date" name="startDate"  fullWidth
                                id="SurveyQuestion"
                                format='DD/MM/YYYY'
                                // value={this.state.SurveyData.startDate}
                                // onChange={this.handlePollDataChange}
                                InputProps={{
                                    // min: "2019-01-24",
                                    //@ts-ignore
                                    max: "5000-05-31",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                } }
                            />
                            {/*<p style={{color:"red"}}>{this.state.pollDateError}</p>*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="End Date" variant="outlined"
                                       type="date" name="endDate"  fullWidth
                                       style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                       id="SurveyQuestion"
                                       // value={this.state.SurveyData.endDate}
                                       // onChange={this.handlePollDataChange}
                                       InputProps={{
                                           // min: "2019-01-24",
                                           //@ts-ignore
                                           max: "5000-05-31",
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <DateRangeOutlinedIcon />
                                               </InputAdornment>
                                           )
                                       }}
                            />
                            {/*<p style={{color:"red"}}>{this.state.pollEndDateError}</p>*/}
                        </Grid>
                        <Grid xs={12} style={{marginTop:"10px",padding:"0px 7px"}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                fullWidth
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                rows={5}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:"flex-end",marginTop:"20px"}}>
                        <Box>
                            <DeclineButton variant="contained" style={{marginRight:"15px"}}>Cancel</DeclineButton>
                            <AcceptButton variant="contained">Start Process</AcceptButton>
                        </Box>
                    </Grid>
                </div>
            </Fade>
        </Modal>
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

const AcceptButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "#2b6fed",
        },
    },
}))(Button);

const DeclineButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "white",
        },
    },
}))(Button);
// Customizable Area End