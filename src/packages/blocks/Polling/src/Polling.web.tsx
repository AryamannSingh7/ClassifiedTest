// Customizable Area Start

import React from "react";
import "./Polling.web.css"

// @ts-ignore
import DOMPurify from 'dompurify'

import {
  Container,
  Typography,
  Link,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Divider from '@material-ui/core/Divider';
// Icons

import {pollandsurvey, pollcreate, surveycreate,allUsers} from "./assets"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
class Polling extends PollingController {
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
            <Container className="link-decoration">
                <Box className="navigation">
                    <Box>
                        <Typography variant="body1" >
                        {t("My Dashboard")} / <Box component="span" style={{color: "blue"}}>{t("Poll and surveys")}</Box>
                        </Typography>
                        <Typography variant="h5" className="subHeading">{t("Poll / Surveys")}</Typography>
                    </Box>
                    <Box>
                        <FormControl className='YearMain'>
                            <NativeSelect className='yearSelection'
                            value={this.state.Year} onChange={this.handleChange}>
                                <option value="This Week">{t("This Week")}</option>
                                <option value="This Month">{t("This Month")}</option>
                                <option value="This Year">{t("This Year")}</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Box>
                <Grid container spacing={4} style={{marginTop: 15}} className="link-decoration">
                    <Grid item sm={6} md={4} xs={12}>
                        <Box className="CreatePS" onClick={() => {  this.setState({ showDialog: true})}}>
                            <Box sx={{ml:1, mb:2}} >
                                <img src={pollandsurvey} alt="pollandsurvey" />
                            </Box>
                            <Typography  className="CreatePSHeading">{t("Create a New Polls/Survey")}</Typography>
                        </Box>
                    </Grid>

                    <Dialog
                        open={this.state.showDialog}
                        onClose={() => this.setState({ showDialog: false })}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="DialogMainBox"
                        scroll="paper"
                    >
                        <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>{t("Choose Options")}</DialogTitle>
                        <Box style={{ display: "flex", marginLeft: 50, marginRight: 50}}>
                            <DialogActions disableSpacing style={{flexDirection:"row",marginTop:'0px'}}>
                                <div
                                    onClick={() => {
                                        this.setState({ showDialog: false})
                                        // @ts-ignore
                                        this.props.history.push("/CreatePolls")
                                    }}
                                    className="dialogOption"
                                >
                                    <img src={pollcreate} alt="pollcreate" className="DialogIcons"/>
                                    <p>{t("Create Poll")}</p>
                                </div>
                                <div
                                    onClick={() => {
                                        this.setState({ showDialog: false})
                                        // @ts-ignore
                                        this.props.history.push("/CreateSurveys")
                                    }}
                                    className="dialogOption"
                                >
                                    <img src={surveycreate} alt="surveycreate" className="DialogIcons"/>
                                    <p>{t("Create Survey")}</p>
                                </div>
                            </DialogActions>
                        </Box>
                    </Dialog>

                    <Grid item sm={6} md={4} xs={12}>
                        {/*@ts-ignore*/}
                        <Box className="Cards" onClick={() => this.props.history.push("/PollsallData")}>
                            <Box sx={{ml:1, mb:2}} className="CardsIcons">
                                <img src={pollcreate} alt="pollcreate" />
                            </Box>
                            <Typography className="subHeading">{t("Polls Created")}</Typography>
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2" className="bottomColor">
                                    {this.state.totalPollsCount.polls_count ? this.state.totalPollsCount.polls_count : ''}
                                </Typography>
                            </Box>
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2">
                                    {t("Last poll created on")} {this.state.totalPollsCount.last_poll_created_at ? this.state.totalPollsCount.last_poll_created_at : ''}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item sm={6} md={4} xs={12}>
                        {/*@ts-ignore*/}
                        <Box className="Cards" onClick={() => this.props.history.push("/CreateSurveys")}>
                            <Box sx={{ml:1, mb:2}} className="CardsIcons">
                            <img src={surveycreate} alt="surveycreate" />
                            </Box>
                            <Typography className="subHeading">{t("Surveys Created")}</Typography>
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2" className="bottomColor">344</Typography>
                            </Box>
                            <Box className="bottomTwoSpan">
                                <Typography variant="body2">{t("Last Survey created on")} 12-02-2022</Typography>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>

                <Box className="RecentItems">
                    <Typography className="Recenttitle">{t("Recent Polls")}</Typography>
                    <Link href="/PollsallData" >
                        <Typography className="ViewAll">{t("View All")}</Typography>
                    </Link>
                </Box>

                <Grid container spacing={4} style={{marginTop: 15, marginBottom:30}}>

                    {
                        this.state.recentPolls.length ?
                         this.state.recentPolls.map((data:any) => {
                            return(
                                <>
                                <Grid item sm={6} md={4} xs={12} key={data.id}>
                                    <Box className="EventsCards"
                                    // @ts-ignore
                                    onClick={() => this.props.history.push("/PollDetails?id=" + data.id)}
                                    >
                                        <Box className="EventsIconsText">
                                            {
                                                data.status == "upcoming" &&
                                                <Typography variant="body2" className={"statusOngoingBlue"}>
                                            {

                                              data.status == "upcoming" && <>{t('upcoming')}</>
                                            }
                                                  </Typography>
                                            }
                                            {
                                                data.status == "ongoing" &&
                                                <Typography variant="body2" className={"statusOngoingRed"}>

                                            {

                                              data.status == "ongoing" && <>{t('Ongoing')}</>
                                            }
                                                </Typography>
                                            }
                                            {
                                                data.status == "completed" &&
                                                <Typography variant="body2" className={"statusOngoingGreen"}>

                                            {

                                              data.status == "completed" && <>{t('completed')}</>
                                            }

                                                </Typography>
                                            }
                                        </Box>
                                        <Box className="EventsIconsText">
                                            <Typography className="EventsTitle">{data.title}</Typography>
                                        </Box>
                                        <Box className="EventsIconsText" >
                                            <Typography variant="body2" className="textwrap" style={{width:"95%",marginTop:'10px',marginBottom:"10px"}}
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
                                            />
                                            {/* {data.description}</Typography> */}
                                        </Box>
                                        <Box className="EventsIconsText">
                                            <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                            <Typography variant="body2">{data.start_date} - {data.end_date} </Typography>
                                        </Box>
                                        <Divider style={{marginTop:10, marginRight:10}}/>
                                        <Box className="EventsIconsData">
                                            <Box className="EventsIconsDataBox">
                                                <img src={allUsers}/>
                                                <Typography variant="body2">{data.awaited + data.completed_answers}</Typography>
                                            </Box>
                                            {
                                                data.status != "upcoming" &&
                                                <>
                                                    <Box className="EventsIconsDataBox">
                                                        <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                                        <Typography variant="body2">{data.completed_answers}</Typography>
                                                    </Box>
                                                    <Box className="EventsIconsDataBox">
                                                        {
                                                            data.status != "completed" ?
                                                                <>
                                                                    <AccessTimeOutlinedIcon style={{color: "#ff8100"}}/>
                                                                    <Typography variant="body2">{data.awaited}</Typography>
                                                                </>
                                                                :
                                                                <>
                                                                    <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                                                    <Typography variant="body2">{data.awaited}</Typography>
                                                                </>
                                                        }
                                                    </Box>
                                                </>
                                            }
                                        </Box>
                                    </Box>
                                </Grid>
                                </>
                            )
                        })

                        :
                        null
                    }

                </Grid>

                <Box className="RecentItems">
                    <Typography className="Recenttitle">Recent Surveys</Typography>
                    <Link href="/SurveyAllData" >
                        <Typography className="ViewAll">View All</Typography>
                    </Link>
                </Box>

                <Grid container spacing={4} style={{marginTop: 15, marginBottom:30}}>

                    {
                        this.state.recentSurveys.length ?
                            this.state.recentSurveys.map((data:any) => {
                                return(
                                    <>
                                        <Grid item sm={6} md={4} xs={12} key={data.id}>
                                            <Box className="EventsCards"
                                                // @ts-ignore
                                                 onClick={() => this.props.history.push("/SurveyDetails?id=" + data.id)}
                                            >
                                                <Box className="EventsIconsText">
                                                    {
                                                        data.attributes.status == "upcoming" &&
                                                        <Typography variant="body2" className={"statusOngoingBlue"}>{data.attributes.status}</Typography>
                                                    }
                                                    {
                                                        data.attributes.status == "ongoing" &&
                                                        <Typography variant="body2" className={"statusOngoingRed"}>{data.attributes.status}</Typography>
                                                    }
                                                    {
                                                        data.attributes.status == "completed" &&
                                                        <Typography variant="body2" className={"statusOngoingGreen"}>{data.attributes.status}</Typography>
                                                    }
                                                </Box>
                                                <Box className="EventsIconsText">
                                                    <Typography className="EventsTitle">{data.attributes.title}</Typography>
                                                </Box>
                                                <Box className="EventsIconsText" >
                                                    <Typography variant="body2" className="textwrap" style={{width:"95%",marginTop:'10px',marginBottom:"10px"}}
                                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.attributes.description) }}
                                                    />
                                                    {/* {data.description}</Typography> */}
                                                </Box>
                                                <Box className="EventsIconsText">
                                                    <DateRangeOutlinedIcon style={{color: "#054c94"}}/>
                                                    <Typography variant="body2">{data.attributes.start_date} - {data.attributes.end_date} </Typography>
                                                </Box>
                                                <Divider style={{marginTop:10, marginRight:10}}/>
                                                <Box className="EventsIconsData">
                                                    <Box className="EventsIconsDataBox">
                                                        <img src={allUsers}/>
                                                        <Typography variant="body2">{data.attributes.awaited + data.attributes.total_response}</Typography>
                                                    </Box>
                                                    {
                                                        data.status != "upcoming" &&
                                                        <>
                                                            <Box className="EventsIconsDataBox">
                                                                <CheckCircleOutlineOutlinedIcon style={{color: "green"}}/>
                                                                <Typography variant="body2">{data.attributes.total_response}</Typography>
                                                            </Box>
                                                            <Box className="EventsIconsDataBox">
                                                                {
                                                                    data.status != "completed" ?
                                                                        <>
                                                                            <AccessTimeOutlinedIcon style={{color: "#ff8100"}}/>
                                                                            <Typography variant="body2">{data.attributes.awaited}</Typography>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <HighlightOffOutlinedIcon style={{color: "red"}}/>
                                                                            <Typography variant="body2">{data.attributes.awaited}</Typography>
                                                                        </>
                                                                }
                                                            </Box>
                                                        </>
                                                    }
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </>
                                )
                            })

                            :
                            null
                    }

                </Grid>

            </Container>
            </Grid>

        </Box>
    </Box>
    <Loader loading={this.state.loading} />
     </>
      );
  }
}

//@ts-ignore
export default withTranslation()(withRouter(Polling));

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}
// Customizable Area End
