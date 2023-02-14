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
  Backdrop,
  FormControl,
  NativeSelect,
  FormLabel,
  Select,
  InputLabel
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import '../../dashboard/src/Dashboard.web.css';
import '../assets/css/style.scss'

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { Formik, Form, Field, ErrorMessage } from "formik";

//resources
import { withRouter } from 'react-router';
// import AwaitingAccepteController, { Props } from "./AwaitingAccepteController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

import { x_mark, true_mark, delete_icon, info, cancle, user_icon, email_icon, phone_icon, building, unit } from "./assets";
import CommunityUserProfileController,{Props} from "./communityManagementController.web";

const ProfileData = [ 
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  unitno:"B-1405",
  name:"Marlen Eagleston",
  userType:"GA Member",
  date:"invatation send on: 14-06-2022",
  more: <MoreVertIcon color='disabled' />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"GA Member",
  date:"invatation send on: 14-06-2022",
  more: <MoreVertIcon color='disabled' />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  unitno:"B-1405, C-1020",
  name:"Marlen Eagleston",
  userType:"GA Member",
  date:"invatation send on: 14-06-2022",
  more: <MoreVertIcon color='disabled' />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"GA Member",
  date:"invatation send on: 14-06-2022",
  more: <MoreVertIcon color='disabled' />
  },
  {
  image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
  unitno:"B-1405, C-1020, D-3070",
  name:"Marlen Eagleston",
  userType:"GA Member",
  date:"invatation send on: 14-06-2022",
  more: <MoreVertIcon color='disabled' />
  },
  {
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80",
    unitno:"B-1405, C-1020, D-3070",
    name:"Marlen Eagleston",
    userType:"GA Member",
    date:"invatation send on: 14-06-2022",
    more: <MoreVertIcon color='disabled' />
}
]
class AwaitingAcceptece extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
    this.getInvitation()
   this.getBuilding()
   
   this.getUserType()
   
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
                      {t("Community Management")} / {t("Requests Management ")} / <Box component="span" style={{ color: "blue" }}> {t("Sent invitations awaiting acceptance")}</Box>
                    </Typography>
                    <Typography variant="h4" style={dashBoard.subHeading}>{t("Sent invitations awaiting acceptance")}</Typography>
                  </Box>
                </Box>

                <Box style={dashBoard.boxStyling}>
                <Grid container  xs={6} md={6} sm={6} spacing={2}>
                    <Grid item xs={3}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                            // value={this.state.Year}
                            name="selectedBUilding"
                            onChange={this.handleChange}
                          >
                            <option value={2022}>{t("Select Building")}</option>
                            {
                              this.state.allBuilding.map((item:any)=><>
                              <option value={item.id}>{item.name}</option>
                              </>)
                            }
                            
                           
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                            // value={this.state.Year}
                            name="selctedUnit"
                            onChange={this.handleChange}
                          >
                            <option value={2022}>{t("Select Unit")}</option>
                            {
                              this.state.allUnit.map((item:any)=><>
                              <option value={item.apartment_name}>{item?.apartment_name}</option>
                              </>)
                            }
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl style={dashBoard.YearMain} className='yearTab'>
                          <NativeSelect className='yearSelection'
                          name='selectedUserType'
                            // value={this.state.Year}
                            onChange={this.handleChange}
                          >
                            <option value={2022}>{t("Select User Type")}</option>
                            <option value={'ga_member'}>ga member</option>
                            <option value={'resident'}>resident</option>
                            <option value={'owner'}>owner</option>
                            <option value={'property_manager'}>property manager</option>
                          </NativeSelect>
                      </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" onClick={this.getInvitation} style={dashBoard.backColor}><InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>{t("Search")}</Button>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Sent invitations awaiting acceptance */}
                  <Box style={{marginTop:"35px"}}>
                    <div style={dashBoard.gaMemberCard}>
                      <>
                      {this.state.allInvitation.map((item:any, index:any) => {
                        return( item.attributes.status=='Pending' &&
                          <div key={index}>
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
                              <span style={{position:"absolute", right:"10px", top:"10px"}} > <Menu menuButton={<MoreVertIcon color='disabled' />} style={{left:"0px",top:"0px"}}>
        <MenuItem onClick={()=>this.handleDeleteRequestOpen(item)}>{t("Resend Request")}</MenuItem>
        <MenuItem onClick={()=>this.handleResendRequest(item)}>{t("Delete Invitation Request")}</MenuItem>
        
      </Menu></span>
                              {/* <Menu
                      id="simple-menu"
                      key={index}
                      anchorEl={this.state.anchorEl1}
                      keepMounted
                      open={Boolean(this.state.anchorEl1)}
                      onClose={this.handleMoreClose}
                      style={{padding:"0px", cursor:'pointer'}}
                      >
                      <MenuItem onClick={()=>this.handleDeleteRequestOpen(item.id)} style={{margin:"7px", cursor:'pointer'}}>{t("Resend Request")}{item?.id}</MenuItem>
                      <hr style={{margin:"0px"}}/>
                      <MenuItem onClick={()=>this.handleResendRequest(item.id)} style={{margin:"7px", cursor:'pointer'}}>{t("Delete Invitation Request")}</MenuItem>
                  </Menu> */}
              
                              <Typography variant="h6"
                              //@ts-ignore 
                              style={dashBoard.unitno}>{item.attributes.apartment_management?.apartment_name}</Typography>
                              <Typography variant="h6" style={{textAlign:"center", marginTop:"5px"}}>{item.attributes.full_name}</Typography>
                              <Typography variant="subtitle1" style={{textAlign:"center", marginTop:"5px"}}>{item.date}</Typography>
                              <div style={{textAlign:"center",marginTop:"10px 0px 15px 0px"}}>
                                {/* <Typography variant="h6" style={dashBoard.userType}>{item.userType}</Typography> */}
                              </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                       
                          </div>
                        )

                        })

                        }
                      </>
                    </div>
                  </Box>

                  {/* More Menu */}
               

                  {/* Delete Invitation Confirmation Modal */}
                  <Modal
                    style={dashBoard.modal}
                    open={Boolean(this.state.setRequestOpen)}
                    onClose={this.handleRequestClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={Boolean(this.state.setRequestOpen)}>
                    <div
                        //@ts-ignore 
                        style={dashBoard.paper}>
                        <img src={ delete_icon } style={{marginTop:"20px"}}/>
                        <Typography variant="h6"
                            //@ts-ignore 
                            style={dashBoard.unitno}>Delete Invitation Confirmation</Typography>
                            <Typography variant="subtitle1" style={{marginTop:"20px"}}>Are you sure want to delete invitation request 
                                sent to <b>{this.state?.selectInvitation?.attributes?.full_name}</b> for Unit <b>{this.state.selectInvitation?.attributes?.apartment_management?.apartment_name}</b> </Typography>
                            <Grid container spacing={3} style={{marginTop:"20px"}}>
                            <Grid item xs={12} sm={6} style={{marginBottom:"20px"}}>
                                <Button variant="outlined" style={{width:"100%", color:"#2B6FED", border:"1px solid #2B6FED", fontWeight:600, height:"50px"}} onClick={this.handleRequestClose}>
                                    CLOSE   
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" onClick={this.deleteRequest} style={{width:"100%", backgroundColor:"#2B6FED", fontWeight:600, height:"50px"}}>
                                    YES, DELETE
                                </Button>
                            </Grid>
                            </Grid>
                    </div>
                    </Fade>
                  </Modal>

                  {/* Resend Request Modal */}
                 { this.state.setDeleteRequest && <Modal
                     style={dashBoard.modal}
                     open={Boolean(this.state.setDeleteRequest)}
                     onClose={this.handleDeleteRequestClose}
                     closeAfterTransition
                     BackdropComponent={Backdrop}
                     BackdropProps={{
                     timeout: 500,
                     }}
                    >
                     <Fade in={Boolean(this.state.setDeleteRequest)}>
                      <div
                      //@ts-ignore  
                      style={dashBoard.requestpaper}>
                        <img src={cancle}
                        onClick={this.handleDeleteRequestClose}
                        //@ts-ignore 
                        style={dashBoard.modalCacle}/>
                        <Formik
                    initialValues={{
                      email: this.state.selectInvitation?.attributes?.email_address,
                      usertype: this.state.selectInvitation?.attributes?.role?.id,
                      fullname: this.state.selectInvitation?.attributes?.full_name,
                      phoneno: this.state?.selectInvitation.attributes?.phone_number,
                      building: this.state.selectInvitation?.attributes?.building_management?.id,
                      unit:this.state.selectInvitation?.apartment_management?.id
                    }}
                    validationSchema={this.InvitationSchema()}
                    validateOnMount={true}
                     onSubmit={(values) => {
                      this.updateInvitation(values)
                       // same shape as initial values
                    
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue }) => (
                        <Form translate={true} className="commonForm ">
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.labelsStyle}>Select User Type</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons">
                                      <img src={user_icon} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>Select User Type</InputLabel> 
                                    <Select
                                      name="usertype"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: '45px' }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        (e.target.value != " ") && setFieldValue("usertype", e.target.value)
                                      }}
                                      value={values.usertype}
                                    >
                                      <MenuItem  disabled value=" ">
                                        Select User Type
                                      </MenuItem>
                                      {/* {
                                      this.state.allBuilding.map((item:any)=> <MenuItem value={item.id}>{item.name}</MenuItem>)
                                    } */}
                                       {
                                        this.state.allUserType.map((item:any)=> <MenuItem value={item?.id}>{item?.name}</MenuItem>)
                                      }

                                    </Select>
                                  </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>Member full name</FormLabel>
                              <Field name="fullname" type="text" placeholder="Member full name" style={dashBoard.inviteInput} />
                              <span
                              //@ts-ignore 
                              style={dashBoard.formLeftIcn}>
                                <img src={user_icon} className="frm-icons" alt="User Icon" />
                              </span>
                            </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>Email Address</FormLabel>
                              <Field name="email" type="text" placeholder="Email Address" style={dashBoard.inviteInput} />
                              <span 
                              //@ts-ignore 
                              style={dashBoard.formLeftIcn}>
                                <img src={email_icon} className="frm-icons" alt="Email Icon" />
                              </span>
                            </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>Phone Number</FormLabel>
                              <Field name="phoneno" type="text" placeholder="Phone Number" style={dashBoard.inviteInput} />
                              <span 
                              //@ts-ignore 
                              style={dashBoard.formLeftIcn}>
                                <img src={phone_icon} className="frm-icons" alt="Phone Icon" />
                              </span>
                            </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>Select Building</FormLabel>
                                <FormControl variant="outlined" >
                                  <span className="frmLeftIcons">
                                    <img src={building} className="frm-icons" alt="Building Icon" />
                                  </span>
                                  <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>Select Building</InputLabel> 
                                  <Select
                                    name="building"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    style={{ paddingLeft: '45px' }}
                                    // label="Select User Type"
                                    onChange={(e) => {
                                      (e.target.value != " ") && setFieldValue("building", e.target.value)
                                    }}
                                    value={values.building}
                                  >
                                    <MenuItem  disabled value=" ">
                                      Select Building
                                    </MenuItem>
                                    {
                                      this.state.allBuilding.map((item:any)=> <MenuItem value={item.id}>{item.name}</MenuItem>)
                                    }

                                    {/* {
                                      this.state?.userTypeData?.map((val, index) => (
                                        <MenuItem
                                          key={index}
                                          value={val?.name}
                                        >
                                          {val?.name}
                                        </MenuItem>
                                      ))
                                    } */}

                                  </Select>
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                              <FormLabel component="legend" style={dashBoard.labelsStyle}>Select Unit</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons">
                                      <img src={unit} className="frm-icons" alt="Unit Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.formLabels}>Select Unit</InputLabel> 
                                    <Select
                                      name="unit"
                                      labelId="demo-simple-select-outlined-label"
                                      id="demo-simple-select-outlined"
                                      style={{ paddingLeft: '45px' }}
                                      // label="Select User Type"
                                      onChange={(e) => {
                                        (e.target.value != " ") && setFieldValue("unit", e.target.value)
                                      }}
                                      value={values.unit}
                                    >
                                      <MenuItem  disabled value=" ">
                                        Select Unit
                                      </MenuItem>
                                      {
                                        this.state.allUnit.map((item:any)=> <MenuItem value={item.id}>{item?.apartment_name}</MenuItem>)
                                      }

                                      {/* {
                                        this.state?.userTypeData?.map((val, index) => (
                                          <MenuItem
                                            key={index}
                                            value={val?.name}
                                          >
                                            {val?.name}
                                          </MenuItem>
                                        ))
                                       } */}

                                    </Select> 
                                  </FormControl>   
                              </Box> 
                            </Grid>
                            <Grid container justifyContent="flex-end">
                              <Grid item>
                              <Button style={{ border: '1px solid #5000f4',borderRadius:5,width:'9rem',height:'3rem',marginRight:'1rem' }} onClick={()=>this.setState({setDeleteRequest:false})} >
                CLOSE
              </Button>
              <Button variant="contained" type="submit" style={{background:'#5000f4', border: '1px solid #5000f4',borderRadius:5,width:'9rem',height:'3rem',color:'white'}}   >
              send invitation
              </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Form>
                        )}
                        </Formik>
                      </div>
                    </Fade>
                  </Modal>}
              </Container>
            </Grid>
          </Box>
        </Box>
        {/* <Loader loading={this.state.loading} /> */}
      </>
    )
  }
}

//@ts-ignore
export default withTranslation()(withRouter(AwaitingAcceptece)); 

const dashBoard = {
  navigation: {
    display: "flex",
    justifyContent: "space-between",
  },
  subHeading: {
    fontWeight: 600,
    marginTop: 15,
  },
  YearMain: {
    background: "#fff",
    border: "none",
    borderRadius: 5,
    padding: 5,
  },
  SideBar: {
    background: "#f9f6f6",
    position: "relative",
    paddingBottom: 150,
  },
  backColor:{
   backgroundColor: "#2D6EED",
   padding:"9px 16px",
   color:'white'
  },
  boxStyling:{
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
labelsStyle:{
  color:"#212121",
  margin:"10px 0px 10px 0px"
},
formLabels:{
  paddingLeft:35
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
},
requestpaper:{
  backgroundColor: "#fff",
  borderRadius: '10px',
  // boxShadow: theme.shadows[5],
  padding: "16px 32px 24px",
  width:"700px"
},
modalCacle:{
  top:15,
  right:15,
  float:"right",
  cursor:"pointer"
},
};

// Customizable Area End
