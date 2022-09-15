import React from "react";
//components
import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField
} from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import NeighboursController, { Props } from "./NeighboursController.web";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//resorces
import {
  Tenant_Logo,
  Building1,
  Search_Icon,
  Building_Icon,
  NoProfile_Img,
  User1_Img,
  User2_Img,
  User3_Img,
  Chat_Icon,
  Contact_Icon,
  Cancel_Icon,
  Setting_Icon,
  Email_Msg_Icon,
  Chat_Disable_Icon,
  Contact_Disable_Icon,
  Email_Disable_Icon
}
  from "../src/assets";
import { building } from "../../email-account-registration/src/assets";
class NeighboursListing extends NeighboursController {
  //@ts-ignore
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getNeighboursListing('','')
    this.getBuilding() 
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        <Box className="login-wrapper incident-wrapper neighbour-listing-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block common_content_block common_content_block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4 style={{display: "flex"}} className={this.state?.searchOrCancel === true ? "neighbor-title" : ""} >My Neighbours</h4>
                  </Box>
                  {
                     this.state.searchOrCancel === true ? 
                     <>
                     <Box className="searchTexfieldBox">
                     <TextField
                       name="serachApartmentName"
                       style={{ width: '100%' }}
                       rows={4}
                       id="outlined-multiline-static"
                       variant="outlined"
                       placeholder="Search"
                       onChange={(e) => { this.onChange(e) }}
                       value={this.state?.serachApartmentName}
                     />
                   </Box>
                   <Button onClick={()=> this.onCancel()}>
                    <img src={Cancel_Icon} className="Search_Icon" alt="Search Icon" />
                  </Button>
                   </>
                     :
                     <Button onClick={()=> this.onSearch()}>
                     <img src={Search_Icon} className="Search_Icon" alt="Search Icon" />
                   </Button>
                  }
                </Box>
                <Box className="content-block-wrapper common-incident-block desktop-ui">
                  <Box className="commonForm neighbour-form">
                      <Box className="formGroup customSelect neighborSelect neighborSelect">
                        <FormControl variant="outlined" >
                          <span className="frmLeftIcons">
                            <img src={Building_Icon} className="frm-icons" alt="House Icon" />
                          </span>
                          <Select
                            name="myApartment"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => { this.onChange(e) }}
                            value={this.state?.myApartment}
                          >
                             <MenuItem disabled value=" ">
                              Select Park
                            </MenuItem>
                            {
                              this.state?.buildingListing?.map((val:any, index : any) => (
                                <MenuItem
                                  key={index}
                                  value={`${val?.id}`}
                                >
                                  {val?.attributes?.name}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Box>
                  </Box>
                
                  <Grid container spacing={2}>
                    {
                      this.state?.neighboursListing?.map((val:any,index: any)=>(
                        val?.account?.data?.attributes?.full_name?.publilc_access ?
                        <Grid item xs={this.state?.neighboursListing.length===1? 12 : 6} md={6}  key={index}>
                         <Card className="neighbour-card neighbour-list-card card" >
                           <CardContent>
                            <Box onClick={()=>this.getNeighboursDetails(val?.account?.data?.id)}>
                             <img src={val?.account?.data?.attributes?.profile_pic||NoProfile_Img} className="info-icon" alt="No profile" />
                             <Typography component="h4">
                              {val?.account?.data?.attributes?.full_name?.name}
                             </Typography>
                             {
                              val?.account?.data?.attributes?.apartment_number?.publilc_access ?
                              <Typography component="h5">
                              {val?.apartment_name}
                             </Typography> 
                             :
                             null
                             }
                             </Box>
                             <Box className="social-raw">
                               <Box className="blocks">
                                 <img src={Chat_Icon}  className="icons" alt="info-icon" />
                               </Box>
                               {
                                val?.account?.data?.attributes?.full_phone_number?.publilc_access ? 
                                <Box className="blocks">
                                <a href={`tel:${val?.account?.data?.attributes?.full_phone_number?.full_phone_number}`}>
                                 <img src={Contact_Icon} className="icons" alt="info-icon" />
                                 </a>
                               </Box>
                                :
                                <Box className="blocks">
                                <img src={Contact_Disable_Icon} className="icons" alt="info-icon" />
                              </Box>
                              }
                              {
                                val?.account?.data?.attributes?.email?.publilc_access?
                                <Box className="blocks">
                                <a  href={`mailto:${val?.account?.data?.attributes?.email?.email}`}>
                                  <img src={Email_Msg_Icon} className="icons" alt="info-icon" />
                                  </a>
                                </Box>
                                :
                                <Box className="blocks">
                                <img src={Email_Disable_Icon} className="icons" alt="info-icon" />
                              </Box>
                              }
                              
                             </Box>
                           </CardContent>
                         </Card>
                       </Grid>
                        :
                        <Grid item xs={this.state?.neighboursListing.length===1? 12 : 6} md={6}  key={index}>
                        <Card className="neighbour-card neighbour-list-card card" >
                          <CardContent>
                           <Box onClick={()=>this.getNeighboursDetails(val?.account?.data?.id)}>
                            <img src={val?.account?.data?.attributes?.profile_pic||NoProfile_Img} className="info-icon" alt="No profile" />
                            <Typography component="h4">
                              "Anonymous"
                            </Typography>
                            {/* <Typography component="h5">
                             {val?.apartment_name}
                            </Typography> */}
                            </Box>
                            <Box className="social-raw">
                          <Box className="blocks">
                            <img src={Chat_Disable_Icon} className="icons" alt="info-icon" />
                          </Box>
                          <Box className="blocks">
                            <img src={Contact_Disable_Icon} className="icons" alt="info-icon" />
                          </Box>
                          <Box className="blocks">
                            <img src={Email_Disable_Icon} className="icons" alt="info-icon" />
                          </Box>
                        </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      ))
                    }        
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}
//@ts-ignore
export default withRouter(NeighboursListing)
