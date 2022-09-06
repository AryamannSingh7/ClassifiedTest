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
  Link,
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
    this.setState({PreViewPollData:PreviewPollData},
        () => console.log("PreViewPollData ====>>>>>",  this.state.PreViewPollData)
    )
    
    // var htmlString = this.state.PreViewPollData?.PollFormData?.description
    // var plainString = htmlString.replace(/<[^>]+>/g, '')
    //     console.log("plainString*******", plainString)
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
                            {t("Poll and survey")} / {t("Create a Poll")} / <Box component="span" style={{color: "blue"}}>{t("Poll Preview")}</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">{t("Poll Preview")}</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={4} style={{marginTop: 15}}>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Box className="PreviewName">
                                    <Box className="PollName">
                                        <Typography className="subHeading">{t("Poll Name:")} </Typography>
                                        <Typography className="PollNameText">
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
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">{t("Start Date")}</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                                {moment(this.state.PreViewPollData?.PollFormData?.startDate).format("MMMM DD, YYYY")}</Typography>
                                        </Box>    
                                    </Box>
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">{t("End Date")}</Typography>
                                            <Typography className="PollNameText">
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
                            <Box className="createPSCards">
                                <Typography className="PollNameText">
                                    {this.state.PreViewPollData?.PollFormData?.question}
                                </Typography>

                                {this.state.PreViewPollData?.PollOptions?.map((values:any) => {
                                    return(
                                        <TextField  value={values.text} name={values.text} variant="outlined" fullWidth style={{marginTop:20}}/>
                                    )
                                })}

                           </Box>
        
                        </Grid>

                    </Grid>

                    <Box className="BottomButton">
                        <Link onClick={() => this.props.history.push("/CreatePolls")}>
                            <Button variant="contained" color="primary">{t("EDIT")}</Button>
                        </Link>
                        <Button variant="outlined" color="primary" 
                            // onClick={this.handlePollDataSubmit}
                        onClick={async (event) => {
                            await this.handlePollDataSubmit(event,true)
                        }}
                        >{t("PUBLISH")}</Button>
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

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
