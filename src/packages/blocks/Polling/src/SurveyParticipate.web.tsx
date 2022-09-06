//@ts-ignore
//@ts-nocheck

import * as React from "react";
import DOMPurify from 'dompurify'
// custom components
import {
    Button, Grid, Box, TextField, Typography, LinearProgress,InputAdornment
} from "@material-ui/core";
import {clipBoard} from "./assets"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { withRouter } from 'react-router';
import PollingController, {
  Props
} from "./PollingController.tsx";
import Loader from "../../../components/src/Loader.web";
import "./Polling.web.css"

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

class PollVoteSubmitted extends PollingController {
  constructor(props: Props) {
    super(props);
    this.state = {
        totalQuestion:0,
        currentQuestion:0,
    }
  }

    async componentDidMount(): Promise<void> {
        console.log("QUESTION LENGTH",exampleQuestion.length)
        this.setState({
            totalQuestion:exampleQuestion.length - 1,
        })
    }

    render() {
    return (
        <>
    
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
            <ArrowBackIcon onClick={() => this.props.history.push("/PollsSurvey")} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              Survey Title
            </p>
          </Grid>
        </Grid>

    <Box style={{background: "#E5ECFF",height:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}}>
        <Box >
            <Box style={{marginTop:"10px"}}>
                {
                    console.log("(100/this.state.totalQuestion+1)*(this.state.currentQuestion+1)",(100/(this.state.totalQuestion+1))*(this.state.currentQuestion+1))
                }
                <BorderLinearProgress variant="determinate" value={(100/(this.state.totalQuestion+1))*(this.state.currentQuestion+1)}/>
            </Box>
            <Box style={{margin:"1rem",display:'flex',flexDirection:"column",alignItems:'center'}}>
                <Box>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        {
                            exampleQuestion[this.state.currentQuestion]?.question
                        }
                    </p>
                </Box>
                <Box style={{width:"100%",marginLeft:"-25px"}}>
                    {
                        exampleQuestion[this.state.currentQuestion]?.options.map((data, i) => {
                            return (
                                <Grid container key={data.id}
                                      style={{ marginLeft: '1rem',marginTop:'1.5rem', width: '90%', alignItems:'baseline'}}>
                                    <Grid xs={1}>
                                        <input type="radio" id={data.id}
                                               name="options" value={data.id}
                                            // checked={this.state.pollOptionAnswer}
                                               onChange={(e) => this.getPollSelectedAnswer(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid xs={11}>
                                        <label
                                            className="para"
                                            for={data.id}
                                        >
                                            <Box
                                                style={{
                                                    backgroundColor: "#2B6FEC",
                                                    borderRadius: '5rem',
                                                    marginBottom: 14,
                                                    boxShadow: "none",
                                                    color: "#F7F7FC",
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    padding: '1rem'
                                                }}
                                            >
                                                {data.text}
                                            </Box>
                                        </label>
                                    </Grid>
                                </Grid>

                            )
                        })
                    }
                </Box>
                {
                    exampleQuestion[this.state.currentQuestion]?.showTextBox &&
                    <Box style={{marginLeft: "-15px"}}>
                        <Typography varian="subtitle2" style={{fontWeight:"bold"}}>{exampleQuestion[this.state.currentQuestion]?.textBoxLabel}</Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="filled"
                            fullWidth
                            style={{marginTop:"15px",border:"1px solid gray",borderRadius:"15px"}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={clipBoard} />
                                    </InputAdornment>
                                ),
                                disableUnderline: true
                            }}
                        />
                    </Box>
                }
            </Box>
        </Box>
        <Grid container spacing={2} style={{position:"absolute",bottom:"0px", margin: '1rem', width: '90%' }}>
            {
                this.state.currentQuestion !== 0 && this.state.currentQuestion !== this.state.totalQuestion &&
                <>
                    <Grid item xs={6}>
                        <Button onClick={()=> this.setState({currentQuestion:this.state.currentQuestion - 1})} fullWidth variant="text" style={{borderRadius:"50px",}} size="large" color="primary">Back</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=> this.setState({currentQuestion:this.state.currentQuestion + 1})} fullWidth variant="contained" style={{borderRadius:"50px",}} size="large" color="primary">Next</Button>
                    </Grid>
                </>
            }
            {
                this.state.currentQuestion === 0 &&
                <Grid item xs={12}>
                    <Button onClick={()=> this.setState({currentQuestion:this.state.currentQuestion + 1})} fullWidth variant="contained" style={{borderRadius:"50px",}} size="large" color="primary">Next</Button>
                </Grid>
            }
            {
                this.state.currentQuestion === this.state.totalQuestion &&
                <Grid item xs={12}>
                    <Button onClick={()=> console.log("SUBMITTED")} fullWidth variant="contained" style={{borderRadius:"50px",}} size="large" color="primary">Submit</Button>
                </Grid>
            }
       </Grid>
    </Box>

      </>
    );
  }
}
export default withRouter(PollVoteSubmitted)

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
