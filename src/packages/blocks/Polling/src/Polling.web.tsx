//@ts-nocheck
//@ts-ignore

import React from "react";
import "./Polling.web.css"
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
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";

export default class Polling extends PollingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return ( 
      <>
      <Container>
          <Box className="navigation">
              <Box>
                  <Typography variant="body1" >
                  My Dashboard / <Box component="span" style={{color: "blue"}}>Poll and surveys</Box>
                  </Typography>
                  <Typography variant="h5" className="subHeading">Poll / Surveys</Typography>
              </Box>
              <Box>
                  <FormControl className='YearMain'>
                      <NativeSelect className='yearSelection' value={this.state.Year} onChange={this.handleChange} displayEmpty>
                           <option value="">This Week</option>
                              <option value={10}>Ten</option>
                              <option value={20}>Twenty</option>
                              <option value={30}>Thirty</option>
                      </NativeSelect>
                  </FormControl>
              </Box>
          </Box>
          <Grid container spacing={4} style={{marginTop: 15}}>
              <Grid item sm={4}>
                  <Box className="CreatePS">
                      <Box sx={{ml:1, mb:2}} className="CreatePSIcons"><PersonOutlineIcon/></Box>
                      <Typography  className="CreatePSHeading">Create a New Polls/Survey</Typography> 
                  </Box>
              </Grid> 

              <Grid item sm={4}>
                  <Box className="Cards">
                      <Box sx={{ml:1, mb:2}} className="CardsIcons"><PersonOutlineIcon/></Box>
                      <Typography className="subHeading">Polls Created</Typography>
                      <Box className="bottomTwoSpan">
                          <Typography variant="body2" className="bottomColor">344</Typography>  
                      </Box> 
                      <Box className="bottomTwoSpan">
                        <Typography variant="body2">Last poll created on 12-02-2022</Typography> 
                      </Box> 
                  </Box>
              </Grid>

              <Grid item sm={4}>
                  <Box className="Cards">
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
                        <Typography variant="body2" className="statusCompleted">Completed</Typography>
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
     </>
      );
  }
}

// Customizable Area End
