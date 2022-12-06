import React, { useState } from 'react';
//components
import {
  Box,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem
} from "@material-ui/core";

//resources
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { Formik, Form, Field } from "formik";
import { withRouter } from 'react-router';
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
//Customizable Area End

//resorces
import { Tenant_Logo, Grid_Icon, Filter_Icon } from "../src/assets";
import SuggestionController,{Props} from './SuggestionController.web';
import { Building1 } from '../../ContentManagement/src/assets';

class Suggestion extends SuggestionController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount():any {
     this.getSuggtionListing()
  }
  render() {
    const { navigation } = this.props;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box className="backIcons" onClick={() => this.redirectToDashboard()}><KeyboardBackspaceIcon /></Box>
                    <h4>Incidents</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                   <Box className='suggestion-card'>
                    <p>Suggestion Title</p>
                    <br/>
                    <p>
                    On the contrary, description of the services detection should set clear rules  
                    </p>

                    <div>
                      <div>

                      <p>
                      21-06-22
                      </p>
                      </div>
                      <p>
                      1 Response
                      </p>
                    </div>

                   </Box>

                    

                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    
                  </Box>
                  <Box className="customButton add-incident">
                    <Button variant="contained" onClick={() => { this.setState({ loading: true });//@ts-ignore
                     this.props.history.push("/CreateIncident") }} >ADD NEW SUGGESTION</Button>
                  </Box>
                </Box>
                {/* <Box className="footer-main-block bottomBlock">
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo.default} className="tenant-logo" alt="" />
                </Box> */}
              </Box>
            </Grid>
            {/* desktop footer block */}
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1.default} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(Suggestion)
