//@ts-ignore
//@ts-nocheck
import * as React from "react";
// custom components
import {
  Button, Grid, Card, Box, Typography, Link, IconButton, Checkbox
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ClassifiedController, { Props } from "./ClassifiedController.web";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { BuyIcon, GenericIcon, SellerIcon, BuyIconSelected, GenericIconSelected, SellerIconSelected, Building1 } from "../src/assets";
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CustomRadioButton from "./radio.web";
class ClassifiedType extends ClassifiedController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (

      <>
        <Grid container className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Classifieds</h4>
                  </Box>
                </Box>
                <Box className="classifiedtype-block content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <p className="text-left">
                      This page will allow the residents to publish classifieds to the building's classified page.
                      You can publish an advertisement to sell things, buy things, or ask for services like a baby setter
                      for your child.
                    </p>
                    <Card className="card classified-type-card">
                      <Box className="middle-section">
                        <img src={SellerIcon} className="icons" />
                        {/* <img src={SellerIconSelected} className="icons" /> */}
                        <label for="radCreateMode1" className={"radioTitle" + (this.state.userType == 'seller' ? ' active-type' : '')}>
                          I want to sell something
                        </label>
                      </Box>
                      {/* <CustomRadioButton name="1" value="1" /> */}
                      {/* <Checkbox className="radio-toolbar" id="radCreateMode1" name="type" value='seller' onChange={(e) => this.changeType(e.target.value)} icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                  /> */}
                      <input type="radio" id="radCreateMode1" name="type" value='seller' onChange={(e) => this.changeType(e.target.value)} />
                    </Card>
                    <Card className="card classified-type-card">
                      <Box className="middle-section">
                        <img src={BuyIcon} className="icons" />
                        {/* <img src={BuyIconSelected} className="icons" /> */}
                        <label for="radCreateMode2" className={"radioTitle" + (this.state.userType == 'buyer' ? ' active-type' : '')}>
                          I want to buy something
                        </label>
                      </Box>
                      {/* <Checkbox className="radio-toolbar" id="radCreateMode2" name="type" value='buyer' onChange={(e) => this.changeType(e.target.value)} icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                  /> */}
                      {/* <CustomRadioButton name="1" value="1" /> */}
                      <input type="radio" id="radCreateMode2" name="type" value='buyer' onChange={(e) => this.changeType(e.target.value)} />
                    </Card>
                    <Card className="card classified-type-card">
                      <Box className="middle-section">
                        <img src={GenericIcon} className="icons" />
                        {/* <img src={GenericIconSelected} className="icons" /> */}
                        <label for="radCreateMode3" className={"radioTitle" + (this.state.userType == 'generic' ? ' active-type' : '')}>
                          I have a generic request
                        </label>
                      </Box>
                      {/* <Checkbox className="radio-toolbar" id="radCreateMode3" name="type" value='generic' onChange={(e) => this.changeType(e.target.value)} icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                  /> */}
                      {/* <CustomizedRadios /> */}
                      <input type="radio" id="radCreateMode3" name="type" value='generic' onChange={(e) => this.changeType(e.target.value)} />
                    </Card>
                  </Box>
                  <Box className="footer-main-block bottomBlock">
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
                      onClick={() => this.nextBtn(this.state?.userType)}
                    >
                      continue
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}
export default withRouter(ClassifiedType)
