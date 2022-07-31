//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
  Grid, Box, Divider, AppBar, Tabs, Tab, Link
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withRouter } from 'react-router';
import TabPanel from "./TabPanel.web";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Building1, Building_Logo } from "./assets";
import PollingController, {
  Props
} from "./PollingController.tsx";
import "./Polling.web.css"


class PollsSurvey extends PollingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log("livePollsData++++++!!!!!!!!!!!!!!!!!!!+",this.state.livePollsData);
    console.log("oldPollsData-------!!!!!!!!!!!!!!!!!!!+",this.state.oldPollsData);
    console.log("this.state.pollPreviewAnswer2222222222222", this.state.pollPreviewAnswer)
    return (
        <>
    
    {/* <Grid container spacing={2} className="auth-container"> */}
      <Grid item xs={12} md={7} className="auth-cols">

        <Grid container style={{ margin: '1rem', width: '90%' }} >
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}} >
            <ArrowBackIcon onClick={() => window.history.back()} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              Poll / Survey
            </p>
          </Grid>
        </Grid>

        <Box style={{background: "#E5ECFF"}} >

            <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', width:'90%'}}>
              <Grid item xs={12} className="AppBarbox">
                <AppBar position="static" color="transparent">
                      <Grid>
                        <Tabs
                        value={this.state.TabValue}
                        onChange={this.handleTabChange}
                        className="TabsList"
                        >
                              <Tab label="Live Survey/Polls"
                                  style={{
                                  backgroundColor: "#2B6FEC",
                                  borderRadius: '5rem',
                                  marginBottom: 14,
                                  boxShadow: "none",
                                  color: "#F7F7FC",
                                  fontWeight: 600,
                                  fontSize: '1rem',
                                  marginTop: 30,
                                  }}
                              />
                              <Tab label="Old Survey/Polls"
                                  style={{
                                    backgroundColor: "#2B6FEC",
                                    borderRadius: '5rem',
                                    marginBottom: 14,
                                    boxShadow: "none",
                                    color: "#F7F7FC",
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    marginTop: 30
                                  }}
                              />
                        </Tabs>
                      </Grid>
                </AppBar>
              </Grid>
            </Grid>
            <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', marginBottom:'1rem',width: '90%' }}>
              <Grid xs={12}>
                <TabPanel value={this.state.TabValue} index={0}>
                  <Box
                    display="flex"
                    justifyContent='space-between'
                    alignItems="center"
                    borderRadius="15px"
                    bgcolor="white"
                    marginTop='2rem'
                    padding='1rem'
                  >
                    <Box style={{minWidth:"100%"}}>
                      <Box marginTop='1rem'><p>Survey</p></Box>
                      <Box marginTop='1rem'><h4>Event Planning Survey</h4></Box>
                      <Box marginTop='0.4rem'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quis! Eum exercitationem</p>
                      </Box>
                      <Box marginTop='1rem'><p style={{color:"black"}}>Building: Building-1</p></Box>
                      <Divider style={{marginTop:'0.6rem', marginRight:10}}/>
                      <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>
                          <Box className="EventsIconsDataBox">
                              <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                              <p style={{color:"black"}}>14-07-2022</p>
                          </Box>
                          <Box className="EventsIconsText">
                              <p className="statusCompleted" style={{fontWeight: 600}}>Submitted</p>
                          </Box>
                      </Box>
                    </Box>
                  </Box>

                {this.state.livePollsData?.length ? this.state.livePollsData?.map((item) => {

                  return(
                    <Box
                    display="flex"
                    justifyContent='space-between'
                    alignItems="center"
                    borderRadius="15px"
                    bgcolor="white"
                    marginTop='2rem'
                    padding='1rem'
                    key={item.id}
                    onClick={() => this.props.history.push("/SubmitPoll?id="+item.id)}
                    >
                      <Box style={{minWidth:"100%"}}>
                        <Box marginTop='1rem'><p>Poll</p></Box>
                        <Box marginTop='1rem'><h4>{item.attributes.title}</h4></Box>
                        <Box marginTop='0.4rem'>
                          <p
                            dangerouslySetInnerHTML={
                              { __html: DOMPurify.sanitize(item.attributes.description) }
                            }
                          ></p>
                        </Box>
                        <Box marginTop='1rem'><p style={{color:"black"}}>Building: {item.attributes.building_name}</p></Box>
                        <Divider style={{marginTop:'0.6rem', marginRight:10}}/>
                        <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>
                            <Box className="EventsIconsDataBox">
                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                <p style={{color:"black"}}>{item.attributes.end_date}</p>
                            </Box>
                            <Box className="EventsIconsText">
                                <p className="statusOngoing" style={{fontWeight: 600}}>{item.attributes.status}</p>
                            </Box>
                        </Box>
                      </Box>
                  </Box>
                  )

                })
                :

                <Box
                    display="flex"
                    justifyContent='space-between'
                    alignItems="center"
                    borderRadius="15px"
                    bgcolor="white"
                    marginTop='2rem'
                    padding='1rem'
                  >
                    <Box style={{minWidth:"100%"}}>
                      <Box marginTop='1rem'><p>Survey</p></Box>
                      <Box marginTop='1rem'><h4>Event Planning Survey</h4></Box>
                      <Box marginTop='0.4rem'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quis! Eum exercitationem</p>
                      </Box>
                      <Box marginTop='1rem'><p style={{color:"black"}}>Building: Building-1</p></Box>
                      <Divider style={{marginTop:'0.6rem', marginRight:10}}/>
                      <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>
                          <Box className="EventsIconsDataBox">
                              <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                              <p style={{color:"black"}}>14-07-2022</p>
                          </Box>
                          <Box className="EventsIconsText">
                              <p className="statusCompleted" style={{fontWeight: 600}}>Submitted</p>
                          </Box>
                      </Box>
                    </Box>
                  </Box>  
                }

                
                </TabPanel>
              </Grid>
              <Grid xs={12}>
                <TabPanel value={this.state.TabValue} index={1}>
                    <Box
                      display="flex"
                      justifyContent='space-between'
                      alignItems="center"
                      borderRadius="15px"
                      bgcolor="white"
                      marginTop='2rem'
                      padding='1rem'
                    >
                      <Box style={{minWidth:"100%"}}>
                        <Box marginTop='1rem'><p>Survey</p></Box>
                        <Box marginTop='1rem'><h4>Event Planning Survey</h4></Box>
                        <Box marginTop='0.4rem'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quis! Eum exercitationem</p>
                        </Box>
                        <Box marginTop='1rem'><p style={{color:"black"}}>Building: Building-1</p></Box>
                        <Divider style={{marginTop:'0.6rem', marginRight:10}}/>
                        <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>
                            <Box className="EventsIconsDataBox">
                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                <p style={{color:"black"}}>14-07-2022</p>
                            </Box>
                            <Box className="EventsIconsText">
                                <p className="statusOngoing" style={{fontWeight: 600}}>Ongoing</p>
                            </Box>
                        </Box>
                      </Box>
                    </Box>

                    {this.state.livePollsData?.length ? this.state.livePollsData?.map((items) => {
                      return(
                        <Box
                          display="flex"
                          justifyContent='space-between'
                          alignItems="center"
                          borderRadius="15px"
                          bgcolor="white"
                          marginTop='2rem'
                          padding='1rem'
                          key={items.id}
                          onClick={() => this.props.history.push("/SubmitPoll?id="+item.id)}
                        >
                          <Box style={{minWidth:"100%"}}>
                            <Box marginTop='1rem'><p>Poll</p></Box>
                            <Box marginTop='1rem'><h4>{items.attributes.title}</h4></Box>
                            <Box marginTop='0.4rem'>
                              <p
                              dangerouslySetInnerHTML={
                                { __html: DOMPurify.sanitize(items.attributes.description) }
                              }
                              >
                              </p>
                            </Box>
                            <Box marginTop='1rem'><p style={{color:"black"}}>Building: {items.attributes.building_name}</p></Box>
                            <Divider style={{marginTop:'0.6rem', marginRight:10}}/>
                            <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>
                                <Box className="EventsIconsDataBox">
                                    <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                    <p style={{color:"black"}}>{items.attributes.end_date}</p>
                                </Box>
                                <Box className="EventsIconsText">
                                    <p className="statusSkipped" style={{fontWeight: 600}}>
                                      {items.attributes.status}
                                    </p>
                                </Box>
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                    :
                    <Box
                      display="flex"
                      justifyContent='space-between'
                      alignItems="center"
                      borderRadius="15px"
                      bgcolor="white"
                      marginTop='2rem'
                      padding='1rem'
                    >
                      <Box style={{minWidth:"100%"}}>
                        <Box marginTop='1rem'><p>Survey</p></Box>
                        <Box marginTop='1rem'><h4>Event Planning Survey</h4></Box>
                        <Box marginTop='0.4rem'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quis! Eum exercitationem</p>
                        </Box>
                        <Box marginTop='1rem'><p style={{color:"black"}}>Building: Building-1</p></Box>
                        <Divider style={{marginTop:'0.6rem', marginRight:10}}/>
                        <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>
                            <Box className="EventsIconsDataBox">
                                <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                <p style={{color:"black"}}>14-07-2022</p>
                            </Box>
                            <Box className="EventsIconsText">
                                <p className="statusSkipped" style={{fontWeight: 600}}>Skipped</p>
                            </Box>
                        </Box>
                      </Box>
                    </Box>
                    }

                </TabPanel>
              </Grid>
            </Grid>
        </Box>
      </Grid>

        {/* <Grid item xs={12} md={5} className="auth-cols">
          <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
            <img src={Building1} className="building-logo" alt="" />
          </Box>
        </Grid>

      </Grid> */}
      </>
    );
  }
}
export default withRouter(PollsSurvey)


// Customizable Area End
