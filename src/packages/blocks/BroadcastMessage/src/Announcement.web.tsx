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
import {withTranslation} from "react-i18next";

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
    //@ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p className='bold-text' style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("Announcements")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:"10px"}}>
                        {
                            this.state.buildingListing.length > 0 &&
                            this.state.buildingListing.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                        <Box
                                            display="flex"
                                            justifyContent='space-between'
                                            alignItems="center"
                                            borderRadius="15px"
                                            bgcolor="white"
                                            marginTop='1rem'
                                            padding='1.2rem 1.4rem'
                                            onClick={()=>this.manageRedirect(item.id,item.attributes.complex_name)}
                                        >
                                            <Box style={{minWidth:"100%"}}>
                                                <Box style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                                    <Typography className='bold-text' variant={"body2"} style={{fontWeight:"bold"}}>
                                                        {item.attributes.complex_name}
                                                    </Typography>
                                                    <Typography variant={"body2"} className="countRedAnnouncmenent">
                                                        {item.attributes.total_announcement}
                                                    </Typography>
                                                </Box>
                                                <Grid container spacing={1} style={{marginTop:"8px",marginBottom:"5px"}}>
                                                    <Grid xs={6} style={{display:'flex'}}>
                                                        <Box>
                                                            <img src={building} height="16px" style={{marginRight:"10px",marginTop:"5px"}} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle2" >{t("Building Name")}</Typography>
                                                            <Typography variant="subtitle2" style={{fontWeight:"bold"}}>{item.attributes.building_name}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid xs={6} style={{display:'flex',justifyContent:"flex-end"}}>
                                                        <Box>
                                                            <img src={unit} height="16px" style={{marginRight:"10px",marginTop:"5px"}} />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle2" >{t("Unit Number")}</Typography>
                                                            <Typography variant="subtitle2" style={{fontWeight:"bold"}}>{Array.isArray(item.attributes?.unit_number?.isArray || 0) ? item.attributes?.unit_number?.join(",") : item.attributes?.unit_number || 0}</Typography>
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

// Customizable Area End
