// Customizable Area Start
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

export default class SurveyGrid extends PollingController {
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
                  My Dashboard / Poll and surveys / <Box component="span" style={{color: "blue"}}>Surveys</Box>
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
        <Grid container spacing={4} style={{marginTop: 15}}>
              <Grid item sm={4}>
                  <Box className="CreatePSsingle">
                      <Box sx={{ml:1, mb:2}} className="CreatePSIcons"><PersonOutlineIcon/></Box>
                      <Typography  className="CreatePSHeading">Create a New Survey</Typography> 
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
