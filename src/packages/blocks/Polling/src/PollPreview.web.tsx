// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"
import DOMPurify from 'dompurify'

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {
    Container,
    Typography,
    TextField,
    Button,
    Link, withStyles,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
// Icons
import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js'   


class PollPreview extends PollingController {
  constructor(props: Props) {
    super(props);
    
  }

  componentDidMount() {
    const PreviewPollData = JSON.parse(localStorage.getItem('Polls_Data'));
    this.setState({PreViewPollData:PreviewPollData})
  }

  render() {
    const {t} = this.props
    return ( 
      <>
    <Box style={{background: "#F7F9FE"}}>
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
                            {t("Poll and survey")} / {t("Create a Poll")} / <Box component="span" style={{color: "blue"}}>{t("Poll Preview")}</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading bold-text" style={{fontSize:"30px"}}>{t("Poll Preview")}</Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={4} style={{marginTop: 1}}>
                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards" style={{backgroundColor:"#fcfcfc"}}>
                                <Box className="PreviewName">
                                    <Box className="PollName">
                                        <Typography className="subHeading" style={{padding:"0px"}}>{t("Poll Name:")} </Typography>
                                        <Typography className="PollNameText bold-text">
                                            {this.state.PreViewPollData?.PollFormData?.title}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {
                                            (this.state.PreViewPollData?.PollType === true) ? 
                                            <Typography variant="body2" className="AnonymousPreviewPoll">{t("Anonymous Poll")}</Typography>
                                             : ''
                                        }
                                    </Box>
                                </Box>
                                
                                <Box className="DateSectionPreviewpoll">
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:"25px"}}/>
                                        <Box>
                                            <Typography className="PollNamedate" style={{fontSize:"12px"}}>{t("Start Date")}</Typography>
                                            <Typography className="PollNameText bold-text" style={{fontSize:"15px"}}>
                                                {/* June 7, 2022 */}
                                                {moment(this.state.PreViewPollData?.PollFormData?.startDate).format("MMMM DD, YYYY")}</Typography>
                                        </Box>    
                                    </Box>
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:"25px"}}/>
                                        <Box>
                                            <Typography className="PollNamedate" style={{fontSize:"12px"}}>{t("End Date")}</Typography>
                                            <Typography className="PollNameText bold-text" style={{fontSize:"15px"}}>
                                                {/* June 7, 2022 */}
                                            {moment(this.state.PreViewPollData?.PollFormData?.endDate).format("MMMM DD, YYYY")}</Typography>
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
                                            { __html: DOMPurify.sanitize(this.state.PreViewPollData?.PollFormData?.description) }
                                        }
                                        
                                        />
                                           {/* {this.state.PreViewPollData?.PollFormData?.description}
                                        </Typography>  */}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards" style={{backgroundColor:"#fcfcfc"}}>
                                <Typography className="PollNameText bold-text" style={{fontSize: "20px",marginBottom:"15px"}}>
                                    {this.state.PreViewPollData?.PollFormData?.question}
                                </Typography>

                                {this.state.PreViewPollData?.PollOptions?.map((values:any) => {
                                    return(
                                        <Box style={{width:"450px",height:"60px",display:'flex',alignItems:'center',border:"1px solid #f0f0f0",backgroundColor:"white",marginBottom:"15px"}}>
                                            <Typography className="bold-text" style={{fontWeight:"bold",fontSize:"18px",marginLeft:"15px"}}>{values.text}</Typography>
                                        </Box>
                                    )
                                })}

                           </Box>
        
                        </Grid>

                    </Grid>

                    <Box className="BottomButton" style={{marginTop:"45px"}}>
                        <Link onClick={() => this.props.history.push("/CreatePolls")}>
                            <CancelButtonPoll variant="contained" color="primary">{t("EDIT")}</CancelButtonPoll>
                        </Link>
                        <PublishButtonPoll variant="outlined" color="primary"
                            // onClick={this.handlePollDataSubmit}
                        onClick={async (event) => {
                            await this.handlePollDataSubmit(event,true)
                        }}
                        >{t("PUBLISH")}</PublishButtonPoll>
                    </Box>
                </Container>
            </Grid>
        </Box>
    </Box>
    
     </>
      );
  }
}

export default withTranslation()(withRouter(PollPreview));

const CancelButtonPoll = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        borderRadius:"8px",
        fontWeight: "bold",
        height: "55px",
        width: "140px",
        "&:hover": {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

const PublishButtonPoll = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        borderRadius:"8px",
        fontWeight: "bold",
        height: "55px",
        width: "140px",
        border: "#2B6FED 1px solid",
    },
}))(Button);
// Customizable Area End
