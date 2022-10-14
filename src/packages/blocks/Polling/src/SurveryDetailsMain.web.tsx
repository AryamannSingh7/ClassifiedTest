// Customizable Area Start
import React from "react";
import "./Polling.web.css";
// @ts-ignore
import DOMPurify from 'dompurify'
import {CheckMark, awated} from "./assets"
import {
  Container,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';
import moment from 'moment';
// Icons
import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
// Icons

import SurveyDetailsMainController, {
  Props,
  configJSON,
} from "./SurveyDetailsMainController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import {withTranslation} from "react-i18next";

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

class PollDetails extends SurveyDetailsMainController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
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
                                {t("Poll and survey")} / {t("Create Surveys")} / <Box component="span" style={{color: "blue"}}>{t("Survey Details")}</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">{t("Survey Details")}</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={4} style={{marginTop: 15}}>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Box className="PreviewName">
                                    <Box className="PollName">
                                        <Typography className="subHeading">{t("Survey Name")}: </Typography>
                                        <Typography className="PollNameText textwrap">
                                            {this.state.SurveyPreviewAnswer.title}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {
                                            this.state.SurveyPreviewAnswer.status == "upcoming" &&
                                            <Typography variant="body1" className={"statusOngoingBlue"}>{this.state.SurveyPreviewAnswer.status}</Typography>
                                        }
                                        {
                                            this.state.SurveyPreviewAnswer.status == "ongoing" &&
                                            <Typography variant="body1" className={"statusOngoingRed"}>{this.state.SurveyPreviewAnswer.status}</Typography>
                                        }
                                        {
                                            this.state.SurveyPreviewAnswer.status == "completed" &&
                                            <Typography variant="body1" className={"statusOngoingGreen"}>{this.state.SurveyPreviewAnswer.status}</Typography>
                                        }
                                    </Box>
                                </Box>
                                
                                <Box className="DateSectionPreviewpoll">
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">{t("Start Date")}</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                                {/*{moment(this.state.SurveyPreviewAnswer?.start_date).format("MMMM DD, YYYY")}*/}
                                                {this.state.SurveyPreviewAnswer?.start_date}
                                            </Typography>
                                        </Box>    
                                    </Box>
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">{t("End Date")}</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                                {/*{moment(this.state.SurveyPreviewAnswer?.end_date).format("MMMM DD, YYYY")}*/}
                                                {this.state.SurveyPreviewAnswer?.end_date}
                                            </Typography>
                                        </Box>    
                                    </Box>
                                </Box>
                                <Box style={{marginTop:15}}>
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">{t("Description")}</Typography>
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box style={{marginTop:5, overflowWrap:"break-word"}}>
                                        <Typography variant="body2"
                                        dangerouslySetInnerHTML={
                                            { __html: DOMPurify.sanitize(this.state.SurveyPreviewAnswer?.description) }
                                        }
                                        />
                                    </Box>
                                </Box>
                                <Box className="PollName" style={{marginTop:15}}>
                                    <Typography className="subHeading">{t("Target Audience")}: </Typography>
                                    <Typography className="PollNameText" style={{color:"#2B6FED"}}>
                                        {this.state.SurveyPreviewAnswer.survey_audience_name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    
                    <Grid style={{marginTop: "2rem", marginBottom:"2rem"}} className="createPSCards">
                        <Grid container style={{display:"flex",alignItems:"center"}}>
                            <Grid xs={8}>
                                <Box className="VoteCountBottom">
                                    <Box className="VoteCountBottomBox">
                                        <img src={awated} alt="awated" />
                                        <p>{this.state.SurveyPreviewAnswer?.awaited} {t("Awaited")}</p>
                                    </Box>
                                    <Box className="VoteCountBottomBox" style={{paddingLeft:"50px"}}>
                                        <img src={CheckMark} alt="CheckMark" />
                                        <p>{this.state.SurveyPreviewAnswer?.total_response} {t("Response Received")}</p>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid  xs={4} style={{display:'flex',justifyContent:"flex-end"}}>
                                <Box>
                                    <ReportButton variant="contained" color="primary"
                                            onClick={() => this.props.history.push(`/SurveyReport?id=${this.state.SurveyPreviewAnswerID}`)}
                                    >
                                        {t("GENERATE REPORT")}
                                    </ReportButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{marginBottom:"5rem"}} className="createPSCards">
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">{this.state.SurveyPreviewAnswer?.survey_questions?.length} {t("Questions")}</Typography>
                        </Grid>
                        <Grid>
                            {
                                this.state.SurveyPreviewAnswer?.survey_questions?.length > 0 &&
                                this.state.SurveyPreviewAnswer?.survey_questions?.map((item:any,key:any)=>{
                                    console.log("THIS IS QUESTIONS",item)
                                    return(
                                        <>
                                            <Box style={{margin:"10px 0px"}}>
                                                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{key+1}. {item.title}</Typography>
                                                {
                                                    item.question_type === "short_answers" ?
                                                        <Typography style={{marginTop:"5px"}}>{t("Short Answer")}</Typography> :
                                                        <Box style={{display:'flex'}}>
                                                            <Typography style={{marginTop:"5px",marginRight:"5px"}}>{item.question_type === "checkbox" ? t("Multiple Choice Question"):t("Options")}</Typography>
                                                            <Typography style={{marginTop:"5px",marginRight:"5px"}}>|</Typography>
                                                            {
                                                                item.survey_options.map((ans:any,key1:any)=>{
                                                                    return(
                                                                        <Typography key={key1} style={{marginTop:"5px",marginRight:"10px"}}>{alphabet[key1]}. {ans.text}</Typography>
                                                                    )
                                                                })
                                                            }
                                                        </Box>
                                                }

                                            </Box>
                                            {
                                                (key + 1) !== this.state.SurveyPreviewAnswer?.survey_questions?.length &&
                                                <Divider/>
                                            }

                                        </>
                                    )
                                })
                            }
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

export default withTranslation()(withRouter(PollDetails))

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}

const ReportButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#2B6FED",
        '&:hover': {
            backgroundColor: "#2B6FED",
        },
    },
}))(Button);

// Customizable Area End
