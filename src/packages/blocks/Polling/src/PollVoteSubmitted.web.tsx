import * as React from "react";
// @ts-ignore
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, TextField, Typography,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withRouter } from 'react-router';
import PollingController, {
  Props
} from "./PollingController";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"
import {withTranslation} from "react-i18next";


class PollVoteSubmitted extends PollingController {
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
                            {this.state.pollPreviewAnswer?.poll?.data.attributes.title}
                        </p>
                    </Box>
                </Grid>
            </Grid>
            <Box style={{background: "#F7F9FE",minHeight:"95vh",display:'flex',flexDirection:"column",alignItems:'center'}}>

            <Grid container style={{ margin: '1rem', width: '90%' }}>
              <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",width:"60%"}}>
                    <p className="textwrapStatus bold-text" style={{ fontSize: '18px', fontWeight: 600 }}>
                    {this.state.pollPreviewAnswer?.poll?.data.attributes.title}
                    </p>
                </Grid>
                <Box className="EventsIconsText">
                    {
                        this.state.pollPreviewAnswer?.poll?.data.attributes.status == "ongoing" &&
                        <Typography variant="body2" className={"statusOngoingRed"}>{this.state.pollPreviewAnswer?.poll?.data.attributes.status}</Typography>
                    }
                    {
                        this.state.pollPreviewAnswer?.poll?.data.attributes.status == "completed" &&
                        <Typography variant="body2" className={"statusOngoingGreen"}>{this.state.pollPreviewAnswer?.poll?.data.attributes.status}</Typography>
                    }
                    {/*<p className="statusCompleted" style={{fontWeight: 600}}>{this.state.pollPreviewAnswer?.poll?.data.attributes.status}</p>*/}
                </Box>
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
                            <Typography style={{color:"black", fontSize:'15px', marginTop:5}} className="pollDetailsPurpose"
                              dangerouslySetInnerHTML={
                                { __html: DOMPurify.sanitize(this.state.pollPreviewAnswer?.poll?.data.attributes.description) }
                              }
                            >
                            </Typography>
                        </Box>
                        <Box marginTop='1rem'>
                            <Typography variant="subtitle2" color="textSecondary">{t("End Date")}:</Typography>
                            <Typography style={{color:"black", fontSize:'15px', marginTop:5}}>
                              {this.state.pollPreviewAnswer?.poll?.data.attributes.end_date}
                            </Typography>
                        </Box>
                        <Box marginTop='1rem'>
                            <Typography variant="subtitle2" color="textSecondary">{t("Building")}:</Typography>
                            <Typography style={{color:"black", fontSize:'15px', marginTop:5}}>
                              {this.state.pollPreviewAnswer?.poll?.data.attributes.building_name}
                            </Typography>
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
                    marginTop='0.5rem'
                    padding='1rem'
                    >
                        <Box display='flex'>
                            <AccountCircleOutlinedIcon style={{color:'#054c94'}}/>
                            <Box marginLeft='0.5rem'>
                                <p>{t("Published By")}:</p>
                                <p style={{color:"black", fontSize:'1rem', marginTop:5}}>
                                {this.state.pollPreviewAnswer?.poll?.data.attributes.publish_by}
                                </p>
                            </Box>
                        </Box>

                        <Box display='flex' marginTop='1rem'>
                            <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                            <Box marginLeft='0.5rem'>
                                <p>{t("Published Date")}:</p>
                                <p style={{color:"black", fontSize:'1rem', marginTop:5}}>
                                  {this.state.pollPreviewAnswer?.poll?.data.attributes.publish_date}
                                </p>
                            </Box>
                        </Box>

                    </Box>
                  </Grid>
                  <Grid xs={12}>
                    <Box marginTop='1.5rem'>
                        <p className="bold-text" style={{ fontSize: '1rem', fontWeight: 600 }}>
                        {this.state.pollPreviewAnswer?.poll?.data.attributes.question}
                        </p>
                    </Box>
                  </Grid>
            </Grid>

            {this.state.pollPreviewAnswer?.poll?.data.attributes.polling_options.length ?
              this.state.pollPreviewAnswer?.poll?.data.attributes.polling_options.map((item:any) => {
              return(
                <Grid container spacing={2} style={{ background: "#F7F9FE",marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
                  <Grid xs={12}>
                      <Box className="progressbarYES">
                          <span>{item.text}</span>
                          <progress
                            className="progress"
                            data-label={item.answer_percentage.toFixed(2) + "%"}
                            value={item.answer_percentage}
                            max="100"
                            style={{color:"white"}}
                          >
                          </progress>
                      </Box>
                  </Grid>
                </Grid>
              )
            })
            :
                t("No options are available")
            }

            <Grid container style={{ margin: '1rem', width: '90%' }}>
              <Grid xs={12} style={{display:"flex"}}>
                <p style={{color:"black", fontSize:'0.9rem', marginTop:10}}>{t("Your Vote")} :{" "}</p>
                <p style={{color:"red", fontSize:'0.9rem', fontWeight: 600 , marginTop:10}}>
                  {this.state.pollPreviewAnswer?.poll?.data.attributes.your_answer}
                </p>
              </Grid>
            </Grid>
        </Box>
        </Grid>
      </>
    );
  }
}
// @ts-ignore
export default withTranslation()(withRouter(PollVoteSubmitted))

// Customizable Area End
