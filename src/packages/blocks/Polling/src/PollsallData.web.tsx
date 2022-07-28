// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import "./Polling.web.css"
import DOMPurify from 'dompurify'
import {pollandsurvey} from "./assets"
import {
  Container,
  Typography,
  Link,
  FormControl,
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
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";

export default class PollsallData extends PollingController {
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
              
                <Container>
                    <Box className="navigation">
                        <Box>
                            <Typography variant="body1" >
                            My Dashboard / Poll and surveys / <Box component="span" style={{color: "blue"}}>Polls</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Poll / Surveys</Typography>
                        </Box>
                        <Box>
                            <FormControl className='YearMain'>
                                <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange} >
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
                            <Link href="/CreatePolls">
                                <Box className="CreatePSsingle">
                                    <Box sx={{ml:1, mb:2}}>
                                    <img src={pollandsurvey} alt="pollandsurvey" />
                                    </Box>
                                    <Typography  className="CreatePSHeading">Create a New Poll</Typography> 
                                </Box>
                            </Link>
                        </Grid> 

                        {this.state.allPollsData.length ? 
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
                                                <Typography variant="body2" className="Dec-wrap"
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
                                                />
                                                    {/* {data.description}
                                                </Typography> */}
                                            </Box>
                                            <Box className="EventsIconsText">
                                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                                <Typography variant="body2">{data.start_date} - {data.end_date} </Typography>
                                            </Box>
                                            <Divider style={{marginTop:10, marginRight:10}}/>
                                            <Box className="EventsIconsData">
                                                <Box className="EventsIconsDataBox">
                                                    <AccessTimeOutlinedIcon style={{color: "#ff8100"}}/>
                                                    <Typography variant="body2">{data.awaited}</Typography>
                                                </Box>
                                                <Box className="EventsIconsDataBox">
                                                    <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                                    <Typography variant="body2">{data.completed_answers}</Typography>
                                                </Box>
                                                <Box className="EventsIconsDataBox">
                                                    <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                                    <Typography variant="body2">{data.rejected_answers}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    </>
                                )
                            })

                            : 
                            null
                        }

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
     </>
      );
  }
}

// Customizable Area End
