import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { building,unit  } from "./assets";
import AnnouncementController, {
  Props
} from "./AnnouncementController";
import './style.css'

const data = [
    {
        id:"1",
        complexName:"Complex Name",
        buildingCount:"04",
        buildingName:"Building 1",
        unitNo:"304",
    },
    {
        id:"2",
        complexName:"Complex Name",
        buildingCount:"04",
        buildingName:"Building 2",
        unitNo:"304",
    },
    {
        id:"3",
        complexName:"Complex Name",
        buildingCount:"04",
        buildingName:"Building 3",
        unitNo:"304",
    }
]

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
                              Announcements
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#E5ECFF",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        {
                            data.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                        <Box
                                            display="flex"
                                            justifyContent='space-between'
                                            alignItems="center"
                                            borderRadius="15px"
                                            bgcolor="white"
                                            marginTop='1rem'
                                            padding='1rem'
                                            onClick={()=>this.props.history.push("/BuildingAnnouncement?id="+item.id)}
                                        >
                                            <Box style={{minWidth:"100%"}}>
                                                <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                    <Typography variant={"body2"} style={{fontWeight:"bold"}}>
                                                        {item.complexName}
                                                    </Typography>
                                                    <Typography variant={"body2"} className="countRed">
                                                        {item.buildingCount}
                                                    </Typography>
                                                </Box>
                                                <Grid container spacing={1} style={{marginTop:"10px",marginBottom:"5px"}}>
                                                    <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                                                        <Box>
                                                            <img src={building} height="16px" style={{marginRight:"10px"}} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle2" >Building Name</Typography>
                                                            <Typography variant="subtitle2" style={{fontWeight:"bold"}}>{item.buildingName}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={6} style={{display:'flex',alignItems:'center'}}>
                                                        <Box>
                                                            <img src={unit} height="16px" style={{marginRight:"10px"}} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle2" >Unit Number</Typography>
                                                            <Typography variant="subtitle2" style={{fontWeight:"bold"}}>{item.unitNo}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
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

// Customizable Area End
