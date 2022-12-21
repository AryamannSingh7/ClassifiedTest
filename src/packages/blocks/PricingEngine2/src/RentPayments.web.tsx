import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import RentPaymentController, {
  Props
} from "./RentPaymentController";
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class RentPayments extends RentPaymentController{
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
                          <ArrowBackIcon className="rentPaymentsBackBtn" onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("Rent Payments")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        {
                            this.state.BuildingListing?.map((item:any,key:any)=> {
                                return(
                                    <Grid key={key} item xs={12} style={{position:"relative"}}>
                                        <Box
                                            className="unitListBox"
                                            display="flex"
                                            justifyContent='space-between'
                                            alignItems="center"
                                            borderRadius="15px"
                                            bgcolor="white"
                                            marginTop='1.5rem'
                                            padding='1.5rem'
                                            style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                            onClick={()=>this.props.history.push(`/RentUnitList/${item.id}`)}
                                        >
                                            <Box style={{minWidth:"100%",height:"70px"}}>
                                                <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                    <Box>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                            {item.attributes.name}
                                                        </Typography>
                                                        <Typography variant={"body2"} style={{marginTop:"5px"}}>
                                                            {item.attributes.city || "NA"}
                                                        </Typography>
                                                    </Box>
                                                    <ArrowForwardIosIcon fontSize="small" style={{color:"#BFBFBF",fontSize:"25px"}}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box className="rentPaymentBuildingMapBtn" style={{position:"absolute",bottom:"20px",left:"30px"}} onClick={()=> window.open(`https://maps.google.com?q=${item.attributes?.lat},${item.attributes?.long}`, '_blank')}>
                                            <Typography variant={"subtitle1"} style={{fontWeight:"bold",color:"#FC8434",marginTop:"5px"}}>
                                                {t("See building on map")}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                     <Box style={{width:"90%",marginBottom:"30px",marginTop:"10px"}}>
                        <CloseButton className="RegisterRentPayment" variant="contained" fullWidth size="large" onClick={()=> this.props.history.push("/AddRentPayment")}>
                            {t("Register Rent Payment")}
                        </CloseButton>
                    </Box>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(RentPayments))

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
