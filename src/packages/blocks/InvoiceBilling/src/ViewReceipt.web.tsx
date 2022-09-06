//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
  CardActions
} from "@material-ui/core";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import i18next from 'i18next';

import ViewReceiptController, {
    Props,
    configJSON,
  } from "./ViewReceiptController";
import Loader from "../../../components/src/Loader.web";

//resorces
import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
import './style.css'

class ViewReceipt extends ViewReceiptController {
constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}

render() {
  const {t} = this.props
    const { navigation } = this.props;
    return (
      // Customizable Area Start
      <>
      <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box sx={webStyle.maincontentblock}>
                <Box className="content-header">
                <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>{t("View Receipt")}</h4>
                </Box>
                <Box className="incident-right-block blocks">
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick(e)}>
                          <img src={Grid_Icon} className="grid-icon icons" alt="" />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        //@ts-ignore
                        onClose={() => this.handleClose()}>
                        <MenuItem onClick={(e) => this.handleClose(e, "asc")}>{t("Ascending")}</MenuItem>
                        <MenuItem onClick={(e) => this.handleClose(e, "desc")}>{t("Descending")}</MenuItem>
                      </Menu>
                    </Box>

                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={(e: any) => this.handleClick_1(e)}>
                    <img src={Filter_Icon} className="filter-icon icons" alt="" />
                    </Button>
                    <Menu
                    id="fade-menu"
                    anchorEl={this.state.anchorEl_1}
                    keepMounted
                    open={Boolean(this.state.anchorEl_1)}
                    //@ts-ignore
                    onClose={() => this.handleClose_1()}
                    >
                    <MenuItem onClick={(e) => this.handleClose_1(e, "Paid")}>{t("Paid")}</MenuItem>
                    <MenuItem onClick={(e) => this.handleClose_1(e, "Due")}>{t("Due")}</MenuItem>
                    <MenuItem onClick={(e) => this.handleClose_1(e, "Overdue")}>{t("Overdue")}</MenuItem>
                    </Menu>
                </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                    <Box className="incident-content-wrapper">
                        <Box className="formGroup customSelect invoiceselect">
                            <FormControl variant="outlined">
                            <span className="buildingIcons">
                                <img src={Bank_Icon} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                                name="myApartment"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                style={{borderRadius:"50px"}}
                                // onChange={(e) => {
                                // (e.target.value != " ") && setFieldValue("myApartment", e.target.value)
                                // }}
                                // value={values.myApartment}
                            >
                                <MenuItem disabled value=" ">
                                {t("Building Name")}
                                </MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                {/* {
                                this.state?.myApartmentList?.map((val, index) => (
                                    <MenuItem
                                    key={index}
                                    value={val}
                                    >
                                    {`${val?.attributes?.building_management} ${val?.attributes?.apartment_name}`}
                                    </MenuItem>
                                ))
                                } */}
                            </Select>
                            </FormControl>
                        </Box>
                        <Box className="formGroup customSelect invoiceselect">
                            <FormControl variant="outlined" >
                            <span className="buildingIcons">
                                <img src={Bank_Icon} className="frm-icons" alt="House Icon" />
                            </span>
                            <Select
                                name="myApartment"
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                style={{borderRadius:"50px"}}
                                // onChange={(e) => {
                                // (e.target.value != " ") && setFieldValue("myApartment", e.target.value)
                                // }}
                                // value={values.myApartment}
                            >
                                <MenuItem disabled value=" ">
                                {t("Unit Number")}
                                </MenuItem>
                                <MenuItem value={20}>One</MenuItem>
                                <MenuItem value={30}>Two</MenuItem>
                                {/* {
                                this.state?.myApartmentList?.map((val, index) => (
                                    <MenuItem
                                    key={index}
                                    value={val}
                                    >
                                    {`${val?.attributes?.building_management} ${val?.attributes?.apartment_name}`}
                                    </MenuItem>
                                ))
                                } */}
                            </Select>
                            </FormControl>
                        </Box>
                        <Grid container spacing={2} style={{marginTop: "1.5rem"}}>
                            <Grid item xs={12} md={6}>
                                <Button variant="contained" className="invoicesbtn" color="primary">{t("My Receipts")}</Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button variant="outlined" className="invoicesbtn">{t("Tenant Receipts")}</Button>
                            </Grid>
                        </Grid>
                        {console.log("dsdsds--->",this.state?.myReceiptList)}
                        {this.state?.myReceiptList?.map((item: any, index: any) => ( 
                          <Card className="incident-card card" onClick={() => this.getReceiptsDetails(item.id)} key={index}>
                          <CardContent className="costom-card-content">
                          <Box className="card-listing-row">
                            <Typography component="span">
                              {/* {val?.attributes?.incident_title} */}{t("Receipt")}: APRIL 2022
                            </Typography>
                            {/* {
                              item.attributes.status === "paid" ?
                                <Box className="customButton" style={{paddingTop:'0px'}}>
                                  <Button variant="contained" className="contain success" type="submit">Paid</Button>
                                </Box>
                                :
                                (item.attributes.status === "overdue") ?
                                  <Box className="customButton" style={{paddingTop:'0px'}}>
                                    <Button variant="contained" className="contain warning" type="submit">Overdue</Button>
                                  </Box>
                                  :
                                  <Box className="customButton" style={{paddingTop:'0px'}}>
                                    <Button variant="contained" className="contain danger" type="submit">Due</Button>
                                  </Box>
                              } */}
                              </Box>
                            <Box className="card-listing-row">
                              <Typography component="span">
                                {t("Tenant")}:
                              </Typography>
                              <Typography component="span">
                                {t("Building Name")}:
                              </Typography>
                            </Box>
                            <Box className="card-listing-row">
                              <Typography className="sub-title" component="h5">
                                {item.attributes.name}
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                {item.attributes.landlord_name}
                              </Typography>
                            </Box>
                            <Box className="card-listing-row">
                              <Typography component="span">
                                {t("Unit Number")}:
                              </Typography>
                              <Typography component="span">
                               {t("Paid Amount")}:
                              </Typography>
                            </Box>
                            <Box className="card-listing-row">
                              <Typography className="sub-title" component="h5">
                                {item.attributes.apartment_number}
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                {item.attributes.amount}
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">{t("Receipt Type")}</Typography>
                              <Typography className="sub-title" component="h5">
                                {item.attributes.receipt_type}
                              </Typography>
                              </Box>
                          </CardContent>
                          </Card>
                        ))}
                    </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
    mainWrapper: {
      display: "flex",
      fontFamily: "Roboto-Medium",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "30px",
      background: "#fff",
    },
    inputStyle: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
      width: "100%",
      height: "100px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    buttonStyle: {
      width: "100%",
      height: "45px",
      marginTop: "40px",
      border: "none",
      backgroundColor: "rgb(98, 0, 238)",
    },
    maincontentblock:{
      display: "flex",
      flexDirection: "column",
      justifyContent:"space-between"
    }
  };
  // Customizable Area End

  export default withTranslation()(withRouter(ViewReceipt));