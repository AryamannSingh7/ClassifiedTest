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
import SurveyInitialController, {
  Props
} from "./SurveyInitialController.tsx";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"


class SurveyInitial extends SurveyInitialController {
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
                {this.state.SurveyPreviewAnswer.title}
            </p>
          </Grid>
        </Grid>
        <Box style={{background: "#E5ECFF"}}>
        <Box style={{width:"100%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}}>
            <Grid container style={{ margin: '1rem 1rem', width: '90%' }}>
                <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:".5rem"}}>
                        <p className="textwrapStatus" style={{ fontSize: '1rem', fontWeight: 600 }}>
                            {this.state.SurveyPreviewAnswer.title}
                        </p>
                    </Grid>
                    {
                        !this.state.SurveyPreviewAnswer.flag ?
                            <Box className="EventsIconsText">
                                {
                                    this.state.SurveyPreviewAnswer?.status == "ongoing" &&
                                    <Typography variant="body2" className={"statusOngoingRed"}>{ this.state.SurveyPreviewAnswer?.status}</Typography>
                                }
                                {
                                    this.state.SurveyPreviewAnswer?.status == "completed" &&
                                    <Typography variant="body2" className={"statusOngoingGreen"}>{ this.state.SurveyPreviewAnswer?.status}</Typography>
                                }
                            </Box> :
                            <Box className="EventsIconsText">
                                <Typography variant="body2" className={"statusOngoingGreen"}>Submitted</Typography>
                            </Box>
                    }
                </Grid>
            </Grid>
            <Grid container style={{ marginLeft: '1rem', marginRight: '1rem', width: '90%' }}>
                <Grid xs={12}>
                    <Box
                        borderRadius="15px"
                        bgcolor="white"
                        padding='1rem'
                    >
                        <Box marginTop='1rem'>
                            <Typography variant="subtitle2" color="textSecondary">Purpose:</Typography>
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}
                               dangerouslySetInnerHTML={
                                   { __html: DOMPurify.sanitize(this.state.SurveyPreviewAnswer.description) }
                               }
                            >
                            </p>
                        </Box>
                        <Box marginTop='1rem'>
                            <Typography variant="subtitle2" color="textSecondary">End Date:</Typography>
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                                {this.state.SurveyPreviewAnswer.end_date}
                            </p>
                        </Box>
                        <Box marginTop='1rem'>
                            <Typography variant="subtitle2" color="textSecondary">Building:</Typography>
                            <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                                {this.state.SurveyPreviewAnswer.building_name}
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
                                    {this.state.SurveyPreviewAnswer.publish_by}
                                </p>
                            </Box>
                        </Box>

                        <Box display='flex' marginTop='1.5rem'>
                            <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                            <Box marginLeft='0.5rem'>
                                <p>Published Date:</p>
                                <p style={{color:"black", fontSize:'1.1rem', marginTop:10}}>
                                    {this.state.SurveyPreviewAnswer.publish_date}
                                </p>
                            </Box>
                        </Box>

                    </Box>
                </Grid>
                <Grid xs={12}>
                    <Box marginTop='1.5rem'>
                    </Box>
                </Grid>
            </Grid>
            <Grid container style={{marginLeft: '1rem', marginRight: '1rem',width: '90%',marginBottom:"50px"}}>
                {
                    this.state.SurveyPreviewAnswer.flag ?
                        <Button variant="contained" onClick={() => this.props.history.push(`SurveyResponse?id=${this.state.SurveyPreviewAnswerID}`)} fullWidth style={{borderRadius:"50px",}} size="large" color="primary">View My Response</Button>
                        :
                        <Button variant="contained" onClick={() => this.props.history.push(`/SurveyParticipate?id=${this.state.SurveyPreviewAnswerID}`)} fullWidth style={{borderRadius:"50px",}} size="large" color="primary">Take The Survey</Button>
                }
            </Grid>
        </Box>
    </Box>
        <Box style={{background: "#E5ECFF",width:"100%",height:"50vh"}}>

        </Box>
      </>
    );
  }
}
export default withRouter(SurveyInitial)

// Customizable Area End
