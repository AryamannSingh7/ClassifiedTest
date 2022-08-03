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
  MenuItem,
  Avatar
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
    const incidentFromData = JSON.parse(localStorage.getItem("incidentPreview"))
    const incidentRelated = incidentFromData?.incidentRelated?.split(" ");
    //console.log("from===============>",incidentFromData,incidentFromData.incidentRelated,incidentFromData?.media[0]?.url);
    if (!incidentFromData) {
      this.props.history.replace("/CreateIncident");
      return null;
    }

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
                          {incidentFromData?.commonArea?.name}
                        </Typography>
                        <Typography component="span">
                          Incident is related to:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {incidentRelated[1]}
                        </Typography>
                        <Typography component="span">
                          Incident Title:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {incidentFromData?.incidentTitle}
                        </Typography>

                        <Typography component="span">
                          Building:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {incidentFromData?.myApartment?.attributes?.building_management}
                        </Typography>

                        <Typography component="span">
                          Unit:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {incidentFromData?.myApartment?.attributes?.apartment_name}
                        </Typography>
                        <Typography component="span">
                          Photos
                        </Typography>
                        <CardActions className="card-img-row">
                          {
                            incidentFromData?.media?.map((val, index) => (
                              <Box><img src={val.url} className="card-img" alt="card-img" key={index} /></Box>
                            ))
                          }
                        </CardActions>
                        <hr />
                        <Typography component="span">
                          Description:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          {incidentFromData.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box className="customButton">
                    <Button variant="contained" onClick={() => this.createIncident(incidentFromData, incidentRelated)}>submit</Button>
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