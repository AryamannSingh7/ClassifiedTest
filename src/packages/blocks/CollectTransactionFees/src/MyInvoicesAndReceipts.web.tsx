import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import MyInvoicesAndReceiptsController, {
  Props
} from "./MyInvoicesAndReceiptsController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class MyInvoicesAndReceipts extends MyInvoicesAndReceiptsController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols InvoiceReceipts">
                <Grid container style={{ margin: '1rem', width: '90%' }} className="invoiceMainGrid" >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}}  className="invoiceSubGrid" >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}} className="invoiceSubGridMainBox" >
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} className="invoicesArrow" />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }} className="invoicesReceiptsHeading">
                              {t("My Invoices/Receipts")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} className="invoicesReceiptsMainBoxHeading" >
                    <Grid container spacing={2} style={{width:"90%"}} className="invoicesReceiptsSubGridMain" >
                        <Grid item xs={12} className="invoicesReceiptsSubGridItem">
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="16px"
                                bgcolor="white"
                                marginTop='1.6rem'
                                padding='1.6rem'
                                className="invoicesReceiptsMainBox"
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/MyInvoices/Owner")}
                            >
                                <Box style={{minWidth:"100%"}}  className="invoicesReceiptsSubGridItemBox">
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}} className="invoicesReceiptsSubBox">
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}} className="invoicesReceipts">
                                            {t("View Invoices")}
                                        </Typography>
                                        <ArrowForwardIosIcon fontSize="small" className="invoicesReceiptsSubGridItemBoxArrow"/>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} className="invoicesReceiptsSubGridItem">
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1.5rem'
                                className="invoicesReceiptsMainBox"
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/MyReceipts/Owner")}
                            >
                                <Box style={{minWidth:"100%"}} className="invoicesReceiptsSubGridItemBox">
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}  className="invoicesReceiptsSubBox" >
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}  className="invoicesReceipts">
                                            {t("View Receipts")}
                                        </Typography>
                                        <ArrowForwardIosIcon fontSize="small" className="invoicesReceiptsSubGridItemBoxArrow"/>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(MyInvoicesAndReceipts))

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
