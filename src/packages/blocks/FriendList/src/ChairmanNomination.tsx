import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography, Button, Paper,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ChairmainNominationController, {
  Props
} from "./ChairmainNominationController";
import './MyTeam.web.css'
import moment from "moment";
import {withTranslation} from "react-i18next";

class ChairmanNomination extends ChairmainNominationController{
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
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("Chairman Nominations")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={3} style={{width:"90%",marginTop:"20px"}}>
                        {
                            this.state.nominationsList.length > 0
                            &&
                            this.state.nominationsList.map((item:any,key:any) => {
                                return(
                                    <Grid key={key} item xs={12}>
                                        <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}} onClick={()=> this.props.history.push(`/ChairmanNominationDetails?id=${item.id}`)}>
                                            <Grid container spacing={2} >
                                                <Grid item xs={item.attributes.status === "upcoming" ? 7 : 8}>
                                                    <Typography variant="body1" style={{fontWeight:"bold"}}>{item.attributes.title}</Typography>
                                                </Grid>
                                                <Grid item xs={item.attributes.status === "upcoming" ? 5 : 4} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                                    {
                                                        item.attributes.status === "closed" &&
                                                        <Typography variant="subtitle2" className={"statusOngoingRed"}>{item.attributes.status}</Typography>
                                                    }
                                                    {
                                                        item.attributes.status === "active" &&
                                                        <Typography variant="subtitle2" className={"statusOngoingGreen"}>{item.attributes.status}</Typography>
                                                    }
                                                    {
                                                        item.attributes.status === "upcoming" &&
                                                        <Typography variant="subtitle2" className={"statusOngoingBlue"}>{item.attributes.status}</Typography>
                                                    }
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="subtitle2" color="textSecondary">{t("Building")}:</Typography>
                                                        <Typography variant="subtitle2" color="textPrimary">{item.attributes.building}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="subtitle2" color="textSecondary">{t("Complex Name")}:</Typography>
                                                        <Typography variant="subtitle2" color="textPrimary">{item.attributes.complex_name}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box>
                                                        <Typography variant="subtitle2" color="textSecondary">{t("Duration")}:</Typography>
                                                        <Typography variant="subtitle2" color="textPrimary">{moment(item.attributes.start_date).format("DD-MMM-YYYY")} to {moment(item.attributes.end_date).format("DD-MMM-YYYY")}</Typography>
                                                    </Box>
                                                </Grid>
                                                {
                                                    item.attributes.stage === "Nomination Started" &&
                                                    <Grid item xs={12} className={"nominationBlueBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationBlueText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                                {
                                                    item.attributes.stage === "Nomination Ended" &&
                                                    <Grid item xs={12} className={"nominationGrayBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationGrayText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                                {
                                                    item.attributes.stage === "Voting Started" &&
                                                    <Grid item xs={12} className={"nominationOrangeBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationOrangeText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                                {
                                                    item.attributes.stage === "Voting Ended" &&
                                                    <Grid item xs={12} className={"nominationGrayBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                                        <Typography variant="body1" style={{width:"100%"}} className="nominationGrayText" >{item.attributes.stage || "NA"}</Typography>
                                                    </Grid>
                                                }
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    {/*<Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>*/}
                    {/*    <CloseButton variant="contained" fullWidth size="large">*/}
                    {/*        add visitor request*/}
                    {/*    </CloseButton>*/}
                    {/*</Box>*/}
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(ChairmanNomination))

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);



// Customizable Area End
