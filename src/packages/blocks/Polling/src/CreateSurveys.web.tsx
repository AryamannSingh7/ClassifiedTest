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
    MenuItem, InputAdornment,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
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
import TextEditor from "./TextEditor.web";
import Backdrop from "@material-ui/core/Backdrop";
import AudienceModal from "./AudienceModal.web";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";


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
                            <Typography variant="h5" className="subHeading">{t("Create a Survey")}</Typography>
                        </Box>
                    </Box>

                    <form>
                        <Grid container spacing={4} style={{marginTop: 15}}>
                            <Grid item sm={12} md={12} xs={12}>
                                <Box className="createPSCards">
                                    <TextField label={t("Name of the Survey")} variant="outlined"
                                    name="title"
                                    value={this.state.SurveyData.title}
                                    onChange={this.handlePollDataChange}
                                    required fullWidth
                                    />
                                    <p style={{color:"red"}}>{this.state.pollTitleError}</p>
                                    <Box className="DateSection">
                                        <Box style={{width:"100%"}}>
                                            <TextField
                                                label="Start Date" variant="outlined"
                                                style={{width:"100%"}}
                                                type="date" name="startDate"  fullWidth
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
                                        <Typography variant="subtitle1">Description</Typography>
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box className="descriptionEditor">
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
                                            <Button variant="outlined" color="primary">{t("OWNERS")}</Button>
                                            <Button variant="outlined" color="primary">{t("RESIDENTS")}</Button>
                                            <Typography variant="subtitle1">{t("Or")}, </Typography>
                                            <Button variant="contained" color="primary" onClick={this.handleOpenAudienceModal}>{t("CREATE AUDIENCE")}</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            {
                                this.state.surveyQuestions.map((item,key)=>{
                                    return(
                                        <Grid item sm={12} md={12} xs={12} >
                                            <Box className="createPSCards">
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel id="question-type">Select Type of Question</InputLabel>
                                                    <Select
                                                        labelId="question-type"
                                                        id="question-type-select"
                                                        value={item.question_type}
                                                        label="Age"
                                                        style={{width:"100%",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                                        onChange={(e)=> this.handleQuestionType(key,e)}
                                                    >
                                                        <MenuItem value="short_answers">Short Answer</MenuItem>
                                                        <MenuItem value="checkbox">Multiple Choice Questions</MenuItem>
                                                        <MenuItem value="options">Options</MenuItem>
                                                    </Select>
                                                    <p style={{color:"red"}}>{item.questionTypeError}</p>
                                                </FormControl>

                                                <TextField  label="enter question" variant="outlined"
                                                            name="question"
                                                            value={item.title}
                                                            onChange={(e)=>this.handleQuestion(key,e)}
                                                            required fullWidth style={{marginTop:20}}
                                                />
                                                <p style={{color:"red"}}>{item.questionError}</p>
                                                {
                                                    item.question_type !== "short_answers" && item.survey_options_attributes.map((inputfield:any , index:any) => {
                                                        return(
                                                            <>
                                                                <TextField
                                                                   key={index}
                                                                   label={"option - " + (index + 1)} variant="outlined"
                                                                   name="text"
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
                                                    this.state.questionType !== "short_answers" &&
                                                    <Button variant="outlined" color="primary"
                                                            onClick={() => this.addOptionsFields(key)}
                                                            className="addOptions"
                                                    >
                                                        ADD OPTION
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
                                <Button onClick={this.addQuestionFields} fullWidth size="large" colo="primary" variant="outlined" style={{borderRadius:"8px",border:" 1px dashed #2b6fed",color:"#2b6fed",fontWeight:"bold"}}>+ Add Another Question</Button>
                            </Grid>
                            <Grid  item sm={12} md={12} xs={12}>
                                <Box className="BottomButtonSurvey">
                                    <Box className="Previewbtn">
                                        <Button onClick={this.handlePriviewData} variant="contained" color="primary">PREVIEW</Button>
                                    </Box>
                                    <Box className="Publishbtn">
                                        <Button onClick={this.handleSurveyDataSubmit} type="submit" variant="outlined" color="primary">PUBLISH</Button>
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
                            <AudienceModal handleClose={this.handleCloseAudienceModal} />
                        </div>
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

// Customizable Area End
