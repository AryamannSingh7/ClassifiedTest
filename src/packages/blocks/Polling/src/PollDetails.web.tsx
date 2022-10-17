// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"
import DOMPurify from 'dompurify'
import {CheckMark, awated, allUsers} from "./assets"
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
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';

function createData(name:any, unit:any) {
    return { name, unit };
}

class PollDetails extends PollingController {
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
                        {t("Poll and survey")} / {t("Create a Poll")} / <Box component="span" style={{color: "blue"}}>{t("Poll Details")}</Box>
                        </Typography>
                        <Typography variant="h5" className="subHeading">{t("Poll Details")}</Typography>
                    </Box>
                </Box>
                <Grid container spacing={4} style={{marginTop: 15}}>
                    <Grid item sm={12} md={12} xs={12}>
                        <Box className="createPSCards">
                            <Box className="PreviewName">
                                <Box className="PollName">
                                    <Typography className="subHeading">{t("Poll Name:")} </Typography>
                                    <Typography className="PollNameText">
                                        {this.state.pollPreviewAnswer?.poll?.data?.attributes?.title}
                                    </Typography>
                                </Box>
                                    {
                                        (this.state.pollPreviewAnswer?.poll?.data?.attributes?.poll_type === true) ?
                                        <Box>
                                            <p className="AnonymousPreviewPoll">
                                                {t("Anonymous Poll")}
                                            </p>
                                            <p className="statusOngoing" style={{fontWeight: 600, marginLeft:"1rem"}}>
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes?.status}
                                            </p>
                                        </Box>
                                        :
                                        <Box>
                                            {
                                                this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "upcoming" &&
                                                <Typography variant="body1" className={"statusOngoingBlue"}>
                                                    {this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "upcoming" && <>{t('upcoming')}</>}
                                                </Typography>
                                            }
                                            {
                                                this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "ongoing" &&
                                                <Typography variant="body1" className={"statusOngoingRed"}>
                                                    {this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "ongoing" && <>{t('Ongoing')}</>}
                                                </Typography>
                                            }
                                            {
                                                this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "completed" &&
                                                <Typography variant="body1" className={"statusOngoingGreen"}>
                                                    {this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "completed" && <>{t('completed')}</>}
                                                </Typography>
                                            }
                                        </Box>
                                    }
                            </Box>

                            <Box className="DateSectionPreviewpoll">
                                <Box className="datebox">
                                    <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                    <Box>
                                        <Typography className="PollNamedate">{t("Start Date")}</Typography>
                                        <Typography className="PollNameText">
                                            {/* June 7, 2022 */}
                                            {this.state.pollPreviewAnswer?.poll?.data?.attributes?.start_date}</Typography>
                                    </Box>
                                </Box>
                                <Box className="datebox">
                                    <CalendarTodayOutlinedIcon style={{color:"grey", fontSize:22}}/>
                                    <Box>
                                        <Typography className="PollNamedate">{t("End Date")}</Typography>
                                        <Typography className="PollNameText">
                                            {/* June 7, 2022 */}
                                        {this.state.pollPreviewAnswer?.poll?.data?.attributes?.end_date}</Typography>
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
                                        { __html: DOMPurify.sanitize(this.state.pollPreviewAnswer?.poll?.data?.attributes?.description) }
                                    }
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Grid style={{marginTop: "2rem", marginBottom:"5rem"}} className="createPSCards">
                    <Grid item sm={12} md={12} xs={12}>
                        <Grid className="GenerateReport">
                            <Box>
                                <Typography className="PollNameText">
                                    {this.state.pollPreviewAnswer?.poll?.data?.attributes?.question}
                                </Typography>
                            </Box>
                            <Box>
                                <Button variant="contained" color="primary"
                                    disabled={this.state.pollPreviewAnswer?.poll?.data?.attributes?.poll_type}
                                    onClick={() => this.props.history.push(`/PollReport?id=${this.state.pollPreviewAnswerID}`)}
                                >
                                    {t("GENERATE REPORT")}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    {this.state.pollPreviewAnswer?.poll?.data?.attributes?.polling_options.length ?
                        this.state.pollPreviewAnswer?.poll?.data?.attributes?.polling_options.map((val) => {
                            return(
                                <Grid className="AnswersCount">
                                    <Grid sm={6} md={6} xs={6} style={{marginTop: "1.5rem"}}>
                                        <Box className="progressbarNO">
                                            <span>{val.text}</span>
                                            <progress
                                                className="progress"
                                                data-label={val.answer_percentage + "%"}
                                                value={val.answer_percentage}
                                                max="100"
                                            >
                                            </progress>
                                        </Box>
                                    </Grid>
                                    <Grid sm={2} md={2} xs={2} style={{marginTop: "1.5rem"}}>
                                        <Box className="VoteCount" onClick={() => val.answer_percentage > 0 && this.setState({showDialog : true,dialogText:val.text,dialogCount:val.answer_count})}>
                                            <p>{val.answer_count} {t("PEOPLE VOTED")}</p>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )
                        })
                        :
                        "No Options Are Available"
                    }

                <Dialog
                    onClose={() => this.setState({ showDialog: false })}
                    open={this.state.showDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="DialogTable"
                >
                    <DialogTitle id="alert-dialog-title" className="tableHeading" dividers>
                        <h4>{t("People voted for")} {this.state.dialogText}</h4>
                        <div onClick={() => this.setState({ showDialog: false })}
                        style={{cursor:"pointer"}}
                        >
                            <CloseRoundedIcon/>
                        </div>
                    </DialogTitle>
                    <Divider />
                    <Box className="tableBorder">
                        <Box class="tableTopSearch">
                            <h4>{this.state.dialogCount} {t("people")}</h4>
                            <div className="searchBox">
                                <div className="searchIcon">
                                <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search' }}
                                    style={{marginLeft:"2.5rem"}}
                                    onChange={this.handleReportSearch}
                                />
                            </div>
                        </Box>
                        <Divider />
                        <DialogActions>
                            <TableContainer >
                                <Table  aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{fontWeight:"600"}}>#</TableCell>
                                            <TableCell style={{fontWeight:"600"}} align="start">{t("Name")}</TableCell>
                                            <TableCell style={{fontWeight:"600"}} align="start">{t("Unit Number")}</TableCell>
                                            <TableCell style={{fontWeight:"600"}} align="start">{t("Response")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.generatePollReport?.map((row, index) => (
                                                    row.attributes?.name_and_option?.data?.attributes?.option === this.state.dialogText &&
                                                    <TableRow key={row.name}>
                                                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                                                        <TableCell align="start">{row.attributes?.name_and_option?.data?.attributes?.full_name}</TableCell>
                                                        <TableCell align="start">
                                                            {
                                                                row.attributes?.name_and_option?.data?.attributes?.unit_number?.map((item,key)=>{
                                                                    return(
                                                                        <>
                                                                            {item}
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </TableCell>
                                                        <TableCell align="start">{row.attributes?.name_and_option?.data?.attributes?.option}</TableCell>
                                                    </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogActions>
                    </Box>
                </Dialog>
                <Grid sm={5} md={5} xs={5} style={{marginTop: "1.5rem"}}>
                    <Box className="VoteCountBottom">
                        <Box className="VoteCountBottomBox" style={{marginRight:"20px"}}>
                            {
                                this.state.pollPreviewAnswer?.poll?.data?.attributes?.status == "completed" ?
                                <>
                                    <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                    <p>{this.state.pollPreviewAnswer?.poll?.data?.attributes?.awaited} {t("Response Not Received")}</p>
                                </> :
                                <>
                                    <img src={awated} alt="awated" />
                                    <p>{this.state.pollPreviewAnswer?.poll?.data?.attributes?.awaited} {t("Awaited")}</p>
                                </>
                            }
                        </Box>
                        <Box className="VoteCountBottomBox" >
                            <img src={CheckMark} alt="CheckMark" />
                            <p>{this.state.pollPreviewAnswer?.poll?.data?.attributes?.total_responses} {t("Response Received")}</p>
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

export default withTranslation()(withRouter(PollDetails));

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
