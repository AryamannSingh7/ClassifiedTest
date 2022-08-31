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
import ShareIcon from '@material-ui/icons/Share';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import i18next from 'i18next';

import ViewInvoicesController, {
    Props,
    configJSON,
  } from "./ViewInvoicesController";
import Loader from "../../../components/src/Loader.web";
import moment from "moment";

//resorces
import { Bank_Icon, Building1, Grid_Icon, Filter_Icon } from "../src/assets";
import './style.css'

class InvoicesDetails extends ViewInvoicesController {
constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}

componentDidMount() {
  console.log("history location===>", this.props.history.location?.id)
  this.getDetailsInvoiceBilling(this.props.history.location?.id);
}

render() {
    const id = this.props.history.location?.id
    const invoiceDetails = this.state?.getInvoicesDetails;
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
                    <h4>Rent Invoices: APRIL 202220</h4>
                </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block" sx={{ width: { xs:"335px", sm: '450px' }}}>
                    <Box className="incident-content-wrapper">
                      <h4>Invoice Details</h4> 
                      {console.log("invoicedetaisl==>>", invoiceDetails?.attributes)}
                      <Card className="incident-card card">
                          <CardContent className="costom-card-content">
                          <Box className="card-listing-row">
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
                              <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                  Building:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                  {invoiceDetails?.attributes?.building_name}
                              </Typography>
                              </Box>
                              <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                  Unit:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                  {invoiceDetails?.attributes?.unit_number}
                              </Typography>
                              </Box>
                              <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                  Due Amount:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                  {/* {item.attributes.apartment_number} */} SR, 10,500
                              </Typography>
                              </Box>
                              <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                  Due Date:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                  {moment(invoiceDetails?.attributes?.due_date).utc().format('YYYY-MM-DD')}
                              </Typography>
                              </Box>
                              <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">Invoice Type</Typography>
                              <Typography className="sub-title" component="h5">
                                  {invoiceDetails?.attributes?.invoice_type}
                              </Typography>
                              </Box>
                          </CardContent>
                      </Card>

                      <h4 style={{marginTop:"15px"}}>Tenant Details</h4>
                      <Card className="incident-card card">
                          <CardContent className="costom-card-content">
                            <Box style={{paddingTop:"8px"}}>
                                <Typography component="span">
                                    Tenent:
                                </Typography>
                                <Typography className="sub-title" component="h5">
                                    {invoiceDetails?.attributes?.tenant_details?.tenant_name}
                                </Typography>
                              </Box>
                              <Box style={{paddingTop:"8px"}}>
                                <Typography component="span">
                                    Id Number:
                                </Typography>
                                <Typography className="sub-title" component="h5">
                                    {invoiceDetails?.attributes?.tenant_details?.tenant_name}
                                </Typography>
                              </Box>
                          </CardContent>
                      </Card>                   
                    </Box>
                    <Grid container spacing={2}>
                            <Grid item xs={12} md={10}>
                              <Button variant="contained" className="invoicesbtn" color="primary">DOWNLOAD INVOICE</Button>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button variant="outlined" className="invoicesbtn"><ShareIcon /></Button>
                            </Grid>
                      </Grid>
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
  
  export default withTranslation() (withRouter(InvoicesDetails));