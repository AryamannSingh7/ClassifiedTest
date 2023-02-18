import * as React from "react";
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
import SurveyMyResponseController, {
  Props
} from "./SurveyMyResponseController";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Divider from "@material-ui/core/Divider";
import {withTranslation} from "react-i18next";
import '../../../web/src/i18n.js';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

class SurveyParticipate extends SurveyMyResponseController {
    constructor(props: Props) {
        super(props);
    }
    render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
          <Grid container>
              <Grid xs={10} style={{ display:"flex", alignItems:"center", gap:"1rem",margin:"1rem"}}>
                <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} style={{cursor:"pointer",marginLeft:"5px"}}/>
                <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    {t("View My Response")}
                </p>
              </Grid>
              <Grid xs={12}>
              <Box style={{background: "#F7F9FE",height:"100%",display:'flex',flexDirection:"column",alignItems:'center'}}>
                  <Box style={{width:"85%"}}>
                      {
                          this.state.SurveyQuestions.length > 0 &&
                          this.state.SurveyQuestions.map((item:any,key:any) => {
                                  return(
                                      <>
                                          <Box key={key} style={{marginTop:"1rem",marginBottom:"1rem",display:'flex',flexDirection:"column",alignItems:'center'}}>
                                              <Box style={{alignSelf: "flex-start"}}>
                                                  <p style={{ fontSize: '1rem', fontWeight: 600}}>
                                                      {
                                                          `${item.survey_question}`
                                                      }
                                                  </p>
                                              </Box>
                                              {
                                                  item.survey_question_type === "short_answers" &&
                                                  <Box style={{width:"100%"}}>
                                                      <Box style={{width:"100%"}}>
                                                      <TextField
                                                          id="outlined-multiline-static"
                                                          multiline
                                                          minRows={5}
                                                          value={item.concern}
                                                          onChange={this.handleShortAns}
                                                          fullWidth
                                                          disabled
                                                          style={{marginTop:"15px",border:"1px solid #f0f0f0",borderRadius:"20px",overflow:"hidden",backgroundColor:"#f9f9f9"}}
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
                                                  </Box>
                                              }
                                              <Box style={{width:"100%"}}>
                                                  {
                                                      item.survey_question_type !== "short_answers" &&
                                                      item.options[0].survey_options?.map((data:any, i:any) => {
                                                          if(item.survey_question_type === "options"){
                                                              return (
                                                                  <>
                                                                      <Grid container key={i}>
                                                                          <Grid xs={12}>
                                                                              <Box key={data.id}
                                                                                   style={{display:'flex',marginTop:'1rem', width:"100%",alignItems:'center'}}>
                                                                                  <Box className="customRadioButton" style={{height:"100%",display:'flex',alignItems:"center",justifyContent:"flex-start"}}>
                                                                                      <input type="radio" id={data.id}
                                                                                             name="options" value={data.id}
                                                                                             style={{marginRight:"10px",marginBottom:"15px",fontSize:"2rem",fontFamily:"system-ui, sans-serif"}}
                                                                                             checked={item.selected_options.findIndex((item:any)=> item.id == data.id) != -1 ? true : false}
                                                                                             onChange={(e) => this.getPollSelectedAnswer(e.target.value)}
                                                                                      />
                                                                                      <label htmlFor={i}/>
                                                                                  </Box>
                                                                                  <Box style={{width:"100%"}}>
                                                                                      <label className="para" >
                                                                                          <Box className={item.selected_options.findIndex((item:any)=> item.id == data.id) != -1 ? "optionBoxSelected" : "optionBox"}>{data.text}</Box>
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
                                                                              <Box key={data.id}
                                                                                   style={{display:'flex',marginTop:'1rem', width:"100%",alignItems:'baseline'}}>
                                                                                  <Box style={{marginLeft:"-12px"}}>
                                                                                      <Checkbox id={data.id}
                                                                                                name="options" value={data.id}
                                                                                                style={{marginBottom:"15px"}}
                                                                                                disabled
                                                                                                icon={<RadioButtonUncheckedIcon style={{color:"#808080",marginTop:"10px"}}/>}
                                                                                                checkedIcon={<CheckCircleIcon style={{color:"#2B6FEC",marginTop:"10px"}}/>}
                                                                                                defaultChecked={item.selected_options.find((item:any)=> item.id == data.id) ? true : false}
                                                                                      />
                                                                                  </Box>
                                                                                  <Box style={{width:"100%"}}>
                                                                                      <label className="para">
                                                                                          <Box className={item.selected_options.findIndex((item:any)=> item.id == data.id) != -1 ? "optionBoxSelected" : "optionBox"}> {data.text} </Box>
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
                                                      item.survey_question_type !== "short_answers" &&
                                                      <Box style={{width:"100%"}}>
                                                          <Typography variant="subtitle2" style={{fontWeight:"bold"}}>{t("Your Comment")}</Typography>
                                                          <TextField
                                                              id="outlined-multiline-static"
                                                              multiline
                                                              minRows={5}
                                                              value={item.concern}
                                                              onChange={this.handleShortAns}
                                                              fullWidth
                                                              disabled
                                                              style={{marginTop:"15px",border:"1px solid #f0f0f0",borderRadius:"20px",overflow:"hidden",backgroundColor:"#f9f9f9"}}
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
                                              </Box>
                                          </Box>
                                          {
                                              this.state.SurveyQuestions.length > key+1 &&
                                              <Divider/>
                                          }
                                      </>
                                  )
                              }
                          )
                      }
                  </Box>
              </Box>
              {
                  this.state.SurveyQuestions.length < 2 &&
                  <Box style={{background: "#E5ECFF",height:"190px",display:'flex',flexDirection:"column",alignItems:'center'}} />
              }
          </Grid>
        </Grid>
        </>
    );
    }
}
export default  withTranslation()(withRouter(SurveyParticipate))

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
