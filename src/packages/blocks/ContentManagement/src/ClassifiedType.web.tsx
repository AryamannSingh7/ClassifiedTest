//@ts-ignore
//@ts-nocheck
import * as React from "react";
// custom components
import {
  Button, Grid, Box, Typography, Link, IconButton
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik, Form, Field } from "formik";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ClassifiedController, { Props } from "./ClassifiedController.web";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Tenant_Logo, Building_Logo, Tick_Circle_Icon, Building1 } from "../src/assets";

class ClassifiedType extends ClassifiedController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (

      <>
     <Grid container className="auth-container">
          <Grid item xs={12} md={7} className="auth-cols" style={{ justifyContent: 'unset' }}>
        <div style={{ margin: 'auto' }}>

        <Grid container className="main-content-block">
          <Grid xs={12}>
            <ArrowBackIcon onClick={() => window.history.back()} />
          </Grid>
        </Grid>
        <Grid container className="main-content-block">
          <Grid xs={12}>
            <p className="text-left">
            This page will allow the residents to publish classifieds to the building's classified page. 
            You can publish an advertisement to sell things, buy things, or ask for services like a baby setter
            for your child.
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
              <img src={'#'}/>
              <Box className={"middle-section"}>
                      <label for="radCreateMode" className={"title" + (this.state.userType == 'seller' ? ' active-type' :'')}>
                      I want to sell something
                </label>
              </Box>
                    <input type="radio" id="radCreateMode" name="type" value='seller' onChange={(e)=>this.changeType(e.target.value)} />
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
              <img src={'#'}/>
              <Box className={"middle-section"}>
                      <label for="radCreateMode2" className={"title" + (this.state.userType == 'buyer' ? ' active-type' :'')}>
                      I want to buy something
                </label>
              </Box>
                    <input type="radio" id="radCreateMode2" name="type" value='buyer' onChange={(e)=>this.changeType(e.target.value)} />
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
              <img src={'#'}/>
              <Box className={"middle-section"}>
                      <label for="radCreateMode3" className={"title" + (this.state.userType == 'generic' ? ' active-type' :'')}>
                       I have a generic request
                </label>
              </Box>
                    <input type="radio" id="radCreateMode3" name="type" value='generic' onChange={(e)=>this.changeType(e.target.value)} />
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
              onClick={()=>this.nextBtn(this.state?.userType)}
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
              <img src={Building1.default} className="building-logo" alt="" />
            </Box>
          </Grid>
         </Grid>
      </>

    )

  }

}
export default  withRouter(ClassifiedType)
