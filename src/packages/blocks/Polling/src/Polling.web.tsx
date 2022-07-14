// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"
import {
  Container,
  Typography,
  Link,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Divider from '@material-ui/core/Divider';
// Icons
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import Dashboard from "../../dashboard/src/Dashboard.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";

class Polling extends PollingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return ( 
      <>
    <Box style={{background: "#E5ECFF"}}>
        <DashboardHeader {...this.props}/>
      
        <Box style={{display: "flex"}}>
            
            <Grid item xs={3} md={3} sm={3} className="SideBar">
                <ChairmanSidebar {...this.props}/>
            </Grid>

            <Grid xs={9} md={9} sm={9} spacing={4} style={{paddingTop: 35}}>
            <Container className="link-decoration">
                <Box className="navigation">
                    <Box>
                        <Typography variant="body1" >
                        My Dashboard / <Box component="span" style={{color: "blue"}}>Poll and surveys</Box>
                        </Typography>
                        <Typography variant="h5" className="subHeading">Poll / Surveys</Typography>
                    </Box>
                    <Box>
                        <FormControl className='YearMain'>
                            <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange}>
                                <option value="">This Week</option>
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Box>
                <Grid container spacing={4} style={{marginTop: 15}} className="link-decoration">
                    <Grid item sm={4}>
                        <Box className="CreatePS" onClick={() => {  this.setState({ showDialog: true})}}>
                            <Box sx={{ml:1, mb:2}} className="CreatePSIcons"><PersonOutlineIcon/></Box>
                            <Typography  className="CreatePSHeading">Create a New Polls/Survey</Typography> 
                        </Box>
                    </Grid> 

                    <Dialog
                        open={this.state.showDialog}
                        onClose={() => this.setState({ showDialog: false })}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>Choose Options</DialogTitle>
                        <Box style={{ display: "flex", marginLeft: 50, marginRight: 50 }}>
                            <DialogActions>
                                <Button onClick={() => {
                                    this.setState({ showDialog: false})
                                    this.props.history.push("/CreatePolls")
                                }} variant='text'>
                                    <Box className="dialogOption">
                                        <Box sx={{ml:1, mb:2}} className="DialogIcons">
                                            <PersonOutlineIcon />
                                        </Box>
                                        <Typography variant="body2">Create Poll</Typography> 
                                    </Box>
                                </Button>
                                <Button onClick={() => {
                                    this.setState({ showDialog: false})
                                    this.props.history.push("/CreateSurveys")
                                }} variant='text'>
                                    <Box className="dialogOption">
                                        <Box sx={{ml:1, mb:2}} className="DialogIcons">
                                            <PersonOutlineIcon />
                                        </Box>
                                        <Typography variant="body2">Create Survey</Typography> 
                                    </Box>
                                </Button>
                            </DialogActions>
                        </Box>
                    </Dialog>

                    <Grid item sm={4}>
                        <Box className="Cards" onClick={() => this.props.history.push("/PollsallData")}>
                            <Box sx={{ml:1, mb:2}} className="CardsIcons"><PersonOutlineIcon/></Box>
                            <Typography className="subHeading">Polls Created</Typography>
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2" className="bottomColor">{this.state.totalPollsCount.polls_count}</Typography>  
                            </Box> 
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2">
                                    Last poll created on {this.state.totalPollsCount.last_poll_created_at}
                                </Typography> 
                            </Box> 
                        </Box>
                    </Grid>

                    <Grid item sm={4}>
                        <Box className="Cards" onClick={() => this.props.history.push("/CreateSurveys")}>
                            <Box sx={{ml:1, mb:2}} className="CardsIcons"><PersonOutlineIcon/></Box>
                            <Typography className="subHeading">Surveys Created</Typography>
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2" className="bottomColor">344</Typography>  
                            </Box> 
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2">Last Survey created on 12-02-2022</Typography> 
                            </Box> 
                        </Box>
                    </Grid>

                </Grid>

                <Box className="RecentItems">
                    <Typography className="Recenttitle">Recent Polls</Typography>
                    <Link href="/PollsallData" >
                        <Typography className="ViewAll">View All</Typography>
                    </Link>
                </Box>

                <Grid container spacing={4} style={{marginTop: 15, marginBottom:30}}>

                    {
                        this.state.allPollsData.map((data:any) => {
                            return(
                                <>
                                <Grid item sm={4} md={4} xs={4} key={data.id}>
                                    <Box className="EventsCards">
                                        <Box className="EventsIconsText">
                                            <Typography variant="body2" className="statusOngoing">{data.status}</Typography>
                                        </Box>
                                        <Box className="EventsIconsText">
                                            <Typography className="EventsTitle">{data.title}</Typography>
                                        </Box>
                                        <Box className="EventsIconsText">
                                            <Typography variant="body2">{data.description}</Typography>
                                        </Box>
                                        <Box className="EventsIconsText">
                                            <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                            <Typography variant="body2">{data.start_date} - {data.end_date} </Typography>
                                        </Box>
                                        <Divider style={{marginTop:10, marginRight:10}}/>
                                        <Box className="EventsIconsData">
                                            <Box className="EventsIconsDataBox">
                                                <DateRangeOutlinedIcon style={{color: "#ff8100"}}/>
                                                <Typography variant="body2">84</Typography>
                                            </Box>
                                            <Box className="EventsIconsDataBox">
                                                <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                                <Typography variant="body2">29</Typography>
                                            </Box>
                                            <Box className="EventsIconsDataBox">
                                                <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                                <Typography variant="body2">13</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                </>
                            )
                        })
                    }

                </Grid>

                <Box className="RecentItems">
                    <Typography className="Recenttitle">Recent Surveys</Typography>
                    <Typography className="ViewAll">View All</Typography>
                </Box>
                <Grid container spacing={4} style={{marginTop: 15, marginBottom:30}}>
                    <Grid item sm={4} md={4} xs={4}>
                        <Box className="EventsCards">
                            <Box className="EventsIconsText">
                                <Typography variant="body2" className="statusOngoing">Ongoing</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <Typography className="EventsTitle">Block W Parking</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <Typography variant="body2">To discuss new vehicle guidlines</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                <Typography variant="body2">05-08-2022 - 08-08-2022 </Typography>
                            </Box>
                            <Divider style={{marginTop:10, marginRight:10}}/>
                            <Box className="EventsIconsData">
                                <Box className="EventsIconsDataBox">
                                    <DateRangeOutlinedIcon style={{color: "#ff8100"}}/>
                                    <Typography variant="body2">84</Typography>
                                </Box>
                                <Box className="EventsIconsDataBox">
                                    <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                    <Typography variant="body2">29</Typography>
                                </Box>
                                <Box className="EventsIconsDataBox">
                                    <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                    <Typography variant="body2">13</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={4} md={4} xs={4}>
                        <Box className="EventsCards">
                            <Box className="EventsIconsText">
                                <Typography variant="body2" className="statusOngoing">Ongoing</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <Typography className="EventsTitle">Block W Parking</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <Typography variant="body2">To discuss new vehicle guidlines</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                <Typography variant="body2">05-08-2022 - 08-08-2022 </Typography>
                            </Box>
                            <Divider style={{marginTop:10, marginRight:10}}/>
                            <Box className="EventsIconsData">
                                <Box className="EventsIconsDataBox">
                                    <DateRangeOutlinedIcon style={{color: "#ff8100"}}/>
                                    <Typography variant="body2">84</Typography>
                                </Box>
                                <Box className="EventsIconsDataBox">
                                    <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                    <Typography variant="body2">29</Typography>
                                </Box>
                                <Box className="EventsIconsDataBox">
                                    <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                    <Typography variant="body2">13</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={4} md={4} xs={4}>
                        <Box className="EventsCards">
                            <Box className="EventsIconsText">
                                <Typography variant="body2" className="statusOngoing">Ongoing</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <Typography className="EventsTitle">Block W Parking</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <Typography variant="body2">To discuss new vehicle guidlines</Typography>
                            </Box>
                            <Box className="EventsIconsText">
                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                <Typography variant="body2">05-08-2022 - 08-08-2022 </Typography>
                            </Box>
                            <Divider style={{marginTop:10, marginRight:10}}/>
                            <Box className="EventsIconsData">
                                <Box className="EventsIconsDataBox">
                                    <DateRangeOutlinedIcon style={{color: "#ff8100"}}/>
                                    <Typography variant="body2">84</Typography>
                                </Box>
                                <Box className="EventsIconsDataBox">
                                    <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                    <Typography variant="body2">29</Typography>
                                </Box>
                                <Box className="EventsIconsDataBox">
                                    <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                    <Typography variant="body2">13</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </Grid>

        </Box>
    </Box>
    <Loader loading={this.state.loading} />
     </>
      );
  }
}

export default withRouter (Polling)

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
