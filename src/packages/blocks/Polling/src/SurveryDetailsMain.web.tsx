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
    Divider, Dialog, DialogContent, DialogActions, IconButton, TextField, InputAdornment,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';
import moment from 'moment';
// Icons
import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
// Icons
import {CheckIcon} from "../../user-profile-basic/src/assets"
import SurveyDetailsMainController, {
  Props,
  configJSON,
} from "./SurveyDetailsMainController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import {withTranslation} from "react-i18next";
import CreateIcon from '@material-ui/icons/Create';
import TextEditor from "./TextEditorSurvey.web";
import CloseIcon from '@material-ui/icons/Close';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

class PollDetails extends SurveyDetailsMainController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    //@ts-ignore
    const {t} = this.props
    // @ts-ignore
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
                                        <Box display='flex'>
                                            <Box>
                                                <Typography className="PollNamedate">{t("End Date")}</Typography>
                                                <Typography className="PollNameText">
                                                    {/* June 7, 2022 */}
                                                    {/*{moment(this.state.SurveyPreviewAnswer?.end_date).format("MMMM DD, YYYY")}*/}
                                                    {this.state.SurveyPreviewAnswer?.end_date}
                                                </Typography>
                                            </Box>
                                            {
                                                this.state.SurveyPreviewAnswer.status == "ongoing" || this.state.SurveyPreviewAnswer.status == "upcoming" &&
                                                <IconButton onClick={()=> this.setState({dateWindow:true})} style={{padding:"3px",marginTop:"20px"}}><CreateIcon style={{color:"#FC8434",alignSelf:'flex-end'}} fontSize="small"/></IconButton>
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:15}}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box className="infoIcon">
                                            <Typography variant="subtitle1">{t("Description")}</Typography>
                                            <InfoIcon style={{color:"grey", fontSize:18}}/>
                                        </Box>
                                        {
                                            this.state.SurveyPreviewAnswer.status == "ongoing" || this.state.SurveyPreviewAnswer.status == "upcoming" &&
                                            <IconButton onClick={() => this.setState({descriptionWindow: true})}
                                                        style={{padding: "3px"}}><CreateIcon
                                                style={{color: "#FC8434", alignSelf: 'flex-end'}}
                                                fontSize="small"/></IconButton>
                                        }
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
                    {
                        this.state.SurveyPreviewAnswer.status == "ongoing" &&
                        <Grid xs={12} style={{display:"flex",justifyContent:"flex-end"}}>
                            <ReportButton variant="contained" color="primary" onClick={this.manageEnd}>
                                {t("End Survey")}
                            </ReportButton>
                        </Grid>
                    }
                </Container>
            </Grid>
        </Box>
    </Box>
          {/*Warning Dialog*/}
          <Dialog
              fullWidth
              onClose={this.closeCautionModal}
              open={this.state.cautionWindow}
              className="cancel-meeting-dialog"
          >
              <DialogContent style={{ margin: "15px 0" }}>
                  <Box textAlign="center">
                      <img className="comment-image" src={CheckIcon} alt="check" />
                      <Typography variant="h6">{t("End Survey")}</Typography>
                      <Typography variant="body1" style={{ marginBottom: "0px" }}>
                          {t("Are you sure you want to end this Survey?")}
                      </Typography>
                      <DialogActions className="dialog-button-group">
                          <Button className="cancel-button" style={{ width: "200px" }} onClick={() => this.closeCautionModal()}>
                              {t("Close")}
                          </Button>
                          <Button style={{ width: "200px" }} className="add-button" onClick={this.makeEndSurvey}>
                              {t("Confirm")}
                          </Button>
                      </DialogActions>
                  </Box>
              </DialogContent>
          </Dialog>
          {/*Date Dialog*/}
          <Dialog
              fullWidth
              onClose={()=>this.setState({dateWindow:false})}
              open={this.state.dateWindow}
              className="cancel-meeting-dialog"
          >
              <DialogContent style={{ margin: "15px 0",position:"relative"}}>
                  <Box style={{position:"absolute",top:"12px",right:"40px"}}>
                      <IconButton onClick={()=> this.setState({dateWindow:false})}>
                          <CloseIcon />
                      </IconButton>
                  </Box>
                  <Box>
                      <Box style={{width:"100%",textAlign:"center" }}>
                          <Typography variant="h5" style={{fontWeight:"bold"}}>{t("Edit End Date")}</Typography>
                      </Box>
                      <Box style={{width:"100%",display:'flex',justifyContent:'center',marginTop:"20px"}}>
                          <Box style={{display:"flex",width:"90%",flexDirection:'column'}}>
                              <Box className="infoIcon" style={{alignItems:'center'}}>
                                  <Typography variant="subtitle1" style={{marginBottom:"0px"}}>{t("End Date")}</Typography>
                                  <InfoIcon style={{color:"grey", fontSize:18}}/>
                              </Box>
                              <Box style={{width:"100%"}}>
                                  <TextField label="End Date" variant="outlined"
                                             type="date" name="endDate"  fullWidth
                                             style={{width:"100%",backgroundColor:"ghostwhite"}}
                                             id="SurveyQuestion"
                                             value={this.state.endDate}
                                             defaultValue={new Date(this.state.SurveyPreviewAnswer?.end_date)}
                                             onChange={(e)=> this.setState({endDate:e.target.value})}
                                             InputProps={{
                                                 // min: "2019-01-24",
                                                 //@ts-ignore
                                                 max: "5000-05-31",
                                                 startAdornment: (
                                                     <InputAdornment position="start">
                                                         <DateRangeOutlinedIcon />
                                                     </InputAdornment>
                                                 )
                                             }}
                                  />
                                  <p style={{color:"red"}}>{t(this.state.endDateError)}</p>
                              </Box>
                          </Box>
                      </Box>
                      <DialogActions className="dialog-button-group">
                          <Button style={{ width: "99%" }} className="add-button" onClick={this.updateEndDate}>
                              {t("Save")}
                          </Button>
                      </DialogActions>
                  </Box>
              </DialogContent>
          </Dialog>
          {/*Description Dialog*/}
          <Dialog
              fullWidth
              onClose={()=>this.setState({descriptionWindow:false})}
              open={this.state.descriptionWindow}
              className="cancel-meeting-dialog"
          >
              <DialogContent style={{ margin: "15px 0",position:"relative"}}>
                  <Box style={{position:"absolute",top:"12px",right:"40px"}}>
                      <IconButton onClick={()=> this.setState({descriptionWindow:false})}>
                          <CloseIcon />
                      </IconButton>
                  </Box>
                  <Box>
                      <Box style={{width:"100%",textAlign:"center" }}>
                          <Typography variant="h5" style={{fontWeight:"bold"}}>{t("Edit Description")}</Typography>
                      </Box>
                      <Box style={{width:"100%",display:'flex',justifyContent:'center',marginTop:"20px"}}>
                          <Box style={{display:"flex",width:"90%",flexDirection:'column'}}>
                              <Box className="infoIcon" style={{alignItems:'center'}}>
                                  <Typography variant="subtitle1" style={{marginBottom:"0px"}}>{t("Description")}</Typography>
                                  <InfoIcon style={{color:"grey", fontSize:18}}/>
                              </Box>
                              <Box className="descriptionEditorDetails" style={{maxHeight:"400px",overflow:"hidden"}}>
                                  <TextEditor
                                      // @ts-ignore
                                      markup={this.state.textEditor}
                                      onChange={this.onChangeTextEditor} />
                              </Box>
                              <p style={{color:"red"}}>{t(this.state.descriptionError)}</p>
                          </Box>
                      </Box>
                      <DialogActions className="dialog-button-group">
                          <Button style={{ width: "99%" }} className="add-button" onClick={this.updateDescription}>
                              {t("Save")}
                          </Button>
                      </DialogActions>
                  </Box>
              </DialogContent>
          </Dialog>
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
