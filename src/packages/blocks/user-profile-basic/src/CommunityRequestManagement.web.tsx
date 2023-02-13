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
  InputAdornment,
  TextField,
  Paper,
  Popover ,
  Modal,
  Backdrop,
  Fade,
  InputLabel,
  FormLabel 
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles';

import '../../dashboard/src/Dashboard.web.css';

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from '@material-ui/core/Box';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from '@material-ui/core/Grid';

//resources
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import CommunityUserProfileController, { Props } from "./communityManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import Tooltip from '@material-ui/core/Tooltip';
// @ts-ignore
import {dashBoard} from "./dash.js";

//resorces
import { invite, addgroup, newMember, info, cancle, user_icon, email_icon, phone_icon, building, unit } from "./assets";

class CommunityRequestManagement extends CommunityUserProfileController {
  constructor(props: Props) {
    super(props);
  }
  async componentDidMount() {
   this.getUserType()
   this.getBuilding();
   this.getCount();
  //  this.getUnit();


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
                <Box style={dashBoard.cm_navigation}>
                  <Box>
                    <Typography variant="body1" >
                      {t("Community Management")} / <Box component="span" style={{ color: "blue" }}> {t("Request Management")}</Box>
                    </Typography>
                    <Typography variant="h5" style={dashBoard.cm_subHeading}>{t("Request Management")}</Typography>
                  </Box>
                </Box>

                  {/* Request Management -- */}
                  <Box style={{marginTop:"20px"}}>
                    <div style={dashBoard.cm_gaMemberCard}>
                        <Paper elevation={3} style={dashBoard.cm_managementPaper}
                            onClick={this.handleOpen}>
                            <div style={dashBoard.cm_invitemember}>
                                <img src= {newMember} style={dashBoard.cm_inviteIcon}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}><Typography variant="h6" style={dashBoard.cm_subHeading}>{t("Invite a new Member")}</Typography>
                            <Tooltip style={{background:'white'}} title="This section will allow you to invite new owners, residents, and team members to join the platform and start engaging with the building community">

                                <img
                                
                                src= {info} style={{paddingLeft:"10px"}}/>
                              </Tooltip>
                                </div>
                             
                                 
                            <h6>{t("Invite Member")}</h6>
                        </Paper>
                        <Paper elevation={3} style={dashBoard.cm_managementPaper} 
                            onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/PendingRequest")}}>
                            <div style={dashBoard.cm_imgRound}> 
                                <img src= {addgroup} style={dashBoard.cm_mailIcon}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Typography variant="h6" style={dashBoard.cm_subHeading}>{t("Pending Join requests")}</Typography>
                               
                                 <Tooltip style={{background:'white'}} title="This section will allow you to invite new owners, residents, and team members to join the platform and start engaging with the building community">

<img
src= {info} style={{paddingLeft:"10px"}}/>
</Tooltip>
                                </div>
                               
                            <Typography variant="h6" style={dashBoard.cm_subHeading}>{this.state.invitatonCount?.ragistration_request_pending
}</Typography>
                        </Paper>
                        <Paper elevation={3} style={dashBoard.cm_managementPaper} 
                        >
                            <div style={dashBoard.cm_imgRound}>
                                <img src= {invite} style={dashBoard.cm_mailIcon}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}} onClick={() => {
                          //@ts-ignore
                          this.props.history.push("/AwaitingAcceptece")}}>
                                <Typography variant="h6" style={dashBoard.cm_subHeading}>{t("Sent invitations awaiting acceptance")}</Typography>
                            
                                 <Tooltip style={{background:'white'}} title="This section will allow you to invite new owners, residents, and team members to join the platform and start engaging with the building community">

