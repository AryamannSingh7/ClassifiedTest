import * as React from "react";
// custom components
import {
    Grid, Box,Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {Share} from "../../CollectTransactionFees/src/assets"
import {share2} from "./assets"
import RentDetailsController, {
  Props
} from "./RentDetailsController";
import './style.css'
import {withTranslation} from "react-i18next";

class ReceiptDetails extends RentDetailsController{
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
                          <ArrowBackIcon className="backButtonRegisterRent" onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("Rent Invoice")} : Month Date
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Grid item xs={12} style={{marginTop:"1.5rem"}}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="10px"
                                bgcolor="white"
                                padding='1.5rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                            >
                                <Grid container spacing={1} >
                                    <Grid xs={12}>
                                        <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                            <Typography variant={"subtitle2"}>
                                                {t("Due on")} 23 April 2022
                                            </Typography>
                                            <Typography variant="subtitle2" className="paymentStatusRed">
                                                Due
                                            </Typography>
                                        </Box>
                                    </Grid>
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
                                    <Grid item xs={6} style={{marginTop:"8px"}}>
                                        <Typography variant={"subtitle2"} >
                                            {t("Rent Amount")}
                                        </Typography>
                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                            SR500
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"8px"}}>
                                        <Typography variant={"subtitle2"} >
                                            {t("Due Amount")}
                                        </Typography>
                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                            SR500
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid xs={12} style={{display:'flex',justifyContent:'center',position:"absolute",bottom:"10px",width:"90%",flexDirection:"column"}}>
                            <Grid container spacing={2} style={{width:"95%",display:'flex',alignItems:'center'}}>
                                <Grid item xs={10}>
                                    <Button2 fullWidth>
                                        {t("DOWNLOAD RECEIPT")}
                                    </Button2>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <img src={share2} width="55px" height="50px"/>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{width:"95%",display:'flex',alignItems:'center',marginTop:"10px"}}>
                                <Grid item xs={10}>
                                    <Button1 fullWidth>
                                        {t("DOWNLOAD Invoice")}
                                    </Button1>
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
export default withTranslation()(withRouter(ReceiptDetails))

const Button1 = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        marginRight:"10px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

const Button2 = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#FC8434",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        marginRight:"10px"
    },
}))(Button);


// Customizable Area End
