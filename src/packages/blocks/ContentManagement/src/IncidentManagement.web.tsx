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
  Grid
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
import IncidentManagementController, { Props } from "./IncidentManagementController.web";
import DashboardHeader from "../../dashboard/src/DashboardHeader.web";
import ChairmanSidebar from "../../dashboard/src/ChairmanSidebar.web";

//Customizable Area End

//resorces
import { Tenant_Logo, Building_Logo, Tick_Circle_Icon, Building1 } from "../src/assets";

class IncidentManagement extends IncidentManagementController {
  constructor(props: Props) {
    super(props);
  }

  render() {

    return (
      <>
          <DashboardHeader {...this.props} />
          <ChairmanSidebar {...this.props} />
        <Loader loading={this.state.loading} />
      </>
    )
  }
}

export default withRouter(IncidentManagement)