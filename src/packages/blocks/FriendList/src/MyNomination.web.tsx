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
                              My Nomination
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Divider/>
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
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non erat non massa sagittis pulvinar non id lectus. Cras ultrices bibendum cursus. Mauris vel erat maximus, porta risus a, pulvinar augue. Donec sit amet enim eget est posuere posuere in in lacus. Nullam lacinia, diam sit amet molestie placerat, tellus metus dignissim massa, sed tempor magna elit pulvinar felis. In in nulla malesuada, suscipit eros et, pulvinar sapien. Curabitur et odio leo.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large">
                            Cancel Nomination
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
        color: "#2B6FED",
        backgroundColor: "white",
        border:"1px solid #2B6FED",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);



// Customizable Area End
