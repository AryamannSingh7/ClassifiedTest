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
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

class AudienceModal extends AudienceModalController {
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      <>
        <Box style={{width:"55vw",height:"650px",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"10px",overflow:"scroll"}}>
            <Box style={{display:'flex',justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}>
                <Typography variant="h5" style={{fontWeight:"bold"}}> Create Target Audience </Typography>
                <IconButton onClick={this.props.handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider/>
            <Box style={{margin:"20px 0px",display:'flex',}}>
                <Grid container spacing={1} style={{width:"100%"}}>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel id="question-type">Select Building</InputLabel>
                            <Select
                                labelId="question-type"
                                id="question-type-select"
                                label="Age"
                                style={{width:"180px",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                            >
                                <MenuItem value={10}>Building 1</MenuItem>
                                <MenuItem value={20}>Building 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                            placeholder="Enter Floor Number."
                            type="number"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                            placeholder="Enter Unit Number. / Name"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined">
                            <InputLabel id="question-type">User Type</InputLabel>
                            <Select
                                labelId="question-type"
                                id="question-type-select"
                                label="Age"
                                style={{width:"180px",border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                            >
                                <MenuItem value={10}>Owner</MenuItem>
                                <MenuItem value={20}>Resident</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <AudienceButton variant="contained" color="primary" startIcon={<SearchIcon />} style={{fontWeight:"bold",width:"150px",borderRadius:"10px",height:"55px",fontSize:"16px"}}>
                            Search
                        </AudienceButton>
                    </Grid>
                </Grid>
            </Box>
            <Divider/>
            <Box style={{margin:"20px 0px"}}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell style={{borderBottom:"none"}} align="left"><Checkbox
                                    disableRipple
                                    color="default"
                                    style={{padding:"0"}}
                                    checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}}/>}
                                    icon={<CheckBoxOutlineBlankIcon style={{color:"#e2e2e2"}}/>}
                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                /></TableCell>
                                <TableCell style={{borderBottom:"none",fontWeight:"bold"}} align="left">Name</TableCell>
                                <TableCell style={{borderBottom:"none",fontWeight:"bold"}} align="left">Unit No.</TableCell>
                                <TableCell style={{borderBottom:"none",fontWeight:"bold"}} align="left">Floor Number</TableCell>
                                <TableCell style={{borderBottom:"none",fontWeight:"bold"}} align="left">UserType</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.audienceData.map((item:any,key) => (
                                <TableRow key={key}>
                                    <TableCell style={{borderBottom:"none"}} component="th" scope="row">
                                        <Checkbox
                                            disableRipple
                                            color="default"
                                            style={{padding:"0"}}
                                            checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}}/>}
                                            icon={<CheckBoxOutlineBlankIcon style={{color:"#e2e2e2"}}/>}
                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                        />
                                    </TableCell>
                                    <TableCell style={{borderBottom:"none"}} align="left">{item.name}</TableCell>
                                    <TableCell style={{borderBottom:"none"}} align="left">{item.unitNo}</TableCell>
                                    <TableCell style={{borderBottom:"none"}} align="left">{item.floorNo}</TableCell>
                                    <TableCell style={{borderBottom:"none"}} align="left">{item.userType}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Divider/>
            <Box style={{display:'flex',justifyContent:'space-between',alignItems:"center",margin:"20px 0px"}}>
                <Box  style={{display:'flex'}}>
                    <Typography variant="h6" style={{color:"#fc8434",fontWeight:"bold"}}>{this.state.selectedAudience.length}</Typography>
                    <Typography variant="h6" style={{paddingLeft:"5px",fontWeight:"bold"}}> Users Selected </Typography>
                </Box>
                <Box style={{display:'flex'}}>
                    <TextField
                        variant="outlined"
                        style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                        placeholder="Audience Name"
                        type="number"
                    />
                    <AudienceButton variant="contained" color="primary" style={{fontWeight:"bold",width:"200px",borderRadius:"10px",height:"55px",fontSize:"16px"}}>
                        Create Audience
                    </AudienceButton>
                </Box>
            </Box>
        </Box>
      </>
    );
  }
}

export default AudienceModal;

const AudienceButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        height:"40px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);
