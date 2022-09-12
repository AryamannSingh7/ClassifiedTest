// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import "./Polling.web.css"
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


import SurveyAllDataController, {
  Props,
  configJSON,
} from "./SurveyAllDataController";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import { Style } from "@material-ui/icons";
import { withRouter } from 'react-router';
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

class PollsallData extends SurveyAllDataController {
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
                            My Dashboard / Poll and surveys / <Box component="span" style={{color: "blue"}}>Surveys</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Poll / Surveys</Typography>
                        </Box>
                        <Box>
                            <FormControl className='YearMain'>
                                <NativeSelect className='yearSelection' disableUnderline value={this.state.Year} onChange={this.handleChange} >
                                    <option value="This Week">This Week</option>
                                    <option value="This Month">This Month</option>
                                    <option value="This Year">This Year</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </Box>
                    <Grid container spacing={4} style={{marginTop: 15,marginBottom:20}} className="link-decoration">
                        <Grid item sm={6} md={4} xs={12}>
                            <Link href="/CreateSurveys">
                                <Box className="CreatePSsingle">
                                    <Box sx={{ml:1, mb:2}}>
                                    <img src={pollandsurvey} alt="pollandsurvey" />
                                    </Box>
                                    <Typography  className="CreatePSHeading">Create a New Survey</Typography>
                                </Box>
                            </Link>
                        </Grid>

                        {this.state.allSurveyData.length ?
                            this.state.allSurveyData.map((data:any) => {
                                console.log("DATA",data)
                                return(
                                    <>
                                    <Grid item sm={6} md={4} xs={12} >
                                        <Box className="EventsCards"
                                        key={data.id}
                                        onClick={() => this.props.history.push("/SurveyDetails?id="+data.id)}
                                        >
                                            <Box className="EventsIconsText">
                                                {
                                                    data.attributes.status == "upcoming" &&
                                                    <Typography variant="body2" className={"statusOngoingBlue"}>{data.attributes.status}</Typography>
                                                }
                                                {
                                                    data.attributes.status == "ongoing" &&
                                                    <Typography variant="body2" className={"statusOngoingRed"}>{data.attributes.status}</Typography>
                                                }
                                                {
                                                    data.attributes.status == "completed" &&
                                                    <Typography variant="body2" className={"statusOngoingGreen"}>{data.attributes.status}</Typography>
                                                }
                                            </Box>
                                            <Box className="EventsIconsText">
                                                <Typography className="EventsTitle" style={{width:"95%"}}>{data.attributes.title}</Typography>
                                            </Box>
                                            <Box className="EventsIconsText">
                                                <p
                                                className="textwrap"
                                                // style={{textOverflow:"ellipsis",overflow:"hidden", whiteSpace:"nowrap"}}
                                                dangerouslySetInnerHTML={
                                                    { __html: DOMPurify.sanitize(data.attributes.description) }
                                                }
                                                
                                                >
                                                </p> 
                                            </Box>
                                            <Box className="EventsIconsText">
                                                {/* <DateRangeOutlinedIcon style={{color: "#054c94"}}/> */}
                                                <img src={Cardcalendar} alt="Cardcalendar" />
                                                <Typography variant="body2">{data.attributes.start_date} - {data.attributes.end_date} </Typography>
                                            </Box>
                                            <Divider style={{marginTop:10, marginRight:10}}/>
                                            <Box className="EventsIconsData">
                                                <Box className="EventsIconsDataBox">
                                                    <img src={allUsers}/>
                                                    <Typography variant="body2">{data.attributes.awaited + data.attributes.total_response}</Typography>
                                                </Box>
                                                {
                                                    data.attributes.status != "upcoming" &&
                                                    <>
                                                        <Box className="EventsIconsDataBox">
                                                            <img src={CheckMark} alt="CheckMark" />
                                                            <Typography variant="body2">{data.attributes.total_response}</Typography>
                                                        </Box>
                                                        <Box className="EventsIconsDataBox">
                                                            {
                                                                data.attributes.status != "completed" ?
                                                                    <>
                                                                        <AccessTimeOutlinedIcon style={{color: "#ff8100"}}/>
                                                                        <Typography variant="body2">{data.attributes.awaited}</Typography>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                                                        <Typography variant="body2">{data.attributes.awaited}</Typography>
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

                        {/*<Grid item sm={4} md={4} xs={4}>*/}
                        {/*    <Box className="EventsCards">*/}
                        {/*        <Box className="EventsIconsText">*/}
                        {/*            <Typography variant="body2" className="statusOngoing">Ongoing</Typography>*/}
                        {/*        </Box>*/}
                        {/*        <Box className="EventsIconsText">*/}
                        {/*            <Typography className="EventsTitle">Block W Parking</Typography>*/}
                        {/*        </Box>*/}
                        {/*        <Box className="EventsIconsText">*/}
                        {/*            <Typography variant="body2">To discuss new vehicle guidlines</Typography>*/}
                        {/*        </Box>*/}
                        {/*        <Box className="EventsIconsText">*/}
                        {/*            <img src={Cardcalendar} alt="Cardcalendar" />*/}
                        {/*            <Typography variant="body2">05-08-2022 - 08-08-2022 </Typography>*/}
                        {/*        </Box>*/}
                        {/*        <Divider style={{marginTop:10, marginRight:10}}/>*/}
                        {/*        <Box className="EventsIconsData">*/}
                        {/*            <Box className="EventsIconsDataBox">*/}
                        {/*                <img src={awated} alt="awated" />*/}
                        {/*                <Typography variant="body2">84</Typography>*/}
                        {/*            </Box>*/}
                        {/*            <Box className="EventsIconsDataBox">*/}
                        {/*                <img src={CheckMark} alt="CheckMark" />*/}
                        {/*                <Typography variant="body2">29</Typography>*/}
                        {/*            </Box>*/}
                        {/*            <Box className="EventsIconsDataBox">*/}
                        {/*                <img src={xmark} alt="xmark" />*/}
                        {/*                <Typography variant="body2">13</Typography>*/}
                        {/*            </Box>*/}
                        {/*        </Box>*/}
                        {/*    </Box>*/}
                        {/*</Grid>*/}
                        </Grid>
                </Container>
                </Grid>
            </Box>
        </Box>
     </>
      );
  }
}

export default withRouter(PollsallData)

// Customizable Area End
