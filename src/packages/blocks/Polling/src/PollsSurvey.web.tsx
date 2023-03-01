import * as React from "react";
// @ts-ignore
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
import PollsSurveyController, {
  Props
} from "./PollsSurveyController";
import "./Polling.web.css"
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import './style.css'
import {withTranslation} from "react-i18next";


class PollsSurvey extends PollsSurveyController {
  constructor(props: Props) {
    super(props);
  }

  render() {
   //@ts-ignore
   const {t} = this.props
    return (
        <>

    {/* <Grid container spacing={2} className="auth-container"> */}
      <Grid item xs={12} md={12} className="auth-cols">
          <Grid container style={{ margin: '1rem', width: '90%' }} >
              <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                  <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                      <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                      <p className='bold-text' style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                          {t("Poll / Survey")}
                      </p>
                  </Box>
                  <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                      <IconButton onClick={this.handleOpenFilterModal} style={{padding:"0px"}}>
                          <img src={filterIcon} />
                      </IconButton>
                  </Box>
              </Grid>
          </Grid>
        <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
            <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', width:'90%'}}>
              <Grid item xs={12} className="AppBarbox">
                <AppBar position="static" color="transparent">
                      <Grid>
                        <StyledTabs
                        value={this.state.TabValue}
                        onChange={this.handleTabChange}
                        className="TabsList"
                        >
                              <Tab label={t("Live Survey/Polls")}
                                  style={{
                                  backgroundColor: "#2B6FEC",
                                  borderRadius: '5rem',
                                  marginBottom: 14,
                                  maxWidth:"130px",
                                  boxShadow: "none",
                                  color: "#F7F7FC",
                                  fontWeight: 600,
                                  fontSize: '.8rem',
                                  marginTop: 30,
                                  textTransform:"initial"
                                  }}
                              />
                              <Tab label={t("Old Survey/Polls")}
                                  style={{
                                    backgroundColor: "#2B6FEC",
                                    borderRadius: '5rem',
                                    marginBottom: 14,
                                    maxWidth:"130px",
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
                  {/*@ts-ignore*/}
                <TabPanel value={this.state.TabValue} index={0}>
                {this.state.livePollsData?.length ? this.state.livePollsData?.map((item:any) => {
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
                              style={{boxShadow:"4px 0px 14px #ececec"}}
                              onClick={() => this.handlePollSurveyNavigation(item?.attributes?.flag,item.attributes.type_name,item.id)}
                          >
                              <Box style={{minWidth:"100%"}}>
                                  <Box style={{textTransform:"capitalize"}}><p style={{color:"rgba(24,29,37,0.5)",fontSize:"14px"}}>{item.attributes.type_name}</p></Box>
                                  <Box marginTop='0.8rem' className="bold-text textwrap"><h4>{item.attributes.title}</h4></Box>
                                  <Box marginTop='0.7rem' style={{width:"95%",overflow:"hidden",color:"#666666"}}>
                                      <p
                                          style={{color:"666666",fontSize:"14px"}}
                                          className="textwrap"
                                          dangerouslySetInnerHTML={
                                              { __html: DOMPurify.sanitize(item.attributes.description) }
                                          }
                                      ></p>
                                  </Box>
                                  <Box marginTop='0.7rem'><Typography style={{color:"#181d25",fontSize:"15px"}}>Building : {item.attributes.building_name}</Typography></Box>
                                  <Divider style={{marginTop:'0.6rem', marginRight:2}}/>
                                  <Box display='flex' justifyContent='space-between' marginTop='1rem' marginBottom=".5rem">
                                      <Box className="EventsIconsDataBox">
                                          <DateRangeOutlinedIcon style={{color: "#054c94",}}/>
                                          <p style={{color:"#181d25",fontSize:"15px"}}>{item.attributes.end_date}</p>
                                      </Box>
                                      {
                                          !item.attributes.flag ?
                                              <Box className="EventsIconsText">
                                                  {
                                                      item.attributes.status == "ongoing" &&
                                                      <Typography variant="body2" className={"statusOngoingRed"} style={{padding:"2px 15px"}}>{item.attributes.status}</Typography>
                                                  }
                                                  {
                                                      item.attributes.status == "completed" &&
                                                      <Typography variant="body2" className={"statusOngoingGreen"} style={{padding:"2px 15px"}}>{item.attributes.status}</Typography>
                                                  }
                                              </Box> :
                                              <Box className="EventsIconsText">
                                                  <Typography variant="body2" className={"statusOngoingGreen"} style={{padding:"2px 15px"}}>Submitted</Typography>
                                              </Box>
                                      }
                                  </Box>
                              </Box>
                          </Box>
                      )
                  }
                })
                :
                <Box style={{minHeight:"500px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Typography color="textSecondary" className="bold-text">No Polls/Survey Found!</Typography>
                </Box>
                }

                </TabPanel>
              </Grid>
              <Grid xs={12}>
                  {/*@ts-ignore*/}
                <TabPanel value={this.state.TabValue} index={1}>
                    {this.state.oldPollsData?.length ? this.state.oldPollsData?.map((items:any) => {
                      return(
                        <Box
                          display="flex"
                          justifyContent='space-between'
                          alignItems="center"
                          borderRadius="15px"
                          bgcolor="white"
                          marginTop='2rem'
                          padding='1rem'
                          style={{boxShadow:"4px 0px 14px #ececec"}}
                          key={items.id}
                          onClick={() => this.handlePollSurveyNavigationOld(items?.attributes?.flag,items.attributes.type_name,items.id)}
                        >
                          <Box style={{minWidth:"100%"}}>
                            <Box style={{textTransform:"capitalize"}}><p style={{color:"rgba(24,29,37,0.5)",fontSize:"14px"}}>{items.attributes.type_name}</p></Box>
                            <Box marginTop='0.8rem' className="bold-text textwrap" style={{width:"95%",overflow:"hidden"}}><h4>{items.attributes.title}</h4></Box>
                            <Box marginTop='0.7rem' style={{width:"95%",overflow:"hidden",color:"#666666"}}>
                              <p
                                  style={{color:"666666",fontSize:"14px"}}
                                  className="textwrap"
                                  dangerouslySetInnerHTML={
                                    { __html: DOMPurify.sanitize(items.attributes.description) }
                                  }
                              >
                              </p>
                            </Box>
                            <Box marginTop='0.7'><Typography  style={{color:"#181d25",fontSize:"15px"}}>Building : {items.attributes.building_name}</Typography></Box>
                            <Divider style={{marginTop:'0.6rem', marginRight:2}}/>
                            <Box display='flex' justifyContent='space-between' marginTop='0.6rem' marginBottom=".5rem">
                                <Box className="EventsIconsDataBox">
                                    <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                    <p  style={{color:"#181d25",fontSize:"15px"}}>{items.attributes.end_date}</p>
                                </Box>
                                {
                                    !items.attributes.flag ?
                                        <Box className="EventsIconsText">
                                            {
                                                items.attributes.status == "ongoing" &&
                                                <Typography variant="body2" className={"statusOngoingRed"} style={{padding:"2px 15px"}}>{items.attributes.status}</Typography>
                                            }
                                            {
                                                items.attributes.status == "completed" &&
                                                <Typography variant="body2" className={"statusOngoingGreen"} style={{padding:"2px 15px"}}>{items.attributes.status}</Typography>
                                            }
                                        </Box> :
                                        <Box className="EventsIconsText">
                                            <Typography variant="body2" className={"statusOngoingGreen"} style={{padding:"2px 15px"}}>Submitted</Typography>
                                        </Box>
                                }
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                    :
                    <Box style={{minHeight:"500px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <Typography color="textSecondary" className="bold-text">No Polls/Survey Found!</Typography>
                    </Box>
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
                      <Box style={{width:"100%",height:"auto",backgroundColor:"white",borderRadius:"10px 10px 0px 0px",position:"absolute",left:0,bottom:0}}>
                        <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                            <Box style={{margin:"15px"}}>
                                <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
                                    <Typography variant="h6" style={{fontWeight:"bold"}}>{t("Filter")}</Typography>
                                    <Button style={{color:"darkgray"}} onClick={() => this.setState({selectedFilter:""})}>{t("Clear All")}</Button>
                                </Box>
                                <Box style={{marginTop:"15px"}}>
                                    <Typography variant="body1" style={{fontWeight:"bold"}}>{t("Type")}</Typography>
                                    <FormControl component="fieldset" style={{width:"100%"}}>
                                        <RadioGroup row aria-label="position" name="filter" style={{display:'flex',flexDirection:"column",textAlign:"left"}}>
                                            <FormControlLabel
                                                value="poll"
                                                control={<Radio color="primary" />}
                                                checked={this.state.selectedFilter === "poll"}
                                                label={t("Poll")}
                                                // @ts-ignore
                                                onChange={(e)=> this.setState({selectedFilter:e.target.value})}
                                                labelPlacement="start"
                                                style={{width:"100%",display:"flex",justifyContent:'space-between',margin:"5px"}}
                                            />
                                            <FormControlLabel
                                                value="survey"
                                                control={<Radio color="primary" />}
                                                label={t("Survey")}
                                                checked={this.state.selectedFilter === "survey"}
                                                // @ts-ignore
                                                onChange={(e)=> this.setState({selectedFilter:e.target.value})}
                                                labelPlacement="start"
                                                style={{width:"100%",display:"flex",justifyContent:'space-between',margin:"5px"}}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Divider/>
                            <Box style={{margin:"15px",marginTop:"20px"}}>
                                <Button onClick={this.applyFilter} variant="contained" color="primary" fullWidth style={{borderRadius:"50px",backgroundColor:"2b6fed",height:"40px"}}>{t("Apply")}</Button>
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

// @ts-ignore
export default withTranslation()(withRouter(PollsSurvey))

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
