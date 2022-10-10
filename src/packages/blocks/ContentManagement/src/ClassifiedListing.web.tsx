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
  Dialog,
  DialogTitle,
  Menu,
  MenuItem,
  CardActionArea
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
import { DeleteIcon, Building1, NoClassifiedIcon, Setting_Icon, Filter_Icon } from "../src/assets";

class ClassifiedListing extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getClassifiedListing(this.state.status)
  }
  render() {
    const { navigation } = this.props;
    console.log("this.state?.classifiedListing==========>", this.state?.classifiedListing)
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="common_content_block content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={this.redirectToDashboard}><KeyboardBackspaceIcon /></Box>
                    <h4>Classified</h4>
                  </Box>
                  {
                    this.state?.myOrAllClassified ?
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
                      :
                      null
                  }

                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <div className="classified-header">
                      <Box className={this.state?.myOrAllClassified ? "customButton" : "customButton btn-gray"}>
                        <Button variant="contained" onClick={() => this.getClassifiedListing(this.state.status)}>All Classified</Button>
                      </Box>
                      <Box className={this.state?.myOrAllClassified ? "customButton btn-gray" : "customButton"}>
                        <Button variant="contained" onClick={() => this.getMyClassifiedList()}>My Classified</Button>
                      </Box>
                    </div>
                    {
                      this.state?.classifiedListing?.length === 0 ?
                        <>
                          <Box className="content-block">
                            <Box className="main-content-block">
                              <div className='no-classification'>
                                <img src={NoClassifiedIcon} className="lock-logo" alt="Lock_Icon" />
                                <h1>No classifieds were <br></br>found</h1>
                                <p>Looks like you havn’t added any classifieds! You can create a new request by tapping the below button.</p>
                              </div>
                            </Box>
                          </Box>
                        </>
                        :
                        this.state?.classifiedListing?.map((val: any, index: any) => (
                          <Card className="classified-card card" key={val?.attributes?.id} >
                            <CardActionArea onClick={(e: any) => { this.getClassifiedDetails(e, val.id) }}>
                              <CardContent className="costom-card-content">
                                <Box className="classified-card-header">
                                  <Typography component="h4">
                                    {val?.attributes?.title}
                                  </Typography>
                                  {
                                    this.state?.myOrAllClassified ?
                                      null
                                      :
                                      <>
                                        <Button className="menu-btn" aria-controls="simple-menu" aria-haspopup="true" onMouseDown={event => event.stopPropagation()} onClick={(e: any) => { this.handleClick(e, val?.attributes?.id) }}>
                                          <img src={Setting_Icon} className="grid-icon icons" alt="" />
                                        </Button>
                                        <Menu
                                          id="simple-menu"
                                          anchorEl={this.state.anchorEl}
                                          keepMounted
                                          open={Boolean(this.state.anchorEl)}
                                          onClose={() => this.handleClose("", "")}
                                        >
                                          <MenuItem onClick={(e) => this.handleClose(e, "edit")}>Edit</MenuItem>
                                          <MenuItem onClick={(e) => this.handleClose(e, "delete")}>Delete </MenuItem>
                                        </Menu>
                                      </>
                                  }

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
                                  {
                                    val?.attributes?.classified_type === "buyer" ?
                                      <div className="left-block">
                                        {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                        <Typography component="h4">
                                          {val?.attributes?.price_from} {val?.attributes?.currency?.currency} - {val?.attributes?.price_to} {val?.attributes?.currency?.currency}
                                        </Typography>
                                      </div>
                                      :
                                      null
                                  }

                                  {
                                    val?.attributes?.classified_type === "generic" ?
                                      <div className="left-block">
                                        {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                        <Typography component="h4">
                                          {val?.attributes?.payment_detail} {val?.attributes?.currency?.currency}
                                        </Typography>
                                      </div>
                                      :
                                      null
                                  }

                                  {
                                    val?.attributes?.classified_type === "seller" ?
                                      <div className="left-block">
                                        {/* <img src={Dollar_Icon} className="dollar-icon" alt="Dollar Icon" /> */}
                                        <Typography component="h4">
                                          {val?.attributes?.price} {val?.attributes?.currency?.currency}
                                        </Typography>
                                      </div>
                                      :
                                      null
                                  }



                                  {
                                    val?.attributes?.classified_type === "buyer" ?
                                      <Box className="customButton">
                                        <Button variant="contained" className="contain success" type="submit" >Buy</Button>
                                      </Box>
                                      :
                                      (val?.attributes?.classified_type === "generic") ?
                                        <Box className="customButton">
                                          <Button variant="contained" className="contain blue" type="submit" >Generic</Button>
                                        </Box>
                                        :
                                        <Box className="customButton">
                                          <Button variant="contained" className="contain danger" type="submit" >Sell</Button>
                                        </Box>
                                  }
                                </Box>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        ))
                    }
                  </Box>
                  {
                    this.state?.myOrAllClassified ?
                      null
                      :
                      <Box className="customButton add-incident">
                        <Button variant="contained" onClick={() => {
                          this.setState({ loading: true });//@ts-ignore
                          this.props.history.push("/ClassifiedType")
                        }} >{this.state?.classifiedListing?.length === 0 ? 'Add Classified Request'
                          :
                          'ADD Classified'}</Button>
                      </Box>
                  }

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

            <Dialog
              open={this.state?.deleteShowDialog}
              onClose={() => this.setState({ deleteShowDialog: false })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="diloag-wrapper"
              PaperProps={{
                style: {
                  borderRadius: '15px',
                  width: "500px",
                  margin: "0"
                },
              }}
            >
              <Box className="diloag-body classified-dialouge-body desktop-ui ">
                <Box className="diloag-header classified-header">
                  <DialogTitle className="alert-dialog-title" id="alert-dialog-title">
                    {""}
                  </DialogTitle>
                  {/* <Button onClick={() => this.setState({ statusShowDialog: false })}>
                      <img src={Close_Icon} className="close-icon" />
                    </Button> */}
                </Box>
                <Box className="diloag-content classified-content diloag-management-content">
                  <img src={DeleteIcon} className="lock-logo" alt="Lock_Icon" />
                  <h3>Delete classified request?</h3>
                  <p className="lead">Are you sure want to delete published classified buyers request? Once deleted no one will be able to view your request.</p>
                  <Box className="diloag-btn customButton">
                    <Button variant="outlined" onClick={() => this.deleteClassified()}>Yes</Button>
                    <Button variant="contained" onClick={() => { this.setState({ deleteShowDialog: false }) }}>No, don’t delete</Button>
                  </Box>
                </Box>
              </Box>
            </Dialog>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(ClassifiedListing)
