import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {Share} from "./assets"
import InvoiceDetailsController, {
  Props
} from "./InvoiceDetailsController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Visitors extends InvoiceDetailsController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => window.history.back() } />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("Rent Invoice")} : April - 2022
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Grid item xs={12} style={{marginTop:"1.5rem"}}>
                            <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px "}}>
                                <Typography variant={"body1"} style={{fontWeight:"bold"}} >
                                    {t("Invoice Details")}
                                </Typography>
                                <Typography variant="subtitle2" className="paymentStatusOrange">
                                    Overdue
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="10px"
                                bgcolor="white"
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Building Name")}:
                                        </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            Building 1
                                        </Typography>
                                    </Box>
                                    <Box style={{marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Unit")}:
                                        </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            B-504
                                        </Typography>
                                    </Box>
                                    <Box style={{marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Due Amount")}:
                                        </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            SR 500 - SR 650
                                        </Typography>
                                    </Box>
                                    <Box style={{marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Due Date")}:
                                        </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            15-03-2022
                                        </Typography>
                                    </Box>
                                    <Box style={{marginBottom:"10px"}}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t("Invoice Type")}:
                                        </Typography>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            Rent
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px "}}>
                                <Typography variant={"body1"} style={{fontWeight:"bold"}} >
                                    {t("Tenant Details")}
                                </Typography>
                            </Box>
                            <Box
                                borderRadius="15px"
                                bgcolor="white"
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/MyInvoices")}
                            >
                                <Box style={{marginBottom:"10px"}}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t("Tenant")}:
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        Mr. Ali Khan
                                    </Typography>
                                </Box>
                                <Box style={{marginBottom:"10px"}}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t("ID Number")}:
                                    </Typography>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        ABCDEF2020A
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12} style={{marginTop:"30px",display:'flex',justifyContent:'center'}}>
                            <Grid container style={{width:"95%",display:'flex',alignItems:'center'}}>
                                <Grid item xs={9}>
                                    <CloseButton fullWidth>
                                        Download Invoice
                                    </CloseButton>
                                </Grid>
                                <Grid item xs={1}>

                                </Grid>
                                <Grid item xs={2}>
                                    <Box className="shareIcon">
                                        <img src={Share} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(Visitors))

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