<img
src= {info} style={{paddingLeft:"10px"}}/>
</Tooltip>
                                </div>
                           
                            <Typography variant="h6" style={dashBoard.cm_subHeading}>{this.state.invitatonCount?.totle_member_invitation_pending}</Typography>
                        </Paper>
                    </div>
                  </Box>

                  <Box style={dashBoard.cm_invitationReq}>
                    <Paper elevation={3} style={dashBoard.cm_managementPaper}>
                        <Typography variant="h6" style={dashBoard.cm_subHeading}>{t("Invitation Requests")}</Typography>
                        <hr />
                        <div>
                            <div style={dashBoard.cm_facility}>
                                <h6 style={{color:"d3d3d3", margin:"20px 0px 10px 0px"}}>{t("Title")}</h6>
                                <h6 style={{color:"d3d3d3", margin:"20px 0px 10px 0px"}}>{t("Count")}</h6>
                            </div>
                            <div style={dashBoard.cm_facility}  
                            onClick={() => {
                            //@ts-ignore
                            this.props.history.push("/SentInvitation")}}>
                                <h6>{t("Total Sent Invitations")}</h6>
                                <Typography variant="h6" style={dashBoard.cm_invitationCont}>{this.state.invitatonCount?.totle_member_invitation_sent}</Typography>
                            </div>
                            <div style={dashBoard.cm_facility}>
                                <h6>{t("Accepted Invitations by users")}</h6>
                                <Typography variant="h6" style={dashBoard.cm_invitationCont}>{this.state.invitatonCount?.member_invitation_accepted}</Typography>
                            </div>
                            <div style={dashBoard.cm_facility}>
                                <h6>{t("Rejected Invitation by users")}</h6>
                                <Typography variant="h6" style={dashBoard.cm_invitationCont}>{this.state.invitatonCount?.member_invitation_rejected}</Typography>
                            </div>
                            <div style={dashBoard.cm_facility}>
                                <h6 style={dashBoard.cm_inviteTitle}>{t("Total received join requests")}</h6>
                                <Typography variant="h6" style={dashBoard.cm_invitationCont}>{this.state.invitatonCount?.totle_ragistration_request}</Typography>
                            </div>
                        </div>
                    </Paper>
                  </Box>

                  {/* Invite Member modal */}
                  <Modal
                    style={dashBoard.cm_modal}
                    open={Boolean(this.state.setOpen)}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                      
                    <Fade in={Boolean(this.state.setOpen)}>
                      <div style={dashBoard.cm_paper}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #0000002e',padding:'16px 32px 24px'}}>

                        <p style={{fontWeight:600}}>Invite Member</p>
                        <img src={cancle}
                        onClick={this.handleClose}
                        //@ts-ignore 
                        style={dashBoard.cm_modalCacle}/>
                        </div>
                        <Formik
                    initialValues={{
                      email: "",
                      usertype: "",
                      fullname: "",
                      phoneno: "",
                      building: " ",
                      unit:""
                    }}
                    validationSchema={this.InvitationSchema()}
                    validateOnMount={true}
                     onSubmit={(values) => {
                       console.log("valus=========>", values)
                       // same shape as initial values
                       this.createInvitation(values);
                    }}
                  >
                    {({ values, touched, errors, isValid, setFieldValue }) => (
                        <Form translate={true} className="commonForm " style={{padding:'16px 32px 24px',width:'auto'}}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                                  <FormLabel component="legend" style={dashBoard.cm_labelsStyle}>{t("Select User Type")}</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons" style={{top:'28%'}}>
                                      <img src={user_icon} className="frm-icons" alt="User Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.cm_formLabels}>{t("Select User Type")}</InputLabel> 
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
                                        {t("Select User Type")}
                                      </MenuItem>
                                      {
                                        this.state.allUserType.map((item:any)=> <MenuItem value={item?.id}>{item?.attributes?.name}</MenuItem>)
                                      }
                                     

                                    </Select>
                                  </FormControl>
                                  {errors.usertype && touched.usertype ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="usertype" />
                        </Typography>
                      ) : null}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.cm_labelsStyle}>{t("Member full name")}</FormLabel>
                              <Field name="fullname" type="text" placeholder={t("Member full name")} style={dashBoard.cm_inviteInput} />
                              <span
                              //@ts-ignore 
                              style={dashBoard.cm_formLeftIcn}>
                                <img src={user_icon} className="frm-icons" alt="User Icon" />
                              </span>
                              {errors.fullname && touched.fullname ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="fullname" />
                        </Typography>
                      ) : null}
                            </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.cm_labelsStyle}>{t("Email Address")}</FormLabel>
                              <Field name="email" type="text" placeholder={t("Email Address")} style={dashBoard.cm_inviteInput} />
                              <span 
                              //@ts-ignore 
                              style={dashBoard.cm_formLeftIcn}>
                                <img src={email_icon} className="frm-icons" alt="Email Icon" />
                              </span>
                              {errors.email && touched.email ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="email" />
                        </Typography>
                      ) : null}
                            </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup">
                              <FormLabel component="legend" style={dashBoard.cm_labelsStyle}>{t("Phone Number")}</FormLabel>
                              <Field name="phoneno" type="text" placeholder={t("Phone Number")} style={dashBoard.cm_inviteInput} />
                              <span 
                              //@ts-ignore 
                              style={dashBoard.cm_formLeftIcn}>
                                <img src={phone_icon} className="frm-icons" alt="Phone Icon" />
                              </span>
                              {errors.phoneno && touched.phoneno ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="phoneno" />
                        </Typography>
                      ) : null}
                            </Box>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                              <FormLabel component="legend" style={dashBoard.cm_labelsStyle}>{t("Select Building")}</FormLabel>
                                <FormControl variant="outlined" >
                                  <span className="frmLeftIcons" style={{top:'28%'}}>
                                    <img src={building} className="frm-icons" alt="Building Icon" />
                                  </span>
                                  <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.cm_formLabels}>{t("Select Building")}</InputLabel> 
                                  <Select
                                    name="building"
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    style={{ paddingLeft: '45px' }}
                                    // label="Select User Type"
                                    onChange={(e) => {
                                      (e.target.value != " ") && setFieldValue("building", e.target.value) ; this.getUnit2(e.target.value)
                                    }}
                                    value={values.building}
                                  >
                                    <MenuItem  disabled value=" ">
                                      {t("Select Building")}
                                    </MenuItem>
                                    {
                                      this.state.allBuilding.map((item:any)=> <MenuItem value={item.id}>{item?.name}</MenuItem>)
                                    }
                                   

                                  </Select>
                                </FormControl>
                                {errors.building && touched.building ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="building" />
                        </Typography>
                      ) : null}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box className="formGroup customSelect">
                              <FormLabel component="legend" style={dashBoard.cm_labelsStyle}>{t("Select Unit")}</FormLabel>
                                  <FormControl variant="outlined" >
                                    <span className="frmLeftIcons" style={{top:'30%'}}>
                                      <img src={unit} className="frm-icons" alt="Unit Icon" />
                                    </span>
                                    <InputLabel id="demo-simple-select-outlined-label" style={dashBoard.cm_formLabels}>{t("Select Unit")}</InputLabel> 
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
                                        {t("Select Unit")}
                                      </MenuItem>
                                      {
                                        this.state.allUnit.map((item:any)=> <MenuItem value={item.id}>{item?.attributes?.apartment_name}</MenuItem>)
                                      }
                                      

                                    </Select>
                                  </FormControl>
                                  {errors.unit && touched.unit ? (
                        <Typography
                          style={{
                            color: "#F14E24",
                            fontWeight: 300,
                            fontSize: 14,
                            marginTop: 5,
                            marginLeft: 10
                          }}
                        >
                          <ErrorMessage className="text-error" component="Typography" name="unit" />
                        </Typography>
                      ) : null}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                            <Box style={{padding:'1rem',display:'flex',justifyContent:'end'}}>

<Button variant='text' onClick={this.handleClose} style={{marginRight:'2rem',border:'1px solid #2773DF',fontWeight:'bold',color:'#2773DF',padding:'10px 40px'}}  >
CANCEL
</Button>
<Box className="customButton" style={{width:'10rem'}}>

<Button
 variant="contained"
 type="submit"
 style={{borderRadius:10}}
 className='MuiButtonBase-root-2 '

>
 SEND INVITATION
</Button>

</Box>
</Box>
                            </Grid>
                          </Grid>
                        </Form>
                        )}
                        </Formik>
                      </div>
                    </Fade>
                  </Modal>
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
export default withTranslation()(withStyles(dashBoard)(withRouter(CommunityRequestManagement))); 





// Customizable Area End
