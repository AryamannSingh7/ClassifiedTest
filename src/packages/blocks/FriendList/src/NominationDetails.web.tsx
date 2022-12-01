// Customizable Area Start
import React from "react";
import "./MyTeam.web.css"
import {
    Container,
    Typography,
    Button,
    Dialog,
    DialogActions,
    IconButton,
    Modal,
    Backdrop,
    Fade,
    DialogContent,
    Paper,
    TextField,
    InputAdornment,
    Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormControlLabel,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {profileExp} from "./assets"
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
import { withTranslation,useTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {withStyles} from "@material-ui/core/styles";
import AddTeamModal from "./AddTeamModal.web";
import {CheckIcon} from "../../user-profile-basic/src/assets"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import moment from "moment";

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
        {/* @ts-ignore */}
        <DashboardHeader {...this.props}/>
        <Box style={{display: "flex"}}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
                <ChairmanSidebar {...this.props}/>
            </Grid>
            <Grid item xs={9} md={9} sm={9} style={{paddingTop: 35}}>
            <Container className="link-decoration">
                <Box className="navigation">
                    <Box style={{width: "100%"}}>
                        <Typography variant="body1" >
                            {t("My Team")} / {t("Chairman and Vice Chairman Nomination")} / <Box component="span" style={{color: "blue"}}>{t("Details")}</Box>
                        </Typography>
                        <NominationHeader 
                            title={this.state?.nominationData?.title}
                            voting_flag={this.state.nominationData?.voting_flag}
                            endVotingCall={()=>this.endVotingCall()}
                            startVoting={()=>this.setState({startVotingModal:true})}
                            nomination_flag={this.state.nominationData?.nomination_flag}
                            nominatedSelf={this.state.nominatedSelf}
                            handleOpenMySelfModal={this.handleOpenMySelfModal}
                        />
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px"}}>
                            <Grid container spacing={2} >
                                <Grid item xs={9} style={{display:'flex'}}>
                                    <Typography variant="h6" style={{fontWeight:"bold"}}>{this.state.nominationData.title}</Typography>
                                    {
                                        this.state.nominationData.status !== "closed" &&
                                        <Button variant="text" color="primary" name="ButtonEdit" id="edit button" style={{color:"2b6fed",fontWeight:"bold"}} onClick={()=>this.setState({setOpen:true})}>{t("Edit Details")}</Button>
                                    }
                                </Grid>
                                <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                    <NominationStatus status={this.state.nominationData?.status} />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">{t("Building")}:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">{this.state.nominationData?.building_name || "NA"}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">{t("Complex Name")}:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">{this.state.nominationData?.complex_name}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">{t("Duration")}:</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">{moment(this.state.nominationData?.start_date).format("DD-MMM-YYYY")} to {moment(this.state.nominationData?.end_date).format("DD-MMM-YYYY")}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">{t("Total Nomination")}: </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">{this.state.nominationData?.total_nomination || 0} Members</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="subtitle1" color="textSecondary">{t("Description")}</Typography>
                                        <Typography variant="subtitle1" color="textPrimary">{this.state.nominationData?.description}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                {
                    this.state.nominationData.status !== "closed" &&
                    <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                        {
                            this.state.nomineeList?.map((item:any,key:any)=> {
                                return(
                                    <NominatedMemberCard 
                                        item={item}
                                        key={key}
                                        handleOpenDetailsModal={(item:any)=> this.handleOpenDetailsModal(item)}
                                        voting_flag={this.state.nominationData.voting_flag}
                                        votedViceChairmanId={this.state.votedViceChairmanId}
                                        votedChairmanId={this.state.votedChairmanId}
                                        manageVote={(id:any,voted:any,name:any)=> this.manageVote(id,voted,name)}
                                    />
                                )
                            })
                        }
                    </Grid>
                }
                {
                    this.state.nominationData.status === "closed" &&
                    <>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>{t("Nominated Members")}</Typography>
                        <Box style={{display:'flex',marginTop:"30px"}}>
                            <Typography
                                variant="body1"
                                className={this.state.selectedTab === "Chairman" ? "tabButtonActive" : "tabButton"}
                                style={{marginRight:"15px"}}
                                onClick={()=> this.setState({selectedTab:"Chairman"})}
                            >
                                {t("Chairman")}
                            </Typography>
                            <Typography
                                variant="body1"
                                className={this.state.selectedTab === "ViceChairman" ? "tabButtonActive" : "tabButton"}
                                onClick={()=> this.setState({selectedTab:"ViceChairman"})}
                            >
                                {t("Vice Chairman")}
                            </Typography>
                        </Box>
                        <Grid container style={{marginTop:"15px"}}>
                            {
                                this.state.selectedTab === "Chairman" ?
                                    <Grid item xs={12}>
                                        <Paper elevation={2} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}}>
                                            <Table className="table-box">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{color:"#181d25"}}>{t("Name")}</TableCell>
                                                        <TableCell style={{color:"#181d25"}}>{t("Unit Number")}</TableCell>
                                                        <TableCell style={{color:"#181d25"}}>{t("Total Vote")}</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                            this.state.chairmanVoteCount?.map((item:any,key:any)=>{
                                                                return(
                                                                    <ChairmanVoteCount item={item} key={key} />
                                                                )

                                                            })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Grid>
                                    :
                                    <Grid item xs={12}>
                                        <Paper elevation={2} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}}>
                                            <Table className="table-box">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{color:"#181d25"}}>{t("Name")}</TableCell>
                                                        <TableCell style={{color:"#181d25"}}>{t("Unit Number")}</TableCell>
                                                        <TableCell style={{color:"#181d25"}}>{t("Total Vote")}</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.state.viceChairmanVoteCount?.map((item:any,key:any)=>{
                                                            return(
                                                                <ViceChairmanVoteCount  item={item} key={key} />
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </Paper>
                                    </Grid>
                            }
                            <Grid xs={12} style={{display:'flex',alignItems:"center",justifyContent:"flex-end",marginTop:"40px"}}>
                                <DeclineButton style={{width:"175px",marginRight:"20px"}} onClick={()=> window.print()}>{t("Print")}</DeclineButton>
                                <ChairmanButton style={{width:"175px"}}>{t("Share Result")}</ChairmanButton>
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
                            <TextField label="Title" variant="outlined"
                               name={t("title")}
                               id="Nomination Title"
                               value={this.state.updateName}
                               onChange={(e)=> this.setState({updateName:e.target.value})}
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
                                placeHolder="Start Date"
                                value={this.state.updateStartDate}
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                type="date" name="startDate"  fullWidth
                                id="SurveyQuestion"
                                format='DD/MM/YYYY'
                                // value={this.state.SurveyData.startDate}
                                onChange={(e)=> this.setState({updateStartDate:e.target.value})}
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
                            <p style={{color:"red"}}>{this.state.nominationStartDateError}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label={t("End Date")} variant="outlined"
                                       type="date" name="endDate"  fullWidth
                                       style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                       id="SurveyQuestion"
                                       value={this.state.updateEndDate}
                                       onChange={(e)=> this.setState({updateEndDate:e.target.value})}
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
                            <p style={{color:"red"}}>{this.state.nominationEndDateError}</p>
                        </Grid>
                        <Grid item xs={12} style={{marginTop:"10px",padding:"0px 7px"}}>
                            <TextField
                                id="outlined-multiline-static"
                                label={t("Description")}
                                value={this.state.updateDescription}
                                onChange={(e)=> this.setState({updateDescription:e.target.value})}
                                multiline
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
                            <AcceptButton variant="contained" onClick={this.updateNominationData}>{t("Update Nomination")}</AcceptButton>
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
                            {t("Nominated Member Details")}
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
                                    <img src={this.state?.detailsForModal?.image?.url || profileExp} width="50px" height="50px" style={{borderRadius:"100px"}}/>
                                    <Box style={{marginLeft:"10px"}}>
                                        <Typography style={{fontWeight:"bold"}}>{this.state.detailsForModal.name}</Typography>
                                        <Typography >{this.state.detailsForModal.unit_number.join(",")}</Typography>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>{this.state.detailsForModal.role}</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <Typography>
                                    {this.state.detailsForModal.description}
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
                            {t("Nominated Member Details")}
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
                                    <img src={this.state.myProfile.image.url || profileExp}  width="50px" height="50px" style={{borderRadius:"100px"}}/>
                                    <Box style={{marginLeft:"10px",display:"flex"}}>
                                        <Typography style={{fontWeight:"bold",marginRight:"20px"}}>{this.state.myProfile.name}</Typography>
                                        <Typography>{this.state.myProfile.unit_number?.join(",")}</Typography>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>{this.state.myProfile.role}</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label={t("Why I should be elected")}
                                    value={this.state.myNominationDescription}
                                    onChange={(e) => this.setState({myNominationDescription:e.target.value})}
                                    multiline
                                    fullWidth
                                    style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                    minRows={8}
                                    variant="outlined"
                                />
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <Typography style={{fontWeight:"bold"}}>{t("Nominate As a")}</Typography>
                                <FormControlLabel
                                    onChange={this.manageSelectRole}
                                    control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}}/>} name="checkedA" value={0} checked={this.state.myNominationAs.find((check:any)=> check === '0') ? true : false}/>}
                                    label={t("Chairman")}
                                />
                                <FormControlLabel
                                    onChange={this.manageSelectRole}
                                    control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}}/>} name="checkedB"  value={1} checked={this.state.myNominationAs.find((check:any)=> check === '1') ? true : false} />}
                                    label={t("Vice Chairman")}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{display:'flex',justifyContent:"flex-end",marginTop:"1px"}}>
                            <Box>
                                <CancelButton variant="contained" style={{marginRight:"15px",width:"150px"}} onClick={this.handleCloseMySelfModal}>{t("Cancel")}</CancelButton>
                                <ChairmanButton variant="contained" style={{width:"150px"}} onClick={this.manageNominate}>{t("Submit")}</ChairmanButton>
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
                    <Typography variant="h6">{t("Start Voting")}</Typography>
                    <Typography variant="body1" style={{ marginBottom: "0px" }}>
                        {t("Are you sure you want to start the voting process? by confirming nomination process will be closed.")}
                    </Typography>
                    <DialogActions className="dialog-button-group">
                        <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.setState({startVotingModal:false})}>
                            {t("Close")}
                        </Button>
                        <Button style={{ width: "200px" }} className="add-button" onClick={this.startVoting}>
                            {t("Confirm")}
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
                        {t("Are you sure you want to submit your vote")} <br/>
                        for {this.state.vote.name} as a {this.state.vote.role === 0 ? "Chairman":"Vice chairman"}
                    </Typography>
                    <DialogActions className="dialog-button-group">
                        <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.setState({voteConfirmModal:false})}>
                            {t("Close")}
                        </Button>
                        <Button style={{ width: "200px" }} className="add-button" onClick={this.confirmVote} >
                            {t("Confirm")}
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

