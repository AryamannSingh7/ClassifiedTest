//@ts-nocheck
//@ts-ignore

import React from "react";
import "./Polling.web.css"

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {
  Container,
  Typography,
  TextField,
  Input,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Switch from '@material-ui/core/Switch';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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

export default class CreatePolls extends PollingController {
  constructor(props: Props) {
    super(props);
  }
  handleChange = (event:any) => {
    this.setState({checked: !this.state.checked})
  };
  render() {
    return ( 
      <>
    <Box>
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
                            Poll and survey / <Box component="span" style={{color: "blue"}}>Create a Poll</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Create a Poll</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={4} style={{marginTop: 15}}>

                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <TextField id="outlined-basic" label="Title of the Poll" variant="outlined" fullWidth/>
                                
                                <Box className="DateSection">
                                    <TextField id="outlined-basic" label="Start Date" variant="outlined" fullWidth/>
                                    <TextField id="outlined-basic" label="End Date" variant="outlined" fullWidth/>  
                                
                                
                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justifyContent="space-around">
                                        <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                        <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider> */}

                                
                                </Box>
                                <Box className="anonymousSwitch">
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">Make it anonymous poll</Typography>  
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box style={{float:"right"}}>
                                    <Switch
                                        checked={this.state.checked}
                                        // onChange={this.handleChange}
                                         onClick={this.handleChange}
                                        value="checked"
                                        color="primary"
                                        name="checked"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>


                        <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <Box className="infoIcon">
                                    <Typography variant="subtitle1">Make it anonymous poll</Typography>  
                                    <InfoIcon style={{color:"grey", fontSize:18}}/>
                                </Box>

                                <Editor editorState={this.state.editorState} onChange={this.onChange} />

                                <TextField  label="enter question" variant="outlined" fullWidth style={{marginTop:20}}/>
                                <TextField  label="Option - 1" variant="outlined" fullWidth style={{marginTop:20}} />
                                <TextField  label="Option - 2" variant="outlined" fullWidth style={{marginTop:20}}/>
                                <Button variant="outlined" color="primary" style={{marginTop:20}}>ADD OPTION</Button>  
                            </Box>
        
                        </Grid>

                    </Grid>

                    <Box className="BottomButton">
                        <Button variant="contained" color="primary">PREVIEW</Button>
                        <Button variant="outlined" color="primary">PUBLISH</Button>
                    </Box>
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
