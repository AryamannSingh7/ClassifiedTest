import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { userIcon } from "./assets";
import ScheduledVisitorController, {
  Props
} from "./ScheduledVisitorController";
import './style.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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


class ScheduledVisitors  extends ScheduledVisitorController{
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
                              Scheduled Visitors
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:"10px"}}>
                        {
                            this.state.visitorListing.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                        <VisitorBox item={item} handleDelete={() => this.handleOpenDeleteModal()} history={this.props.history}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modalStyle"
                    // @ts-ignore
                    open={this.state.deleteConfirmModal}
                    onClose={this.handleCloseDeleteModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.deleteConfirmModal}>
                        <Box style={{width:"80%",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"20px"}}>
                            <Box style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"15px"}}>
                                <Box>
                                    <img src={userIcon} />
                                </Box>
                                <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginTop:"15px",marginBottom:"10px",textAlign:"center"}}>
                                    Scheduled Visitors
                                </Typography>
                                <Typography variant="body2" style={{textAlign:"center"}}>
                                    Are you sure that you want to cancel this scheduled visit?
                                </Typography>
                                <Box style={{marginTop:"15px",width:"90%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    {/*@ts-ignore*/}
                                    <CloseButton variant="outlined" fullWidth style={{marginRight:"10px",marginBottom:"15px"}} onClick={this.closeDeleteModal}>Yes, Cancel</CloseButton>
                                    <PublishButton fullWidth onClick={this.handleCloseDeleteModal} >No, Don't Cancel</PublishButton>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </>
    );
  }
}
export default withRouter(ScheduledVisitors)


const VisitorBox = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
    }

    const handleDelete = () => {
        setAnchorEl(null);
        props.handleDelete()
    }
    return(
        <Box
            display="flex"
            justifyContent='space-between'
            alignItems="center"
            borderRadius="15px"
            bgcolor="white"
            marginTop='1rem'
            padding='1rem'
            style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
            onClick={()=> props.history.push(`/VisitorDetails?id=${props.item.id}`)}
        >
            <Box style={{minWidth:"100%",display:"flex",justifyContent:"space-between"}}>
                <Box style={{display:"flex",alignItems:"center"}}>
                    <Box style={{marginRight:"20px"}}>
                        <img src={props.item.profilePic} height="55px" width="55px" style={{borderRadius:"100px"}}/>
                    </Box>
                    <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                        <Typography variant={"body1"} style={{fontWeight:"bold"}}>
                            {props.item.name}
                        </Typography>
                        <Typography variant={"subtitle2"} color="textSecondary" style={{marginBottom:"5px"}} >
                            {props.item.time}
                        </Typography>
                    </Box>
                </Box>
                <Box style={{display:'flex',alignItems:"center"}}>
                    <IconButton onClick={handleClick} style={{padding:"5px"}}>
                        <MoreVertIcon style={{color:"#c0c0c0",fontSize:"1.8rem"}}/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Box>
    )
}

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