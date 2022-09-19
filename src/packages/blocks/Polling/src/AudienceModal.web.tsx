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
        <Box style={{width:"55vw",maxHeight:"650px",marginTop:'15px',backgroundColor:"white",padding:'20px',borderRadius:"10px",overflowY:"scroll"}}>
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
                                value={this.state.selectBuilding}
                                onChange={(e)=>this.setState({selectBuilding:e.target.value})}
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
                            value={this.state.floorNumber}
                            onChange={(e)=>this.setState({floorNumber:e.target.value})}
                            type="number"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                            value={this.state.searchText}
                            onChange={(e)=>this.setState({searchText:e.target.value})}
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
                                value={this.state.userType}
                                onChange={(e)=>this.setState({userType:e.target.value})}
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
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow >
                                <TableCell style={{borderBottom:"none"}} align="left"><Checkbox
                                    disableRipple
                                    color="default"
                                    style={{padding:"0"}}
                                    checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}}/>}
                                    icon={<CheckBoxOutlineBlankIcon style={{color:"#e2e2e2"}}/>}
                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                    onChange={(e)=>this.handleSelectAll(e)}
                                /></TableCell>
                                <TableCell style={{borderBottom:"none",fontWeight:"bold"}} align="left" >Name</TableCell>
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
                                            checked={!!this.state.selectedAudience.find((itemA:any)=> itemA === item.id)}
                                            icon={<CheckBoxOutlineBlankIcon style={{color:"#e2e2e2"}}/>}
                                            inputProps={{ 'aria-label': 'decorative checkbox' }}
                                            onChange={(e)=>this.handleCheck(item.id)}
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
                        value={this.state.audienceName}
                        onChange={(e) => this.setState({audienceName:e.target.value})}
                    />
                    <AudienceButton onClick={()=>console.log("SelectedAudience",this.state.selectedAudience)} variant="contained" color="primary" style={{fontWeight:"bold",width:"200px",borderRadius:"10px",height:"55px",fontSize:"16px"}}>
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
