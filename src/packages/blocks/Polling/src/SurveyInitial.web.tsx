//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, TextField, Typography, withStyles,
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
import {withTranslation} from "react-i18next";


class SurveyInitial extends SurveyInitialController {
  constructor(props: Props) {
    super(props);
  }
  render() {
    //@ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                    <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                        <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                            <ArrowBackIcon onClick={() => window.history.back()} />
                            <p className='bold-text' style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                                {this.state.SurveyPreviewAnswer.title}
                            </p>
                        </Box>
                    </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE"}}>
                <Box style={{width:"100%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}}>
                    <Grid container style={{ margin: '1rem 1rem', width: '90%' }}>
                        <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                            <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:".5rem"}}>
                                <p  className="textwrapStatus bold-text" style={{ fontSize: '18px', fontWeight: 600 }}>
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
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">{t("Purpose")}:</Typography>
                                    <p style={{color:"black", fontSize:'1.1rem', marginTop:5}} className="pollDetailsPurpose"
                                       dangerouslySetInnerHTML={
                                           { __html: DOMPurify.sanitize(this.state.SurveyPreviewAnswer.description) }
                                       }
                                    >
                                    </p>
                                </Box>
                                <Box marginTop='1rem'>
                                    <Typography variant="subtitle2" color="textSecondary">{t("End Date")}:</Typography>
                                    <p style={{color:"black", fontSize:'1rem', marginTop:5}}>
                                        {this.state.SurveyPreviewAnswer.end_date}
                                    </p>
                                </Box>
                                <Box marginTop='1rem'>
                                    <Typography variant="subtitle2" color="textSecondary">{t("Building")}:</Typography>
                                    <p style={{color:"black", fontSize:'1rem', marginTop:5}}>
                                        {this.state.SurveyPreviewAnswer.building_name}
                                    </p>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Box marginTop='1.5rem'>
                                <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                                    {t("Publishing Details")}
                                </p>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Box
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='0.5em'
                                padding='1rem'
                            >
                                <Box display='flex'>
                                    <AccountCircleOutlinedIcon style={{color:'#054c94'}}/>
                                    <Box marginLeft='0.5rem'>
                                        <p>{t("Published By")}:</p>
                                        <p style={{color:"black", fontSize:'1rem', marginTop:10}}>
                                            {this.state.SurveyPreviewAnswer.publish_by}
                                        </p>
                                    </Box>
                                </Box>

                                <Box display='flex' marginTop='1.5rem'>
                                    <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                                    <Box marginLeft='0.5rem'>
                                        <p>{t("Published Date")}:</p>
                                        <p style={{color:"black", fontSize:'1rem', marginTop:10}}>
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
                    <Grid container style={{marginLeft: '1rem', marginRight: '1rem',width: '90%',marginBottom:"50px",marginTop:"80px"}}>
                        {
                            this.state.SurveyPreviewAnswer.flag ?
                                <TakeSurveyButton variant="contained" onClick={() => this.props.history.push(`SurveyResponse?id=${this.state.SurveyPreviewAnswerID}`)} fullWidth style={{borderRadius:"50px",}} size="large" color="primary">View My Response</TakeSurveyButton>
                                :
                                <TakeSurveyButton variant="contained" onClick={() => this.props.history.push(`/SurveyParticipate?id=${this.state.SurveyPreviewAnswerID}`)} fullWidth style={{borderRadius:"50px",}} size="large" color="primary">Take The Survey</TakeSurveyButton>
                        }
                    </Grid>
                </Box>
            </Box>
                <Box style={{background: "#F7F9FE",width:"100%",height:"10vh"}}>
                </Box>
            </Grid>
      </>
    );
  }
}
export default withTranslation()(withRouter(SurveyInitial))

const TakeSurveyButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        borderRadius:"8px",
        fontWeight: "bold",
        height: "55px",
        width: "100%",
        "&:hover": {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
