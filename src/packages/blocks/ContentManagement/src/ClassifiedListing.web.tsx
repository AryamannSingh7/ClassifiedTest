// import React from "react";
import React, { useState } from 'react';
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";
//Customizable Area End
//resorces
import { Tenant_Logo, Building1, Grid_Icon, Setting_Icon, Filter_Icon } from "../src/assets";

class ClassifiedListing extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getClassifiedListing(this.state.status)
  }
  render() {
    const { navigation } = this.props;
    console.log("this.state?.classifiedtListing==========>", this.state?.classifiedtListing)
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Classified</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick(e)}>
                        <img src={Grid_Icon} className="grid-icon icons" alt="" />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.handleClose("", "")}
                      >
                        <MenuItem onClick={(e) => this.handleClose(e, "asc")}>Ascending</MenuItem>
                        <MenuItem onClick={(e) => this.handleClose(e, "desc")}>Descending</MenuItem>
                      </Menu>
                    </Box> */}

                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick_1(e)}>
                      <img src={Filter_Icon} className="filter-icon icons" alt="" />
                    </Button>
                    <Menu
                      id="fade-menu"
                      anchorEl={this.state.anchorEl_1}
                      keepMounted
                      open={Boolean(this.state.anchorEl_1)}
                      onClose={() => this.handleClose_1("", "")}
                    >
                      <MenuItem onClick={(e) => this.handleClose_1(e, "seller")}>Sell</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "buyer")}>Buy</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "generic")}>Generic</MenuItem>
                      <MenuItem onClick={(e) => this.handleClose_1(e, "All")}>All</MenuItem>
                    </Menu>

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <div className="classified-header">
                      <Box className="customButton">
                        <Button variant="contained" onClick={()=>this.getClassifiedListing(this.state.status)}>All Classified</Button>
                      </Box>
                      <Box className="customButton btn-gray">
                        <Button variant="contained"onClick={()=>this.getMyClassifiedList()}>My Classified</Button>
                      </Box>
                    </div>
                    {
                      this.state?.classifiedtListing?.map((val: any, index: any) => (
                        <>
                          <Card className="classified-card card"  style={{ position: "relative",zIndex: 1}} key={index} >
                            <CardContent className="costom-card-content">
                              <Box className="classified-card-header">
                                <Typography component="h4">
                                  {val?.attributes?.title}
                                </Typography>
                                <Button  style={{ position: "absolute",right:"10px" ,zIndex: 10}} aria-controls="simple-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick(e)}>
                                  <img src={Setting_Icon} className="grid-icon icons" alt="" />
                                </Button>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={this.state.anchorEl}
                                  keepMounted
                                  open={Boolean(this.state.anchorEl)}
                                  onClose={() => this.handleClose("","","")}
                                >
                                  <MenuItem onClick={(e) => this.handleClose(e,"edit",val?.id)}>Edit</MenuItem>
                                  <MenuItem onClick={(e) => this.handleClose(e,"delete",val?.id)}>Delete</MenuItem>
                                </Menu>
                              </Box>
                              <Typography className="sub-title h5-title" component="h5">
                              {val?.attributes?.description}
                               </Typography>
                              <Typography component="span">
                                Available to buy:
                              </Typography>
                              <Typography className="sub-title h5-title" component="h5">
                               {val?.attributes?.duration_from} to {val?.attributes?.duration_to}
                              </Typography>
                              <hr />
                              <Box className="card-footer classified-footer">
                                <div className="left-block">
                                  {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                  <Typography component="h4">
                                  {val?.attributes?.currency?.currency} {val?.attributes?.price_from} - {val?.attributes?.currency?.currency}  {val?.attributes?.price_to}
                                  </Typography>
                                </div>
                                {
                                  val?.attributes?.classified_type === "buyer" ?
                                    <Box className="customButton">
                                      <Button variant="contained" className="contain success" type="submit" >Buy</Button>
                                    </Box>
                                    :
                                    (val?.attributes?.classified_type === "generic") ?
                                      <Box className="customButton">
                                        <Button variant="contained" className="contain warning" type="submit" >Generic</Button>
                                      </Box>
                                      :
                                      <Box className="customButton">
                                        <Button variant="contained" className="contain danger" type="submit" >Sell</Button>
                                      </Box>
                                }
                              </Box>
                            </CardContent>
                          </Card>
                        </>
                      ))
                    }
                  </Box>
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => {
                      this.setState({ loading: true });//@ts-ignore
                      this.props.history.push("/ClassifiedType")
                    }} >Add New Incident</Button>
                  </Box>
                </Box>
                {/* <Box className="footer-main-block bottomBlock">
                   <h6 className="bottom-text">POWERED BY</h6>
                   <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                 </Box> */}
              </Box>
            </Grid>
            {/* desktop footer block */}
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

export default withRouter(ClassifiedListing)
