import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Menu,MenuItem
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {shortIcon,filterIcon} from "../../BroadcastMessage/src/assets"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ViewMyInvoicesController, {
  Props
} from "./ViewMyInvoicesController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Visitors extends ViewMyInvoicesController{
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
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("View my invoices")}
                          </p>
                      </Box>
                      <Box>
                        <IconButton style={{padding:"8px"}} onClick={this.handleClick}>
                            <img src={shortIcon} />
                        </IconButton>
                        <IconButton style={{padding:"8px"}} >
                            <img src={filterIcon} />
                        </IconButton>
                          <Menu
                              id="simple-menu"
                              anchorEl={this.state.anchorEl}
                              keepMounted
                              open={Boolean(this.state.anchorEl)}
                              onClose={this.handleClose}
                          >
                              <MenuItem onClick={this.handleClose} style={{padding:"0px",minHeight:"20px"}}>Paid</MenuItem>
                              <MenuItem onClick={this.handleClose}>Due</MenuItem>
                              <MenuItem onClick={this.handleClose}>OverDue</MenuItem>
                          </Menu>
                    </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:".5rem"}}>
                        <Grid item xs={12}> 
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/Invoice/1")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"subtitle2"}>
                                            {t("Invoice")} : March 2022
                                        </Typography>   
                                        <Typography variant="subtitle2" className="paymentStatusRed">
                                            Due
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={1} >
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Landlord")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                Mr. Ali Khanost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Building Name")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                Building 1
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"8px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Unit Number")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                A-4512
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"8px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Amount")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                SR500
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}> 
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/Invoice/1")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"subtitle2"}>
                                            {t("Invoice")} : APRIL 2022
                                        </Typography>   
                                        <Typography variant="subtitle2" className="paymentStatusOrange">
                                            Overdue
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={1} >
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Landlord")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                Mr. Ali Khanost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Building Name")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                Building 1
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"8px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Unit Number")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                A-4512
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"8px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Amount")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                SR500
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}> 
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='.5rem'
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                onClick={()=>this.props.history.push("/Invoice/1")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"subtitle2"}>
                                            {t("Invoice")} : FEBRUARY 2022
                                        </Typography>   
                                        <Typography variant="subtitle2" className="paymentStatusGreen">
                                            Paid
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={1} >
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Landlord")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                Mr. Ali Khanost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"15px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Building Name")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                Building 1
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"8px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Unit Number")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                A-4512
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} style={{marginTop:"8px"}}>
                                            <Typography variant={"subtitle2"} >
                                                {t("Amount")}
                                            </Typography>
                                            <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                SR500
                                            </Typography>
                                        </Grid>
                                    </Grid>
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