const NominationHeader = (props:any) => {
    const {t} = useTranslation()
    return(
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h4" className="subHeading">{props?.title}</Typography>
            <Box>
                {
                    props?.voting_flag ?
                        <DeclineButton style={{marginTop:"20px"}}  onClick={()=>props.endVotingCall()}>{t("Close Voting")}</DeclineButton> :
                        <>
                            {
                                props?.nomination_flag && !props.voting_flag &&
                                <AcceptButton style={{marginTop:"20px",marginRight:"10px"}} onClick={props.startVoting}>{t("Start Voting")}</AcceptButton>
                            }
                            {
                                props?.nomination_flag && !props?.voting_flag && !props.nominatedSelf &&
                                <DeclineButton style={{marginTop:"20px"}} onClick={props.handleOpenMySelfModal}>{t("Nominate MySelf")}</DeclineButton>
                            }
                        </>
                }
            </Box>
        </Box>
    )
}

const NominationStatus = (props:any) => {
    return(
        <>
            {
                props?.status === "closed" &&
                <Typography variant="subtitle2" className={"statusOngoingRed"}>{props?.status}</Typography>
            }
            {
                props?.status === "active" &&
                <Typography variant="subtitle2" className={"statusOngoingGreen"}>{props?.status}</Typography>
            }
            {
                props?.status === "upcoming" &&
                <Typography variant="subtitle2" className={"statusOngoingBlue"}>{props?.status}</Typography>
            }
        </>
    )
}

