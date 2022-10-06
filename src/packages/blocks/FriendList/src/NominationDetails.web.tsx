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
    DialogTitle,
    IconButton,
    Modal,
    Backdrop,
    Fade,
    DialogContent,
    Paper,
    TextField,
    InputAdornment,
    TextareaAutosize,
    Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormControlLabel,
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
import NominationDetailsController, {
  Props,
  configJSON,
} from "./NominationDetailsController";
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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

class MyTeamCore extends NominationDetailsController {
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
                            <Box>
                                {
                                    this.state.setVoting ?
                                        <DeclineButton style={{marginTop:"20px"}}  onClick={()=>this.setState({setVoting:false})}>Close Voting</DeclineButton> :
                                        <>
                                            <AcceptButton style={{marginTop:"20px",marginRight:"10px"}} onClick={()=>this.setState({startVotingModal:true})}>Start Voting</AcceptButton>
                                            <DeclineButton style={{marginTop:"20px"}} onClick={this.handleOpenMySelfModal}>Nominate MySelf</DeclineButton>
                                        </>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px"}}>
                            <Grid container spacing={2} >
                                <Grid item xs={9} style={{display:'flex'}}>
                                    <Typography variant="h6" style={{fontWeight:"bold"}}>Chairman and Vice Chairman Nomination</Typography>
                                    <Button variant="text" color="primary" name="ButtonEdit" id="edit button" style={{color:"2b6fed",fontWeight:"bold"}} onClick={()=>this.setState({setOpen:true})}>Edit Details</Button>
                                </Grid>
                                <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingGreen"}>Active</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Building:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">Building - 1</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Complex Name:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">Star Heights</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Duration:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">24-03-2022 to 24-04-2022</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Total Nomination: </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">32 Members</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">Description</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non erat non massa sagittis pulvinar non…Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non erat non massa sagittis pulvinar.</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {
                    this.state.votingStatus !== "closed" &&
                    <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}} >
                                <Box onClick={this.handleOpenDetailsModal}>
                                    <Box style={{display:'flex',justifyContent:'space-between'}}>
                                        <Box display="flex" alignItems="center">
                                            <img src={profileExp}/>
                                            <Box style={{marginLeft:"10px"}}>
                                                <Typography style={{fontWeight:"bold"}}>Jhon Doe</Typography>
                                                <Typography >B-104, B-105 , D-504</Typography>
                                            </Box>
                                        </Box>
                                        <Box style={{marginTop:"10px"}}>
                                            <Typography variant="subtitle2" className={"statusOngoingBlue"}>Owner</Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{width:"100%",marginTop:"20px "}}>
                                        <Typography className="textwrapStatus">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non erat non massa sagittis pulvinar non id lectus. Cras ultrices bibendum cursus. Mauris vel erat maximus, porta risus a, pulvinar augue. Donec sit amet enim eget est posuere posuere in in lacus. Nullam lacinia, diam sit amet molestie placerat, tellus metus dignissim massa, sed tempor magna elit pulvinar felis. In in nulla malesuada, suscipit eros et, pulvinar sapien. Curabitur et odio leo.
                                        </Typography>
                                    </Box>
                                </Box>
                                {
                                    this.state.setVoting &&
                                    <>
                                        {
                                            this.state.voted ?
                                                <Box>
                                                    <Box style={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center",marginTop:"10px"}}>
                                                        <Box style={{width:"41%",backgroundColor:"d8d8d8",height:"1px",marginRight:"10px"}}/>
                                                        <Typography style={{fontWeight:"bold",textAlign:'center'}}>Voted As</Typography>
                                                        <Box style={{width:"41%",backgroundColor:"d8d8d8",height:"1px",marginLeft:"10px"}}/>
                                                    </Box>
                                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                                        <Grid item xs={12}>
                                                            <DeclineButton disabled fullWidth>Chairman</DeclineButton>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                :
                                                <Box>
                                                    <Box style={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center",marginTop:"10px"}}>
                                                        <Box style={{width:"43%",backgroundColor:"d8d8d8",height:"1px",marginRight:"10px"}}/>
                                                        <Typography style={{fontWeight:"bold",textAlign:'center'}}>Vote As</Typography>
                                                        <Box style={{width:"42%",backgroundColor:"d8d8d8",height:"1px",marginLeft:"10px"}}/>
                                                    </Box>
                                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                                        <Grid item xs={12} sm={6}>
                                                            <ChairmanButton fullWidth onClick={()=> this.setState({voteConfirmModal:true})}>Chairman </ChairmanButton>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <AcceptButton fullWidth >Vice Chairman </AcceptButton>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                        }
                                    </>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                }
                {
                    this.state.votingStatus === "closed" &&
                    <>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>Nominated Members</Typography>
                        <Box style={{display:'flex',marginTop:"30px"}}>
                            <Typography
                                variant="body1"
                                className={this.state.selectedTab === "Chairman" ? "tabButtonActive" : "tabButton"}
                                style={{marginRight:"15px"}}
                                onClick={()=> this.setState({selectedTab:"Chairman"})}
                            >
                                Chairman
                            </Typography>
                            <Typography
                                variant="body1"
                                className={this.state.selectedTab === "ViceChairman" ? "tabButtonActive" : "tabButton"}
                                onClick={()=> this.setState({selectedTab:"ViceChairman"})}
                            >
                                Vice Chairman
                            </Typography>
                        </Box>
                        <Grid container style={{marginTop:"15px"}}>
                            <Grid item xs={12}>
                                <Paper elevation={2} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}}>
                                    <Table className="table-box">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{color:"#181d25"}}>Name</TableCell>
                                                <TableCell style={{color:"#181d25"}}>Unit Number</TableCell>
                                                <TableCell style={{color:"#181d25"}}>Total Vote</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                <TableCell className="ellipse" style={{fontWeight:"bold"}}>Alex Walker <Typography variant="subtitle2" className="chairmanSelected">Chairman</Typography></TableCell>
                                                <TableCell style={{fontWeight:"bold"}}>Alex Walker</TableCell>
                                                <TableCell style={{fontWeight:"bold"}}>Building 1 </TableCell>
                                            </TableRow>
                                            <TableRow onClick={() => this.props.history.push("/VisitorsDetails?id=1")} style={{cursor:"pointer"}}>
                                                <TableCell className="ellipse">Alex Walker</TableCell>
                                                <TableCell>Alex Walker</TableCell>
                                                <TableCell>Building 1 </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                            <Grid xs={12} style={{display:'flex',alignItems:"center",justifyContent:"flex-end",marginTop:"40px"}}>
                                <DeclineButton style={{width:"175px",marginRight:"20px"}}>Print</DeclineButton>
                                <ChairmanButton style={{width:"175px"}}>Share Result</ChairmanButton>
                            </Grid>
                        </Grid>
                    </>
                }
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
        <Modal
            style={dashBoard.modal}
            open={Boolean(this.state.detailsModal)}
            onClose={this.handleCloseDetailsModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={Boolean(this.state.detailsModal)}>
                <div style={dashBoard.paper}>
                    <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:"10px"}}>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>
                            Nominated Member Details
                        </Typography>
                        <IconButton onClick={this.handleCloseDetailsModal}>
                            <img src={cancle}
                                //@ts-ignore
                                 style={dashBoard.modalCacle}/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} style={{marginTop:"10px"}}>
                        <Grid item xs={12}>
                            <Box style={{display:'flex',justifyContent:'space-between'}}>
                                <Box display="flex" alignItems="center">
                                    <img src={profileExp}/>
                                    <Box style={{marginLeft:"10px"}}>
                                        <Typography style={{fontWeight:"bold"}}>Jhon Doe</Typography>
                                        <Typography >B-104, B-105 , D-504</Typography>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>Owner</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non erat non massa sagittis pulvinar non id lectus. Cras ultrices bibendum cursus. Mauris vel erat maximus, porta risus a, pulvinar augue. Donec sit amet enim eget est posuere posuere in in lacus. Nullam lacinia, diam sit amet molestie placerat, tellus metus dignissim massa, sed tempor magna elit pulvinar felis. In in nulla malesuada, suscipit eros et, pulvinar sapien. Curabitur et odio leo.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </Modal>
        <Modal
            style={dashBoard.modal}
            open={Boolean(this.state.nominateMySelf)}
            onClose={this.handleCloseMySelfModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={Boolean(this.state.nominateMySelf)}>
                <div style={dashBoard.paper}>
                    <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:"10px"}}>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>
                            Nominated Member Details
                        </Typography>
                        <IconButton onClick={this.handleCloseMySelfModal}>
                            <img src={cancle}
                                //@ts-ignore
                                 style={dashBoard.modalCacle}/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} style={{marginTop:"10px"}}>
                        <Grid item xs={12}>
                            <Box style={{display:'flex',justifyContent:'space-between'}}>
                                <Box display="flex" alignItems="center">
                                    <img src={profileExp}/>
                                    <Box style={{marginLeft:"10px",display:"flex"}}>
                                        <Typography style={{fontWeight:"bold",marginRight:"20px"}}>Jhon Doe</Typography>
                                        <Typography>B-104, B-105 , D-504</Typography>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>Owner</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Why I should be elected"
                                    multiline
                                    fullWidth
                                    style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                    rows={8}
                                    variant="outlined"
                                />
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <Typography style={{fontWeight:"bold"}}>Nominate As a</Typography>
                                <FormControlLabel
                                    control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}} />} name="checkedA" />}
                                    label="Chairman"
                                />
                                <FormControlLabel
                                    control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}} />} name="checkedB" />}
                                    label="Vice Chairman"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{display:'flex',justifyContent:"flex-end",marginTop:"1px"}}>
                            <Box>
                                <CancelButton variant="contained" style={{marginRight:"15px",width:"150px"}}>Cancel</CancelButton>
                                <ChairmanButton variant="contained" style={{width:"150px"}}>Submit</ChairmanButton>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </Modal>
        <Dialog
            fullWidth
            onClose={() => this.setState({startVotingModal:false})}
            open={this.state.startVotingModal}
            className="cancel-meeting-dialog"
        >
            <DialogContent style={{ margin: "15px 0" }}>
                <Box textAlign="center">
                    <img className="comment-image" src={CheckIcon} alt="check" />
                    <Typography variant="h6">Start Voting</Typography>
                    <Typography variant="body1" style={{ marginBottom: "0px" }}>
                        Are you sure you want to the start the voting process? <br/>
                        by confirming nomination process will be closed.
                    </Typography>
                    <DialogActions className="dialog-button-group">
                        <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.setState({startVotingModal:false})}>
                            Close
                        </Button>
                        <Button style={{ width: "200px" }} className="add-button" onClick={this.startVoting}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
        <Dialog
            fullWidth
            onClose={() => this.setState({voteConfirmModal:false})}
            open={this.state.voteConfirmModal}
            className="cancel-meeting-dialog"
        >
            <DialogContent style={{ margin: "15px 0" }}>
                <Box textAlign="center">
                    <img className="comment-image" src={CheckIcon} alt="check" />
                    <Typography variant="h6">Submit your vote</Typography>
                    <Typography variant="body1" style={{ marginBottom: "0px" }}>
                        Are you sure you want to submit your vote <br/>
                        for john doe as a Vice chairman
                    </Typography>
                    <DialogActions className="dialog-button-group">
                        <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.setState({startVotingModal:false})}>
                            Close
                        </Button>
                        <Button style={{ width: "200px" }} className="add-button" onClick={this.confirmVote}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
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
        backgroundColor: "#fc8434",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "#fc8439",
        },
    },
}))(Button);

const DeclineButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "#E5ECFF",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "#E5ECFF",
        },
    },
}))(Button);

const CancelButton = withStyles((theme) => ({
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

const ChairmanButton = withStyles((theme) => ({
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
// Customizable Area End
