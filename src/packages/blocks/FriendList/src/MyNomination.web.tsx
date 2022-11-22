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
import NominateMySelfController, {
  Props
} from "./NominateMySelfController";
import './MyTeam.web.css'
import {profileExp,pencil} from "./assets";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ReorderIcon from '@material-ui/icons/Reorder';
import {withTranslation} from "react-i18next";

class NominateMySelf extends NominateMySelfController{
  constructor(props: Props) {
    super(props);
  }

  render() {
      //@ts-ignore
      const {t} = this.props
    return (
        <>
            <Grid item xs={12} md={12} className="auth-cols">
                <Grid container style={{ margin: '1rem', width: '90%' }} >
                  <Grid item xs={12} style={{ display:"flex", alignItems:"center", gap:"1rem",justifyContent:"space-between"}} >
                      <Box style={{ display:"flex", alignItems:"center", gap:"1rem"}}>
                          <ArrowBackIcon onClick={() => window.history.back()} />
                          <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                              {t("My Nomination")}
                          </p>
                      </Box>
                      <IconButton onClick={()=> this.props.history.push(`/NominateMySelf?id=${this.state.nominationId}`)}>
                          <img src={pencil} width="24px" height="24px" />
                      </IconButton>
                  </Grid>
                </Grid>
                <Divider/>
                <Box style={{background: "white",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={3} style={{width:"90%",marginTop:"20px"}}>
                        <Grid item xs={12}>
                            <Box style={{display:'flex',justifyContent:'space-between'}}>
                                <Box display="flex" alignItems="center">
                                    <img src={this.state.myProfile?.image?.url || profileExp} width="50px" height="50px" style={{borderRadius:"100px"}}/>
                                    <Box style={{marginLeft:"10px"}}>
                                        <Typography style={{fontWeight:"bold",marginRight:"20px"}}>{this.state.myDetails.name}</Typography>
                                        <Typography variant="subtitle2">{this.state.myDetails?.unit_number?.join(",")}</Typography>
                                    </Box> 
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue"}>{this.state.myDetails.role}</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <Typography>
                                    {this.state.myDetails.description}
                               </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                        <CloseButton variant="contained" fullWidth size="large" onClick={()=> this.cancelMyNomination()}>
                            {t("Cancel Nomination")}
                        </CloseButton>
                    </Box>
                </Box>
            </Grid>
        </>
    );
  }
}
// @ts-ignore
export default withTranslation()(withRouter(NominateMySelf))

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
            color:"white"
        },
    },
}))(Button);



// Customizable Area End
