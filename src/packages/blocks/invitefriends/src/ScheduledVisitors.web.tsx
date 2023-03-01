import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import {exampleImg, userIcon} from "./assets";
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
import moment from "moment";
import {withTranslation} from "react-i18next";


class ScheduledVisitors  extends ScheduledVisitorController{
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
                          <p className="bold-text" style={{ fontSize: '18px ', fontWeight: 600 }}>
                              {t("Scheduled Visitors")}
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Divider/>
                <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%",marginTop:"10px"}}>
                        {
                            this.state.visitorListing.map((item:any,key:any)=> {
                                return(
                                    <Grid item xs={12} key={key}>
                                        <VisitorBox item={item} handleDelete={(id:any) => this.handleOpenDeleteModal(id)} history={this.props.history} t={t}/>
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
                                <Typography className="bold-text " style={{fontSize:"20px",color:"black",fontWeight:"bold",marginTop:"15px",marginBottom:"10px",textAlign:"center",width:"80%"}}>
                                    {t("Scheduled Visitors")}
                                </Typography>
                                <Typography variant="body2" style={{textAlign:"center"}}>
                                    {t("Scheduled_Visit_Cancel_Caution")}
                                </Typography>
                                <Box style={{marginTop:"15px",width:"90%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    {/*@ts-ignore*/}
                                    <CloseButton variant="outlined" fullWidth style={{marginRight:"10px",marginBottom:"15px"}} onClick={this.manageDeleteVisitor}>{t("Yes, Cancel")}</CloseButton>
                                    <PublishButton fullWidth onClick={this.handleCloseDeleteModal} >{t("No, Don't Cancel")}</PublishButton>
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
export default withTranslation()(withRouter(ScheduledVisitors))


const VisitorBox = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {t} = props
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        props.history.push(`/UpdateVisitor/${props.item.id}`)
    }

    const handleDelete = () => {
        setAnchorEl(null);
        props.handleDelete(props.item.id)
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
            style={{boxShadow:"4px 0px 14px #ececec"}}
        >
            <Box style={{minWidth:"100%",display:"flex",justifyContent:"space-between"}}>
                <Box style={{display:"flex",alignItems:"center"}} onClick={()=> props.history.push(`/VisitorDetails?id=${props.item.id}`)}>
                    <Box style={{marginRight:"15px"}}>
                        <img src={props.item.profilePic || exampleImg} height="50px" width="50px" style={{borderRadius:"150px"}}/>
                    </Box>
                    <Box style={{display:'flex',flexDirection:"column",justifyContent:"center"}}>
                        <Typography className="bold-text" variant={"body1"}>
                            {props.item?.attributes?.name}
                        </Typography>
                        <Typography variant={"subtitle2"} color="textSecondary" style={{marginBottom:"5px",fontSize:"14px"}} >
                            {moment(props.item?.attributes?.schedule_time).format("DD MMM YYYY - hh:mm")}
                        </Typography>
                    </Box>
                </Box>
                <Box style={{display:'flex',alignItems:"center",justifySelf:"flex-end"}}>
                    <IconButton onClick={handleClick} style={{padding:"5px"}}>
                        <MoreVertIcon style={{color:"#000000",fontSize:"1.5rem"}}/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem style={{minHeight:"30px"}} onClick={handleEdit}>{t("Edit")}</MenuItem>
                        <MenuItem style={{minHeight:"30px"}} onClick={handleDelete}>{t("Delete")}</MenuItem>
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
        color: "#8d8d8d",
        backgroundColor: "white",
        fontWeight:"bold",
        height:"45px",
        '&:hover': {
            color: "#8d8d8d",
        },
    },
}))(Button);

// Customizable Area End
