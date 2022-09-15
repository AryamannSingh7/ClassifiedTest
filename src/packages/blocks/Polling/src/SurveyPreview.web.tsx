// Customizable Area Start
//@ts-nocheck
//@ts-ignore

import React from "react";
import "./Polling.web.css"
import DOMPurify from 'dompurify'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {
    Container,
    Typography,
    TextField,
    Input,
    Link,
    Button, Divider,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Icons
import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
// Icons

import SurveyPreviewController, {
  Props,
  configJSON,
} from "./SurveyPreviewController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import moment from "moment";
import {awated, CheckMark} from "./assets";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

class SurveyPreview extends SurveyPreviewController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    const {t} = this.props
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
                                      Poll and survey / Created Surveys / <Box component="span" style={{color: "blue"}}>Survey Preview</Box>
                                  </Typography>
                                  <Typography variant="h5" className="subHeading">Survey Preview</Typography>
                              </Box>
                          </Box>

                          <Grid container spacing={4} style={{marginTop: 15}}>

                              <Grid item sm={12} md={12} xs={12}>
                                  <Box className="createPSCards">
                                      <Box className="PreviewName">
                                          <Box className="PollName">
                                              <Typography className="subHeading">Survey Name: </Typography>
                                              <Typography className="PollNameText">
                                                  {this.state.SurveyData.title}
                                              </Typography>
                                          </Box>
                                      </Box>

                                      <Box className="DateSectionPreviewpoll">
                                          <Box className="datebox">
                                              <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                              <Box>
                                                  <Typography className="PollNamedate">Start Date</Typography>
                                                  <Typography className="PollNameText">
                                                      {/* June 7, 2022 */}
                                                      {moment(this.state.SurveyData?.startDate).format("MMMM DD, YYYY")}</Typography>
                                              </Box>
                                          </Box>
                                          <Box className="datebox">
                                              <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                              <Box>
                                                  <Typography className="PollNamedate">End Date</Typography>
                                                  <Typography className="PollNameText">
                                                      {/* June 7, 2022 */}
                                                      {moment(this.state.SurveyData?.endDate).format("MMMM DD, YYYY")}</Typography>
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
                                                              { __html: DOMPurify.sanitize(this.state.textEditor) }
                                                          }
                                              />
                                          </Box>
                                      </Box>
                                      <Box className="PollName" style={{marginTop:15}}>
                                          <Typography className="subHeading">Target Audience: </Typography>
                                          <Typography className="PollNameText" style={{color:"#2B6FED"}}>
                                              GA Members
                                          </Typography>
                                      </Box>
                                  </Box>
                              </Grid>
                          </Grid>
                          <Grid style={{marginBottom:"5rem"}} className="createPSCards">
                              <Grid item xs={12}>
                                  <Typography variant="subtitle2">{this.state.surveyQuestions.length} Questions</Typography>
                              </Grid>
                              <Grid>
                                  {
                                      this.state.surveyQuestions.length > 0 &&
                                      this.state.surveyQuestions.map((item,key)=>{
                                          console.log("THIS IS QUESTIONS",item)
                                          return(
                                              <>
                                                  <Box style={{margin:"10px 0px"}}>
                                                      <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{key+1}. {item.title}</Typography>
                                                      {
                                                          item.question_type === "short_answers" ?
                                                              <Typography style={{marginTop:"5px"}}>Short Answer</Typography> :
                                                              <Box style={{display:'flex'}}>
                                                                  <Typography style={{marginTop:"5px",marginRight:"5px"}}>{item.question_type === "checkbox" ? "Multiple Choice Question":"Options"}</Typography>
                                                                  <Typography style={{marginTop:"5px",marginRight:"5px"}}>|</Typography>
                                                                  {
                                                                      item.survey_options_attributes.map((ans,key1)=>{
                                                                          return(
                                                                              <Typography key={key1} style={{marginTop:"5px",marginRight:"10px"}}>{alphabet[key1]}. {ans.text}</Typography>
                                                                          )
                                                                      })
                                                                  }
                                                              </Box>
                                                      }

                                                  </Box>
                                                  {
                                                      (key + 1) !== this.state.surveyQuestions.length &&
                                                      <Divider/>
                                                  }
                                              </>
                                          )
                                      })
                                  }
                              </Grid>
                              <Grid  item sm={12} md={12} xs={12}>
                                  <Box className="BottomButtonSurvey">
                                      <Box className="Previewbtn">
                                          <Button onClick={this.handlePriviewData} variant="contained" color="primary">Edit</Button>
                                      </Box>
                                      <Box className="Publishbtn">
                                          <Button onClick={this.handleSurveyDataSubmit} type="submit" variant="outlined" color="primary">PUBLISH</Button>
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


export default withTranslation()(withRouter(SurveyPreview));
const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
