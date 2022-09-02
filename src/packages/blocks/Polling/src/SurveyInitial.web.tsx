//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, TextField, Typography,
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
            <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              Survey Title
            </p>
          </Grid>
        </Grid>

    <Box style={{background: "#E5ECFF",height:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}}>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
            
          <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Survey Title
                </p>
            </Grid>
            <Box className="EventsIconsText">
                <p className="statusCompleted" style={{fontWeight: 600}}>Ongoing</p>
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
                        <Typography variant="subtitle2" color="textSecondary">Purpose:</Typography>
                        <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}
                          dangerouslySetInnerHTML={
                            { __html: DOMPurify.sanitize(this.state.pollPreviewAnswer?.poll?.data.attributes.description) }
                          }
                        >  
                        </p>
                    </Box>
                    <Box marginTop='1rem'>
                        <Typography variant="subtitle2" color="textSecondary">End Date:</Typography>
                        <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                          {this.state.pollPreviewAnswer?.poll?.data.attributes.end_date}
                        </p>
                    </Box>
                    <Box marginTop='1rem'>
                        <Typography variant="subtitle2" color="textSecondary">Building:</Typography>
                        <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                          {this.state.pollPreviewAnswer?.poll?.data.attributes.building_name}
                        </p>
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
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                            {this.state.pollPreviewAnswer?.poll?.data.attributes.publish_by}
                            </p>
                        </Box>
                    </Box>
                   
                    <Box display='flex' marginTop='1.5rem'>
                        <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>Published Date:</p>
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                              {this.state.pollPreviewAnswer?.poll?.data.attributes.publish_date}
                            </p>
                        </Box>
                    </Box>

                </Box>
              </Grid>
              <Grid xs={12}>
                <Box marginTop='1.5rem'>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                    {this.state.pollPreviewAnswer?.poll?.data.attributes.question}
                    </p>
                </Box>
              </Grid>
        </Grid>
        <Grid container style={{position:"absolute",bottom:"0px", margin: '1rem', width: '90%' }}>
          <Button variant="contained" onClick={() => this.props.history.push("/Surveyfill")} fullWidth style={{borderRadius:"50px",}} size="large" color="primary">Take The Survey</Button>
        </Grid>
    </Box>

      </>
    );
  }
}
export default withRouter(PollVoteSubmitted)

// Customizable Area End
