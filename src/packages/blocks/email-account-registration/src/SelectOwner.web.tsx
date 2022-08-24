//@ts-ignore
//@ts-nocheck

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
import { Building1, manager, owner, resident_owner, tenet } from "./assets";
import { withRouter } from 'react-router';




class SelectOwner extends EmailAccountRegistrationController {
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
        <Grid container className="main-content-block">
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>
            <div style={{ margin: 'auto' }}>


        <Grid container className="main-content-block">
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '2rem', fontWeight: 700,marginBottom:10 }}>
              Sign  up

            </p>
          </Grid>
        </Grid>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <p className="text-left">
              Please select your   type



            </p>
          </Grid>
        </Grid>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <Box
              display="flex"
              justifyContent='space-between'
              className='select-type'

              alignItems="center"
              border="0.1px solid rgb(209 209 209 / 44%)"
              borderRadius="16px"
              bgcolor="white"
              marginTop='1rem'
            >
              <img src={resident_owner} />
              <Box className="middle-section">
                      <label for="radCreateMode" className={"title" + (this.state.userType == 'Owner' ? ' active-type' : '')}>
                Owner
                      </label>
                      <br/>
                      <label for="radCreateMode"  className="para">
                  I am the owner of the unit and but  i am not  living inside it
                      </label>
              </Box>

                    <input type="radio" id="radCreateMode" name="type" value='Owner' onChange={(e) => this.changeType(e.target.value)} />

            </Box>
            <Box
              display="flex"
              justifyContent='space-between'
              className='select-type'

              alignItems="center"
              border="0.1px solid rgb(209 209 209 / 44%)"
              borderRadius="16px"
              bgcolor="white"
              marginTop='1rem'
            >
              <img src={manager} />

              <Box className="middle-section">
                      <label for="radCreateMode2"  className={"title" + (this.state.userType == 'Property Manager' ? ' active-type' : '')}>
                  Property Manager
                      </label>
                      <br/>
                      <label for="radCreateMode2" className="para">
                  I am managing a property on behalf of an owner
                      </label>
              </Box>

                    <input type="radio" id="radCreateMode2" name="type" value='Property Manager' onChange={(e) => this.changeType(e.target.value)} />

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
              onClick={this.updateTypeOwner}
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
export default withRouter(SelectOwner)
