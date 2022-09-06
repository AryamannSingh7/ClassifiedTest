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
class AudienceModal extends AudienceModalController {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <>
        <Box style={{width:"55vw",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"10px"}}>
            <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                <Typography variant="h5" style={{fontWeight:"bold"}}> Response Details </Typography>
                <IconButton onClick={this.props.handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider/>
            <Box style={{marginTop:"15px"}}>
                <Box className="PollName">
                    <Typography className="subHeading">Survey Name: </Typography>
                    <Typography className="PollNameText">
                        Test Name
                    </Typography>
                </Box>
            </Box>
            <Box style={{marginTop:"20px"}}>
                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{1}. {"Should we need to charge for extra vehicle parking?"}</Typography>
                <Typography style={{marginTop:"5px"}}>Response : Yes we need space extra Parking</Typography>
            </Box>
            <Box style={{marginTop:"20px"}}>
                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{2}. {"Do we have need to security Camers?"}</Typography>
                <Typography style={{marginTop:"5px"}}>Response : No</Typography>
            </Box>
            <Box style={{marginTop:"20px"}}>
                <Typography variant={"h6"} style={{fontWeight:"bold"}}>Q{3}. {"Should we need to charge for extra vehicle parking?"}</Typography>
                <Typography style={{marginTop:"5px"}}>Response : Maybe</Typography>
            </Box>
        </Box>
      </>
    );
  }
}

export default AudienceModal;
