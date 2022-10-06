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

class Visitors extends ChairmainNominationController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              Chairman Nominations
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={3} style={{width:"90%",marginTop:"20px"}}>
                        <Grid item xs={12}>
                            <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}} onClick={()=> this.props.history.push(`/NominationDetails?id=${1}`)}>
                                <Grid container spacing={2} >
                                    <Grid item xs={9}>
                                        <Typography variant="body1" style={{fontWeight:"bold"}}>Chairman Nomination 2022</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                        <Typography variant="subtitle2" className={"statusOngoingGreen"}>Active</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Building:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">Building - 1</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Complex Name:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">Star Heights</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Duration:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">24-03-2022 to 24-04-2022</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} className={"nominationBlueBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                        <Typography variant="body1" style={{width:"100%"}} className="nominationBlueText" >NOMINATION STARTED</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}}>
                                <Grid container spacing={2} >
                                    <Grid item xs={9}>
                                        <Typography variant="body1" style={{fontWeight:"bold"}}>Chairman Nomination 2022</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                        <Typography variant="subtitle2" className={"statusOngoingRed"}>Closed</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Building:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">Building - 1</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Complex Name:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">Star Heights</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Duration:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">24-03-2022 to 24-04-2022</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} className={"nominationGrayBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                        <Typography variant="body1" style={{width:"100%"}} className="nominationGrayText" >Voting Closed</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={6} style={{backgroundColor:"white",padding:"20px 30px",borderRadius:"15px",cursor:"pointer"}}>
                                <Grid container spacing={2} >
                                    <Grid item xs={9}>
                                        <Typography variant="body1" style={{fontWeight:"bold"}}>Chairman Nomination 2022</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{display:'flex',alignItems:"center",justifyContent:"flex-end"}}>
                                        <Typography variant="subtitle2" className={"statusOngoingRed"}>Active</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Building:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">Building - 1</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Complex Name:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">Star Heights</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Duration:</Typography>
                                            <Typography variant="subtitle2" color="textPrimary">24-03-2022 to 24-04-2022</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} className={"nominationOrangeBG"} style={{marginBottom:"10px",marginTop:"10px"}}>
                                        <Typography variant="body1" style={{width:"100%"}} className="nominationOrangeText" >Voting Started</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
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
export default withRouter(Visitors)

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
