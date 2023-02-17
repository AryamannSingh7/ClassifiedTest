import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {building, calendar, exampleImg, user} from "./assets";
import AnnouncementDetailsController, {
  Props
} from "./AnnouncementDetailsController";
import './style.css';
import moment from "moment";
import {withTranslation} from "react-i18next";

const data = {
    title:"Swimming Pool will be closed till 28/03/22",
    description:"Due to increasing COVID 19 cases, we have decided to close swimming pool for next 5 days. You can use it from 29/03/2022 onwards. "
}

class Announcement extends AnnouncementDetailsController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    const complexName = localStorage.getItem("buildingName")
    //@ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {complexName || ""}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"93vh",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'space-between'}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Grid item xs={12} style={{marginTop:"1rem"}}>
                            <Box>
                                <Typography variant="h6" style={{fontWeight:"bold"}}>
                                    {this.state.AnnouncementDetails.title}
                                </Typography>
                            </Box>
                            {
                                this.state?.AnnouncementDetails?.image?.url &&
                                <Box style={{display:'flex',justifyContent:"center",marginTop:"10px"}}>
                                    <img src={this.state?.AnnouncementDetails?.image?.url} width="100%" style={{borderRadius:"15px"}}/>
                                </Box>
                            }
                            <Box style={{marginTop:"1rem"}}>
                                <Typography variant="body2" style={{fontSize:"18px"}}>
                                    {this.state.AnnouncementDetails.description}
                                </Typography>
                            </Box>
                            <Box style={{backgroundColor:"white",borderRadius:"10px",marginTop:"10px"}}>
                                <Box style={{padding:"0.8rem 1.2rem"}}>
                                    <Grid container spacing={2} style={{marginTop:"10px",marginBottom:"5px",display:"flex",alignItems:"flex-start"}}>
                                        <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                                            <Box style={{marginLeft:"5px"}}>
                                                <img src={user} height="23px" style={{marginRight:"10px"}} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" color="textSecondary" >{t("Announce By")}</Typography>
                                                <Typography variant="subtitle2">{this.state.AnnouncementDetails.announcement_by}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                                            <Box>
                                                <img src={calendar} height="20px" style={{marginRight:"10px"}} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" color="textSecondary" >{t("Announced On")}</Typography>
                                                <Typography variant="subtitle2" >
                                                    {moment(this.state.AnnouncementDetails.announcement_on,'DD/MM/YYYY').format("MMMM DD,YYYY")}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px"}}>
                        <CloseButton onClick={()=> window.history.back()} variant="contained" fullWidth size="large">
                            {t("Close")}
                        </CloseButton>
                    </Box>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(Announcement))

const StyledTabs = withStyles({
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            display:"none"
        }
    }
})((props:any) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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