const ChairmanVoteCount = (props:any) => {
    const {item,key} = props
    if(key === 0){
        return(
            <TableRow key={key} style={{cursor:"pointer"}}>
                <TableCell className="ellipse" style={item.chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.name} {item.chairman_count > 0 && <Typography variant="subtitle2" className="chairmanSelected">Chairman</Typography>}</TableCell>
                <TableCell style={item.chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.unit_no?.join(",")}</TableCell>
                <TableCell style={item.chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.chairman_count}</TableCell>
            </TableRow>
        )
    }else{
        return(
            <TableRow key={key} style={{cursor:"pointer"}}>
                <TableCell className="ellipse">{item.name}</TableCell>
                <TableCell>{item.unit_no.join(",")}</TableCell>
                <TableCell>{item.chairman_count}</TableCell>
            </TableRow>
        )
    }
}


const ViceChairmanVoteCount = (props:any) => {
    const {item,key} = props
    if(key === 0){
        return(
            <TableRow key={key} style={{cursor:"pointer"}}>
                <TableCell className="ellipse" style={item.vice_chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.name} {item.vice_chairman_count > 0 && <Typography variant="subtitle2" className="chairmanSelected">Vice Chairman</Typography> }</TableCell>
                <TableCell style={item.vice_chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.unit_no?.join(",")}</TableCell>
                <TableCell style={item.vice_chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.vice_chairman_count}</TableCell>
            </TableRow>
        )
    }else{
        return(
            <TableRow key={key} style={{cursor:"pointer"}}>
                <TableCell className="ellipse">{item.name}</TableCell>
                <TableCell>{item.unit_no.join(",")}</TableCell>
                <TableCell>{item.vice_chairman_count}</TableCell>
            </TableRow>
        )
    }
}

