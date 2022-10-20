import React from "react";

//components
import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  Modal,
  Fade,
  Backdrop
} from "@material-ui/core";

import '../../dashboard/src/Dashboard.web.css';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

//resources
import { withRouter } from 'react-router';
// import PendingRequestController, { Props } from "./PendingRequestController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

import { x_mark, true_mark } from "./assets";
import CommunityUserProfileController, { Props } from "./communityManagementController.web";
import Loader from "../../../components/src/Loader.web";

const ProfileData = [ 
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:"marleah910@gmail.com",
  call:"+1 78293 23782"
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:"marleah910@gmail.com",
  call:"+1 78293 23782"
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:"marleah910@gmail.com",
  call:"+1 78293 23782"
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:"marleah910@gmail.com",
  call:"+1 78293 23782"
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"GA Member",
  mail:"marleah910@gmail.com",
  call:"+1 78293 23782"
  },
  {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    content:"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    unitno:"B-1405, C-1020, D-3070",
    name:"Marlen Eagleston",
    userType:"GA Member",
    mail:"marleah910@gmail.com",
    call:"+1 78293 23782"
    }
]
class PendingRequest extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
  this.getInvitation()
 
 
       }

  render() {
    const {t}: any = this.props
    return (
      <>
        <Box className="incident-Listing-wrapper desktop-ui" style={{ background: "#E5ECFF" }}>
          {/* Dashboard Header -- */}
          <DashboardHeader {...this.props} />
          <Box style={{ display: "flex" }}>
            <Grid item xs={3} md={3} sm={3} className="SideBar">
              {/* Chairman Sidebar -- */}
              <ChairmanSidebar {...this.props} />
            </Grid>
            <Grid xs={9} md={9} sm={9} spacing={4} style={{ paddingTop: 35 }}>
              <Container>
                <Box style={dashBoard.navigation}>
                  <Box>
                    <Typography variant="body1" >
                      {t("Community Management")} / {t("Requests Management ")} / <Box component="span" style={{ color: "blue" }}> {t("Pending join requests")}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.subHeading}>{t("Pending join requests")}</Typography>
                  </Box>
                </Box>

                  {/* Pending join requests -- */}
                  <Box style={{marginTop:"10px"}}>
                    <div style={dashBoard.gaMemberCard}>
                      <>
                      {this.state.allInvitation.map((item:any, index:any) => {
                       
                       return  ( item.attributes.status=='Pending' &&  <div key={index}>
                          <Card style={dashBoard.cardStyle}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={item?.attributes?.account?.attributes?.profile_pic?.url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80'}
                                alt="green iguana"
                                style={dashBoard.profileImage}
                              />
                              <CardContent style={{padding:"0px 16px 16px 16px"}}>
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.unitno}>{item.attributes.apartment_management.apartment_name}</Typography>
                              <Typography variant="h6" style={{textAlign:"center", marginTop:"5px"}}>{item.attributes.full_name}</Typography>
                              <div style={{textAlign:"center",marginTop:"5px"}}>
                                {/* <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography> */}
                              </div>
                              <Typography variant="subtitle1" style={{textAlign:"center", marginTop:"5px"}}>{item.attributes.phone_number}</Typography>
                              <Typography variant="subtitle1" style={{textAlign:"center", marginTop:"5px"}}>{item.attributes.email_address}</Typography>
                              <Grid container spacing={3} style={{marginTop:"5px"}}>
                                <Grid item xs={12} sm={6}>
                                    <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600}} onClick={()=>this.handleRejectOpen(item)}>
                                        DECLINE
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button variant="contained" color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600}} onClick={()=>this.handleAcceptOpen(item)}>
                                        ACCEPT
                                    </Button>
                                </Grid>
                              </Grid>
                              <div style={dashBoard.contactIcon}>
                                {/* {item.chat}{item.mail} */}
                              </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </div>)
                        

                        })

                        }
                      </>
                    </div>
                  </Box>
                  <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setRejectOpen)}
                    onClose={this.handleRejectClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setRejectOpen)}>
                    <div
                        //@ts-ignore 
                        style={dashBoard.paper}>
                        <img src={ x_mark } style={{marginTop:"20px"}}/>
                        <Typography variant="h6"
                            //@ts-ignore 
                            style={dashBoard.unitno}>Reject Join Request</Typography>
                            <Typography variant="subtitle1" style={{marginTop:"20px"}}>Are you sure want to reject invitation request 
                            received from <b>{this.state?.selectInvitation?.attributes?.full_name}</b> for Unit <b>{this.state.selectInvitation?.attributes?.apartment_management?.apartment_name}</b> </Typography>
                            <Grid container spacing={3} style={{marginTop:"20px"}}>
                            <Grid item xs={12} sm={6} style={{marginBottom:"20px"}}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleRejectClose}>
                                    CLOSE   
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" onClick={()=>this.rejectInvitation(this.state.selectInvitation?.id)} style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    YES, REJECT
                                </Button>
                            </Grid>
                            </Grid>
                    </div>
                    </Fade>
                    </Modal>

                    <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setAcceptOpen)}
                    onClose={this.handleAcceptClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setAcceptOpen)}>
                    <div
                        //@ts-ignore 
                        style={dashBoard.paper}>
                        <img src={ true_mark } style={{marginTop:"20px"}}/>
                        <Typography variant="h6"
                            //@ts-ignore 
                            style={dashBoard.unitno}>Accept Join Request</Typography>
                            <Typography variant="subtitle1" style={{marginTop:"20px"}}>Are you sure want to accept the join request 
                                received from  <b>{this.state.selectInvitation?.attributes?.full_name}</b> for Unit <b>{this.state.selectInvitation?.attributes?.apartment_management?.apartment_name}</b> </Typography>
                            <Grid container spacing={3} style={{marginTop:"20px"}}>
                            <Grid item xs={12} sm={6} style={{marginBottom:"20px"}}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleAcceptClose}>
                                    CLOSE   
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" onClick={()=>this.acceptInvitation(this.state.selectInvitation?.id)} color="primary" style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    YES, ACCEPT
                                </Button>
                            </Grid>
                            </Grid>
                    </div>
                    </Fade>
                    </Modal>
              </Container>
            </Grid>
          </Box>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

//@ts-ignore
export default withTranslation()(withRouter(PendingRequest)); 

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
    display:"flex",
    alignItems:"center",
    marginTop:20
  },
  gaMemberCard:{
    display: "grid",
    gridTemplateColumns: "3fr 3fr 3fr 3fr",
    gap: 20
  },
  profileImage:{
    borderRadius: "100%",
    width: 70,
    height: 70,
    margin: "35px auto"
  },
  userType:{
    backgroundColor: "aliceblue",
    borderRadius: 30,
    display: "inline-block",
    padding: "3px 20px",
    color:"#2D6EED",
    fontWeight:600
  },
  unitno:{
    marginTop:15,
    fontWeight: 600,
    textAlign:"center"
  },
  contactIcon:{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop:15
  },
  cardStyle:{
    borderRadius:10,
    maxWidth:345
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
    padding: "16px 70px 24px",
    width:"550px",
    textAlign:"center"
},
};

// Customizable Area End
