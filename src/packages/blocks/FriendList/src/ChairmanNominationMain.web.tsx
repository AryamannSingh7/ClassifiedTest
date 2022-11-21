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
import moment from "moment";

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
                            {t("My Team")} / <Box component="span" style={{color: "blue"}}>{t("Chairman and Vice Chairman Nomination")}</Box>
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography variant="h4" className="subHeading">{t("Chairman and Vice Chairman Nomination")}</Typography>
                            {
                                this.state.onGoingNomination &&
                                    <AcceptButton style={{marginTop:"20px"}} onClick={()=>this.setState({setOpen:true})}>{t("Start Nomination Process")}</AcceptButton>
                            }
                        </Box>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>

                        </Grid>
                        {
                            this.state.nominationsList.length > 0
                            &&
                            this.state.nominationsList.map((item:any,key:any) => {
                                return(
                                    <Grid key={key} item xs={6}>
                                        <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}} onClick={()=> this.props.history.push(`/NominationDetails?id=${item.id}`)}>
                                            <Grid container spacing={2} >
                                                <Grid item xs={9}>
                                                    <Typography variant="h6" style={{fontWeight:"bold",minHeight:"60px",display:'flex',alignItems:"center"}}>{item.attributes.title}</Typography>
                                                </Grid>
                                                <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                                    {
                                                        item.attributes.status === "closed" &&
                                                        <Typography variant="subtitle2" className={"statusOngoingRed"}>{item.attributes.status}</Typography>
                                                    }
                                                    {
                                                        item.attributes.status === "active" &&
                                                        <Typography variant="subtitle2" className={"statusOngoingGreen"}>{item.attributes.status}</Typography>
                                                    }
                                                    {
                                                        item.attributes.status === "upcoming" &&
                                                        <Typography variant="subtitle2" className={"statusOngoingBlue"}>{item.attributes.status}</Typography>
                                                    }
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="subtitle1" color="textSecondary">{t("Building")}:</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">{item.attributes.building_name}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="subtitle1" color="textSecondary">{t("Complex Name")}:</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">{item.attributes.complex_name}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="subtitle1" color="textSecondary">{t("Duration")}:</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">{moment(item.attributes.start_date).format("DD-MMM-YYYY")} to {moment(item.attributes.end_date).format("DD-MMM-YYYY")}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="subtitle1" color="textSecondary">{t("Total Nomination")}: </Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">{item.attributes.total_nomination} Members</Typography>
                                                    </Box>
                                                </Grid>
                                                {
                                                    item.attributes.stage === "Nomination Started" &&
                                                    <Grid item xs={12} className={"nominationBlueBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationBlueText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                                {
                                                    item.attributes.stage === "Nomination Ended" &&
                                                    <Grid item xs={12} className={"nominationGrayBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationGrayText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                                {
                                                    item.attributes.stage === "Voting Started" &&
                                                    <Grid item xs={12} className={"nominationOrangeBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationOrangeText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                                {
                                                    item.attributes.stage === "Voting Ended" &&
                                                    <Grid item xs={12} className={"nominationGrayBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationGrayText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
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
                            {t("Chairman and Vice Chairman Nomination")}
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
                            <TextField label={t("Title")} variant="outlined"
                               name="title"
                               value={this.state.nominationTitle}
                               onChange={(e:any)=> {
                                   this.setState({nominationTitle:e.target.value,nominationTitleError:""})
                               }}
                               id="Nomination Title"
                               style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                               inputProps={{
                                   maxLength: 40
                               }}
                               fullWidth
                            />
                            <p style={{color:"red"}}>{this.state.nominationTitleError}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("Start Date")} variant="outlined"
                                placeholder="Start Date"
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                type={this.state.startDateType} name="startDate"  fullWidth
                                onFocus={()=> this.setState({startDateType:"date"})}
                                id="SurveyQuestion"
                                format='DD/MM/YYYY'
                                value={this.state.nominationStartDate}
                                onChange={(e:any)=> {
                                    this.setState({nominationStartDate:e.target.value,nominationStartDateError:""})
                                }}
                                InputProps={{
                                    //@ts-ignore
                                    max: "5000-05-31",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                } }
                            />
                            <p style={{color:"red"}}>{this.state.nominationStartDateError}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label={t("End Date")} variant="outlined"
                                       type={this.state.endDateType} name="endDate"  fullWidth
                                       placeholder="End Date"
                                       style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                       onFocus={()=> this.setState({endDateType:"date"})}
                                       value={this.state.nominationEndDate}
                                       onChange={(e:any)=> {
                                           this.setState({nominationEndDate:e.target.value,nominationEndDateError:""})
                                       }}
                                       id="SurveyQuestion"
                                       InputProps={{
                                           //@ts-ignore
                                           max: "5000-05-31",
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <DateRangeOutlinedIcon />
                                               </InputAdornment>
                                           )
                                       }}
                            />
                            <p style={{color:"red"}}>{this.state.nominationEndDateError}</p>
                        </Grid>
                        <Grid xs={12} style={{marginTop:"10px",padding:"0px 7px"}}>
                            <TextField
                                id="outlined-multiline-static"
                                label={t("Description")}
                                multiline
                                value={this.state.nominationDescription}
                                onChange={(e:any)=> {
                                    this.setState({nominationDescription:e.target.value,nominationDescriptionError:""})
                                }}
                                fullWidth
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                rows={5}
                                variant="outlined"
                            />
                            <p style={{color:"red"}}>{this.state.nominationDescriptionError}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:"flex-end",marginTop:"20px"}}>
                        <Box>
                            <DeclineButton variant="contained" style={{marginRight:"15px"}}>{t("Cancel")}</DeclineButton>
                            <AcceptButton variant="contained" onClick={this.manageSubmit}>{t("Start Process")}</AcceptButton>
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
