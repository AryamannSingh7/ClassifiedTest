// Customizable Area Start
//@ts-ignore
//@ts-nocheck

import React from "react";
import "./Polling.web.css"
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import RichTextEditor from "react-rte";
import {
  Container,
  Typography,
  TextField,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
// import { DateRangePicker, DateRange, Calendar  } from 'react-date-range';
import 'date-fns';
// Icons
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import InfoIcon from '@material-ui/icons/Info';
// Icons

import PollingController, {
  Props,
  configJSON,
} from "./PollingController";
import { withRouter } from "react-router-dom";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import TextEditor from "./TextEditor.web";
import Loader from "../../../components/src/Loader.web";
import * as Yup from "yup";

class CreatePolls extends PollingController {
  constructor(props: Props) {
    super(props);
   
  }

  componentDidMount() {
    const PreviewPollData = localStorage.getItem('Polls_Data') && JSON.parse(localStorage.getItem('Polls_Data'));
    if(PreviewPollData){
        this.setState({
            PollData:PreviewPollData.PollFormData, 
            options: PreviewPollData.PollOptions,  
            checked: PreviewPollData.PollType,
            textEditorVal:PreviewPollData.PollDescription
        },
            () => console.log("PreViewPollData [ PollData ]====>>>>>",  this.state.PollData, this.state.options)
        )
    }
  }

  render() {
    console.log("textEditorVal+++++++",this.state.textEditorVal);
    // console.log("polldata description------", this.state.PollData.description)
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
                            Poll and survey / <Box component="span" style={{color: "blue"}}>Create a Poll</Box>
                            </Typography>
                            <Typography variant="h5" className="subHeading">Create a Poll</Typography>
                        </Box>
                    </Box>
                    <form onSubmit={this.handlePollDataSubmit}>
                        <Grid container spacing={4} style={{marginTop: 15}}>
                            <Grid item sm={12} md={12} xs={12}>
                            <Box className="createPSCards">
                                <TextField label="Title of the Poll" variant="outlined"
                                    name="title"
                                    value={this.state.PollData.title}
                                    onChange={this.handlePollDataChange}
                                     fullWidth
                                    inputProps={{ maxLength: 50 }}
                                />
                                <p style={{color:"red"}}>{this.state.pollTitleError}</p>
                                <Box className="DateSection">
                                    <Box style={{width:"100%"}}>
                                        <TextField
                                            label="Start Date" variant="outlined"
                                            style={{width:"100%"}}
                                            type="date" name="startDate"  fullWidth
                                            format='DD/MM/YYYY'
                                            value={this.state.PollData.startDate}
                                            onChange={this.handlePollDataChange}
                                            InputProps={{
                                                // min: "2019-01-24",
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
                                                   value={this.state.PollData.endDate}
                                                   onChange={this.handlePollDataChange}
                                                   InputProps={{
                                                       // min: "2019-01-24",
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
                                {/*<p style={{color:"red"}}>{this.state.pollDateError}</p>*/}
                                <Box className="anonymousSwitch">
                                    <Box className="infoIcon">
                                        <Typography variant="subtitle1">Make it anonymous poll</Typography>
                                        <InfoIcon style={{color:"grey", fontSize:18}}/>
                                    </Box>
                                    <Box style={{float:"right"}}>
                                    <Switch
                                        checked={this.state.checked}
                                         onClick={(event: any) =>
                                            this.setState(
                                                {checked: event.target.checked},
                                               () => console.log("isCheck--", this.state.checked )
                                            )
                                        }
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
                                 fullWidth style={{marginTop:20}}
                                inputProps={{ maxLength: 100 }}
                                />
                                <p style={{color:"red"}}>{this.state.pollQuestionError}</p>

                                {this.state.options.map((inputfield:any , index:any) => {
                                    console.log("inputfield",inputfield)
                                    return(
                                        <>
                                            <TextField key={index}
                                                label={"option - " + (index + 1)} variant="outlined"
                                                name="text"
                                                value={inputfield.text}
                                                onChange={(event) => this.handleOptionsChange(index, event)}
                                                 fullWidth style={{marginTop:20}}
                                            />
                                            <p style={{color:"red"}}>{inputfield.error}</p>
                                        </>
                                    )
                                })
                                }
                                <p style={{color:"red"}}>{this.state.pollOptionasError}</p>

                                <Button variant="outlined" color="primary"
                                onClick={() => this.addOptionsFields()}
                                className="addOptions">ADD OPTION</Button>

                            </Box>
                        </Grid>

                        </Grid>

                        <Box className="BottomButton">
                            <Box className="Previewbtn">
                                    <Button variant="contained" color="primary"
                                    onClick={async () => {
                                        await this.handlePriviewData()
                                    }}
                                    >PREVIEW</Button>
                            </Box>
                            <Box className="Publishbtn">
                                <Button type="submit" variant="outlined" color="primary"
                                // onClick={()=>this.props.history.push("/PollPreview")}
                                >PUBLISH</Button>
                            </Box>
                        </Box>

                    </form>
                    
                </Container>
            </Grid>
        </Box>
    </Box>
    <Loader loading={this.state.loading} />
     </>
      );
  }
}

export default withRouter(CreatePolls);


// Customizable Area End
