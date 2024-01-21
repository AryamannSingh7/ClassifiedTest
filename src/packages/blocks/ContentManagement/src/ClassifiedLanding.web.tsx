import React from "react";
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
  Dialog,
  DialogTitle,
  Menu,
  MenuItem,
  CardActionArea,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router";
import Loader from "../../../components/src/Loader.web";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ClassifiedController, { Props } from "./ClassifiedController.web";

class ClassifiedLanding extends ClassifiedController {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount(): any {
    this.getClassifiedListing(this.state.status);
  }
  render() {
    //   const { navigation } = this.props;
    //   console.log("this.state?.classifiedListing==========>", this.state?.classifiedListing)
    return (
      <>
        <Typography variant="h6">Hello</Typography>
      </>
    );
  }
}

export default withRouter(ClassifiedLanding);
