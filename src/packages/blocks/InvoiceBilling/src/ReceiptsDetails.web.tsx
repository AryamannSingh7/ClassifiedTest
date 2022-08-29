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
import moment from "moment";
import ShareIcon from '@material-ui/icons/Share';
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

class ReceiptsDetails extends ViewReceiptController {
constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}

componentDidMount() {
  console.log("history location===>", this.props.history.location?.id)
  this.getDetailsReceiptBilling(this.props.history.location?.id);
}
render() {
    const id = this.props.history.location?.id
    const ReceiptDetails = this.state?.getReceiptsDetails;
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
                    <h4>Rent Receipts: APRIL 2022</h4>
                </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block" sx={{ width: { xs:"335px", sm: '450px' }}}>
                    <Box className="incident-content-wrapper">
                    <h4>Receipt Details</h4> 
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
                              {console.log('id details--==>', id, ReceiptDetails?.attributes?.amount)}
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                Building:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                {/* {item.attributes.name} */} Building 1
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                Unit:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                {ReceiptDetails?.attributes?.apartment_number}
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                Rent Amount:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                {ReceiptDetails?.attributes?.amount}
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">
                                Late Changes:
                              </Typography>
                              <Typography className="sub-title" component="h5">
                                {/* {item.attributes.amount} */}SR, 30
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">Paid Amount</Typography>
                              <Typography className="sub-title" component="h5">
                                {/* {item.attributes.invoice_type} */}SR, 10,530
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">Paid Date</Typography>
                              <Typography className="sub-title" component="h5">
                                {moment(ReceiptDetails?.attributes?.paid_on).utc().format('YYYY-MM-DD')}
                              </Typography>
                            </Box>
                            <Box style={{paddingTop:"8px"}}>
                              <Typography component="span">Receipt Type</Typography>
                              <Typography className="sub-title" component="h5">
                                {ReceiptDetails?.attributes?.receipt_type}
                              </Typography>
                            </Box>
                          </CardContent>
                      </Card>

                      <h4 style={{marginTop:"15px"}}>Tenant Details</h4>
                      <Card className="incident-card card">
                          <CardContent className="costom-card-content">
                            <Box style={{paddingTop:"8px"}}>
                                <Typography component="span">
                                    Tenant:
                                </Typography>
                                <Typography className="sub-title" component="h5">
                                    {/* {item.attributes.name} */} Building 1
                                </Typography>
                              </Box>
                              <Box style={{paddingTop:"8px"}}>
                                <Typography component="span">
                                    Building:
                                </Typography>
                                <Typography className="sub-title" component="h5">
                                    {/* {item.attributes.name} */} Building 1
                                </Typography>
                              </Box>
                          </CardContent>
                      </Card>                        
                    </Box>
                    <Grid container spacing={2}>
                            <Grid item xs={12} md={10}>
                              <Button variant="contained" className="invoicesbtn" color="primary">DOWNLOAD RECEIPT</Button>
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
  
  export default withTranslation() (withRouter(ReceiptsDetails));