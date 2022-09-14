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

import SurveyController, {
  Props,
  configJSON,
} from "./SurveyController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import TextEditor from "./TextEditor.web";
import Backdrop from "@material-ui/core/Backdrop";
import AudienceModal from "./AudienceModal.web";
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
import '../../../web/src/i18n.js';


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

class CreateSurveys extends SurveyController {
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
                                    value={this.state.PollData.title}
                                    onChange={this.handlePollDataChange}
                                    required fullWidth
                                    />

                                    <Box className="DateSection">
                                        {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <Grid container justifyContent="space-between">
                                            <KeyboardDatePicker
                                            className="DateBox"
                                            disableToolbar
                                            variant="inline"
                                            format="MM/DD/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Start Date"
                                            value={this.state.selectedDate}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            fullWidth
                                            />
                                            <KeyboardDatePicker
                                            className="DateBox"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="End Date"
                                            format="MM/DD/yyyy"
                                            onChange={this.handleDateChange}
                                            value={this.state.selectedDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            fullWidth
                                            />
                                        </Grid>
                                        </MuiPickersUtilsProvider> */}

                                        <TextField label={t("Start Date")} variant="outlined"
                                        name="startDate"
                                        value={this.state.PollData.startDate}
                                        onChange={this.handlePollDataChange}
                                        required fullWidth
                                        />
                                        <TextField label={t("End Date")} variant="outlined"
                                        name="endDate"
                                        value={this.state.PollData.endDate}
                                        onChange={this.handlePollDataChange}
                                        required fullWidth
                                        />

                                    </Box>
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">Description</Typography>
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box className="descriptionEditor">
                                        <TextEditor
                                            markup={this.state.textEditorVal}
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
                                                        value={item.questionType}
                                                        label="Age"
                                                        style={{width:"100%",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                                        onChange={(e)=> this.handleQuestionType(key,e)}
                                                    >
                                                        <MenuItem value="short_answers">Short Answer</MenuItem>
                                                        <MenuItem value="checkbox">Multiple Choice Questions</MenuItem>
                                                        <MenuItem value="options">Options</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField  label="enter question" variant="outlined"
                                                            name="question"
                                                            value={item.question}
                                                            onChange={(e)=>this.handleQuestion(key,e)}
                                                            required fullWidth style={{marginTop:20}}
                                                />
                                                {
                                                    item.questionType !== "shortAns" && item.options.map((inputfield:any , index:any) => {
                                                        return(
                                                            <TextField key={index}
                                                                       label={"option - " + (index + 1)} variant="outlined"
                                                                       name="text"
                                                                       value={inputfield.text}
                                                                       onChange={(event) => this.handleOptionsChange(key,index, event)}
                                                                       required fullWidth style={{marginTop:20}}
                                                            />
                                                        )
                                                    })
                                                }
                                                {
                                                    this.state.questionType !== "shortAns" &&
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
                                        <Link href="/SurveyPreview">
                                            <Button variant="contained" color="primary">{t("PREVIEW")}</Button>
                                        </Link>
                                    </Box>
                                    <Box className="Publishbtn">
                                        <Button type="submit" variant="outlined" color="primary">{t("PUBLISH")}</Button>
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
