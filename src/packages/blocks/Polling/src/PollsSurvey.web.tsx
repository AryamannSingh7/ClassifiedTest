//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import TabPanel from "./TabPanel.web";
import { Building1, Building_Logo,filterIcon } from "./assets";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PollingController, {
  Props
} from "./PollingController.tsx";
import "./Polling.web.css"
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import './style.css'


class PollsSurvey extends PollingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
        <>

    {/* <Grid container spacing={2} className="auth-container"> */}
      <Grid item xs={12} md={12} className="auth-cols">

        <Grid container style={{ margin: '1rem', width: '90%' }} >
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
              <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                  <ArrowBackIcon onClick={() => window.history.back()} />
                  <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                      Poll / Survey
                  </p>
              </Box>
              <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                  <IconButton onClick={this.handleOpenFilterModal}>
                    <img src={filterIcon} />
                  </IconButton>
              </Box>
          </Grid>
        </Grid>

        <Box style={{background: "#E5ECFF",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
            <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', width:'90%'}}>
              <Grid item xs={12} className="AppBarbox">
                <AppBar position="static" color="transparent">
                      <Grid>
                        <StyledTabs
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
                                  fontSize: '.8rem',
                                  marginTop: 30,
                                  textTransform:"initial"
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
                                    fontSize: '.8rem',
                                    marginTop: 30,
                                    textTransform:"initial"
                                  }}
                              />
                        </StyledTabs>
                      </Grid>
                </AppBar>
              </Grid>
            </Grid>
            <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', marginBottom:'1rem',width: '90%' }}>
              <Grid xs={12}>
                <TabPanel value={this.state.TabValue} index={0}>
                  {/*<Box*/}
                  {/*  display="flex"*/}
                  {/*  justifyContent='space-between'*/}
                  {/*  alignItems="center"*/}
                  {/*  borderRadius="15px"*/}
                  {/*  bgcolor="white"*/}
                  {/*  marginTop='2rem'*/}
                  {/*  padding='1rem'*/}
                  {/*>*/}
                  {/*  <Box style={{minWidth:"100%"}}>*/}
                  {/*    <Box marginTop='1rem'><p>Survey</p></Box>*/}
                  {/*    <Box marginTop='1rem'><h4>Event Planning Survey</h4></Box>*/}
                  {/*    <Box marginTop='0.4rem'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quis! Eum exercitationem</p>*/}
                  {/*    </Box>*/}
                  {/*    <Box marginTop='1rem'><p style={{color:"black"}}>Building: Building-1</p></Box>*/}
                  {/*    <Divider style={{marginTop:'0.6rem', marginRight:10}}/>*/}
                  {/*    <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>*/}
                  {/*        <Box className="EventsIconsDataBox">*/}
                  {/*            <DateRangeOutlinedIcon style={{color: "#054c94"}}/>*/}
                  {/*            <p style={{color:"black"}}>14-07-2022</p>*/}
                  {/*        </Box>*/}
                  {/*        <Box className="EventsIconsText">*/}
                  {/*            <p className="statusCompleted" style={{fontWeight: 600}}>Submitted</p>*/}
                  {/*        </Box>*/}
                  {/*    </Box>*/}
                  {/*  </Box>*/}
                  {/*</Box>*/}

                {this.state.livePollsData?.length ? this.state.livePollsData?.map((item) => {
                  console.log("ITEMS",this.item?.attributes?.flag)
                  if(item.attributes.status !== "upcoming"){
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
                              onClick={() => item?.attributes?.flag ? this.props.history.push("/PollVoteView?id="+item.id) : this.props.history.push("/SubmitPoll?id="+item.id)}
                          >
                              <Box style={{minWidth:"100%"}}>
                                  <Box marginTop='1rem'><p>Poll</p></Box>
                                  <Box marginTop='1rem'><h4>{item.attributes.title}</h4></Box>
                                  <Box marginTop='0.4rem' style={{width:"95%",overflow:"hidden"}}>
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
                                          {
                                              item.attributes.status == "ongoing" &&
                                              <Typography variant="body2" className={"statusOngoingRed"}>{item.attributes.status}</Typography>
                                          }
                                          {
                                              item.attributes.status == "completed" &&
                                              <Typography variant="body2" className={"statusOngoingGreen"}>{item.attributes.status}</Typography>
                                          }
                                      </Box>
                                  </Box>
                              </Box>
                          </Box>
                      )
                  }
                })
                : null
                }

                </TabPanel>
              </Grid>
              <Grid xs={12}>
                <TabPanel value={this.state.TabValue} index={1}>
                    {/*<Box*/}
                    {/*  display="flex"*/}
                    {/*  justifyContent='space-between'*/}
                    {/*  alignItems="center"*/}
                    {/*  borderRadius="15px"*/}
                    {/*  bgcolor="white"*/}
                    {/*  marginTop='2rem'*/}
                    {/*  padding='1rem'*/}
                    {/*>*/}
                    {/*  <Box style={{minWidth:"100%"}}>*/}
                    {/*    <Box marginTop='1rem'><p>Survey</p></Box>*/}
                    {/*    <Box marginTop='1rem'><h4>Event Planning Survey</h4></Box>*/}
                    {/*    <Box marginTop='0.4rem'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quis! Eum exercitationem</p>*/}
                    {/*    </Box>*/}
                    {/*    <Box marginTop='1rem'><p style={{color:"black"}}>Building: Building-1</p></Box>*/}
                    {/*    <Divider style={{marginTop:'0.6rem', marginRight:10}}/>*/}
                    {/*    <Box display='flex' justifyContent='space-between' marginTop='0.6rem'>*/}
                    {/*        <Box className="EventsIconsDataBox">*/}
                    {/*            <DateRangeOutlinedIcon style={{color: "#054c94"}}/>*/}
                    {/*            <p style={{color:"black"}}>14-07-2022</p>*/}
                    {/*        </Box>*/}
                    {/*        <Box className="EventsIconsText">*/}
                    {/*            <p className="statusOngoing" style={{fontWeight: 600}}>Ongoing</p>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}
                    {/*  </Box>*/}
                    {/*</Box>*/}

                    {this.state.oldPollsData?.length ? this.state.oldPollsData?.map((items) => {
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
                          onClick={() => this.props.history.push("/PollVoteView?id="+items.id)}
                        >
                          <Box style={{minWidth:"100%"}}>
                            <Box marginTop='1rem'><p>Poll</p></Box>
                            <Box marginTop='1rem' style={{width:"95%",overflow:"hidden"}}><h4>{items.attributes.title}</h4></Box>
                            <Box marginTop='0.4rem' >
                              <p
                                  dangerouslySetInnerHTML={
                                    { __html: DOMPurify.sanitize(items.attributes.description) }
                                  }
                                  style={{width:"95%",overflow:"hidden"}}
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
                                    {
                                        items.attributes.status == "ongoing" &&
                                        <Typography variant="body2" className={"statusOngoingRed"}>{items.attributes.status}</Typography>
                                    }
                                    {
                                        items.attributes.status == "completed" &&
                                        <Typography variant="body2" className={"statusOngoingGreen"}>{items.attributes.status}</Typography>
                                    }
                                </Box>
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                    : null
                    }
                </TabPanel>
              </Grid>
            </Grid>
        </Box>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className="modalStyle"
              // @ts-ignore
              open={this.state.filterModal}
              onClose={this.handleCloseFilterModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
          >
              {/*@ts-ignore*/}
              <Fade in={this.state.filterModal}>
                  <div>
                      <Box style={{width:"100%",minHeight:"50%",backgroundColor:"white",borderRadius:"10px 10px 0px 0px",position:"absolute",left:0,bottom:0}}>
                        <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                            <Box style={{margin:"15px"}}>
                                <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
                                    <Typography variant="h6" style={{fontWeight:"bold"}}>Filter</Typography>
                                    <Button style={{color:"darkgray"}}>Clear All</Button>
                                </Box>
                                <Box style={{marginTop:"15px"}}>
                                    <Typography variant="body1" style={{fontWeight:"bold"}}>Type</Typography>
                                    <FormControl component="fieldset" style={{width:"100%"}}>
                                        <RadioGroup row aria-label="position" name="filter" style={{display:'flex',flexDirection:"column",textAlign:"left"}}>
                                            <FormControlLabel
                                                value="poll"
                                                control={<Radio color="primary" />}
                                                label="Poll"
                                                labelPlacement="start"
                                                style={{width:"100%",display:"flex",justifyContent:'space-between',margin:"5px"}}
                                            />
                                            <FormControlLabel
                                                value="survey"
                                                control={<Radio color="primary" />}
                                                label="Survey"
                                                labelPlacement="start"
                                                disabled
                                                style={{width:"100%",display:"flex",justifyContent:'space-between',margin:"5px"}}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box style={{margin:"15px",marginTop:"50px"}}>
                                <Button onClick={this.handleCloseFilterModal} variant="contained" color="primary" fullWidth style={{borderRadius:"50px"}}>Apply</Button>
                            </Box>
                        </Box>

                      </Box>
                  </div>
              </Fade>
          </Modal>
      </Grid>

        {/* <Grid item xs={12} md={5} className="auth-cols">
          <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
            <img src={Building1.default} className="building-logo" alt="" />
          </Box>
        </Grid>

      </Grid> */}
      </>
    );
  }
}
export default withRouter(PollsSurvey)

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
