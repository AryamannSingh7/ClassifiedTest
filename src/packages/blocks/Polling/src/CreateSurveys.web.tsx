// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {
    Container,
    Typography,
    TextField,
    Input,
    Link,
    Button,
    MenuItem,
    InputAdornment,
    Divider,
    CircularProgress,
} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import {audienceCheck,audienceChecked} from "./assets";
import NativeSelect from "@material-ui/core/NativeSelect";
import Switch from '@material-ui/core/Switch';

import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import MomentUtils from '@date-io/moment';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

// Icons
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InfoIcon from '@material-ui/icons/Info';
// Icons

import CreateSurveyController, {
  Props,
  configJSON,
} from "./CreateSurveyController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import TextEditor from "./TextEditorSurvey.web";
import Backdrop from "@material-ui/core/Backdrop";
import AudienceModal from "./AudienceModal.web";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

class CreateSurveys extends CreateSurveyController {
  constructor(props: Props) {
    super(props);

  }
  render() {
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
                <Container>
                    <Box className="navigation">
                        <Box>
                            <Typography variant="body1" >
                            {t("Poll and survey")} / <Box component="span" style={{color: "blue"}}>{t("Create a Survey")}</Box>
                            </Typography>
                            <Typography variant="h4" className="subHeading">{t("Create a Survey")}</Typography>
                        </Box>
                    </Box>
                    <Box style={{marginTop:"50px"}}>

                    </Box>
                    <form>
                        <Grid container spacing={4}>
                            <Grid item sm={12} md={12} xs={12}>
                                <Box className="createPSCards">
                                    <TextField label={t("Name of the Survey")} variant="outlined"
                                    name="title"
                                    id="SurveyQuestion"
                                    value={this.state.SurveyData.title}
                                    onChange={this.handlePollDataChange}
                                    inputProps={{
                                        maxLength: 40
                                    }}
                                    required fullWidth
                                    />
                                    <p style={{color:"red"}}>{this.state.pollTitleError}</p>
                                    <Box className="DateSection">
                                        <Box style={{width:"100%"}}>
                                            <TextField
                                                label="Start Date" variant="outlined"
                                                style={{width:"100%"}}
                                                type="date" name="startDate"  fullWidth
                                                id="SurveyQuestion"
                                                format='DD/MM/YYYY'
                                                value={this.state.SurveyData.startDate}
                                                onChange={this.handlePollDataChange}
                                                InputProps={{
                                                    // min: "2019-01-24",
                                                    //@ts-ignore
                                                    max: "5000-05-31",
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }
                                                }
                                            />
                                            <p style={{color:"red"}}>{this.state.pollDateError}</p>
                                        </Box>
                                        <Box style={{width:"100%"}}>
                                            <TextField label="End Date" variant="outlined"
                                                       type="date" name="endDate"  fullWidth
                                                       style={{width:"100%"}}
                                                       id="SurveyQuestion"
                                                       value={this.state.SurveyData.endDate}
                                                       onChange={this.handlePollDataChange}
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
                                            <p style={{color:"red"}}>{this.state.pollEndDateError}</p>
                                        </Box>
                                    </Box>
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">{t("Description")}</Typography>
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box className="descriptionEditor" style={{maxHeight:"200px",overflow:"hidden"}}>
                                        <TextEditor
                                            markup={this.state.textEditor}
                                            onChange={this.onChangeTextEditor} />
                                    </Box>
                                    <p style={{color:"red"}}>{this.state.pollDescriptionError}</p>
                                    <Box className="targetaudience">
                                        <Box className="infoIcon">
                                            <Typography variant="subtitle1">{t("Select your target audience")}</Typography>
                                            <InfoIcon style={{color:"grey", fontSize:18}}/>
                                        </Box>
                                        <Box className="targetOne">
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <AudienceSelectBox
                                                        name="OWNERS"
                                                        selected={this.state.selectedAudience === "Owner"}
                                                        isMenu={false}
                                                        selectAudience={(id,name)=> this.selectAudience(id,name)}
                                                        audienceId={"Owner"}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <AudienceSelectBox
                                                        name="RESIDENTS"
                                                        selected={this.state.selectedAudience === "Resident"}
                                                        isMenu={false}
                                                        selectAudience={(id,name)=> this.selectAudience(id,name)}
                                                        audienceId={"Resident"}
                                                    />
                                                </Grid>
                                                {
                                                    this.state.audienceList.length > 0 &&
                                                    this.state.audienceList.map((item,key)=> {
                                                        return(
                                                            <Grid item key={key}>
                                                                <AudienceSelectBox
                                                                    name={item.attributes.audience_name}
                                                                    selected={this.state.selectedAudienceId === item.id}
                                                                    isMenu={true}
                                                                    manageEdit={(id) => this.handleOpenAudienceModalEditMode(id)}
                                                                    manageDelete={(id) => this.handleDeleteModal(id)}
                                                                    selectAudience={(id,name)=> this.selectAudience(id,name)}
                                                                    audienceId={item.id}
                                                                />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                                <Grid item style={{display:'flex',alignItems:'center'}}>
                                                    <Typography variant="subtitle1">{t("Or")}, </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <AudienceButton variant="contained" color="primary" onClick={this.handleOpenAudienceModal}>{t("CREATE AUDIENCE")}</AudienceButton>
                                                </Grid>

                                            </Grid>
                                      </Box>
                                        <p style={{color:"red"}}>{this.state.audienceValidationError}</p>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:"40px"}}>

                            </Grid>
                            {
                                this.state.surveyQuestions.map((item,key)=>{
                                    return(
                                        <Grid item sm={12} md={12} xs={12} >
                                            <Box className="createPSCards">
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel id="question-type">{t("Select Type of Question")}</InputLabel>
                                                    <Select
                                                        labelId="question-type"
                                                        id="question-type-select"
                                                        value={item.question_type}
                                                        label="Age"
                                                        className="selectSurveyType"
                                                        style={{width:"100%",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                                        onChange={(e)=> this.handleQuestionType(key,e)}
                                                    >
                                                        <MenuItem value="short_answers">{t("Short Answer")}</MenuItem>
                                                        <MenuItem value="checkbox">{t("Multiple Choice Questions")}</MenuItem>
                                                        <MenuItem value="options">{t("Options")}</MenuItem>
                                                    </Select>
                                                    <p style={{color:"red"}}>{item.questionTypeError}</p>
                                                </FormControl>
                                                <TextField  label="Enter question" variant="outlined"
                                                            name="question"
                                                            inputProps={{
                                                                maxLength: 30
                                                            }}
                                                            id="SurveyQuestion"
                                                            value={item.title}
                                                            onChange={(e)=>this.handleQuestion(key,e)}
                                                            required fullWidth style={{marginTop:20,borderRadius:"10px"}}
                                                />
                                                <p style={{color:"red"}}>{item.questionError}</p>
                                                {
                                                    item.question_type !== "short_answers" && item.survey_options_attributes.map((inputfield:any , index:any) => {
                                                        return(
                                                            <>
                                                                <TextField
                                                                   key={index}
                                                                   label={"Option - " + (index + 1)} variant="outlined"
                                                                   name="text"
                                                                   inputProps={{
                                                                       maxLength: 20
                                                                   }}
                                                                   id="SurveyQuestionOptions"
                                                                   value={inputfield.text}
                                                                   onChange={(event) => this.handleOptionsChange(key,index, event)}
                                                                   required fullWidth style={{marginTop:20}}
                                                                />
                                                                <p style={{color:"red"}}>{inputfield.error}</p>
                                                            </>
                                                        )
                                                    })
                                                }
                                                {
                                                    item.question_type !== "short_answers" &&
                                                    <Button variant="outlined" color="primary"
                                                            onClick={() => this.addOptionsFields(key)}
                                                            className="addOptions"
                                                    >
                                                        {t("ADD OPTION")}
                                                    </Button>
                                                }
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }


                            {/*<Grid  item sm={12} md={12} xs={12}>*/}
                            {/*    <Box className="createPSCards">*/}
                            {/*        <FormControl variant="outlined" fullWidth>*/}
                            {/*            <InputLabel id="question-type">Short answer</InputLabel>*/}
                            {/*            <Select*/}
                            {/*                labelId="question-type"*/}
                            {/*                id="question-type-select"*/}
                            {/*                value=""*/}
                            {/*                label="Age"*/}
                            {/*            >*/}
                            {/*                <MenuItem value={10}>Yes</MenuItem>*/}
                            {/*                <MenuItem value={20}>No</MenuItem>*/}
                            {/*            </Select>*/}
                            {/*        </FormControl>*/}
                            {/*        <TextField  label="enter question" variant="outlined"*/}
                            {/*                    name="question"*/}
                            {/*                    value={this.state.PollData.question}*/}
                            {/*                    onChange={this.handlePollDataChange}*/}
                            {/*                    required fullWidth style={{marginTop:20}}*/}
                            {/*        />*/}
                            {/*        /!*<TextField*!/*/}
                            {/*        /!*    id="standard-select-currency"*!/*/}
                            {/*        /!*    select*!/*/}
                            {/*        /!*    label="Select"*!/*/}
                            {/*        /!*    value={this.state.selectQuestion}*!/*/}
                            {/*        /!*    onChange={this.handleQuestionSelect}*!/*/}
                            {/*        /!*    SelectProps={{*!/*/}
                            {/*        /!*        native: true,*!/*/}
                            {/*        /!*    }}*!/*/}
                            {/*        /!*    placeholder="Select type of question"*!/*/}
                            {/*        /!*    fullWidth*!/*/}
                            {/*        /!*    variant="outlined"*!/*/}
                            {/*        /!*    InputProps={{*!/*/}
                            {/*        /!*        style:{borderRadius:"2px"}*!/*/}
                            {/*        /!*    }}*!/*/}
                            {/*        /!*>*!/*/}

                            {/*        /!*    {currencies.map((option:any) => {*!/*/}
                            {/*        /!*        return(*!/*/}
                            {/*        /!*            <MenuItem key={option.value} value={option.value}>*!/*/}
                            {/*        /!*                {option.label}*!/*/}
                            {/*        /!*            </MenuItem>*!/*/}
                            {/*        /!*        )*!/*/}
                            {/*        /!*    })*!/*/}
                            {/*        /!*    }*!/*/}
                            {/*        /!*</TextField>*!/*/}
                            {/*        <p style={{color:"red"}}>{this.state.pollDescriptionError}</p>*/}

                            {/*        /!* <TextField  label="Option - 1" variant="outlined"*/}
                            {/*        name="optionOne"*/}
                            {/*        value={this.state.PollData.optionOne}*/}
                            {/*        onChange={this.handlePollDataChange}*/}
                            {/*        required fullWidth style={{marginTop:20}}*/}
                            {/*        /> *!/*/}

                            {/*    </Box>*/}
                            {/*</Grid>*/}
                            <Grid  item sm={12} md={12} xs={12}>
                                <Button onClick={this.addQuestionFields} fullWidth size="large" colo="primary" variant="outlined" style={{borderRadius:"8px",border:" 1px dashed #2b6fed",color:"#2b6fed",fontWeight:"bold"}}>+ {t("Add Another Question")}</Button>
                            </Grid>
                            <Grid  item sm={12} md={12} xs={12}>
                                <Box className="BottomButtonSurvey">
                                    <Box className="Previewbtn">
                                        <AudienceButton onClick={this.handlePriviewData} variant="contained" color="primary">{t("PREVIEW")}</AudienceButton>
                                    </Box>
                                    <Box className="Publishbtn">
                                        <PublishButton onClick={this.handleSurveyDataSubmit} disabled={this.state.loading} type="submit" variant="outlined" color="primary">{this.state.loading && <CircularProgress color="inherit" size={20}/> } {" "}{t("PUBLISH")}</PublishButton>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                <Modal
                    aria-labelledby="filterModal"
                    aria-describedby="filtermodal"
                    className="modalStyle"
                    open={this.state.audienceModal}
                    onClose={this.handleCloseAudienceModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.audienceModal}>
                        <div>
                            <AudienceModal handleClose={this.handleCloseAudienceModal} isEdit={this.state.isAudienceEdit} />
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modalStyle"
                    // @ts-ignore
                    open={this.state.deleteModal}
                    onClose={this.closeDeleteModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    {/*@ts-ignore*/}
                    <Fade in={this.state.deleteModal}>
                        <Box style={{width:"30vw",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"20px"}}>
                            <Typography variant="h6" style={{color:"black",fontWeight:"bold",marginBottom:"10px"}}>
                                Are you sure you want to delete this audience?
                            </Typography>
                            <Box style={{display:'flex',justifyContent:'flex-end',marginTop:"15px"}}>
                                {/*@ts-ignore*/}
                                <AudienceButton variant="outlined" style={{marginRight:"10px"}} onClick={this.closeDeleteModal}>{t("Cancel")}</AudienceButton>
                                <PublishButton variant="contained" onClick={this.deleteAudience} >{t("Ok")}</PublishButton>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </Box>
    </Box>
     </>
      );
  }
}

export default withTranslation()(withRouter(CreateSurveys)); 

const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}

const AudienceSelectBox = (props:any) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        props.manageEdit(props.audienceId)
    }

    const handleDelete = () => {
        setAnchorEl(null);
        props.manageDelete(props.audienceId)
    }

    return(
        <>
            <Box
                style={
                    props.selected ?
                        {border:"1px solid #2b6fed",borderRadius:"8px",cursor:'pointer'}
                        :
                        {border:"1px solid #f0f0f0",borderRadius:"8px",cursor:'pointer',backgroundColor:"#f9f9f9",minHeight:"24px"}
                }
            >
                <Box
                    style={{padding:"10px 13px",display:"flex",alignItems:"center"}}
                >
                    <Box style={{display:'flex',alignItems:'center'}} onClick={()=>props.selectAudience(props.audienceId,props.name)}>
                        <img
                            src={props.selected ? audienceChecked : audienceCheck}
                            height="10px"
                        />
                        <Typography
                            variant="body2"
                            style={
                                props.selected ?
                                    {minHeight:"24px",fontWeight:"bold",color:"#2b6fed",marginLeft:"5px",fontFamily:"Century Gothic",textTransform:"uppercase"}
                                    :
                                    {minHeight:"24px",fontWeight:"bold",color:"#9a9fa5",marginLeft:"5px",fontFamily:"Century Gothic",textTransform:"uppercase"}
                            }
                        >
                            {props.name}
                        </Typography>
                    </Box>
                    {
                        props.isMenu &&
                        <Box onClick={handleClick} style={{marginLeft:"8px"}}>
                            <MoreVertIcon style={{color:"#c0c0c0"}} />
                        </Box>
                    }
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEdit}>{t("Edit")}</MenuItem>
                        <Divider/>
                        <MenuItem onClick={handleDelete}>{t("Delete")}</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </>
    )
}

const AudienceButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"45px",
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
