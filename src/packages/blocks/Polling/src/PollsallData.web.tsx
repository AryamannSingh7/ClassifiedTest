// Customizable Area Start

import React from "react";
import "./Polling.web.css"
// @ts-ignore
import DOMPurify from 'dompurify'
import {pollandsurvey, xmark, CheckMark, awated, Cardcalendar, allUsers} from "./assets"
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
import MenuItem from '@material-ui/core/MenuItem';


import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { Style } from "@material-ui/icons";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

class PollsallData extends PollingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
    const {t} = this.props
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
                            {t("My Dashboard")} / {t("Poll and surveys")} / <Box component="span" style={{color: "blue"}}>{t("Polls")}</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">{t("Poll / Surveys")}</Typography>
                        </Box>
                        <Box>
                            <FormControl className='YearMain'>
                                <NativeSelect className='yearSelection' disableUnderline value={this.state.Year} onChange={this.handleChange} >
                                    <option value="This Week">{t("This Week")}</option>
                                    <option value="This Month">{t("This Month")}</option>
                                    <option value="This Year">{t("This Year")}</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </Box>
                    <Grid container spacing={4} style={{marginTop: 15,marginBottom:20}} className="link-decoration">
                        <Grid item sm={6} md={4} xs={12}>
                            <Link
                            //@ts-ignore 
                            onClick={() => this.props.history.push("/CreatePolls")}>
                                <Box className="CreatePSsingle">
                                    <Box sx={{ml:1, mb:2}}>
                                    <img src={pollandsurvey} alt="pollandsurvey" />
                                    </Box>
                                    <Typography  className="CreatePSHeading">{t("Create a New Poll")}</Typography> 
                                </Box>
                            </Link>
                        </Grid> 

                        {this.state.allPollsData.length ? 
                            this.state.allPollsData.map((data:any) => {
                                return(
                                    <>
                                    <Grid item sm={6} md={4} xs={12} >
                                        <Box className="EventsCards"
                                        key={data.id}
                                        // @ts-ignore
                                        onClick={() => this.props.history.push("/PollDetails?id="+data.id)}
                                        >
                                            <Box className="EventsIconsText">
                                                {
                                                    data.status == "upcoming" &&
                                                    <Typography variant="body2" className={"statusOngoingBlue"}>{data.status}</Typography>
                                                }
                                                {
                                                    data.status == "ongoing" &&
                                                    <Typography variant="body2" className={"statusOngoingRed"}>{data.status}</Typography>
                                                }
                                                {
                                                    data.status == "completed" &&
                                                    <Typography variant="body2" className={"statusOngoingGreen"}>{data.status}</Typography>
                                                }
                                            </Box>
                                            <Box className="EventsIconsText">
                                                <Typography className="EventsTitle" style={{width:"95%"}}>{data.title}</Typography>
                                            </Box>
                                            <Box className="EventsIconsText" style={{width:"95%"}}>
                                                <p 
                                                className="textwrap"
                                                // style={{textOverflow:"ellipsis",overflow:"hidden", whiteSpace:"nowrap"}}
                                                dangerouslySetInnerHTML={
                                                    { __html: DOMPurify.sanitize(data.description) }
                                                }
                                                
                                                >
                                                </p> 
                                            </Box>
                                            <Box className="EventsIconsText">
                                                {/* <DateRangeOutlinedIcon style={{color: "#054c94"}}/> */}
                                                <img src={Cardcalendar} alt="Cardcalendar" />
                                                <Typography variant="body2">{data.start_date} - {data.end_date} </Typography>
                                            </Box>
                                            <Divider style={{marginTop:10, marginRight:10}}/>
                                            <Box className="EventsIconsData">
                                                <Box className="EventsIconsDataBox">
                                                    <img src={allUsers}/>
                                                    <Typography variant="body2">{data.awaited + data.completed_answers}</Typography>
                                                </Box>
                                                {
                                                    data.status != "upcoming" &&
                                                    <>
                                                        <Box className="EventsIconsDataBox">
                                                            <img src={CheckMark} alt="CheckMark" />
                                                            <Typography variant="body2">{data.completed_answers}</Typography>
                                                        </Box>
                                                        <Box className="EventsIconsDataBox">
                                                            {
                                                                data.status != "completed" ?
                                                                    <>
                                                                        <AccessTimeOutlinedIcon style={{color: "#ff8100"}}/>
                                                                        <Typography variant="body2">{data.awaited}</Typography>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                                                        <Typography variant="body2">{data.awaited}</Typography>
                                                                    </>
                                                            }
                                                        </Box>
                                                    </>
                                                }
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
                                    <Typography variant="body2" className="statusOngoing">{t("Ongoing")}</Typography>
                                </Box>
                                <Box className="EventsIconsText">
                                    <Typography className="EventsTitle">{t("Block W Parking")}</Typography>
                                </Box>
                                <Box className="EventsIconsText">
                                    <Typography variant="body2">{t("To discuss new vehicle guidlines")}</Typography>
                                </Box>
                                <Box className="EventsIconsText">
                                    <img src={Cardcalendar} alt="Cardcalendar" />
                                    <Typography variant="body2">05-08-2022 - 08-08-2022 </Typography>
                                </Box>
                                <Divider style={{marginTop:10, marginRight:10}}/>
                                <Box className="EventsIconsData">
                                    <Box className="EventsIconsDataBox">
                                        <img src={awated} alt="awated" />
                                        <Typography variant="body2">84</Typography>
                                    </Box>
                                    <Box className="EventsIconsDataBox">
                                        <img src={CheckMark} alt="CheckMark" />
                                        <Typography variant="body2">29</Typography>
                                    </Box>
                                    <Box className="EventsIconsDataBox">
                                        <img src={xmark} alt="xmark" />
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

//@ts-ignore
export default withTranslation()(withRouter(PollsallData)); 

// Customizable Area End
