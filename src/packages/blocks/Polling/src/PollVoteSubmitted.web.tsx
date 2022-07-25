//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, TextField,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withRouter } from 'react-router';
import PollingController, {
  Props
} from "./PollingController.tsx";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"


class PollVoteSubmitted extends PollingController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
        <>
    
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
            <ArrowBackIcon onClick={() => window.history.back()} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              Poll title
            </p>
          </Grid>
        </Grid>

    <Box style={{background: "#E5ECFF"}}>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
            
          <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                Poll title
                </p>
            </Grid>
            <Box className="EventsIconsText">
                <p className="statusCompleted" style={{fontWeight: 600}}>Submitted</p>
            </Box>
          </Grid>
        </Grid>

        <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', width: '90%' }}>
            <Grid xs={12}>
                <Box
                borderRadius="15px"
                bgcolor="white"
                marginTop='1rem'
                padding='1rem'
                >

                    <Box marginTop='1rem'>
                        <p>Survey</p>
                        <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>Lorem ipsum dolor sit amet consectetur</p>
                    </Box>
                    <Box marginTop='1rem'>
                        <p>End Date:</p>
                        <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>14-07-2022</p>
                    </Box>
                    <Box marginTop='1rem'>
                        <p>Building:</p>
                        <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>Building-1</p>
                    </Box>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box marginTop='1.5rem'>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Publishing Details
                    </p>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box
                borderRadius="15px"
                bgcolor="white"
                marginTop='1.5em'
                padding='1rem'
                >
                    <Box display='flex' marginTop='1rem'>
                        <AccountCircleOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>Published By:</p>
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>Mr. Jhon Andrew</p>
                        </Box>
                    </Box>
                   
                    <Box display='flex' marginTop='1.5rem'>
                        <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>Published Date:</p>
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>15-07-2022</p>
                        </Box>
                    </Box>

                </Box>
              </Grid>
              <Grid xs={12}>
                <Box marginTop='1.5rem'>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Are you coming to the DJ party ?
                    </p>
                </Box>
              </Grid>
        </Grid>

        <Grid container spacing={2} style={{ background: "#E5ECFF", marginLeft: '1rem',marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
            <Grid xs={12}>
                <Box className="progressbarYES">
                    <span>Yes</span>
                    <progress className="progress" data-label="70%" value="70" max="100"></progress>
                </Box>
            </Grid>
        </Grid>
       
        <Grid container spacing={2} style={{ background: "#E5ECFF", marginLeft: '1rem',marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
            <Grid xs={12}>
                <Box className="progressbarYES">
                    <span>No</span>
                    <progress className="progress" data-label="30%" value="30" max="100"></progress>
                </Box>
            </Grid>
        </Grid>
       
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{display:"flex"}}>
            <p style={{color:"black", fontSize:'0.9rem', marginTop:10}}>Your Vote:</p>
            <p style={{color:"red", fontSize:'0.9rem', fontWeight: 600 , marginTop:10}}>NO</p>
          </Grid>
        </Grid>
    </Box>

      </>
    );
  }
}
export default withRouter(PollVoteSubmitted)

// Customizable Area End
