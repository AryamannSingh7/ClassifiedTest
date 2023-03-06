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
import {profileExp} from "./assets";
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
                          <p className="bold-text"  style={{ fontSize: '18px' }}>
                              {
                                  this.state.nominatedSelf ?
                                  t("Edit Nomination")
                                      :
                                  t("Nominate My Self")
                              }
                          </p>
                      </Box>
                  </Grid>
                </Grid>
                <Box style={{background: "white",minHeight:"95%",display:'flex',flexDirection:"column",alignItems:'center',justifyContent:"space-between"}} >
                    <Grid container spacing={3} style={{width:"90%",marginTop:"20px"}}>
                        <Grid item xs={12}>
                            <Box style={{display:'flex',justifyContent:'space-between'}}>
                                <Box display="flex" alignItems="center">
                                    <img src={this.state.myProfile?.image?.url.default || profileExp} width="50px" height="50px" style={{borderRadius:"100px"}}/>
                                    <Box style={{marginLeft:"10px"}}>
                                        <Typography className="bold-text" style={{fontWeight:"bold",marginRight:"20px"}}>{this.state.myProfile.name}</Typography>
                                        <Typography variant="subtitle2">{this.state.myProfile.unit_number?.join(",")}</Typography>
                                    </Box>
                                </Box>
                                <Box style={{marginTop:"10px"}}>
                                    <Typography variant="subtitle2" className={"statusOngoingBlue bold-text"}>{this.state.myProfile.role}</Typography>
                                </Box>
                            </Box>
                            <Box style={{width:"100%",marginTop:"20px "}}>
                                <TextField
                                    id="nominateMySelf"
                                    label={t("Why I should be elected")}
                                    placeholder={t("Why I should be elected")}
                                    multiline
                                    // @ts-ignore
                                    InputProps={!this.state.nominatedSelf && {
                                        startAdornment: (
                                            <InputAdornment position="start" style={{alignSelf:"flex-start"}}>
                                                <ReorderIcon style={{marginTop:"15px"}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                    value={this.state.myNominationDescription}
                                    onChange={(e) => this.setState({myNominationDescription:e.target.value})}
                                    style={{border:"1px solid #ECECEC",borderRadius:"10px",backgroundColor:"#f9f9f9",marginRight:"10px"}}
                                    rows={8}
                                    variant="outlined"
                                />
                            </Box>
                            {
                                !this.state.nominatedSelf &&
                                <Box style={{width:"100%",marginTop:"20px "}}>
                                    <Typography className="bold-text" style={{fontWeight:"bold"}}>Nominate As a</Typography>
                                    <FormControlLabel
                                        onChange={this.manageSelectRole}
                                        control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}} />} name="checkedA" value={0} checked={this.state.myNominationAs.find((check:any)=> check === '0') ? true : false} />}
                                        label={t("Chairman")}
                                    />
                                    <FormControlLabel
                                        onChange={this.manageSelectRole}
                                        control={<Checkbox checkedIcon={<CheckBoxIcon style={{color:"#fc8434"}} />} name="checkedB" value={1} checked={this.state.myNominationAs.find((check:any)=> check === '1') ? true : false} />}
                                        label={t("Vice Chairman")}
                                    />
                                </Box>
                            }
                        </Grid>
                    </Grid>
                    <Box style={{width:"90%",marginBottom:"50px",marginTop:"10px"}}>
                        {
                            this.state.nominatedSelf ?
                            <CloseButton variant="contained" fullWidth size="large" onClick={this.manageNominate}>
                                {t("Save")}
                            </CloseButton>
                                :
                            <CloseButton variant="contained" fullWidth size="large" onClick={this.manageNominate}>
                                {t("Submit")}
                            </CloseButton>
                        }
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
        color: "white",
        backgroundColor: "#2b6fed",
        fontWeight:"bold",
        borderRadius:"100px",
        height:"55px",
        textTransform:"uppercase",
        '&:hover': {
            backgroundColor: "#2b6fef",
        },
    },
}))(Button);



// Customizable Area End
