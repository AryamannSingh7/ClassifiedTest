import * as React from "react";
// custom components
import {
    Grid, Box, Divider, AppBar, Tabs, Tab, Link, IconButton, Typography,Button,Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { deleteIcon,filterIcon,shortIcon,modalDeleteIcon } from "./assets";
import BuildingAnnouncementController, {
  Props
} from "./BuildingAnnouncementController";
import './style.css'
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Modal from "@material-ui/core/Modal";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {withTranslation} from "react-i18next";



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


class Announcement extends BuildingAnnouncementController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    const complexName = localStorage.getItem("buildingName")
    //@ts-ignore
    const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '95%' }} >
                  <Grid xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() =>  window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {complexName || ""}
                          </p>
                      </Box>
                      {
                          this.state.deleteSelectFlag ?
                              <Box style={{display:"flex"}}>
                                  <Button onClick={this.selectAllDelete} style={{color:"FC8434",fontWeight:"bold",textTransform:"capitalize"}}>Select All</Button>
                                  <IconButton style={{padding:"8px"}} onClick={this.handleOpenDeleteModal}>
                                      <img src={deleteIcon} />
                                  </IconButton>
                              </Box>
                              :
                              <Box>
                                  <IconButton onClick={this.handleShort} style={{padding:"0px",paddingRight:"15px"}}>
                                      <img src={shortIcon} />
                                  </IconButton>
                                  <IconButton onClick={this.handleOpenFilterModal} style={{padding:"0px",paddingRight:"15px"}}>
                                      <img src={filterIcon} />
                                  </IconButton>
                                  <IconButton onClick={this.DeleteFlagTrue} style={{padding:"0px",paddingRight:"15px"}}>
                                      <img src={deleteIcon} />
                                  </IconButton>
                              </Box>
                      }
                  </Grid>
                </Grid>
                <Box style={{background: "#F7F9FE",minHeight:"100vh",display:'flex',flexDirection:"column",alignItems:'center'}} >
                    <Grid container spacing={2} style={{width:"90%",marginBottom:"20px",marginTop:"5px"}}>
                        {
                            this.state.announcementList?.length > 0 ?
                            this.state.announcementList.map((item:any,key:any)=> {
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
                                            onClick={()=> this.manageRedirect(item.id)}
                                        >
                                            <Box style={{minWidth:"100%"}}>
                                                <Box>
                                                    <Box display="flex" style={{justifyContent:"space-between",alignItems:"center"}}>
                                                        <Typography variant={"body1"} style={{fontWeight:"bold",marginTop:"5px"}}>
                                                            {item.attributes.title}
                                                        </Typography>
                                                        {
                                                            this.state.deleteSelectFlag &&
                                                            <Checkbox
                                                                checked={this.state.selectedAnnoucment.find((check:any)=> check === item.id) ? true : false}
                                                                icon={<RadioButtonUncheckedIcon style={{color:"#E2E2E2"}} />}
                                                                checkedIcon={<CheckCircleIcon style={{color:"#FC8434"}} />}
                                                                style={{padding:"0px"}}
                                                            />
                                                        }
                                                    </Box>
                                                    <Typography variant={"body2"} style={{marginTop:"8px",marginBottom:"5px"}} >
                                                        {item.attributes.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })
                            :
                            <Box style={{height:"50vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <Typography variant="h6" color="textSecondary">{t("No Announcement data found")}</Typography>
                            </Box>
                        }
                    </Grid>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modalStyle"
                    // @ts-ignore
                    open={this.state.filterModal}
                    onClose={this.handleCloseFilterModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.filterModal}>
                        <div>
                            <Box style={{width:"100%",minHeight:"40%",backgroundColor:"white",borderRadius:"10px 10px 0px 0px",position:"absolute",left:0,bottom:0}}>
                                <Box style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                    <Box style={{margin:"15px"}}>
                                        <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
                                            <Typography variant="body1" style={{fontWeight:"bold",fontSize:"18px",marginLeft:'4px'}}>Filter</Typography>
                                        </Box>
                                        <Box style={{marginTop:"15px"}}>
                                            <FormControl component="fieldset" style={{width:"100%"}}>
                                                {
                                                    this.state.categoryList.length > 0 &&
                                                    this.state.categoryList.map((item:any,key:any) => {
                                                        return(
                                                            <FormControlLabel
                                                                value={item.id}
                                                                key={key}
                                                                control={
                                                                    <Checkbox
                                                                        onChange={()=>this.handleChecked(item.id)}
                                                                        checked={this.state.filterCategory.find((check:any)=> check === item.id) ? true : false}
                                                                        name="checkedB"
                                                                        color="primary"
                                                                        icon={<RadioButtonUncheckedIcon style={{color:"#E2E2E2"}} />}
                                                                        checkedIcon={<CheckCircleIcon style={{color:"#FC8434"}} />}
                                                                        style={{padding:"4px",paddingRight:"9px"}}
                                                                    />
                                                                }
                                                                label={<Typography variant="body2" style={{fontSize:"16px"}}>{item.attributes.category_title}</Typography>}
                                                                labelPlacement="start"
                                                                style={{width:"100%",display:"flex",justifyContent:'space-between',margin:"5px",fontWeight:"normal"}}
                                                            />
                                                        )
                                                    })
                                                }
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Divider/>
                                    <Box style={{margin:"15px",marginTop:"20px"}}>
                                        <CloseButton onClick={this.handleApplyFilter} variant="contained" color="primary" fullWidth style={{borderRadius:"50px"}}>{t("Apply")}</CloseButton>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </Fade>
                </Modal>
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
                                    <img src={modalDeleteIcon} width="38px" height="43px" />
                                </Box>
                                <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginTop:"15px",marginBottom:"10px",textAlign:"center",fontSize:"20px"}}>
                                    {t("Delete")} {this.state.selectedAnnoucment?.length} {t("selected announcements")}?
                                </Typography>
                                <Typography variant="body2" style={{textAlign:"center",fontSize:"14px"}}>
                                    {t("Are you sure want to delete")} {this.state.selectedAnnoucment?.length} {t("Selected announcements? Once deleted you won’t be able to view deleted announcements again.")}
                                </Typography>
                                <Box style={{marginTop:"15px",width:"90%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    {/*@ts-ignore*/}
                                    <CloseButton variant="outlined" fullWidth style={{marginRight:"10px",marginBottom:"10px"}} onClick={this.handleDelete}  >{t("Yes")}, {t("Delete")}</CloseButton>
                                    <DontDeleteButton fullWidth onClick={this.handleCloseDeleteModal}>{t("No, Don't Delete")}</DontDeleteButton>
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

const DontDeleteButton = withStyles((theme) => ({
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
