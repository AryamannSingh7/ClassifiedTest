// @ts-ignore
// @ts-nocheck

import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton
} from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web.tsx";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Building1, Linkage, manual, owner, resident_owner, tenet } from "./assets";
import { withRouter } from 'react-router';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioGroup from "@material-ui/core/RadioGroup";





class RegisterUnit extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (

      <>
        <Grid container spacing={2} className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
            <div>
                <Grid container className="main-content-block" style={{marginTop:"30px"}}>
                    <Grid xs={12} style={{marginBottom:'1rem'}}>
                        <ArrowBackIcon onClick={() => window.history.back()} style={{ fontSize: "35px" }} />
                      </Grid>
                    </Grid>
                    <Grid container className="main-content-block">
                    <Grid xs={12}>
                        <Typography className="text-left" style={{ fontSize: "26px", fontWeight: 700,marginBottom:"5px",fontFamily:"Century Gothic" }}>
                          Register a Unit
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container className="main-content-block" style={{marginBottom:'2rem'}}>
                  <Grid xs={12}>
                    <Typography className="text-left" style={{fontSize: "15px"}}>
                      Please select the appropriate registration type for the unit. If you have more than one unit, you will be able to register them on a later stage
                    </Typography>
                  </Grid>
                </Grid>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <Box
              display="flex"
              justifyContent='space-between'
              className={'select-type ' + (this.state.unitRegisterType == 'Linkage' ? ' active-box' :'')}
              alignItems="center"
              border="0.1px solid rgb(209 209 209 / 44%)"
              borderRadius="16px"
              bgcolor="white"
              marginTop='1rem'
              style={{marginBottom:'2rem'}}
            >
                <Box style={{width: "60px", height: "50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <img src={Linkage} />
                </Box>
                <Box className="middle-section">
                      <label for="radCreateMode" className={"title" + (this.state.unitRegisterType == 'Linkage' ? ' active-type' : '')}  style={{ padding: "20px 20px 0px 0px",color:"#939292" }}>
                  Linkage
                      </label>
                      <br/>
                      <label for="radCreateMode"  className="para" style={this.state.unitRegisterType == "Linkage" ? {color:"#181d25"} :{color:"#939292"}}>
                  Select this option if the building manager has requested you to register the unit, or you are aware that Tenant International ® platform is used in the building
                      </label>
                </Box>
                <RadioGroup aria-label="Type" style={{width:"30px"}} name="Type" value={this.state.unitRegisterType} onChange={(e) => this.changeUnitType(e.target.value)}>
                    <FormControlLabel
                        value="Linkage"
                        control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                        checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="" />
                </RadioGroup>
            </Box>
            <Box
              display="flex"
              justifyContent='space-between'
              className='select-type'
              className={'select-type ' + (this.state.unitRegisterType == 'Manual' ? ' active-box' :'')}
              alignItems="center"
              border="0.1px solid rgb(209 209 209 / 44%)"
              borderRadius="16px"
              bgcolor="white"
              marginTop='1rem'
              style={{marginBottom:'1rem'}}
            >
              <Box style={{width: "60px", height: "50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src={manual} />
              </Box>
              <Box className="middle-section">
                      <label for="radCreateMode2" className={"title" + (this.state.unitRegisterType == 'Manual' ? ' active-type' : '')} style={{padding:'20px 20px 0px 0px',color:"#939292"}}>
                  Manual
                      </label><br/>
                      <label for="radCreateMode2" className="para" style={this.state.unitRegisterType == "Manual" ? {color:"#181d25"} :{color:"#939292"}}>
                  Select this option if the unit is in a building not managed by "Tenant International ®" platform
                      </label>
              </Box>
                <RadioGroup aria-label="Type" style={{width:"30px"}} name="Type" value={this.state.unitRegisterType} onChange={(e: any) => this.changeUnitType(e.target.value)}>
                    <FormControlLabel
                        value="Manual"
                        control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                        checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="" />
                </RadioGroup>
            </Box>

          </Grid>
        </Grid>
        <Grid container className="main-content-block">
          <Grid xs={12}>
            <Button
              fullWidth={true}
              className={'btn'}
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#2B6FEC",
                borderRadius: 16,
                height: 54,
                marginBottom: 14,
                boxShadow: "none",
                color: "#F7F7FC",
                fontWeight: 600,
                fontSize: 16,
                marginTop: 30
              }}
              onClick={this.registerUnit}
            >
              Next
            </Button>



          </Grid>
        </Grid>
              </div>
              </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
              </Grid>
      </>

    )

  }

}
export default withRouter(RegisterUnit)
