import * as React from "react";
// @ts-ignore
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, Typography,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withRouter } from 'react-router';
import PollingController, {
  Props
} from "./PollingController";
import "./Polling.web.css"
import {withTranslation} from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioGroup from "@material-ui/core/RadioGroup";


class SubmitPoll extends PollingController {
  constructor(props: Props) {
    super(props);
  }
  render() {
      //@ts-ignore
      const {t} = this.props
    return (
        <>
    
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
            <ArrowBackIcon onClick={() => window.history.back()} />
            <p className='bold-text' style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                {this.state.pollPreviewAnswer.poll?.data?.attributes.title}
            </p>
          </Grid>
        </Grid>

    <Box style={{background: "#F7F9FE",height:"160vh",display:'flex',flexDirection:"column",alignItems:'center'}}>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                <p className="textwrapStatus bold-text" style={{ fontSize: '18px', fontWeight: 600 }}>
                    {this.state.pollPreviewAnswer.poll?.data?.attributes.title}
                </p>
            </Grid>
            <Box className="EventsIconsText">
                {
                    this.state.pollPreviewAnswer.poll?.data?.attributes.status == "ongoing" &&
                    <Typography variant="body2" className={"statusOngoingRed"}>{this.state.pollPreviewAnswer.poll?.data?.attributes.status}</Typography>
                }
                {
                    this.state.pollPreviewAnswer.poll?.data?.attributes.status == "completed" &&
                    <Typography variant="body2" className={"statusOngoingGreen"}>{this.state.pollPreviewAnswer.poll?.data?.attributes.status}</Typography>
                }
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
                        <p style={{color:"black", fontSize:'15px', marginTop:5}} className="pollDetailsPurpose"
                        dangerouslySetInnerHTML={
                          { __html: DOMPurify.sanitize(this.state.pollPreviewAnswer.poll?.data?.attributes.description) }
                        }
                        >
                        </p>
                    </Box>
                    <Box marginTop='1rem'>
                        <Typography variant="subtitle2" color="textSecondary">{t("End Date")}:</Typography>
                        <p style={{color:"black", fontSize:'15px', marginTop:5}}>
                          {this.state.pollPreviewAnswer.poll?.data?.attributes.end_date}
                        </p>
                    </Box>
                    <Box marginTop='1rem'>
                        <Typography variant="subtitle2" color="textSecondary">{t("Building")}:</Typography>
                        <p style={{color:"black", fontSize:'15px', marginTop:5}}>
                          {this.state.pollPreviewAnswer.poll?.data?.attributes.building_name}
                        </p>
                    </Box>
                </Box>
                <Box marginTop='1.5rem'>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        {t("Publishing Details")}
                    </p>
                </Box>
                <Box
                borderRadius="15px"
                bgcolor="white"
                marginTop='1rem'
                padding='1rem'
                >
                    <Box display='flex' marginTop='1rem'>
                        <AccountCircleOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>{t("Published By")}:</p>
                            <p style={{color:"black", fontSize:'1rem', marginTop:10}}>
                              {this.state.pollPreviewAnswer.poll?.data?.attributes.publish_by}
                            </p>
                        </Box>
                    </Box>
                   
                    <Box display='flex' marginTop='1.5rem'>
                        <DateRangeOutlinedIcon style={{color:'#054c94'}}/>
                        <Box marginLeft='0.5rem'>
                            <p>{t("Published Date")}:</p>
                            <p style={{color:"black", fontSize:'1rem', marginTop:10}}>
                              {this.state.pollPreviewAnswer.poll?.data?.attributes.publish_date}
                            </p>
                        </Box>
                    </Box>

                </Box>
                <Box marginTop='1.5rem'>
                    <p className="bold-text" style={{ fontSize: '1rem', fontWeight: 600 }}>
                    {this.state.pollPreviewAnswer.poll?.data?.attributes.question}
                    </p>
                </Box>
            </Grid>
        </Grid>

        {
          this.state.pollPreviewAnswer.poll?.data?.attributes.polling_options.map((data:any, i:any) => {
            return (
              <Grid container spacing={2}  key={data.id}
              style={{ marginLeft: '0',marginTop:'1.5rem', width: '90%', alignItems:'center'}}>
                <Grid xs={1}>
                    <RadioGroup aria-label="Type" id={data.id} style={{width:"30px",marginBottom:"10px"}} name="Type" value={this.state.pollOptionAnswer} onChange={(e) => this.getPollSelectedAnswer(parseInt(e.target.value))}>
                        <FormControlLabel
                            value={data.id}
                            control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252",padding:"0px"}} />}
                                            checkedIcon={<RadioButtonCheckedIcon style={{color:"#2b6fed",padding:"0px"}} />} />} label="" style={{padding:"0px",marginBottom:"10px"}} />
                    </RadioGroup>
                </Grid>
                <Grid xs={11}>
                    <label 
                      className="para"
                      htmlFor={data.id}
                    >
                        {
                            console.log("this.state.pollOptionAnswer",this.state.pollOptionAnswer,data.id)
                        }
                    <Box
                        style={
                            this.state.pollOptionAnswer === data.id ?
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
                                backgroundColor: "#F9F9F9",
                                border:"1px solid #f0f0f0",
                                borderRadius: '5rem',
                                marginBottom: 14,
                                boxShadow: "none",
                                color: "#212121",
                                fontWeight: 600,
                                fontSize: '1rem',
                                padding: '1rem'
                            }
                        }
                        onClick={(e) => this.getPollSelectedAnswer(parseInt(data.id))}
                        >  
                          {data.text}
                    </Box>
                  </label>
                </Grid>
              </Grid>
  
            )
          })
        }

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <Button
              fullWidth={true}
              className={'btn'}
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#2B6FEC",
                borderRadius: '5rem',
                height: 54,
                marginBottom: 14,
                boxShadow: "none",
                color: "#F7F7FC",
                fontWeight: 600,
                fontSize: 16,
                marginTop: 30
              }}
              onClick={this.handlePollAnswerSubmited}
            >
                {t("VOTE NOW")}
            </Button>
          </Grid>
        </Grid>
    </Box>
    </>
    );
  }
}

// @ts-ignore
export default withTranslation()(withRouter(SubmitPoll))

// Customizable Area End
