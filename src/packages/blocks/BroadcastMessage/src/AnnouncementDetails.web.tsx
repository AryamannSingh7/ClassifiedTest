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
import AnnouncementController, {
  Props
} from "./AnnouncementController";
import './style.css';

const data = {
    title:"Swimming Pool will be closed till 28/03/22",
    description:"Due to increasing COVID 19 cases, we have decided to close swimming pool for next 5 days. You can use it from 29/03/2022 onwards. "
}

class Announcement extends AnnouncementController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              Complex Name
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#E5ECFF",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'space-between'}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Grid item xs={12} style={{marginTop:"1.5rem"}}>
                            <Box>
                                <Typography variant="h6" style={{fontWeight:"bold"}}>
                                    {data.title}
                                </Typography>
                            </Box>
                            <Box style={{display:'flex',justifyContent:"center",marginTop:"15px"}}>
                                {
                                    console.log("exampleImg",exampleImg)
                                }
                                <img src={exampleImg.default} width="100%" style={{borderRadius:"15px"}}/>
                            </Box>
                            <Box style={{marginTop:"1.5rem"}}>
                                <Typography variant="body2" style={{fontSize:"18px"}}>
                                    {data.description}
                                </Typography>
                            </Box>
                            <Box style={{backgroundColor:"white",borderRadius:"10px",marginTop:"20px"}}>
                                <Box style={{padding:"1rem"}}>
                                    <Grid container spacing={1} style={{marginTop:"10px",marginBottom:"5px"}}>
                                        <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                                            <Box>
                                                <img src={user} height="20px" style={{marginRight:"10px"}} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" color="textSecondary" >Announce By</Typography>
                                                <Typography variant="subtitle2">Mr. Ali Khan</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                                            <Box>
                                                <img src={calendar} height="20px" style={{marginRight:"10px"}} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" color="textSecondary" >Announced On</Typography>
                                                <Typography variant="subtitle2" >15/03/2022 14:21</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large">
                            Close
                        </CloseButton>
                    </Box>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withRouter(Announcement)

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