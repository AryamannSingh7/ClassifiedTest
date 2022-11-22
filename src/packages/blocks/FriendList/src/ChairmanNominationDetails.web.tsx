import * as React from "react";
// custom components
import {
    Grid,
    Box,
    Divider,
    AppBar,
    Tabs,
    Tab,
    Link,
    IconButton,
    Typography,
    Button,
    Paper,
    DialogContent,
    DialogActions,
    Dialog, Table, TableHead, TableRow, TableCell, TableBody,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ChairmanNominationDetailsController, {
  Props
} from "./ChairmanNominationDetailsController";
import './MyTeam.web.css'
import {info, profileExp} from "./assets";
import {withTranslation} from "react-i18next";
import moment from "moment";

class ChairmanNominationDetails extends ChairmanNominationDetailsController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {this.state.nominationData.title}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:"20px"}}>
                        <Grid item xs={12}>
                            <Paper elevation={2} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px"}}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} style={{display:'flex'}}>
                                        <Typography variant="h6" style={{fontWeight:"bold"}}>{this.state.nominationData.title}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Typography variant="subtitle1" color="textPrimary">{this.state.nominationData.description}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">{t("Duration")}:</Typography>
                                            <Typography variant="subtitle1" color="textPrimary">{moment(this.state.nominationData?.start_date).format("DD-MMM-YYYY")} to {moment(this.state.nominationData?.end_date).format("DD-MMM-YYYY")}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                this.state.nominationData.status !== "closed" &&
                                <>
                                    {
                                        this.state.nomineeList.length > 0 &&
                                        <Box style={{display:"flex"}} marginTop="10px">
                                            <Typography variant="body1" style={{fontWeight:"bold"}}>{t("Nominated Members")}</Typography>
                                            <Typography
                                                variant="subtitle2"
                                                className="countButton"
                                            >
                                                {this.state.nomineeList.length}
                                            </Typography>
                                        </Box>
                                    }
                                    <Grid container spacing={3} style={{marginTop: "5px", marginBottom:30}}>
                                    {
                                        this.state.nomineeList.length > 0 &&
                                        this.state.nomineeList.map((item:any,key:any)=> {
                                            return(
                                                <Grid key={key} item xs={12}>
                                                    <Paper elevation={2} style={{backgroundColor:"white",padding:"10px 15px",borderRadius:"15px",cursor:"pointer"}} >
                                                        <Box onClick={this.handleOpenDetailsModal}>
                                                            <Box style={{display:'flex',justifyContent:'space-between'}}>
                                                                <Box display="flex" alignItems="center">
                                                                    <img src={item?.attributes?.image?.url || profileExp} width="50px" height="50px" style={{borderRadius:"100px"}}/>
                                                                    <Box style={{marginLeft:"10px"}}>
                                                                        <Typography style={{fontWeight:"bold"}}>{item.attributes.name}</Typography>
                                                                        <Typography >{item.attributes?.unit_number?.join(",")}</Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Box style={{marginTop:"10px"}}>
                                                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>{item.attributes.role}</Typography>
                                                                </Box>
                                                            </Box>
                                                            <Box style={{width:"100%",marginTop:"20px "}}>
                                                                <Typography className="textwrapStatus">
                                                                    {
                                                                        item.attributes.description
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        {
                                                            this.state.nominationData.voting_flag &&
                                                            <>
                                                                {
                                                                    this.state.votedViceChairmanId == item.id || this.state.votedChairmanId  == item.id ?
                                                                        <Box>
                                                                            <Box style={{width:"100%",backgroundColor:"d8d8d8",height:"1px",marginTop:"25px"}}/>
                                                                            <Box style={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center",marginTop:"-12px"}}>
                                                                                <Typography variant="subtitle2" style={{fontWeight:"bold",textAlign:'center',backgroundColor:"white",padding:"0px 10px"}}>{t("Voted As")}</Typography>
                                                                            </Box>
                                                                            <Grid container spacing={3} style={{marginTop:"1px"}}>
                                                                                <Grid item xs={12}>
                                                                                    {
                                                                                        this.state.votedChairmanId == item.id &&
                                                                                        <DeclineButton fullWidth disableRipple>{t("Chairman")}</DeclineButton>
                                                                                    }
                                                                                    {
                                                                                        this.state.votedViceChairmanId == item.id &&
                                                                                        <DeclineButton fullWidth disableRipple>{t("Vice Chairman")}</DeclineButton>
                                                                                    }
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                        :
                                                                        <Box>
                                                                            <Box style={{width:"100%",backgroundColor:"d8d8d8",height:"1px",marginTop:"25px"}}/>
                                                                            <Box style={{width:"100%",display:'flex',justifyContent:'center',alignItems:"center",marginTop:"-12px"}}>
                                                                                <Typography variant="subtitle2" style={{fontWeight:"bold",textAlign:'center',backgroundColor:"white",padding:"0px 10px"}}>Vote As</Typography>
                                                                            </Box>
                                                                            <Grid container spacing={2} style={{marginTop:"1px"}}>
                                                                                {
                                                                                    item.attributes.nominate_as == "Chairman"  &&
                                                                                    <Grid item xs={12} sm={12}>
                                                                                        {
                                                                                            this.state.votedChairmanId ?
                                                                                                <DeclineButton disabled fullWidth>{t("Chairman")}</DeclineButton>
                                                                                                :
                                                                                                <ChairmanButton fullWidth onClick={()=> this.manageVote(item.id,0,item.attributes.name)}>{t("Chairman")}</ChairmanButton>
                                                                                        }
                                                                                    </Grid>
                                                                                }
                                                                                {
                                                                                    item.attributes.nominate_as === "Vice Chairman" &&
                                                                                    <Grid item xs={12} sm={12}>
                                                                                        {
                                                                                            this.state.votedViceChairmanId ?
                                                                                                <DeclineButton disabled fullWidth>{t("Vice Chairman")}</DeclineButton>
                                                                                                :
                                                                                                <AcceptButton fullWidth onClick={()=> this.manageVote(item.id,1,item.attributes.name)} >{t("Vice Chairman")}</AcceptButton>
                                                                                        }
                                                                                    </Grid>
                                                                                }
                                                                                {
                                                                                    item.attributes.nominate_as === "All" &&
                                                                                    <>
                                                                                        <Grid item xs={6} sm={6}>
                                                                                            {
                                                                                                this.state.votedChairmanId ?
                                                                                                    <DeclineButton disabled fullWidth>{t("Chairman")}</DeclineButton>
                                                                                                    :
                                                                                                    <ChairmanButton fullWidth onClick={()=> this.manageVote(item.id,0,item.attributes.name)}>{t("Chairman")}</ChairmanButton>
                                                                                            }
                                                                                        </Grid>
                                                                                        <Grid item xs={6} sm={6}>
                                                                                            {
                                                                                                this.state.votedViceChairmanId ?
                                                                                                    <DeclineButton disabled fullWidth>{t("Vice Chairman")}</DeclineButton>
                                                                                                    :
                                                                                                    <AcceptButton fullWidth onClick={()=> this.manageVote(item.id,1,item.attributes.name)} >{t("Vice Chairman")}</AcceptButton>
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
                                        })
                                    }
                                </Grid>
                                </>
                            }
                            {
                                this.state.nominationData.status === "closed" &&
                                <>
                                    <Box style={{display:"flex"}}>
                                        <Typography variant="body1" style={{fontWeight:"bold"}}>{t("Nominated Members")}</Typography>
                                        <Typography
                                            variant="subtitle2"
                                            className="countButton"
                                        >
                                            {this.state.nomineeList.length}
                                        </Typography>
                                    </Box>
                                    <Box style={{display:'flex',marginTop:"10px"}}>
                                        <Typography
                                            variant="subtitle2"
                                            className={this.state.selectedTab === "Chairman" ? "tabButtonActive" : "tabButton"}
                                            style={{marginRight:"15px"}}
                                            onClick={()=> this.setState({selectedTab:"Chairman"})}
                                        >
                                            {t("Chairman")}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            className={this.state.selectedTab === "ViceChairman" ? "tabButtonActive" : "tabButton"}
                                            onClick={()=> this.setState({selectedTab:"ViceChairman"})}
                                        >
                                            {t("Vice Chairman")}
                                        </Typography>
                                    </Box>
                                    {
                                        this.state.selectedTab === "Chairman" ?
                                            <Grid container style={{marginTop:"15px"}}>
                                                <Grid item xs={12}>
                                                    <Paper elevation={2} style={{backgroundColor:"white",padding:"10px 10px",borderRadius:"15px",cursor:"pointer"}}>
                                                        <Table className="table-box">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell style={{color:"#181d25"}}>{t("Name")}</TableCell>
                                                                    <TableCell style={{color:"#181d25"}}>{t("Total Vote")}</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    this.state.chairmanVoteCount.length > 0 &&
                                                                    this.state.chairmanVoteCount.map((item:any,key:any)=>{
                                                                        if(key === 0){
                                                                            return(
                                                                                <TableRow key={key}>
                                                                                    <TableCell className="ellipse" style={item.chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>
                                                                                        {item.name}
                                                                                        {item.chairman_count > 0 &&
                                                                                            <Typography
                                                                                                variant="subtitle2"
                                                                                                className="chairmanSelected"
                                                                                                style={{fontSize: "10px",marginLeft:"3px",marginBottom:"2px"}}>
                                                                                                Chairman
                                                                                            </Typography>
                                                                                        }
                                                                                        <Typography variant="subtitle2" color="textSecondary">{item?.unit_no?.join(",")}</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell style={item.chairman_count > 0? {fontWeight:"bold"} : {fontWeight:"normal"}}>{item.chairman_count}</TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        }else{
                                                                            return(
                                                                                <TableRow key={key}>
                                                                                    <TableCell className="ellipse">
                                                                                        {item.name}
                                                                                        <Typography variant="subtitle2" color="textSecondary">{item?.unit_no?.join(",")}</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell>{item.chairman_count}</TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid container style={{marginTop:"15px"}}>
                                                <Grid item xs={12}>
                                                    <Paper elevation={2} style={{backgroundColor:"white",padding:"10px 10px",borderRadius:"15px",cursor:"pointer"}}>
                                                        <Table className="table-box">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell style={{color:"#181d25"}}>{t("Name")}</TableCell>
                                                                    <TableCell style={{color:"#181d25"}}>{t("Total Vote")}</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    this.state.viceChairmanVoteCount.length > 0 &&
                                                                    this.state.viceChairmanVoteCount.map((item: any, key: any) => {
                                                                        if (key === 0) {
                                                                            return(
                                                                                <TableRow key={key}>
                                                                                    <TableCell className="ellipse" style={{fontWeight:"bold"}}>
                                                                                        {item.name}
                                                                                        {item.vice_chairman_count > 0 &&
                                                                                            <Typography
                                                                                                variant="subtitle2"
                                                                                                className="chairmanSelected"
                                                                                                style={{
                                                                                                    fontSize: "10px",
                                                                                                    marginLeft: "3px",
                                                                                                    marginBottom: "2px"
                                                                                                }}>
                                                                                                {t("Vice Chairman")}
                                                                                            </Typography>
                                                                                        }
                                                                                        <Typography variant="subtitle2" color="textSecondary">{item.unit_no?.join(",")}</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell style={{fontWeight:"bold"}}>{item.vice_chairman_count}</TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        }else{
                                                                            return (
                                                                                <TableRow key={key}>
                                                                                    <TableCell className="ellipse">
                                                                                        {item.name}
                                                                                        <Typography variant="subtitle2" color="textSecondary">{item.unit_no?.join(",")}</Typography>
                                                                                    </TableCell>
                                                                                    <TableCell>{item.vice_chairman_count}</TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                    }
                                </>
                            }
                        </Grid>
                    </Grid>
                    {
                        this.state.nominationData.stage === "Nomination Started" &&
                        <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                            {
                                this.state.nominatedSelf ?
                                    <CloseButton variant="contained" fullWidth size="large" onClick={()=> this.props.history.push(`/MyNomination?id=${this.state.nominationId}`)}>
                                        {t("View My Nomination")}
                                    </CloseButton>
                                    :
                                    <CloseButton variant="contained" fullWidth size="large" onClick={()=> this.props.history.push(`/NominateMySelf?id=${this.state.nominationId}`)}>
                                        {t("Nominate MySelf")}
                                    </CloseButton>
                            }
                        </Box>
                    }
                    <Dialog
                        fullWidth
                        onClose={() => this.setState({voteConfirmModal:false})}
                        open={this.state.voteConfirmModal}
                        className="cancel-meeting-dialog"
                    >
                        <DialogContent style={{ margin: "15px 0" }}>
                            <Box textAlign="center">
                                <img className="comment-image" src={info} alt="check" />
                                <Typography variant="h6">{t("Submit your vote")}</Typography>
                                <Typography variant="body1" style={{ marginBottom: "0px" }}>
                                    {t("Are you sure you want to submit your vote")} <br/>
                                    {t("for")} {this.state.vote.name} as a {this.state.vote.role === 0 ? "Chairman":"Vice chairman"}
                                </Typography>
                                <DialogActions className="dialog-button-group" style={{flexDirection:'column'}}>
                                    <SubmitButton style={{width:"300px"}} fullWidth onClick={this.confirmVote}>
                                        {t("Yes Submit")}
                                    </SubmitButton>
                                    <Button style={{width:"300px"}} fullWidth onClick={() => this.setState({startVotingModal:false})}>
                                        {t("No,cancel")}
                                    </Button>
                                </DialogActions>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </Box>
            </Grid>
        </>
    );
  }
}
// @ts-ignore
export default withTranslation()(withRouter(ChairmanNominationDetails))

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

const DeclineButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "#E5ECFF",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        borderRadius:"40px",
        padding:"10px 10px",
        fontSize:"12px",
        '&:hover': {
            backgroundColor: "#E5ECFF",
        },
    },
}))(Button);

const ChairmanButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"40px",
        padding:"10px 10px",
        fontSize:"12px",
        '&:hover': {
            backgroundColor: "#2b6fed",
        },
    },
}))(Button);

const SubmitButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"40px",
        padding:"10px 10px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "#2b6fed",
        },
    },
}))(Button);


const AcceptButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#fc8434",
        fontWeight:"bold",
        borderRadius:"40px",
        padding:"10px 10px",
        fontSize:"12px",
        '&:hover': {
            backgroundColor: "#fc8439",
        },
    },
}))(Button);

// Customizable Area End
