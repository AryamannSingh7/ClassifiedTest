import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {
    editIcon,
    deleteIcon,
    userIcon,
    calendar,
    phone,
    building,
    clock,
    exampleImg,exampleId,
} from "./assets";
import VisitorDetailsController, {
  Props
} from "./VisitorDetailsController";
import './style.css'
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import moment from "moment";

class VisitorDetails extends VisitorDetailsController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
      return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '95%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"5px"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                                Visitor Details
                          </p>
                      </Box>
                          <Box>
                              <IconButton style={{padding:"8px"}} onClick={()=>this.props.history.push(`/UpdateVisitor/${this.state.visitorId}`)} >
                                  <img src={editIcon} />
                              </IconButton>
                              <IconButton style={{padding:"8px"}} onClick={this.handleOpenDeleteModal} >
                                  <img src={deleteIcon} />
                              </IconButton>
                          </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:"10px"}}>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='1rem'
                                padding='1rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center"}}>
                                        <Box style={{marginRight:"20px"}}>
                                            <img src={this.state.visitorDetails.profilePic || exampleImg.default} height="55px" width="55px" style={{borderRadius:"100px"}}/>
                                        </Box>
                                        <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                            <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                                {this.state.visitorDetails.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{marginTop:"15px",display:"flex",alignItems:"center"}}>
                                        <Box style={{marginRight:"15px",alignSelf:"flex-Start"}}>
                                            <img src={calendar.default} height="30px" width="30px"/>
                                        </Box>
                                        <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                            <Typography variant={"body2"} >
                                                Scheduled Date:
                                            </Typography>
                                            <Typography variant="subtitle1" style={{fontWeight:"bold"}}>
                                                {moment(this.state?.visitorDetails?.schedule_date).format("DD MMMM YYYY")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{marginTop:"15px",display:"flex",alignItems:"center"}}>
                                        <Box style={{marginRight:"15px",alignSelf:"flex-Start"}}>
                                            <img src={building} height="30px" width="30px"/>
                                        </Box>
                                        <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                            <Typography variant={"body2"} >
                                                Building Name:
                                            </Typography>
                                            <Typography variant="subtitle1" style={{fontWeight:"bold"}}>
                                                {this.state.visitorDetails?.building_management?.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{marginTop:"15px",display:"flex",alignItems:"center"}}>
                                        <Box style={{marginRight:"15px",alignSelf:"flex-Start"}}>
                                            <img src={phone} height="30px" width="30px"/>
                                        </Box>
                                        <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                            <Typography variant={"body2"} >
                                                Phone Number:
                                            </Typography>
                                            <Typography variant="subtitle1" style={{fontWeight:"bold"}}>
                                                {this.state?.visitorDetails?.mobile_number?.full_mobile_number}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{marginTop:"15px",display:"flex",alignItems:"center"}}>
                                        <Box style={{marginRight:"15px",alignSelf:"flex-Start"}}>
                                            <img src={clock} height="30px" width="30px"/>
                                        </Box>
                                        <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                            <Typography variant={"body2"} >
                                                Scheduled Time:
                                            </Typography>
                                            <Typography variant="subtitle1" style={{fontWeight:"bold"}}>
                                                {moment(this.state.visitorDetails.schedule_time).format("hh:mm")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {
                                this.state.visitorDetails?.image?.url &&
                                <>
                                    <Typography variant="h6" style={{marginTop:"15px",fontWeight:"bold"}}> ID </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent='space-between'
                                        alignItems="center"
                                        borderRadius="15px"
                                        bgcolor="white"
                                        padding='1rem'
                                        style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                    >
                                        <img src={this.state.visitorDetails.image.url} width="100%" />
                                    </Box>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modalStyle"
                    // @ts-ignore
                    open={this.state.deleteConfirmModal}
                    onClose={this.handleCloseDeleteModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.deleteConfirmModal}>
                        <Box style={{width:"80%",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"20px"}}>
                            <Box style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"15px"}}>
                                <Box>
                                    <img src={userIcon} />
                                </Box>
                                <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginTop:"15px",marginBottom:"10px",textAlign:"center"}}>
                                    Scheduled Visitors
                                </Typography>
                                <Typography variant="body2" style={{textAlign:"center"}}>
                                    Are you sure that you want to cancel this scheduled visit?
                                </Typography>
                                <Box style={{marginTop:"15px",width:"90%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    {/*@ts-ignore*/}
                                    <CloseButton variant="outlined" fullWidth style={{marginRight:"10px",marginBottom:"15px"}} onClick={this.closeDeleteModal}>Yes, Cancel</CloseButton>
                                    <PublishButton fullWidth onClick={this.handleCloseDeleteModal} >No, Don't Cancel</PublishButton>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </>
    );
  }
}
export default withRouter(VisitorDetails)

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

const PublishButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            color: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
