import React from "react";

// Customizable Area Start
import {
  View,
  Button,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";
// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

export default class ChangeSuccessfully extends ForgotPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
     <>
     <h1>ChangeSuccessfully</h1>
     </>
    );
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
    flexDirection: "row",
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
  },

  passwordShowHide: {
    alignSelf: "center"
  },

  passwordRulesStyle: {
    padding: 15
  },

  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5
  },

  passwordContainerWeb: {
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#00000000",
    borderColor: "#767676",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true
  },
  passwordInputWeb: {
    flex: 1,
    fontSize: 18,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    borderColor: "#767676",
    borderRadius: 2
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {}
});
// Customizable Area End
