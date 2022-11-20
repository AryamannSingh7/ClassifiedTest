// Customizable Area Start
import React from "react";
import "./MyTeam.web.css"
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
    IconButton,
    Modal,
    Backdrop,
    Fade,
    DialogContent,
    Paper,
    TextField,
    InputAdornment,
    TextareaAutosize,
    Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormControlLabel,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import {buildings, chat, edit, email, profileExp, telephone, userIcon} from "./assets"
import Divider from '@material-ui/core/Divider';
// Icons
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Icons
import {building, cancle, SearchIconImage, user_icon} from "../../user-profile-basic/src/assets"
import {calanderIcon} from "./assets"
import TaskManagementController, {
  Props,
  configJSON,
} from "./TaskManagementController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import "../../../web/src/assets/css/style.scss";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {withStyles} from "@material-ui/core/styles";
import AddTeamModal from "./AddTeamModal.web";
import {CheckIcon} from "../../user-profile-basic/src/assets"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

class MyTeamCore extends TaskManagementController {
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
                    <Box style={{width: "100%"}}>
                        <Typography variant="body1" >
                            {t("My Team")} / <Box component="span" style={{color: "blue"}}>{t("Task Management")}</Box>
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography variant="h4" className="subHeading">{t("Task Management")}</Typography>
                            <Box>
                                <AcceptButton style={{marginTop:"20px",marginRight:"10px"}} onClick={()=>this.setState({setOpen:true})}>{t("Create New Task")}</AcceptButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Select id="filter-type-select" variant="outlined" displayEmpty value={this.state.filterBuilding} style={{width:"180px",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"white",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterBuilding:e.target.value})}>
                                    <MenuItem value="" disabled>
                                        {t("Select Building")}
                                    </MenuItem>
                                    <MenuItem value={1}>Building 1 </MenuItem>
                                    {/*{*/}
                                    {/*    this.state.categoryList.length > 0 &&*/}
                                    {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                    {/*        return(*/}
                                    {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                    {/*        )*/}
                                    {/*    })*/}
                                    {/*}*/}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Select id="filter-type-select" variant="outlined" displayEmpty value={this.state.filterShortBy} style={{width:"180px",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"white",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterShortBy:e.target.value})}>
                                    <MenuItem value="" disabled>
                                        {t("Short By")}
                                    </MenuItem>
                                    <MenuItem value={1}>Task name</MenuItem>
                                    {/*{*/}
                                    {/*    this.state.categoryList.length > 0 &&*/}
                                    {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                    {/*        return(*/}
                                    {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                    {/*        )*/}
                                    {/*    })*/}
                                    {/*}*/}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Select id="filter-type-select" variant="outlined" displayEmpty value={this.state.filterCategory} style={{width:"180px",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"white",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterCategory:e.target.value})}>
                                    <MenuItem value="" disabled>
                                        {t("Category")}
                                    </MenuItem>
                                    <MenuItem value={1}>Category 1</MenuItem>
                                    {/*{*/}
                                    {/*    this.state.categoryList.length > 0 &&*/}
                                    {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                    {/*        return(*/}
                                    {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                    {/*        )*/}
                                    {/*    })*/}
                                    {/*}*/}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Select id="filter-type-select" variant="outlined" displayEmpty value={this.state.filterStatus} style={{width:"180px",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"white",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterStatus:e.target.value})}>
                                    <MenuItem value="" disabled>
                                        {t("Status")}
                                    </MenuItem>
                                    <MenuItem value={1}>Status 1</MenuItem>
                                    {/*{*/}
                                    {/*    this.state.categoryList.length > 0 &&*/}
                                    {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                    {/*        return(*/}
                                    {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                    {/*        )*/}
                                    {/*    })*/}
                                    {/*}*/}
                                </Select>
                            </Grid>
                            <Grid item>
                                <ChairmanButton variant="contained" color="primary" startIcon={<img src={SearchIconImage} />}>Search</ChairmanButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{marginTop: 10, marginBottom:30}}>
                    <Grid item xs={12}>
                        <Box style={{backgroundColor:"white",width:"100%"}}>
                            <Grid container style={{padding:"20px 5px"}}>
                                <Grid item xs={12} >
                                    <Box style={{width:"95%",display:'flex',justifyContent:"space-between",alignItems:"center",margin:"10px 20px"}}>
                                        <Typography variant="h6" style={{fontWeight:"bold",marginBottom:"5px"}}>To Approve a budget report</Typography>
                                        <Typography variant="subtitle2" className={"statusOngoingRed"} gutterBottom>Pending</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box style={{width:"95%",display:'flex',justifyContent:"space-between",alignItems:"center",margin:"10px 20px"}}>
                                        <Typography variant="subtitle1" color="textPrimary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={0}>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={buildings}  height="30px" width="30px" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary" style={{color:"#FC8434"}}>{t("Building")}</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">Building 1</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={userIcon}  height="25px" width="23px"    />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary" style={{color:"#FC8434"}}>{t("Assigned To")}</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">Marleah Esgleston</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={calanderIcon} height="25px" width="25px" />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary" style={{color:"#FC8434"}}>{t("Assigned On")}</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">20-05-1978</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box style={{margin:"10px 20px",display:'flex',alignItems:"centers"}}>
                                                <Box style={{margin:"10px"}}>
                                                    <img src={calanderIcon} height="25px" width="25px"  />
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" color="textSecondary" style={{color:"#FC8434"}}>{t("Due on")}</Typography>
                                                    <Typography variant="subtitle1" color="textPrimary">20-05-1978</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </Grid>
        </Box>
        <Modal
            style={dashBoard.modal}
            open={Boolean(this.state.setOpen)}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={Boolean(this.state.setOpen)}>
                <div style={dashBoard.paper}>
                    <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:"10px"}}>
                        <Typography variant="h5" style={{fontWeight:"bold"}}>
                            Create New Task
                        </Typography>
                        <IconButton onClick={this.handleClose}>
                            <img src={cancle}
                                //@ts-ignore
                                 style={dashBoard.modalCacle}/>
                        </IconButton>
                    </Box>
                    <Divider/>
                    <Grid container spacing={2} style={{marginTop:"10px"}}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Date" variant="outlined"
                                placeHolder="Start Date"
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                type="date" name="startDate"  fullWidth
                                id="SurveyQuestion"
                                format='DD/MM/YYYY'
                                // value={this.state.SurveyData.startDate}
                                // onChange={this.handlePollDataChange}
                                InputProps={{
                                    // min: "2019-01-24",
                                    //@ts-ignore
                                    max: "5000-05-31",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                } }
                            />
                            {/*<p style={{color:"red"}}>{this.state.pollDateError}</p>*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="End Date" variant="outlined"
                                       type="date" name="endDate"  fullWidth
                                       style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                       id="SurveyQuestion"
                                       // value={this.state.SurveyData.endDate}
                                       // onChange={this.handlePollDataChange}
                                       InputProps={{
                                           // min: "2019-01-24",
                                           //@ts-ignore
                                           max: "5000-05-31",
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <DateRangeOutlinedIcon />
                                               </InputAdornment>
                                           )
                                       }}
                            />
                            {/*<p style={{color:"red"}}>{this.state.pollEndDateError}</p>*/}
                        </Grid>
                        <Grid item xs={12}>
                            <Select fullWidth id="task-type-select" variant="outlined" displayEmpty value={this.state.filterBuilding} style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterBuilding:e.target.value})}>
                                <MenuItem value="" disabled>
                                    Select Building
                                </MenuItem>
                                <MenuItem value={1}>Building 1 </MenuItem>
                                {/*{*/}
                                {/*    this.state.categoryList.length > 0 &&*/}
                                {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                {/*        return(*/}
                                {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Select fullWidth id="task-type-select" variant="outlined" displayEmpty value={this.state.filterBuilding} style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterBuilding:e.target.value})}>
                                <MenuItem value="" disabled>
                                    Select Role
                                </MenuItem>
                                <MenuItem value={1}>Building 1 </MenuItem>
                                {/*{*/}
                                {/*    this.state.categoryList.length > 0 &&*/}
                                {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                {/*        return(*/}
                                {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Select fullWidth id="task-type-select" variant="outlined" displayEmpty value={this.state.filterBuilding} style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}} className="select-input" onChange={(e) => this.setState({filterBuilding:e.target.value})}>
                                <MenuItem value="" disabled>
                                    Assign To
                                </MenuItem>
                                <MenuItem value={1}>Building 1 </MenuItem>
                                {/*{*/}
                                {/*    this.state.categoryList.length > 0 &&*/}
                                {/*    this.state.categoryList.map((item:any,key:any)=>{*/}
                                {/*        return(*/}
                                {/*            <MenuItem key={key} value={item.id}>{item.attributes.category_title}</MenuItem>*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Title" variant="outlined"
                               name="title"
                               id="Nomination Title"
                               style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                               inputProps={{
                                   maxLength: 40
                               }}
                               fullWidth
                            />
                        </Grid>
                        <Grid xs={12} style={{marginTop:"10px",padding:"0px 7px"}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                fullWidth
                                style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                rows={5}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:"flex-end",marginTop:"20px"}}>
                        <Box>
                            <DeclineButton variant="contained" style={{marginRight:"15px"}}>Cancel</DeclineButton>
                            <ChairmanButton variant="contained">Create</ChairmanButton>
                        </Box>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    </Box>
    <Loader loading={this.state.loading} />
     </>
      );
  }
}

//@ts-ignore
export default withTranslation()(withStyles(dashBoard)(withRouter(MyTeamCore)));

const dashBoard = {
    navigation: {
        display: "flex",
        justifyContent: "space-between",
    },
    subHeading: {
        fontWeight: 600,
        // marginTop: 15,
    },
    invitationCont:{
        fontWeight: 600,
        margin:'10px 0px 10px 0px'
    },
    inviteTitle:{
        margin:'10px 0px 10px 0px'
    },
    SideBar: {
        background: "#f9f6f6",
        position: "relative",
        paddingBottom: 150,
    },
    gaMemberCard:{
        display: "grid",
        gridTemplateColumns: "4fr 4fr 4fr",
        gap: 20
    },
    managementPaper:{
        padding:20
    },
    imgRound:{
        border: "2px solid #F7F9FE",
        borderRadius: "100%",
        height: 50,
        width: 50
    },
    mailIcon:{
        padding:8
    },
    invitemember:{
        border: "2px solid #F7F9FE",
        borderRadius: "100%",
        height: 50,
        width: 50,
        backgroundColor:"#FC8434"
    },
    inviteIcon:{
        padding:13
    },
    cancleIcon:{
        position:"absolute",
        top:15,
        right:15
    },
    modalCacle:{
        top:15,
        right:15,
        float:"right",
        cursor:"pointer"
    },
    invitationReq:{
        marginTop:30
    },
    facility: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom:"1px solid #f8f8f8",
        cursor:"pointer"
    },
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#fff",
        borderRadius: '10px',
        // boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        width:"700px"
    },
    formLabels:{
        paddingLeft:35
    },
    labelsStyle:{
        color:"#212121",
        margin:"10px 0px 10px 0px"
    },
    formLeftIcn:{
        position:"absolute",
        left: 20,
        top: 44,
        color: "#b9b9b9"
    },
    inviteInput:{
        padding: "18px 18px 18px 50px",
        color: "#b5b5b5",
        borderRadius: "10px",
        border: "1px solid #e9dede",
        backgroundColor: "#f9f9f9",
        fontSize: "16px",
        outline: 0,
        width:"100%"
    }
};

const AcceptButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#fc8434",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "#fc8434",
        },
    },
}))(Button);

const DeclineButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        height:"55px",
        width:"150px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "white",
        },
    },
}))(Button);

const CancelButton = withStyles((theme) => ({
    root: {
        color: "#2b6fed",
        backgroundColor: "white",
        border:"1px solid #2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "white",
        },
    },
}))(Button);

const ChairmanButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"10px",
        padding:"10px 20px",
        height:"55px",
        width:"150px",
        fontSize:"15px",
        '&:hover': {
            backgroundColor: "#2b6fed",
        },
    },
}))(Button);
// Customizable Area End
