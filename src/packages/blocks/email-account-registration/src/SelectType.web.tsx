import * as React from "react";
// custom components
import { Button, Grid, Box,Typography } from "@material-ui/core";
import "../assets/css/style.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController.web";
import { Back_btn, Building1, manager, owner, resident_owner, tenet,OwnerResidetSelected,OwnerSelected,TenantSelected,PropertyManagerSelected } from "./assets";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import { withTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioGroup from "@material-ui/core/RadioGroup";

class SelectType extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <>
        <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: "unset",marginLeft:"15px",marginRight:"15px"}}>
            <div>
              <Grid container className="main-content-block" style={{marginTop:"30px"}}>
                <Grid xs={12} style={{ marginBottom: "35px" }}>
                  <ArrowBackIcon onClick={() => window.history.back()} style={{ fontSize: "35px",marginLeft:"-7px" }} />
                </Grid>
              </Grid>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Typography variant="h4" className="text-left bold-text" style={{ fontSize: "26px", fontWeight: 800,marginBottom:"5px",fontFamily:"Century Gothic"}}>
                    Please select your type
                  </Typography>
                </Grid>
              </Grid>

              <Grid container className="main-content-block" style={{marginBottom:"30px"}}>
                <Grid xs={12}>
                  <Typography className="text-left" style={{fontSize: "15px"}}>Please select appropriate user type</Typography>
                </Grid>
              </Grid>

              <Grid container className="main-content-block">
                <Grid xs={12}>
                  <Box
                    display="flex"
                    className={"select-type " + (this.state.userType == "Owner Resident" ? " active-box" : "")}
                    alignItems="center"
                    justifyContent="space-between"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                    style={{cursor:"pointer"}}
                    onClick={() => this.changeType("Owner Resident")}
                  >
                    <Box style={{width: "50px", height: "50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <img src={this.state.userType == "Owner Resident" ? OwnerResidetSelected :resident_owner}/>
                    </Box>
                    <Box className={"middle-section"} style={{display:"flex",flexDirection:"column",marginBottom:"0px",width:"70%"}}>
                      <label
                        //@ts-ignore
                        for="radCreateMode"
                        className={"title" + (this.state.userType == "Owner Resident" ? " active-type" : "")}
                        style={{ padding: "0px",color:"#939292",marginBottom:"0px"}}
                      >
                        Resident Owner
                      </label>
                      <br />
                      <label
                        className={"para" + (this.state.userType == "Owner Resident" ? " active-para" : "")}
                        //@ts-ignore
                        for="radCreateMode"
                        style={this.state.userType == "Owner Resident" ? {color:"#181d25",marginTop:"-12px",marginBottom:"5px"} :{color:"#939292",marginTop:"-12px",marginBottom:"5px"}}
                      >
                        I am the owner of the unit and i am living in it
                      </label>
                    </Box>
                    <RadioGroup aria-label="Type" style={{width:"30px"}} name="Type" value={this.state.userType} onChange={(e: any) => this.changeType(e.target.value)}>
                      <FormControlLabel
                          value="Owner Resident"
                          control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                          checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="" />
                    </RadioGroup>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type " + (this.state.userType == "Tenant" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                    style={{cursor:"pointer"}}
                    onClick={() => this.changeType("Tenant")}
                  >
                    <Box style={{width: "50px", height: "50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <img src={this.state.userType == "Tenant" ? TenantSelected :tenet} />
                    </Box>
                    <Box className="middle-section" style={{display:"flex",flexDirection:"column",marginBottom:"0px",width:"70%"}}>
                      <label
                        //@ts-ignore
                        for="radCreateMode2"
                        className={"title" + (this.state.userType == "Tenant" ? " active-type" : "")}
                        style={{ padding: "0px",color:"#939292",marginBottom:"0px"}}
                      >
                        Tenant
                      </label>
                      <br />
                      <label
                        className={"para" + (this.state.userType == "Tenant" ? " active-para" : "")}
                        //@ts-ignore
                        for="radCreateMode2"
                        style={this.state.userType == "Tenant" ? {color:"#181d25",marginTop:"-12px",marginBottom:"5px"} :{color:"#939292",marginTop:"-12px",marginBottom:"5px"}}
                      >
                        I am registering as someone who rented a unit
                      </label>
                    </Box>
                    <RadioGroup aria-label="Type" style={{width:"30px"}} name="Type" value={this.state.userType} onChange={(e: any) => this.changeType(e.target.value)}>
                      <FormControlLabel
                          value="Tenant"
                          control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                          checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="" />
                    </RadioGroup>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type" + (this.state.userType == "Owner" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                    style={{cursor:"pointer"}}
                    onClick={() => this.changeType("Owner")}
                  >
                    <Box style={{width: "50px", height: "50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <img src={this.state.userType == "Owner"? OwnerSelected :owner} />
                    </Box>
                    <Box className="middle-section" style={{display:"flex",flexDirection:"column",marginBottom:"0px",width:"70%"}}>
                      <label
                        //@ts-ignore
                        for="radCreateMode5"
                        className={"title" + (this.state.userType == "Owner" ? " active-type" : "")}
                        style={{ padding: "0px",color:"#939292",marginBottom:"0px"}}
                      >
                        Owner
                      </label>
                      <br />
                      <label
                        className={"para" + (this.state.userType == "Owner" ? " active-para" : "")}
                        //@ts-ignore
                        for="radCreateMode5"
                        style={this.state.userType == "Owner" ? {color:"#181d25",marginTop:"-12px",marginBottom:"5px"} :{color:"#939292",marginTop:"-12px",marginBottom:"5px"}}
                      >
                        I am the owner of the unit, but I am not living inside it
                      </label>
                    </Box>
                    <RadioGroup aria-label="Type" style={{width:"30px"}} name="Type" value={this.state.userType} onChange={(e: any) => this.changeType(e.target.value)}>
                      <FormControlLabel
                          value="Owner"
                          control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                          checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="" />
                    </RadioGroup>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    className={"select-type" + (this.state.userType == "Property Manager" ? " active-box" : "")}
                    alignItems="center"
                    border="0.1px solid rgb(209 209 209 / 44%)"
                    borderRadius="16px"
                    bgcolor="white"
                    marginTop="1rem"
                    style={{cursor:"pointer"}}
                    onClick={() => this.changeType("Property Manager")}
                  >
                    <Box style={{width: "50px", height: "50px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <img src={this.state.userType == "Property Manager" ? PropertyManagerSelected :manager} />
                    </Box>
                    <Box className="middle-section" style={{display:"flex",flexDirection:"column",marginBottom:"0px",width:"70%"}}>
                      <label
                        //@ts-ignore
                        for="radCreateMode3"
                        className={"title" + (this.state.userType == "Property Manager" ? " active-type" : "")}
                        style={{ padding: "0px",color:"#939292",marginBottom:"0px"}}
                      >
                        Property Manager
                      </label>
                      <br />
                      <label
                        //@ts-ignore
                        for="radCreateMode3"
                        className={"para" + (this.state.userType == "Property Manager" ? " active-para" : "")}
                        style={this.state.userType == "Property Manager" ? {color:"#181d25",marginTop:"-12px",marginBottom:"5px"} :{color:"#939292",marginTop:"-12px",marginBottom:"5px"}}
                      >
                        I am managing a property on behalf of an owner
                      </label>
                    </Box>
                    <RadioGroup aria-label="Type" style={{width:"30px"}} name="Type" value={this.state.userType} onChange={(e: any) => this.changeType(e.target.value)}>
                      <FormControlLabel
                          value="Property Manager"
                          control={<Radio icon={<RadioButtonUncheckedIcon style={{color:"#525252"}} />}
                                          checkedIcon={<RadioButtonCheckedIcon style={{color:"#FC8434"}} />} />} label="" />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={12}>
                  <Button
                    fullWidth={true}
                    className={"btn"}
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
                      marginTop: 80,
                    }}
                    onClick={this.updateTypeOwner}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Loader loading={this.state.loading} />
            </div>
          </Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: "none", md: "flex" }}>
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}
//@ts-ignore
export default withTranslation()(withRouter(SelectType));
