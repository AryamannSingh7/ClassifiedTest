import React, { Component } from 'react';
import {Box, IconButton, Button, TextField, Select, Typography, Divider, MenuItem,Paper} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AudienceModalController, {
    Props
} from "./AudienceModalController";
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Grid from "@material-ui/core/Grid";
class SurveyResponseModal extends Component<any, any> {
  constructor(props:any) {
    super(props);
  }
  render() {
    console.log("RESPONSEEEEEEEEEEEE",this.props)
    const {response,handleClose} = this.props
    return (
      <>
        <Box style={{width:"55vw",maxHeight:"500px",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"10px",overflowY:"scroll"}}>
            <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                <Typography variant="h5" style={{fontWeight:"bold"}}> Response Details </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider/>
            <Box style={{marginTop:"15px"}}>
                <Box className="PollName">
                    <Typography className="subHeading">Survey Name: </Typography>
                    <Typography className="PollNameText">
                        {response[0].survey_name || ""}
                    </Typography>
                </Box>
            </Box>
            {
                response.map((item:any,key:any)=>{
                    console.log("item",item)
                    return(
                        <Box style={{marginTop:"20px"}} key={key}>
                            <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{1}. {item.survey_question}</Typography>
                            {
                                item.response &&
                                <Typography style={{marginTop:"5px"}}>Response : {item.response}</Typography>
                            }
                            {
                                item.concern &&
                                <Typography style={{marginTop:"5px"}}>{item.response && item.concern ? "Comment":"Short Answer"} : {item.concern}</Typography>
                            }

                        </Box>
                    )
                })
            }
        </Box>
      </>
    );
  }
}

export default SurveyResponseModal;
