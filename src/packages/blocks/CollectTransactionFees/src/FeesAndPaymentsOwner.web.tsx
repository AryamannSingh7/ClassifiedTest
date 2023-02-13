import * as React from "react";
// custom components
import {
    Grid, Box,Typography,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withRouter } from 'react-router';
import FeesAndPaymentController, {
  Props
} from "./FeesAndPaymentController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class FishAndPaymentOwner extends FeesAndPaymentController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1.1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1.1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1.1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                              {t("Budget")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="14px"
                                bgcolor="white"
                                marginTop='1.4rem'
                                padding='1.4rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 1px"}}
                                onClick={()=>this.props.history.push("/BuildingBudget")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            {t("Review Building Budget")}
                                        </Typography>
                                        <ArrowForwardIosIcon fontSize="small"/> 
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}> 
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="14px"
                                bgcolor="white"
                                marginTop='.4rem'
                                padding='1.4rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 1px"}}
                                onClick={()=>this.props.history.push("/MyManagementFee")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            {t("Review Management fee")}
                                        </Typography>
                                        <ArrowForwardIosIcon fontSize="small"/>
                                    </Box>
                                
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}> 
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="14px"
                                bgcolor="white"
                                marginTop='.4rem'
                                padding='1.4rem'
                                style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 1px"}}
                                onClick={()=>this.props.history.push("/BudgetSpending")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            {t("View Budget Spending")}
                                        </Typography>
                                        <ArrowForwardIosIcon fontSize="small"/>
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
export default withTranslation()(withRouter(FishAndPaymentOwner))
// Customizable Area End
