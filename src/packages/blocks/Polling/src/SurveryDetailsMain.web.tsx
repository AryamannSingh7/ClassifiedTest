// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"
import DOMPurify from 'dompurify'
import {CheckMark, awated} from "./assets"
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Dialog,
  DialogActions,
  DialogTitle,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  InputBase
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createTheme, withStyles} from '@material-ui/core/styles';

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
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SearchIcon from '@material-ui/icons/Search';

function createData(name:any, unit:any) {
    return { name, unit };
}
const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 35),
    createData('Ginger', 56),
    createData('bread', 56),
    createData('Gingerbread', 56),
    createData('Gingerbread', 35),
    createData('Ginger', 56),
    createData('bread', 56),
    createData('Gingerbread', 56),
];


class PollDetails extends PollingController {
  constructor(props: Props) {
    super(props);
    
  }

  render() {
    console.log("poll pollPreviewAnswer #######", this.state.pollPreviewAnswer?.poll?.data)
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
                            Poll and survey / Created Surveys / <Box component="span" style={{color: "blue"}}>Survey Details</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Survey Details</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={4} style={{marginTop: 15}}>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Box className="PreviewName">
                                    <Box className="PollName">
                                        <Typography className="subHeading">Survey Name: </Typography>
                                        <Typography className="PollNameText">
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes?.title}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <p className="statusOngoing" style={{fontWeight: 600, marginLeft:"1rem"}}>
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes?.status || "STATUS"}
                                        </p>
                                    </Box>
                                </Box>
                                
                                <Box className="DateSectionPreviewpoll">
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">Start Date</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                                {this.state.pollPreviewAnswer?.poll?.data?.attributes?.start_date || "June 7, 2022"}</Typography>
                                        </Box>    
                                    </Box>
                                    <Box className="datebox">
                                        <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                        <Box>
                                            <Typography className="PollNamedate">End Date</Typography>
                                            <Typography className="PollNameText">
                                                {/* June 7, 2022 */}
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes?.end_date || "June 7, 2022"}</Typography>
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
                                            { __html: DOMPurify.sanitize(this.state.pollPreviewAnswer?.poll?.data?.attributes?.description) }
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
                    
                    <Grid style={{marginTop: "2rem", marginBottom:"2rem"}} className="createPSCards">
                        <Grid container style={{display:"flex",alignItems:"center"}}>
                            <Grid xs={8}>
                                <Box className="VoteCountBottom">
                                    <Box className="VoteCountBottomBox">
                                        <img src={awated} alt="awated" />
                                        <p>{this.state.pollPreviewAnswer?.poll?.data?.attributes?.awaited} Awaited</p>
                                    </Box>
                                    <Box className="VoteCountBottomBox" style={{paddingLeft:"50px"}}>
                                        <img src={CheckMark} alt="CheckMark" />
                                        <p>{this.state.pollPreviewAnswer?.poll?.data?.attributes?.total_responses} Response Received</p>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid  xs={4} style={{display:'flex',justifyContent:"flex-end"}}>
                                <Box>
                                    <ReportButton variant="contained" color="primary"
                                            onClick={() => this.props.history.push(`/SurveyReport?id=${this.state.pollPreviewAnswerID}`)}
                                    >
                                        GENERATE REPORT
                                    </ReportButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{marginBottom:"5rem"}} className="createPSCards">
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">{3} Questions</Typography>
                        </Grid>
                        <Grid>
                            <Box style={{margin:"10px 0px"}}>
                                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{1}. {"Should we need to charge for extra vehicle parking?"}</Typography>
                                <Typography style={{marginTop:"5px"}}>Textfield</Typography>
                            </Box>
                            <Divider/>
                            <Box style={{margin:"20px 0px"}}>
                                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{2}. {"Do we have need to security Camers?"}</Typography>
                                <Box style={{display:'flex'}}>
                                    <Typography style={{marginTop:"5px",marginRight:"5px"}}>Option</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"5px"}}>|</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"10px"}}>A. Yes</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"10px"}}>B. No</Typography>
                                </Box>
                            </Box>
                            <Divider/>
                            <Box style={{margin:"20px 0px"}}>
                                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{3}. {"Should we need to charge for extra services?"}</Typography>
                                <Box style={{display:'flex'}}>
                                    <Typography style={{marginTop:"5px",marginRight:"5px"}}>Checkbox</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"5px"}}>|</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"10px"}}>A. Yes</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"10px"}}>B. No</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"10px"}}>C. Maybe</Typography>
                                    <Typography style={{marginTop:"5px",marginRight:"10px"}}>D. Later</Typography>
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

export default withRouter(PollDetails)

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