const VotedAsCheck = (props:any) => {
    const {t} = useTranslation()
    return(
        <Grid item xs={12}>
            {
                props.votedChairmanId == props.id &&
                <DeclineButton fullWidth disableRipple>{t("Chairman")}</DeclineButton>
            }
            {
                props.votedViceChairmanId == props.id &&
                <DeclineButton fullWidth disableRipple>{t("Vice Chairman")}</DeclineButton>
            }
        </Grid>
    )
}

const NominatedMemberCard = (props:any) => {
    const {item,key,handleOpenDetailsModal} = props
    const {t} = useTranslation()
    return(
        <Grid key={key} item xs={12} sm={6}>
            <Paper elevation={3} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}} >
                <Box onClick={()=> handleOpenDetailsModal(item.attributes)}>
                    <Box style={{display:'flex',justifyContent:'space-between'}}>
                        <Box display="flex" alignItems="center">
                            <img src={ item.attributes?.image?.url || profileExp} width="50px" height="50px" style={{borderRadius:"100px"}}/>
                            <Box style={{marginLeft:"10px"}}>
                                <Typography style={{fontWeight:"bold"}}>{item.attributes.name}</Typography>
                                <Typography >{item.attributes.unit_number.join(",")}</Typography>
                            </Box>
                        </Box>
                        <Box style={{marginTop:"10px"}}>
                            <Typography variant="subtitle2" className={"statusOngoingBlue"}>{item.attributes.role}</Typography>
                        </Box>
                    </Box>
                    <Box style={{width:"100%",marginTop:"20px "}}>
                        <Typography className="textwrapStatus">
                            {item.attributes.description}
                        </Typography>
                    </Box>
                </Box>
                {
                    props?.voting_flag &&
                    <>
                        {
                            props.votedViceChairmanId == item.id || props.votedChairmanId  == item.id ?
                                <Box>
                                    <Box style={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center",marginTop:"10px"}}>
                                        <Box style={{width:"38%",backgroundColor:"d8d8d8",height:"1px",marginRight:"10px"}}/>
                                        <Typography style={{fontWeight:"bold",textAlign:'center'}}>{t("Voted As")}</Typography>
                                        <Box style={{width:"38%",backgroundColor:"d8d8d8",height:"1px",marginLeft:"10px"}}/>
                                    </Box>
                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                        <VotedAsCheck votedChairmanId={props.votedChairmanId} id={item.id}/>
                                    </Grid>
                                </Box>
                                :
                                <Box>
                                    <Box style={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center",marginTop:"10px"}}>
                                        <Box style={{width:"40%",backgroundColor:"d8d8d8",height:"1px",marginRight:"10px"}}/>
                                        <Typography variant={"body2"} style={{fontWeight:"bold",textAlign:'center'}}>{t("Vote As")}</Typography>
                                        <Box style={{width:"40%",backgroundColor:"d8d8d8",height:"1px",marginLeft:"10px"}}/>
                                    </Box>
                                    <Grid container spacing={3} style={{marginTop:"5px"}}>
                                        {
                                            item.attributes.nominate_as == "Chairman"  &&
                                            <Grid item xs={12} sm={12}>
                                                {
                                                    props.votedChairmanId ?
                                                        <DeclineButton disabled fullWidth>{t("Chairman")}</DeclineButton>
                                                        :
                                                        <ChairmanButton fullWidth onClick={()=> props.manageVote(item.id,0,item.attributes.name)}>{t("Chairman")}</ChairmanButton>
                                                }
                                                </Grid>
                                        }
                                        {
                                            item.attributes.nominate_as === "Vice Chairman" &&
                                            <Grid item xs={12} sm={12}>
                                                {
                                                    props.votedViceChairmanId ?
                                                    <DeclineButton disabled fullWidth>{t("Vice Chairman")}</DeclineButton>
                                                    :
                                                    <AcceptButton fullWidth onClick={()=> props.manageVote(item.id,1,item.attributes.name)} >{t("Vice Chairman")}</AcceptButton>
                                                }
                                                </Grid>
                                        }
                                        {
                                            item.attributes.nominate_as === "All" &&
                                            <>
                                                <Grid item xs={12} sm={6}>
                                                    {
                                                        props.votedChairmanId ?
                                                            <DeclineButton disabled fullWidth>{t("Chairman")}</DeclineButton>
                                                            :
                                                            <ChairmanButton fullWidth onClick={()=> props.manageVote(item.id,0,item.attributes.name)}>{t("Chairman")}</ChairmanButton>
                                                    }
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    {
                                                        props.votedViceChairmanId ?
                                                            <DeclineButton disabled fullWidth>{t("Vice Chairman")}</DeclineButton>
                                                            :
                                                            <AcceptButton fullWidth onClick={()=> props.manageVote(item.id,1,item.attributes.name)} >{t("Vice Chairman")}</AcceptButton>
                                                    }
                                                </Grid>
                                            </>
                                        }
                                    </Grid>
                                </Box>
                        }
                    </>
                }
            </Paper>
        </Grid>
    )
}

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
