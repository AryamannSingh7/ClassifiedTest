import React from "react";

import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";

import {
  Tenant_Logo,
  Building1,
  Grid_Icon,
  Filter_Icon,
  User_Icon,
  Calender_Icon,
  Info_Icon,
  Clipboard_Icon,
  Close_Icon,
} from "../src/assets";

class ClassifiedLanding extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        <Typography className="title-span" component="span">
          Title:
        </Typography>
        <Loader loading={this.state.loading} />
      </>
    );
  }
}

export default withRouter(ClassifiedLanding);
