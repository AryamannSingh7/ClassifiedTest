import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {exampleImg, filterIcon} from "./assets";
import {shortIcon} from "../../BroadcastMessage/src/assets"
import PastVisitorController, {
  Props
} from "./PastVisitorController";
import './style.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Modal from "@material-ui/core/Modal";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {boolean} from "yup";
import moment from "moment";
import {withTranslation} from "react-i18next";

class Announcement extends PastVisitorController{
  constructor(props: Props) {
    super(props);
  }

  render() {
      // @ts-ignore
      const {t} = this.props
      return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '95%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"5px"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p className="bold-text" style={{ fontSize: '18px'}}>
                              {t("Past Visitors")}
                          </p>
                      </Box>
                          <Box>
                              <IconButton style={{padding:"0px 8px"}} onClick={this.handleClick} >
                                  <img src={shortIcon} />
                              </IconButton>
                          </Box>
                          <Menu
                              id="basic-menu"
                              anchorEl={this.state.anchorEl}
                              // @ts-ignore
                              open={this.state.open}
                              onClose={this.handleClose}
                              MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                              }}
                          >
                              <MenuItem style={{minHeight:"30px"}} onClick={this.handle1Month}>{t("Last")} 1 {t("Month")}</MenuItem>
                              <MenuItem style={{minHeight:"30px"}} onClick={this.handle3Month}>{t("Last")} 3 {t("Month")}</MenuItem>
                              <MenuItem style={{minHeight:"30px"}} onClick={this.handle6Month}>{t("Last")} 6 {t("Month")}</MenuItem>
                              <MenuItem style={{minHeight:"30px"}} onClick={this.handle12Month}>{t("Last")} 12 {t("Month")}</MenuItem>
                          </Menu>
                  </Grid>
                </Grid>
                <Divider/>
                <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:"10px"}}>
                        {
                            this.state.visitorListing.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                        <Box
                                            display="flex"
                                            justifyContent='space-between'
                                            alignItems="center"
                                            borderRadius="15px"
                                            bgcolor="white"
                                            marginTop='1rem'
                                            padding='1rem'
                                            style={{boxShadow:"4px 0px 14px #ececec"}}
                                            onClick={()=> this.props.history.push(`/VisitorDetails/past?id=${item.id}`)}
                                        >
                                            <Box style={{minWidth:"100%"}}>
                                                <Box style={{display:"flex",alignItems:"center"}}>
                                                    <Box style={{marginRight:"15px"}}>
                                                        <img src={item.profilePic || exampleImg} height="55px" width="55px" style={{borderRadius:"100px"}}/>
                                                    </Box>
                                                    <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                                        <Typography className="bold-text" variant={"body1"}>
                                                            {item?.attributes?.name}
                                                        </Typography>
                                                        <Typography variant={"subtitle2"} color="textSecondary" style={{marginBottom:"5px"}} >
                                                            {moment(item?.attributes?.schedule_time).format("DD MMM YYYY - hh:mm")}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withTranslation()(withRouter(Announcement))

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

const PublishButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            color: "#2b6fef",
        },
    },
}))(Button);

// Customizable Area End
