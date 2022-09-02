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

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import TextEditor from "./TextEditor.web";



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

export default class CreateSurveys extends PollingController {
  constructor(props: Props) {
    super(props);
   
  }
  handleChange = (event:any) => {
    this.setState({checked: !this.state.checked})
  };
  render() {
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
                            Poll and survey / <Box component="span" style={{color: "blue"}}>Create a Survey</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Create a Survey</Typography>
                        </Box>
                    </Box>

                    <form>
                        <Grid container spacing={4} style={{marginTop: 15}}>
                   
                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <TextField label="Name of the Survey" variant="outlined"
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

                                    <TextField label="Start Date" variant="outlined"
                                    name="startDate"
                                    value={this.state.PollData.startDate}
                                    onChange={this.handlePollDataChange}
                                    required fullWidth
                                    />
                                    <TextField label="End Date" variant="outlined"
                                    name="endDate"
                                    value={this.state.PollData.endDate}
                                    onChange={this.handlePollDataChange}
                                    required fullWidth
                                    />  

                                </Box>

                                <Box className="targetaudience">
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">Select your target audience</Typography>  
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box className="targetOne">
                                        <Button variant="outlined" color="primary">OWNERS</Button>
                                        <Button variant="outlined" color="primary">RESIDENTS</Button>
                                        <Typography variant="subtitle1">Or, </Typography>
                                        <Button variant="contained" color="primary">CREATE AUDIENCE</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select"
                                    value={this.state.selectQuestion}
                                    onChange={this.handleQuestionSelect}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    placeholder="Select type of question"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        style:{borderRadius:"2px"}
                                    }}
                                >

                                    {currencies.map((option:any) => {
                                        return(
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        )
                                    })
                                    }
                                </TextField>
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



                                <TextField  label="enter question" variant="outlined"
                                name="question"
                                value={this.state.PollData.question}
                                onChange={this.handlePollDataChange}
                                required fullWidth style={{marginTop:20}}
                                />

                                {/* <TextField  label="Option - 1" variant="outlined"
                                name="optionOne"
                                value={this.state.PollData.optionOne}
                                onChange={this.handlePollDataChange}
                                required fullWidth style={{marginTop:20}} 
                                /> */}


                                {this.state.options.map((inputfield:any , index:any) => {
                                    return(
                                        <TextField key={index}
                                        label={"option - " + (index + 1)} variant="outlined" 
                                        name="text"
                                        value={inputfield.text}
                                        onChange={() => this.handleOptionsChange(index, event)}
                                        required fullWidth style={{marginTop:20}} 
                                        />  
                                    ) 
                                })   
                                }

                                <Button variant="outlined" color="primary" 
                                onClick={() => this.addOptionsFields()}
                                className="addOptions">ADD OPTION</Button> 

                            </Box>
                        </Grid>

                        </Grid>

                        <Box className="BottomButton">
                            <Box className="Previewbtn"> 
                                <Link href="/SurveyPreview">
                                    <Button variant="contained" color="primary">PREVIEW</Button>
                                </Link> 
                            </Box>
                            <Box className="Publishbtn">
                                <Button type="submit" variant="outlined" color="primary">PUBLISH</Button>
                            </Box> 
                        </Box>

                    </form>
                    
                </Container>
            </Grid>
        </Box>
    </Box>
     </>
      );
  }
}


const dashBoard = {
    SideBar: {
        background: "#f9f6f6",
        position:"relative",
        paddingBottom: 150,
    },
}

// Customizable Area End
