import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import RentUnitListController, {
  Props
} from "./RentUnitListController";
import './style.css'
import {withTranslation} from "react-i18next";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class RentUnitLists extends RentUnitListController{
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
                          <ArrowBackIcon className="rentUnitBackBtn" onClick={() => window.history.back( )} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {this.state.buildingName}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        {
                            this.state.UnitListing.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                    <Box
                                        display="flex"
                                        className="rentUnitListBox"
                                        justifyContent='space-between'
                                        alignItems="center"
                                        borderRadius="15px"
                                        bgcolor="white"
                                        marginTop='1.5rem'
                                        padding='1.5rem'
                                        style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                        onClick={()=>this.props.history.push(`/UnitRentList/${item?.id}`)}
                                    >
                                        <Box style={{minWidth:"100%"}}>
                                            <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                <Box>
                                                    <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                        {item.attributes?.apartment_management?.apartment_name}
                                                    </Typography>
                                                </Box>
                                                <ArrowForwardIosIcon fontSize="small" style={{color:"#BFBFBF",fontSize:"25px"}}/>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                )
                            })
                        }
                    </Grid>
                    {
                        this.state?.UnitListing === "test" &&
                        <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                            <CloseButton className="RegisterRentPayment" variant="contained" fullWidth size="large" onClick={()=> this.props.history.push("/AddRentPayment")}>
                                {t("Register Rent Payment")}
                            </CloseButton>
                        </Box>
                    }
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(RentUnitLists))

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
