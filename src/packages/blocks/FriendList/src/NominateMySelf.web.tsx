import * as React from "react";
// custom components
import {
    Grid,
    Box,
    Divider,
    AppBar,
    Tabs,
    Tab,
    Link,
    IconButton,
    Typography,
    Button,
    Paper,
    TextField,
    FormControlLabel,
    InputAdornment,
    Checkbox,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ChairmainNominationController, {
  Props
} from "./ChairmainNominationController";
import './MyTeam.web.css'
import {profileExp} from "./assets";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ReorderIcon from '@material-ui/icons/Reorder';

class NominateMySelf extends ChairmainNominationController{
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => this.props.history.push("/")} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              Nominate My Self
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "white",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={3} style={{width:"90%",marginTop:"20px"}}>
                        <Grid item xs={12}>
                            <Box style={{display:'flex',justifyContent:'space-between'}}>
                                <Box display="flex" alignItems="center">
                                    <img src={profileExp}/>
                                    <Box style={{marginLeft:"10px"}}>
                                        <Typography style={{fontWeight:"bold",marginRight:"20px"}}>Jhon Doe</Typography>
                                        <Typography variant="subtitle2">B-104, B-105 , D-504</Typography>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>Owner</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Why I should be elected"
                                    multiline
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" style={{alignSelf:"flex-start"}}>
                                                <ReorderIcon style={{marginTop:"10px"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                    rows={8}
                                    variant="outlined"
                                />
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <Typography style={{fontWeight:"bold"}}>Nominate As a</Typography>
                                <FormControlLabel
                                    control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}} />} name="checkedA" />}
                                    label="Chairman"
                                />
                                <FormControlLabel
                                    control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}} />} name="checkedB" />}
                                    label="Vice Chairman"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large">
                            Submit
                        </CloseButton>
                    </Box>
                </Box>
            </Grid>
        </>
    );
  }
}
export default withRouter(NominateMySelf)

const CloseButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);



// Customizable Area End
