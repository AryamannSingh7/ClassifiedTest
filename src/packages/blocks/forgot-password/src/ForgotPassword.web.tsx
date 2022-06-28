import React from "react";

//Customizable Area Start
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

import { Formik } from "formik";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation } = this.props;

    return (
     <>
     <h1>forgot password</h1>
     </>
    )
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650
  },
  countryCodeSelector: {
    flex: 3,
    marginTop: 20,
    textAlign: "left",
    textAlignVertical: "center"
  },
  button: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    zIndex: -1
  },

  flexContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%"
  },

  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  webInput: {
    marginTop: 20,
    width: "100%",
    zIndex: -1
  },

  inputAfterCountryCode: {
    width: "100%",
    zIndex: -1
  },

  mobileInput: {
    flexDirection: "column",
    alignItems: "stretch",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true
  },

  codeInput: {
    marginTop: 20,
    width: "30%"
  },

  phoneInput: {
    flex: 3,
    marginTop: 20
  },

  noBorder: {
    borderBottomWidth: 0
  },

  titleText: {
    fontSize: 32,
    color: "#6200EE",
    fontWeight: "bold"
  },

  stepText: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },

  emailText: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
    fontWeight: "bold"
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginTop: 20,
    minHeight: 40,
    fontSize: 18,
    textAlignVertical: "center",
    padding: 10
  },

  bgRectWeb: {
    marginTop: 40
  },

  errorStyle: {
    color: "red",
    textAlign: "center"
  }
});
