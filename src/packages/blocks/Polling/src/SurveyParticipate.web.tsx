//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, TextField, Typography, LinearProgress,InputAdornment,Checkbox
} from "@material-ui/core";
import {clipBoard} from "./assets"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withRouter } from 'react-router';
import SurveyParticipateController, {
  Props
} from "./SurveyParticipateController.tsx";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {withTranslation} from "react-i18next";

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
    //@ts-ignore
    const {t} = this.props
    return (
        <>
          <Grid container>
              <Grid xs={10} style={{ display:"flex", alignItems:"center", gap:"1rem",margin:"10px 10px"}}>
                <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} style={{cursor:"pointer",marginLeft:"5px"}}/>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    {this.state.surveyTitle || ""}
                </p>
              </Grid>
              <Grid xs={12}>
              <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}}>
                      <Box style={{width:"85%"}}>
                          <Box style={{marginTop:"25px",marginBottom:"10px"}}>
                              <BorderLinearProgress variant="determinate" value={(100/(this.state.totalQuestion+1))*(this.state.currentQuestion+1)} style={{border:".5px gray"}}/>
                          </Box>
                          <Box style={{margin:"1rem",display:'flex',flexDirection:"column",alignItems:'center'}}>
                              <Box style={{width:"100%",marginTop:"5px"}}>
                                  <p style={{ fontSize: '1rem', fontWeight: 600,textAlign:"left"}}>
                                      {
                                          this.state.SurveyQuestions[this.state.currentQuestion]?.title
                                      }
                                  </p>
                                  {
                                      this.state.SurveyQuestions[this.state.currentQuestion]?.question_type === "short_answers" &&
                                      <Box style={{width:"100%",marginTop:"15px"}}>
                                          <TextField
                                              id="outlined-multiline-static surveyTextBox"
                                              multiline
                                              minRows={5}
                                              value={this.state.questionShortAns}
                                              onChange={this.handleShortAns}
                                              fullWidth
                                              style={{marginTop:"15px",border:"1px solid rgb(209 209 209 / 100%)",borderRadius:"20px",overflow:"hidden",backgroundColor:"#f9f9f9"}}
                                              InputProps={{
                                                  startAdornment: (
                                                      <InputAdornment position="start">
                                                          <img src={clipBoard} style={{margin:"10px"}} />
                                                      </InputAdornment>
                                                  ),
                                                  disableUnderline: true
                                              }}
                                          />
                                      </Box>
                                  }
                                  {
                                      this.state.SurveyQuestions[this.state.currentQuestion]?.question_type !== "short_answers" &&
                                      this.state.SurveyQuestions[this.state.currentQuestion]?.survey_options.map((data, i) => {
                                          if(this.state.SurveyQuestions[this.state.currentQuestion]?.question_type === "options"){
                                              return (
                                                  <>
                                                      <Grid container key={i}>
                                                          <Grid xs={12}>
                                                              <Box container key={data.id}
                                                                   style={{display:'flex',marginTop:'1rem', width:"100%",alignItems:'center'}}>
                                                                  <Box className="customRadioButton" style={{height:"100%",display:'flex',alignItems:"center",justifyContent:"flex-start"}}>
                                                                      <input type="radio" id={data.id}
                                                                             name="options" value={data.id}
                                                                             style={{marginRight:"10px",marginBottom:"15px",fontSize:"2rem",fontFamily:"system-ui, sans-serif"}}
                                                                             checked={this.state.questionOptionAnswer.find((item:any)=> item == data.id) ? true : false}
                                                                             onChange={(e) => this.getPollSelectedAnswer(e.target.value)}
                                                                      />
                                                                      <label htmlFor={i}/>
                                                                  </Box>
                                                                  <Box style={{width:"100%"}}>
                                                                      <label
                                                                          className="para"
                                                                          for={data.id}
                                                                      >
                                                                          <Box
                                                                              style={
                                                                                  this.state.questionOptionAnswer.find((item:any)=> item == data.id) ?
                                                                                  {
                                                                                      backgroundColor: "#2B6FEC",
                                                                                      borderRadius: '5rem',
                                                                                      marginBottom: 14,
                                                                                      boxShadow: "none",
                                                                                      color: "#F7F7FC",
                                                                                      fontWeight: 600,
                                                                                      fontSize: '1rem',
                                                                                      padding: '1rem'
                                                                                  }
                                                                                  :
                                                                                  {
                                                                                      backgroundColor: "#f9f9f9",
                                                                                      border:"1px solid rgb(209 209 209 / 100%)",
                                                                                      borderRadius: '5rem',
                                                                                      marginBottom: 14,
                                                                                      boxShadow: "none",
                                                                                      color: "#212121",
                                                                                      fontWeight: 600,
                                                                                      fontSize: '1rem',
                                                                                      padding: '1rem'
                                                                                  }
                                                                              }
                                                                          >
                                                                              {data.text}
                                                                          </Box>
                                                                      </label>
                                                                  </Box>
                                                              </Box>
                                                          </Grid>
                                                      </Grid>

                                                  </>
                                              )
                                          }else{
                                              return (
                                                  <>
                                                      <Grid container key={i}>
                                                          <Grid xs={12}>
                                                              <Box container key={data.id}
                                                                   style={{display:'flex',marginTop:'1rem', width:"100%",alignItems:'baseline',justifyContent:"flex-start"}}>
                                                                  <Box style={{marginLeft:"-12px"}}>
                                                                      <Checkbox type="checkBox" id={data.id}
                                                                                name="options" value={data.id}
                                                                                style={{marginBottom:"15px"}}
                                                                                icon={<RadioButtonUncheckedIcon style={{color:"#808080",marginTop:"10px"}}/>}
                                                                                checkedIcon={<CheckCircleIcon style={{color:"#2B6FEC",marginTop:"10px"}}/>}
                                                                                checked={this.state.questionOptionAnswer.find((item:any)=> item == data.id) ? true : false}
                                                                                onChange={(e) => this.getPollSelectedMultiAns(e.target.value)}
                                                                      />
                                                                  </Box>
                                                                  <Box style={{width:"100%",cursor:"pointer"}} onClick={()=>this.getPollSelectedMultiAns(data.id)}>
                                                                      <label
                                                                          className="para"
                                                                          for={data.id}
                                                                      >
                                                                          <Box
                                                                              style={
                                                                                  this.state.questionOptionAnswer.find((item:any)=> item == data.id) ?
                                                                                      {
                                                                                          backgroundColor: "#2B6FEC",
                                                                                          borderRadius: '5rem',
                                                                                          marginBottom: 14,
                                                                                          boxShadow: "none",
                                                                                          color: "#F7F7FC",
                                                                                          fontWeight: 600,
                                                                                          fontSize: '1rem',
                                                                                          padding: '1rem'
                                                                                      }
                                                                                      :
                                                                                      {
                                                                                          backgroundColor: "#f9f9f9",
                                                                                          borderRadius: '5rem',
                                                                                          border:"1px solid rgb(209 209 209 / 100%)",
                                                                                          marginBottom: 14,
                                                                                          boxShadow: "none",
                                                                                          color: "#212121",
                                                                                          fontWeight: 600,
                                                                                          fontSize: '1rem',
                                                                                          padding: '1rem'
                                                                                      }
                                                                              }
                                                                          >
                                                                              {data.text}
                                                                          </Box>
                                                                      </label>
                                                                  </Box>
                                                              </Box>
                                                          </Grid>
                                                      </Grid>

                                                  </>
                                              )
                                          }

                                      })
                                  }
                                  {
                                      this.state.SurveyQuestions[this.state.currentQuestion]?.question_type !== "short_answers" &&
                                      <Box style={{width:"100%",marginTop:"15px"}}>
                                          <Typography varian="subtitle2" style={{fontWeight:"bold"}}>Please share your concern</Typography>
                                          <TextField
                                              id="outlined-multiline-static surveyTextBox"
                                              multiline
                                              minRows={5}
                                              value={this.state.questionShortAns}
                                              onChange={this.handleShortAns}
                                              fullWidth
                                              style={{marginTop:"15px",border:"1px solid rgb(209 209 209 / 100%)",borderRadius:"20px",overflow:"hidden",backgroundColor:"#f9f9f9"}}
                                              InputProps={{
                                                  startAdornment: (
                                                      <InputAdornment position="start">
                                                          <img src={clipBoard} style={{margin:"10px"}}/>
                                                      </InputAdornment>
                                                  ),
                                                  disableUnderline: true
                                              }}
                                          />
                                      </Box>
                                  }
                              </Box>
                          </Box>
                      </Box>
                      <Grid container spacing={2} style={{width: '90%',marginBottom:"50px"}}>
                          {
                              this.state.currentQuestion !== 0  && this.state.currentQuestion !== this.state.totalQuestion && this.state.totalQuestion !== 1 &&
                              <>
                                  <Grid item xs={6}>
                                      <Button onClick={this.handlePrevious} fullWidth variant="text" style={{borderRadius:"50px",color:"#2B6FED",height:"50px"}} size="large" color="primary">Back</Button>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Button onClick={this.handleNext} fullWidth variant="contained" style={{borderRadius:"50px",backgroundColor:"#2B6FED",height:"50px"}} size="large" color="primary">Next</Button>
                                  </Grid>
                              </>
                          }
                          {
                              this.state.currentQuestion === 0  && this.state.totalQuestion !== 0 &&
                              <Grid item xs={12}>
                                  <Button onClick={this.handleNext} fullWidth variant="contained" style={{borderRadius:"50px",backgroundColor:"#2B6FED",height:"50px"}} size="large" color="primary">Next</Button>
                              </Grid>
                          }
                          {
                              this.state.currentQuestion === this.state.totalQuestion &&
                              <Grid item xs={12}>
                                  <Button onClick={this.handleSubmit} fullWidth variant="contained" style={{borderRadius:"50px",backgroundColor:"#2B6FED",height:"50px"}} size="large" color="primary">Submit</Button>
                              </Grid>
                          }
                      </Grid>
              </Box>
          </Grid>
        </Grid>
        </>
    );
    }
}
export default withTranslation()(withRouter(SurveyParticipate))

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


// Customizable Area End
