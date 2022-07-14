// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import "./Polling.web.css"

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {
  Container,
  Typography,
  TextField,
  Input,
  Link,
  Button,
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
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";



export default class SurveyPreview extends PollingController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    return ( 
      <>
    <Box>
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
                            Poll and survey / Create a Poll / <Box component="span" style={{color: "blue"}}>Survey Preview</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Survey Preview</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={4} style={{marginTop: 15}}>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Box className="PollName">
                                        <Typography className="subHeading">Poll Name: </Typography>
                                        <Typography className="PollNameText">Parking Allotment Rules</Typography>
                                </Box>
                                
                                <Box className="DateSection">
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">Start Date</Typography>
                                            <Typography className="PollNameText">June 7, 2022</Typography>
                                        </Box>    
                                    </Box>
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">End Date</Typography>
                                            <Typography className="PollNameText">June 7, 2022</Typography>
                                        </Box>    
                                    </Box>
                                
                                </Box>
                                <Box style={{marginTop:15}}>
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">Description</Typography>  
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box style={{marginTop:5}}>
                                        <Typography variant="body2">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.</Typography> 
                                    </Box>
                                </Box>
                                <Box className="PollName">
                                        <Typography className="subHeading">Target Audience: </Typography>
                                        <Typography className="PollNameText" style={{color:"#054c94"}}>GA Member</Typography>
                                </Box>
                            </Box>
                        </Grid>


                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Typography className="PollNameText">Should we need to charge for extra vehicle parking?</Typography>

                                <TextField  value="Yes" variant="outlined" fullWidth style={{marginTop:20, fontWeight:600}} />
                                <TextField  value="No" variant="outlined" fullWidth style={{marginTop:20}}/>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box className="BottomButton">
                        <Link href="/CreateSurveys">
                            <Button variant="contained" color="primary">EDIT</Button>
                        </Link>
                        <Button variant="outlined" color="primary">PUBLISH</Button>
                    </Box>
                </Container>
            </Grid>
        </Box>
    </Box>
     </>
      );
  }
}



const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
