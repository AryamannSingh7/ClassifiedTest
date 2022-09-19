//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, TextField, Typography, LinearProgress,InputAdornment,Checkbox
} from "@material-ui/core";
import {success} from "./assets"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';
import SurveyParticipateController, {
  Props
} from "./SurveyParticipateController.tsx";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"
const exampleQuestion = [
    {
        question:"Would you like to join events organized by building ? ",
        options:[
            {
                text:"yes"
            },
            {
                text:"no"
            }
        ],
        showTextBox:true,
        textBoxLabel:"if No,Please share your concerns"
    },
    {
        question:"What kind of events would you like to be part of ?",
        options:[
            {
                text:"Charity Events"
            },
            {
                text:"Speaker Sessions"
            },
            {
                text:"Holiday Celebrations"
            },
            {
                text:"Others"
            },

        ],
        showTextBox:true,
        textBoxLabel:"Please share your concerns"
    },
    {
        question:"How often would you like to attend an event in a year",
        options:[
            {
                text:"Once a year"
            },
            {
                text:"Twice a year"
            },
            {
                text:"Once a every Quarter"
            },
            {
                text:"Once a month"
            },
        ],
        showTextBox:false,
    },
]

class SurveyParticipate extends SurveyParticipateController {
    constructor(props: Props) {
        super(props);
    }
    render() {
    return (
        <>
          <Grid container>
              <Grid xs={10} style={{ display:"flex", alignItems:"center", gap:"1rem",margin:"10px 10px"}}>
                <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} style={{cursor:"pointer",marginLeft:"5px"}}/>
              </Grid>
              <Grid xs={12}>
              <Box style={{background: "#E5ECFF",height:"94.5vh",display:'flex',flexDirection:"column",alignItems:'center'}}>
                <Box style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}}>
                    <img src={success} style={{marginBottom:"15px"}} />
                    <Typography variant="h4" style={{textAlign:'center',fontFamily: "Century Gothic",fontWeight:"bold"}}>
                        Survey Response Submitted
                    </Typography>
                    <Typography variant="body1" style={{textAlign:'center',fontFamily: "Century Gothic",marginTop:"30px",width:"90%"}}>
                        Your Event Planning Survey Response has been submitted successfully. You can check your response under View My Response section
                    </Typography>
                </Box>
                <Box style={{width:"90%",marginBottom:"25px"}}>
                    <OkButton fullWidth onClick={() => this.props.history.push("/pollsSurvey")}>Okay</OkButton>
                </Box>
              </Box>
          </Grid>
        </Grid>
        </>
    );
    }
}
export default withRouter(SurveyParticipate)

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const OkButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"45px",
        textTransform:"initial",
        borderRadius:"100px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
