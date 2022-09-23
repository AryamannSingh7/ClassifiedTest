import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { sceduledVisitor,pastVisitor  } from "./assets";
import VisitorController, {
  Props
} from "./VisitorController";
import './style.css'

class Visitors extends VisitorController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              My Visitors
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#E5ECFF",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={2} style={{width:"90%"}}>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='1.5rem'
                                padding='1.5rem'
                                onClick={()=>this.props.history.push("/ScheduledVisitors")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center"}}>
                                        <img src={sceduledVisitor} style={{marginRight:"20px"}}/>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            Scheduled Visitors
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                borderRadius="15px"
                                bgcolor="white"
                                marginTop='1rem'
                                padding='1.5rem'
                                onClick={()=>this.props.history.push("/PastVisitors")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center"}}>
                                        <img src={pastVisitor} style={{marginRight:"20px"}}/>
                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                            Past Visitors
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large">
                            add visitor request
                        </CloseButton>
                    </Box>
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