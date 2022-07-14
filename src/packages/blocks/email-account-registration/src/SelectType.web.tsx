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
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { owner, resident_owner, tenet } from "./assets";
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
        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
              Please select your type

            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left">
              Please select appropriate user type



            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
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
              <Box className="middle-section">
                <p className="title">
                  Resident Owner
                </p>
                <p className="para">
                  I am the owner of the unit and i am living in it
                </p>
              </Box>

              <input type="radio" name="type" value='Owner Resident' onChange={(e)=>this.changeType(e.target.value)} />

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
                <p className="title">
                  Tenant
                </p>
                <p className="para">
                  I am the redistering as somone who rented a unit
                </p>
              </Box>

              <input type="radio" name="type" value='Tenant' onChange={(e) => this.changeType(e.target.value)} />

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
              <img src={owner} />

              <Box className="middle-section">
                <p className="title">
                  Owner
                </p>
                <p className="para">
                  I am the owner of the unit, but I am not living inside it
                </p>
              </Box>

              <input type="radio" name="type" value='Owner' onChange={(e) => this.changeType(e.target.value)} />

            </Box>
          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%',position:'absolute',bottom:0 }}>
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
      </>

    )

  }

}
export default  withRouter(SelectType)
