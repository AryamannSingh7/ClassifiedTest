//@ts-ignore
//@ts-nocheck
import React from "react";

import {
  Container,
  Box,
  Grid,
  Menu,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, makeStyles,ThemeProvider } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import i18next from 'i18next';

import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";

//resorces
import { Tenant_Logo, Building1, Grid_Icon, Filter_Icon } from "../src/assets";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const useStyles = makeStyles({
  receiptCard:{
    margin:"10px"
  }
});
// Customizable Area End

import InvoiceBillingController, {
  Props,
  configJSON,
} from "./InvoiceBillingController";

class InvoiceBilling extends InvoiceBillingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

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
                    <h4>My Invoices/Receipt</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper">
                  <Box className="incident-content-wrapper">
                  <Card className='card' style={{cursor:"pointer"}} onClick={() => this.getInvoices()}>
                    <CardContent>
                      <Typography>
                        {t('View Invoices')}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className='card' style={{cursor:"pointer"}} onClick={() => this.getReceipt()}>
                    <CardContent>
                      <Typography>
                        View Receipts
                      </Typography>
                    </CardContent>
                  </Card>
                  </Box>
                  </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
              </Box>
            </Grid>
            <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" className="invoicesbtn" color="primary" onClick={() => i18next.changeLanguage('en')}>English</Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Button variant="outlined" className="invoicesbtn" color="primary" onClick={() => i18next.changeLanguage('ar')}>Arebic</Button>
                  </Grid>
            </Grid>
          </Grid>
        </Box>
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

export default withTranslation() (withRouter(InvoiceBilling));
