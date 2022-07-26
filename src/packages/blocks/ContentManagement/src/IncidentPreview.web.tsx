//@ts-ignore
//@ts-nocheck
import React from "react";

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
import IncidentController, { Props } from "./IncidentController.web";
//Customizable Area End

//resorces
import { Tenant_Logo, Building1, Grid_Icon, Filter_Icon, User_Icon, Calender_Icon } from "../src/assets";

class IncidentPreview extends IncidentController {
  constructor(props: Props) {
    super(props);
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
                    <Box display={{ xs: 'flex', md: 'none' }} className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Incident Preview</h4>
                  </Box>
                  <Box className="incident-right-block blocks">
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Button>
                        <img src={Grid_Icon} className="grid-icon icons" alt="" />
                      </Button>
                    </Box>
                    <Button><img src={Filter_Icon} className="filter-icon icons" alt="" /></Button>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    <Box className="incident-rows">
                      <h4>Incident Details</h4>
                    </Box>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography component="span">
                          Affected Area:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Own Apartment
                        </Typography>
                        <Typography component="span">
                          Incident is related to::
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Plumbing
                        </Typography>
                        <Typography component="span">
                          Incident Number:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          123765
                        </Typography>
                        <Typography component="span">
                          Expected Resolution Date:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          12-03-2021 13:45
                        </Typography>
                        <Typography component="span">
                          Latest update from management:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Waiting forspare part to be delivered from Italy
                        </Typography>
                        <Typography component="span">
                          Ackwnolodged by Manager:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Yes
                        </Typography>
                        <Typography component="span">
                          Photos
                        </Typography>
                        <CardActions className="card-img-row">
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                          <Box><img src={Building1} className="card-img" alt="card-img" /></Box>
                        </CardActions>
                        <hr />
                      </CardContent>
                    </Card>
                  </Box>
                  <Box className="customButton">
                    <Button variant="contained" type="submit" >submit</Button>
                  </Box>
                </Box>
                <Box className="bottomBlock common-bottom-padding" display={{ xs: 'none', md: 'flex' }}>
                  <h6 className="bottom-text">POWERED BY</h6>
                  <img src={Tenant_Logo} className="tenant-logo" alt="" />
                </Box>
              </Box>
            </Grid>
            {/* desktop footer block */}
            <Grid item xs={12} md={5} className="auth-cols">
              <Box className="right-block" display={{ xs: 'none', md: 'flex' }}>
                <img src={Building1} className="building-logo" alt="" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(IncidentPreview)