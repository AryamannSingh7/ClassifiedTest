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
import MyTeamUserDetailsController, {
  Props,
  configJSON,
} from "./MyTeamUserDetailsController";
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
import { AvatarIcon, CallIcon, ChatIcon, EmailIcon, FacebookIcon, InstagramIcon, SettingIcon, SnapchatIcon, TwitterIcon } from "../../Settings5/src/assets";
class MyTeamCore extends MyTeamUserDetailsController {
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
                            {t("My Team")} / {t("Team Members")} / <Box component="span" style={{color: "blue"}}>{this.state.selectedUser?.name}</Box>
                        </Typography>
                        <Typography variant="h4" className="subHeading" >{this.state.selectedUser?.name}</Typography>
                        <Typography variant="h5" className="subHeading" >{t("General Details")}</Typography>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Box style={{backgroundColor:"white",width:"100%"}}>
                            <Grid container>
                                <Grid item xs={12} sm={3} style={{borderRight: "1px solid gray"}}>
                                    <Box style={{width:"100%",display:'flex',justifyContent:"center",flexDirection:"column",margin:"30px 20px"}}>
                                        <img src={this.state.selectedUser?.account?.attributes?.profile_pic || profileExp} height="100px" width="100px" style={{borderRadius:"100px"}}  />
                                        <Typography variant="h6" style={{fontWeight:"bold",marginBottom:"5px"}}>{this.state.selectedUser?.name}</Typography>
                                        <Typography variant="h6" gutterBottom style={{marginBottom:"10px"}}>{this.state.selectedUser?.user_profile?.data?.attributes?.apartment_number?.apartment_number}</Typography>
                                        <Grid container spacing={2} style={{width:"95%",display:"flex",alignItems:"center",marginTop:"5px"}}>
                                            {
                                                this.state.selectedUser?.role_list?.length > 0 &&
                                                this.state.selectedUser?.role_list.map((item:any,key:any)=> {
                                                    return(
                                                        <Grid key={key} item>
                                                            <Typography variant="subtitle2" className={"statusOngoingBlue"} gutterBottom>{item}</Typography>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Box>
                                    <Box style={{width:"100%",display:'flex',justifyContent:"flex-start",flexDirection:"column",margin:"30px 20px"}}>
                                        <Box style={{display:'flex'}}>
                                            <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}} onClick={() => this.openChat(this.state.selectedUser)}>
                                                <img src={chat} />
                                            </IconButton>
                                            <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px"}} onClick={()=> window.location.href = `mailto:${this.state.selectedUser.email}`}>
                                                <img src={email} />
                                            </IconButton>
                                            <IconButton style={{backgroundColor:"rgba(252,52,52,.1)"}} onClick={()=> window.location.href = `tel:${this.state.selectedUser.phone_number}`}>
                                                <img src={telephone} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Box style={{margin:"30px 20px"}}>
                                                <Typography variant="subtitle1" color="textSecondary">{t("About")}</Typography>
                                                <Typography variant="subtitle1" color="textPrimary">{this.state.selectedUser.user_profile?.data?.attributes?.bio?.bio || "NA"}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} sm={3}>
                                                    <Box style={{margin:"0px 20px"}}>
                                                        <Typography variant="subtitle1" color="textSecondary">{t("Gender")}</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">{this.state.selectedUser?.user_profile?.data?.attributes?.gender?.gender || "NA"}</Typography>                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <Box style={{margin:"0px 20px"}}>
                                                        <Typography variant="subtitle1" color="textSecondary">{t("DOB")}</Typography>
                                                        <Typography variant="subtitle1" color="textPrimary">{this.state.selectedUser?.user_profile?.data?.attributes?.date_of_birth?.date_of_birth || "NA"}</Typography>                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    {
                                                        this.state.selectedUserr?.user_profile?.data?.attributes?.hobbies?.hobbies &&
                                                        <Box style={{margin:"0px 20px"}}>
                                                            <Typography variant="subtitle1" color="textSecondary">{t("Hobbies")}</Typography>
                                                            <Box className="hobbies">
                                                                {
                                                                    <>
                                                                        {
                                                                            this.state.selectedUser?.user_profile?.data?.hobbies?.hobbies.map((item:any) =>
                                                                                <>
                                                                                    <span key={item}>
                                                                                      {item}
                                                                                    </span>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </>
                                                                }
                                                            </Box>
                                                        </Box>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box style={{margin:"10px 20px"}}>
                                                <Typography variant="subtitle1" color="textSecondary">{t("Social Media")}</Typography>
                                                <Box style={{display:'flex'}}>
                                                    {
                                                        this.state.selectedUser?.user_profile?.data?.attributes?.website[0]?.twitter_link &&
                                                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px",padding:"2px"}} onClick={()=> window.open(this.state.selectedUser?.user_profile?.data?.attributes?.website[0]?.twitter_link,"_blank")}>
                                                            <img src={TwitterIcon} />
                                                        </IconButton>
                                                    }
                                                    {
                                                        this.state.selectedUser?.user_profile?.data?.attributes?.website[1]?.instagram_link &&
                                                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",marginRight:"8px",padding:"2px"}} onClick={()=> window.open(this.state.selectedUser?.user_profile?.data?.attributes?.website[1]?.instagram_link,"_blank")}>
                                                            <img src={InstagramIcon} />
                                                        </IconButton>
                                                    }
                                                    {
                                                        this.state.selectedUser?.user_profile?.data?.attributes?.website[2]?.fb_link &&
                                                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",padding:"2px",marginRight:"8px"}} onClick={()=> window.open(this.state.selectedUser?.user_profile?.data?.attributes?.website[2]?.fb_link,"_blank")}>
                                                            <img src={FacebookIcon} />
                                                        </IconButton>
                                                    }
                                                    {
                                                        this.state.selectedUser?.user_profile?.data?.attributes?.website[3]?.snapchat_link &&
                                                        <IconButton style={{backgroundColor:"rgba(252,52,52,.1)",padding:"2px"}} href={this.state.selectedUser.user_profile?.data?.attributes?.website[3]?.snapchat_link} target="_blank">
                                                            <img src={SnapchatIcon} />
                                                        </IconButton>
                                                    }
                                                </Box>
                                            </Box>
                                        </Grid>
                                        {/*<Grid container className="social">*/}
                                        {/*    <Grid item xs={12}>*/}
                                        {/*        <span>Social Media</span>*/}
                                        {/*        <Box className="icons">*/}
                                        {/*            {*/}
                                        {/*                this.state.selectedUser?.account?.attributes?.website[0]?.twitter_link &&*/}
                                        {/*                <Button href={this.state.selectedUser?.account?.attributes?.website[0]?.twitter_link} target="_blank">*/}
                                        {/*                    <img src={TwitterIcon} alt="phone" />*/}
                                        {/*                </Button>*/}
                                        {/*            }*/}
                                        {/*            {*/}
                                        {/*                this.state.selectedUser?.account?.attributes?.website[1]?.instagram_link &&*/}
                                        {/*                <Button href={this.state.selectedUser?.account?.attributes?.website[1]?.instagram_link} target="_blank">*/}
                                        {/*                    <img src={InstagramIcon} alt="chat" />*/}
                                        {/*                </Button>*/}
                                        {/*            }*/}
                                        {/*            {*/}
                                        {/*                this.state.selectedUser?.account?.website[2]?.fb_link &&*/}
                                        {/*                <Button href={this.state.selectedUser?.account?.attributes?.website[2]?.fb_link} target="_blank">*/}
                                        {/*                    <img src={FacebookIcon} alt="chat" />*/}
                                        {/*                </Button>*/}
                                        {/*            }*/}
                                        {/*            {*/}
                                        {/*                this.state.selectedUser?.account?.website[3]?.snapchat_link &&*/}
                                        {/*                <Button href={this.state.selectedUser?.account?.attributes?.website[3]?.snapchat_link} target="_blank">*/}
                                        {/*                    <img src={SnapchatIcon} alt="email" />*/}
                                        {/*                </Button>*/}
                                        {/*            }*/}
                                        {/*        </Box>*/}
                                        {/*    </Grid>*/}
                                        {/*</Grid>*/}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box className="navigation">
                    <Box>
                        <Typography variant="h5" className="subHeading"  >{t("Assigned Tasks")}</Typography>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Box style={{backgroundColor:"white",width:"100%"}}>
                            <Grid container>
                                <Grid item xs={12} >
                                    <Box style={{width:"95%",display:'flex',justifyContent:"space-between",alignItems:"center",margin:"10px 20px"}}>
                                        <Typography variant="h6" style={{fontWeight:"bold",marginBottom:"5px"}}>To Approve a budget report</Typography>
                                        <Typography variant="subtitle2" className={"statusOngoingRed"} gutterBottom>{t("Pending")}</Typography>
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
                                                    <Typography variant="subtitle1" color="textSecondary">{t("Building")}</Typography>
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
                                                    <Typography variant="subtitle1" color="textSecondary">{t("Assigned To")}</Typography>
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
                                                    <Typography variant="subtitle1" color="textSecondary">{t("Assigned On")}</Typography>
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
                                                    <Typography variant="subtitle1" color="textSecondary">{t("Due Till")}</Typography>
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
