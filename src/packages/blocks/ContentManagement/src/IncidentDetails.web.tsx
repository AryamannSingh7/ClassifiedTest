//@ts-ignore
//@ts-nocheck
import React from "react";

//components
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextareaAutosize
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
import {
  Tenant_Logo,
  Building1,
  Grid_Icon,
  Filter_Icon,
  User_Icon,
  Calender_Icon,
  Info_Icon,
  Clipboard_Icon
}
  from "../src/assets";

class IncidentDetails extends IncidentController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.getIncidentDetailsById(this.props.history.location?.id);
  }

  render() {
    const { navigation } = this.props;
    console.log("this.props.history=========>",this.props.history.location.id)
    console.log("getIncidentDetails========================>",this.state?.getIncidentDetails)
    const id  = this.state?.getIncidentDetails?.id ;
    const attributes  = this.state?.getIncidentDetails?.attributes;
    return (
      <>
        <Box className="login-wrapper incident-wrapper">
          <Grid container spacing={2} className="auth-container">
            <Grid item xs={12} md={7} className="auth-cols">
              <Box className="content-block">
                <Box className="content-header">
                  <Box className="left-block blocks">
                    <Box display={{ xs: 'flex', md: 'none' }} className="backIcons" onClick={() => window.history.back()}><KeyboardBackspaceIcon /></Box>
                    <h4>Incident Title</h4>
                  </Box>
                </Box>
                <Box className="content-block-wrapper common-incident-block">
                  <Box className="incident-content-wrapper">
                    {
                     attributes?.resolved_on ?
                     <Card className="incident-card confirmation-card card">
                     <CardContent className="confirmation-card-content">
                       <Box className="info-row">
                         <img src={Info_Icon} className="info-icon" alt="info-icon" />
                       </Box>
                       <Typography component="h4">
                         Is raised incident<br></br>resolved?
                       </Typography>
                       <Typography component="p">
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry and type setting industry.
                       </Typography>
                       <Box className="customButton">
                         <Box className="formGroup">
                           <Button variant="outlined" type="submit" >reject course</Button>
                           <Button variant="contained" type="submit" >confirm course</Button>
                         </Box>
                       </Box>
                     </CardContent>
                   </Card> :
                   null
                    }
                   
                    <Box className="incident-rows">
                      <h4>Incident Details</h4>
                      {/* <Box className="customButton">
                        <Button variant="contained" className="contain danger" type="submit" >Unresolved</Button>
                      </Box> */}
                  
                      <Box className="customButton">
                        <Button variant="contained" className={attributes?.incident_status === 'Pending Confirmation' ? "contain warning" :attributes?.incident_status === 'Resolved' ?'contain success' :'contain danger'}  > {attributes?.incident_status}</Button>
                      </Box>
                    </Box>
                    <Card className="incident-card card">
                      <CardContent>
                        <Typography className="title-span" component="span">
                          Affected Area:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Own Apartment
                        </Typography>
                        <Typography className="title-span" component="span">
                          Incident is related to::
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Plumbing {attributes?.incident_related?.name}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Incident Number:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          123765 {id}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Expected Resolution Date:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          12-03-2021 13:45 {attributes?.expected_resolution_date}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Latest update from management:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Waiting forspare part to be delivered from Italy {attributes?.last_update_from_management}
                        </Typography>
                        <Typography className="title-span" component="span">
                          Ackwnolodged by Manager:
                        </Typography>
                        <Typography className="sub-title" component="h5">
                          Yes {attributes?.acknoledged_by_manager}
                        </Typography>
                        <Typography className="title-span" component="span">
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
                    <Box className="incident-rows">
                      <h4>Reporting Details</h4>
                    </Box>
                    <Card className="incident-card reporting-card card">
                      <CardContent>
                        <Box className="reporting-row">
                          <img src={User_Icon} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Reported By:</h5>
                            <h4 className="title">Mr. Ali Khan {attributes?.reported_by?.full_name}</h4>
                          </Box>
                        </Box>
                        <Box className="reporting-row">
                          <img src={Calender_Icon} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Reported On:</h5>
                            <h4 className="title">Mr. Ali Khan{attributes?.reported_on}</h4>
                          </Box>
                        </Box>
                       { attributes?.resolved_on ? 
                          <Box className="reporting-row">
                          <img src={Calender_Icon} className="icons" alt="" />
                          <Box className="reporting-right-block">
                            <h5>Resolved On:</h5>
                            <h4 className="title">{attributes?.resolved_on}</h4>
                          </Box>
                        </Box> : null
                       }
                      </CardContent>
                    </Card>
                    <Card className="incident-card reporting-card card">
                      <CardContent className="commonForm">
                        <Box className="formGroup textarea">
                          <img src={Clipboard_Icon} className="clipboard-icon" alt="Clipboard_Icon" />
                          <TextareaAutosize
                            maxRows={10}
                            aria-label="maximum height"
                            placeholder="Add Discription"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box className="customButton">
                    <Button variant="contained" type="submit" >start/ view ticket conversation</Button>
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

export default withRouter(IncidentDetails)