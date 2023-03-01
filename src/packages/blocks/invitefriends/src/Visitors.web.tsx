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
import {withTranslation} from "react-i18next";

class Visitors extends VisitorController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p className="bold-text" style={{fontSize: '18px'}}>
                              {t("My Visitors")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Divider/>
                <Box style={{background: "#F7F9FE",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
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
                                style={{boxShadow:"4px 0px 14px #ececec"}}
                                onClick={()=>this.props.history.push("/ScheduledVisitors")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center"}}>
                                        <img src={sceduledVisitor} style={{marginRight:"20px"}}/>
                                        <Typography variant={"body1"} style={{fontSize:"17px"}} className="bold-text">
                                            {t("Scheduled Visitors")}
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
                                style={{boxShadow:"4px 0px 14px #ececec"}}
                                onClick={()=>this.props.history.push("/PastVisitors")}
                            >
                                <Box style={{minWidth:"100%"}}>
                                    <Box style={{display:"flex",alignItems:"center"}}>
                                        <img src={pastVisitor} style={{marginRight:"20px"}}/>
                                        <Typography variant={"body1"} style={{fontSize:"17px"}} className="bold-text">
                                            {t("Past Visitors")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"20px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large" onClick={()=> this.props.history.push("/AddVisitor")}>
                            {t("Add Visitor Request")}
                        </CloseButton>
                    </Box>
                </Box>
                <Box style={{background: "#F7F9FE",minHeight:"auto"}}></Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(Visitors))

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
