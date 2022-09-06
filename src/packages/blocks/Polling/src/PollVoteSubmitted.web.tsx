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
    console.log("preview submitted answer 888888888888888888", this.state.pollPreviewAnswer?.poll?.data)
    return (
        <>
    
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",width:"95%"}}>
            <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} />
            <p className="textwrap" style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {this.state.pollPreviewAnswer?.poll?.data.attributes.title}
            </p>
          </Grid>
        </Grid>

    <Box style={{background: "#E5ECFF",height:"160vh",display:'flex',flexDirection:"column",alignItems:'center'}}>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
            
          <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",width:"60%"}}>
                <p className="textwrapStatus" style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                {this.state.pollPreviewAnswer?.poll?.data.attributes.title}
                </p>
            </Grid>
            <Box className="EventsIconsText">
                {
                    this.state.pollPreviewAnswer?.poll?.data.attributes.status == "ongoing" &&
                    <Typography variant="body2" className={"statusOngoingRed"}>{this.state.pollPreviewAnswer?.poll?.data.attributes.status}</Typography>
                }
                {
                    this.state.pollPreviewAnswer?.poll?.data.attributes.status == "completed" &&
                    <Typography variant="body2" className={"statusOngoingGreen"}>{this.state.pollPreviewAnswer?.poll?.data.attributes.status}</Typography>
                }
                {/*<p className="statusCompleted" style={{fontWeight: 600}}>{this.state.pollPreviewAnswer?.poll?.data.attributes.status}</p>*/}
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

        {this.state.pollPreviewAnswer?.poll?.data.attributes.polling_options.length ? 
          this.state.pollPreviewAnswer?.poll?.data.attributes.polling_options.map((item) => {
          return(
            <Grid container spacing={2} style={{ background: "#E5ECFF",marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
              <Grid xs={12}>
                  <Box className="progressbarYES">
                      <span>{item.text}</span>
                      <progress 
                        className="progress" 
                        data-label={item.answer_percentage.toFixed(2) + "%"}
                        value={item.answer_percentage} 
                        max="100"
                      >
                      </progress>
                  </Box>
              </Grid>
            </Grid>
          )
        })
        :
        "No options are available"
        }

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{display:"flex"}}>
            <p style={{color:"black", fontSize:'0.9rem', marginTop:10}}>Your Vote:</p>
            <p style={{color:"red", fontSize:'0.9rem', fontWeight: 600 , marginTop:10}}>
              {this.state.pollPreviewAnswer?.poll?.data.attributes.your_answer}
            </p>
          </Grid>
        </Grid>
    </Box>

      </>
    );
  }
}
export default withRouter(PollVoteSubmitted)

// Customizable Area End
