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
import { Building1, owner, resident_owner, tenet } from "./assets";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";





class SelectType extends EmailAccountRegistrationController {
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
        <div style={{ margin: 'auto' }}>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              Please select your type

            </p>
          </Grid>
        </Grid>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <p className="text-left">
              Please select appropriate user type
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
              <img src={resident_owner}/>
              <Box className={"middle-section"}>
                      <label for="radCreateMode" className={"title" + (this.state.userType == 'Owner Resident' ? ' active-type' :'')}>
                  Resident Owner
                </label>
                      <br />
                      <label className="para" for="radCreateMode">
                  I am the owner of the unit and i am living in it
                      </label>
              </Box>

                    <input type="radio" id="radCreateMode" name="type" value='Owner Resident' onChange={(e)=>this.changeType(e.target.value)} />

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
              <img src={tenet} />

              <Box className="middle-section">
                      <label for="radCreateMode2" className={"title" + (this.state.userType == 'Tenant' ? ' active-type' : '')}>
                  Tenant
                </label>
                      <br />
                      <label className="para" for="radCreateMode2">
                  I am registering as somone who rented a unit
                      </label>
              </Box>

                    <input type="radio" id="radCreateMode2" name="type" value='Tenant' onChange={(e) => this.changeType(e.target.value)} />

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
              {
                this.state.userType == 'Owner' ? <img src={owner} /> : <img src={owner} />
              }


              <Box className="middle-section">
                      <label for="radCreateMode3" className={"title" + (this.state.userType == 'Owner' ? ' active-type' : '')}>
                  Owner
                      </label>
                      <br/>
                      <label className="para" for="radCreateMode3">
                  I am the owner of the unit, but I am not living inside it
                      </label>
              </Box>

                    <input type="radio" id="radCreateMode3" name="type" value='Owner' onChange={(e) => this.changeType(e.target.value)} />

            </Box>
          </Grid>
        </Grid>
        <Grid container >
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
              onClick={this.updateType}
            >
              Next
            </Button>



          </Grid>
        </Grid>
        <Loader loading={this.state.loading} />
      </div>
</Grid>
          <Grid item xs={12} md={5} className="auth-cols">
            <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
              <img src={Building1} className="building-logo" alt="" />
            </Box>
          </Grid>
</Grid>
      </>

    )

  }

}
export default  withRouter(SelectType)
