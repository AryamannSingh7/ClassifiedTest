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
    DialogTitle, IconButton, Modal, Backdrop, Fade, DialogContent, Card,
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

import MyTeamController, {
  Props,
  configJSON,
} from "./MyTeamController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { withTranslation,useTranslation  } from 'react-i18next';
import '../../../web/src/i18n.js';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {withStyles} from "@material-ui/core/styles";
import AddTeamModal from "./AddTeamModal.web";
import {CheckIcon} from "../../user-profile-basic/src/assets"
import VisitorsSidebar from "../../dashboard/src/VisitorsSidebar.web";

class MyTeamCore extends MyTeamController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
    const {t} = this.props
    const userType  = localStorage.getItem("selectUserType");

    return (
      <>
    <Box style={{background: "#E5ECFF"}}>
        <DashboardHeader {...this.props}/>
        <Box style={{display: "flex"}}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
            {  userType === "Security" ? 
                            <VisitorsSidebar {...this.props} />
                            :
                            <ChairmanSidebar {...this.props}/> 
                           }
                
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
            <Container className="link-decoration">
                <Box className="navigation">
                    <Box>
                        <Typography variant="body1" >
                            {t("My Team")} / {t("Team Members")} /
                            <Box component="span" style={{color: "blue"}}>
                                {this.props.match.params.type === "CoreMember" && t("Core Members")}
                                {this.props.match.params.type === "SubTeam" && t("Sub Team")}
                                {this.props.match.params.type === "ServiceProvider" && t("Service Providers")}
                            </Box>
                        </Typography>
                        {this.props.match.params.type === "Core_member" &&
                            <Typography variant="h5" className="subHeading"  >{t("Core Members")}</Typography>
                        }
                        {this.props.match.params.type === "Sub_team" &&
                            <Typography variant="h5" className="subHeading"  >{t("Sub Team")}</Typography>
                        }
                        {this.props.match.params.type === "Service_provider" &&
                            <Typography variant="h5" className="subHeading"  >{t("Service Providers")}</Typography>
                        }
                    </Box>
                    {  userType === "Security" ? 
                            null
                            :
                            <Box>
                        <AcceptButton variant="outlined" onClick={(e) => this.setState({setOpen:true})}>Create new Member</AcceptButton>
                    </Box>
                           }
                    
                </Box>
                <Grid container spacing={3} style={{marginTop: 15, marginBottom:30}}>
                    {
                        this.state.teamList.length > 0 ?
                            this.state.teamList.map((item:any,key:any)=> {
                                    return(
                                        <TeamCard key={key} data={item.attributes} history={this.props.history} approval={false} handleDelete={(id:any) => this.handleDeleteModal(id)} openChat={this.openChat} handleEdit={(id:any) => this.handleEdit(id)}/>
                                    )
                            })
                            :
                            <Box style={{marginLeft:"25px"}}>
                                <Typography variant={"body1"} style={{fontWeight:"bold"}} color="textSecondary" >
                                    {t("No User Found")}
                                </Typography>
                            </Box>
                    }
                </Grid>
            </Container>
            </Grid>
        </Box>
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
                  {/*@ts-ignore*/}
                  <AddTeamModal editId={this.state.editId}/>
              </Fade>
          </Modal>
          <Dialog
              fullWidth
              onClose={() => this.setState({deleteModal:false})}
              open={this.state.deleteModal}
              className="cancel-meeting-dialog"
          >
              <DialogContent style={{ margin: "15px 0" }}>
                  <Box textAlign="center">
                      <img className="comment-image" src={CheckIcon} alt="check" />
                      <Typography variant="h6">Remove Team Member</Typography>
                      <Typography variant="body1" style={{ marginBottom: "0px" }}>
                          User will be removed from the team, Are you sure you want to remove user?
                      </Typography>
                      <DialogActions className="dialog-button-group">
                          <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.setState({deleteModal:false})}>
                              Close
                          </Button>
                          <Button style={{ width: "200px" }} className="add-button" onClick={()=> this.deleteMember(this.state.deleteId)}>
                              Confirm
                          </Button>
                      </DialogActions>
                  </Box>
              </DialogContent>
          </Dialog>
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

const TeamCard = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userType = localStorage.getItem("selectUserType")
    const {data} = props
    const { t } = useTranslation();
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        props.handleEdit(data)
    }

    const handleDelete = () => {
        setAnchorEl(null);
        props.handleDelete(data.id)
    }

    const approval = (type:any) => {
        props.approvalFnc(type,data.id)
    }

    return(
        <Grid item sm={4} md={3} xs={12} style={{position:"relative",height:"100%"}}>
            {
                userType ==="Security" ?
                null :
                <Box style={{position:"absolute",top:"10px",right:"10px"}}>
                <IconButton onClick={handleClick}>
                    <MoreVertIcon/>
                </IconButton>
                 </Box> 
            }
            
            
            <Card className="EventsCards" style={{paddingLeft:"0px"}}>
                <Box style={{width:"100%",display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"15px"}} onClick={() => userType === "Security" ? null : props.history.push(`/TeamMember/userDetails?id=${data.id}`)}>
                    {
                        props.approval && userType === "Manager" &&
                        <Typography variant="subtitle2" className={"statusOngoingRed"} gutterBottom style={{marginBottom: "12px"}}>{t("Pending Approval")}</Typography>
                    }
                    <img src={profileExp} height="60px" width="60px" style={{borderRadius:"100px"}}  />
                    <Typography variant="h6" style={{fontWeight:"bold",marginBottom:"5px"}}>{data?.role}</Typography>
                    <Typography variant="h6" gutterBottom style={{marginBottom:"10px"}}>{data?.name}</Typography>
                    <Grid container spacing={1} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {
                            data.role_list.length > 0 &&
                            data.role_list.map((item:any,key:any)=> {
                                if(key < 3) {
                                    return (
                                        <Grid item key={key} style={{marginBottom: "15px"}}>
                                            <Typography key={key} variant="subtitle2" className={"statusOngoingBlue"}
                                                        gutterBottom>{item}</Typography>
                                        </Grid>
                                    )
                                }
                            })
                        }
                    </Grid>
                </Box>
                <Box style={{width:"100%",display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"15px"}}>
                    <Box style={{display:'flex'}}>
                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}} onClick={()=>props.openChat(data)} >
                            <img src={chat} />
                        </IconButton>
                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}} onClick={()=> window.location.href = `mailto:${data.email}`}>
                            <img src={email} />
                        </IconButton>
                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)"}} onClick={()=> window.location.href = `tel:${data.phone_number}`}>
                            <img src={telephone} />
                        </IconButton>
                    </Box>
                    {
                        props.approval && userType === "Chairman" &&
                        <Grid container spacing={2} style={{width:"100%",marginTop:"10px"}}>
                            <Grid item xs={6}>
                                <DeclineButton variant="contained" fullWidth onClick={()=> approval("Decline")}>{t("Decline")}</DeclineButton>
                            </Grid>
                            <Grid item xs={6}>
                                <AcceptButton variant="contained" fullWidth onClick={()=> approval("Accept")}>{t("Accept")}</AcceptButton>
                            </Grid>
                        </Grid>
                    }
                </Box>
            </Card>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>{t("Edit Details")}</MenuItem>
                <MenuItem onClick={handleDelete}>{t("Remove Member")}</MenuItem>
            </Menu>
        </Grid>
    )
}

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
