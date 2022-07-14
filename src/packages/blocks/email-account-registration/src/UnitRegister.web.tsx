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
import EmailAccountRegistrationController, { Props } from "./EmailAccountRegistrationController";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { Linkage, manual, owner, resident_owner, tenet } from "./assets";
import { withRouter } from 'react-router';





class RegisterUnit extends EmailAccountRegistrationController {
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
              Register a Unit

            </p>
          </Grid>
        </Grid>

        <Grid container style={{ margin: '1rem', width: '90%' }}>
          <Grid xs={12}>
            <p className="text-left">
              Please select the appropriate registration type for the unit. If you have more than one unit, you will be able to register them on a later stage



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
              <img src={Linkage} />
              <Box className="middle-section">
                <p className="title">
                  Linkage
                </p>
                <p className="para">
                  Select this option if the building manager has requested you to register the unit, or you are aware that Tenant International ® platform is used in the building
                </p>
              </Box>

              <input type="radio" name="type" value='Linkage' onChange={(e) => this.changeUnitType(e.target.value)} />

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
              <img src={manual} />

              <Box className="middle-section">
                <p className="title">
                  Manual
                </p>
                <p className="para">
                  Select this option if the unit is in a building not managed by "Tenant International ®" platform
                </p>
              </Box>

              <input type="radio" name="type" value='Manual' onChange={(e) => this.changeUnitType(e.target.value)} />

            </Box>

          </Grid>
        </Grid>
        <Grid container style={{ margin: '1rem', width: '90%' }}>
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
      </>

    )

  }

}
export default withRouter(RegisterUnit)
