import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { filterIcon } from "./assets";
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



const filterList = [
    {
        id:1,
        name:"Management Announcement"
    },
    {
        id:2,
        name:"Change in Service"
    },
    {
        id:3,
        name:"Building Rules"
    },
    {
        id:4,
        name:"New Green Initiatives"
    },
    {
        id:5,
        name:"Renovation"
    },
    {
        id:6,
        name:"Interruption"
    },

]


class Announcement extends PastVisitorController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    // @ts-ignore
      return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '95%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"5px"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                              Past Visitors
                          </p>
                      </Box>
                          <Box>
                              <IconButton style={{padding:"8px"}} onClick={this.handleClick} >
                                  <img src={filterIcon} />
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
                              <MenuItem onClick={this.handleClose}>Last 1 Month</MenuItem>
                              <MenuItem onClick={this.handleClose}>Last 3 Month</MenuItem>
                              <MenuItem onClick={this.handleClose}>Last 6 Month</MenuItem>
                              <MenuItem onClick={this.handleClose}>Last 12 Month</MenuItem>
                          </Menu>
                  </Grid>
                </Grid>
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
                                            style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
                                            onClick={()=> this.props.history.push(`/VisitorDetails?id=${item.id}`)}
                                        >
                                            <Box style={{minWidth:"100%"}}>
                                                <Box style={{display:"flex",alignItems:"center"}}>
                                                    <Box style={{marginRight:"20px"}}>
                                                        <img src={item.profilePic} height="55px" width="55px" style={{borderRadius:"100px"}}/>
                                                    </Box>
                                                    <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant={"subtitle2"} color="textSecondary" style={{marginBottom:"5px"}} >
                                                            {item.time}
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
export default withRouter(Announcement)

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
