//@ts-ignore
//@ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box,
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


class SubmitPoll extends PollingController {
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

    <Box style={{background: "#E5ECFF", height:'100%'}}>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
            
          <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                <ArrowBackIcon onClick={() => window.history.back()} />
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                Poll title
                </p>
            </Grid>
            <Box className="EventsIconsText">
                <p className="statusOngoing" style={{fontWeight: 600}}>Ongoing</p>
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
                        <p style={{color:"black", fontSize:'1.2rem', marginTop:10}}>Lorem ipsum dolor sit amet consectetur</p>
                    </Box>
                    <Box marginTop='1rem'>
                        <p>End Date:</p>
                        <p style={{color:"black", fontSize:'1.2rem', marginTop:10}}>14-07-2022</p>
                    </Box>
                    <Box marginTop='1rem'>
                        <p>Building:</p>
                        <p style={{color:"black", fontSize:'1.2rem', marginTop:10}}>Building-1</p>
                    </Box>
                </Box>
                <Box marginTop='1.5rem'>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Poll title
                    </p>
                </Box>
                <Box
                borderRadius="15px"
                bgcolor="white"
                marginTop='1rem'
                padding='1rem'
                >
                    <Box display='flex' marginTop='1rem'>
                        <AccountCircleOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>Published By:</p>
                            <p style={{color:"black", fontSize:'1.2rem', marginTop:10}}>Mr. Jhon Andrew</p>
                        </Box>
                    </Box>
                   
                    <Box display='flex' marginTop='1.5rem'>
                        <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>Published Date:</p>
                            <p style={{color:"black", fontSize:'1.2rem', marginTop:10}}>15-07-2022</p>
                        </Box>
                    </Box>

                </Box>
                <Box marginTop='1.5rem'>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Are you coming to the DJ party ?
                    </p>
                </Box>
            </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginLeft: '1rem',marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
            <Grid xs={1}>
                <input type="radio" name="type" value='Yes'/>
            </Grid>
            <Grid xs={11}>
                <Box
                    style={{
                        backgroundColor: "#2B6FEC",
                        borderRadius: '5rem',
                        marginBottom: 14,
                        boxShadow: "none",
                        color: "#F7F7FC",
                        fontWeight: 600,
                        fontSize: '1rem',
                        padding: '1rem'
                    }}
                    >
                    Yes
                </Box>

            </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginLeft: '1rem',marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
            <Grid xs={1}>
                <input type="radio" name="type" value='No'/>
                {/* <input type="radio" name="type" value='Owner' onChange={(e) => this.changeType(e.target.value)} /> */}
            </Grid>
            <Grid xs={11}>
                <Box
                    style={{
                        backgroundColor: "#2B6FEC",
                        borderRadius: '5rem',
                        marginBottom: 14,
                        boxShadow: "none",
                        color: "#F7F7FC",
                        fontWeight: 600,
                        fontSize: '1rem',
                        padding: '1rem'
                    }}
                    >
                    No
                </Box>

            </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <Button
              fullWidth={true}
              className={'btn'}
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#2B6FEC",
                borderRadius: '5rem',
                height: 54,
                marginBottom: 14,
                boxShadow: "none",
                color: "#F7F7FC",
                fontWeight: 600,
                fontSize: 16,
                marginTop: 30
              }}
            //   onClick={this.updateTypeOwner}
            >
              VOTE NOW
            </Button>



          </Grid>
        </Grid>
    </Box>

      </>
    );
  }
}
export default withRouter(SubmitPoll)

// Customizable Area End
