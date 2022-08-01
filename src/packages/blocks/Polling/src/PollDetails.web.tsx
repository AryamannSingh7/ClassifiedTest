// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"
import DOMPurify from 'dompurify'
import {pollandsurvey, xmark, CheckMark, awated, Cardcalendar} from "./assets"
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Icons
import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";


class PollDetails extends PollingController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    console.log("poll pollPreviewAnswer #######", this.state.pollPreviewAnswer?.poll?.data)
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
                            Poll and survey / Create a Poll / <Box component="span" style={{color: "blue"}}>Poll Details</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Poll Details</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={4} style={{marginTop: 15}}>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Box className="PreviewName">
                                    <Box className="PollName">
                                        <Typography className="subHeading">Poll Name: </Typography>
                                        <Typography className="PollNameText">
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes.title}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <p className="AnonymousPreviewPoll">
                                            Anonymous Poll</p>
                                        <p className="statusOngoing" style={{fontWeight: 600, marginLeft:"1rem"}}>
                                        Ongoing
                                        </p>   
                                    </Box>
                                    {/* <Box>
                                        {
                                            (this.state.PreViewPollData?.PollType === true) ? 
                                            <Typography variant="body2" className="AnonymousPreviewPoll">
                                            Anonymous Poll</Typography>
                                             : ''
                                        }
                                    </Box> */}
                                </Box>
                                
                                <Box className="DateSectionPreviewpoll">
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">Start Date</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                                {this.state.pollPreviewAnswer?.poll?.data?.attributes?.start_date}</Typography>
                                        </Box>    
                                    </Box>
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">End Date</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes?.end_date}</Typography>
                                        </Box>    
                                    </Box>
                                </Box>
                                <Box style={{marginTop:15}}>
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">Description</Typography>  
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box style={{marginTop:5, overflowWrap:"break-word"}}>
                                        <Typography variant="body2"
                                        dangerouslySetInnerHTML={
                                            { __html: DOMPurify.sanitize(this.state.pollPreviewAnswer?.poll?.data?.attributes?.description) }
                                        }
                                        
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                   
                    <Grid style={{marginTop: "2rem"}} className="createPSCards">
                        <Grid item sm={12} md={12} xs={12}>
                            <Grid className="GenerateReport">
                                <Box>
                                    <Typography className="PollNameText">
                                        {this.state.pollPreviewAnswer?.poll?.data?.attributes?.question}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Link href="/CreatePolls">
                                        <Button variant="contained" color="primary">GENERATE REPORT</Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>

                        {this.state.pollPreviewAnswer?.poll?.data?.attributes?.polling_options.length ? 
                            this.state.pollPreviewAnswer?.poll?.data?.attributes?.polling_options.map((val) => {
                                return(
                                    <Grid className="AnswersCount">
                                        <Grid sm={6} md={6} xs={6} style={{marginTop: "1.5rem"}}>
                                            <Box className="progressbarNO">
                                                <span>{val.text}</span>
                                                <progress 
                                                    className="progress" 
                                                    data-label={val.answer_percentage + "%"}
                                                    value={val.answer_percentage}
                                                    max="100"
                                                >
                                                </progress>
                                            </Box>
                                        </Grid>
                                        <Grid sm={2} md={2} xs={2} style={{marginTop: "1.5rem"}}>
                                            <Box className="VoteCount">
                                                <p>{val.answer_count} PEOPLE VOTED</p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )
                            })
                            :
                            "No Options Are Available"
                        }
                        
                       

                        <Grid sm={5} md={5} xs={5} style={{marginTop: "1.5rem"}}>
                            <Box className="VoteCountBottom">
                                <Box className="VoteCountBottomBox">
                                    <img src={awated} alt="awated" />
                                    <p>88 Awaited</p>
                                </Box>
                                <Box className="VoteCountBottomBox">
                                    <img src={CheckMark} alt="CheckMark" />
                                    <p>124 Response Received</p>
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

export default withRouter(PollDetails)

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
