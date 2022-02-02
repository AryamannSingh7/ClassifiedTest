import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import Select from "react-select";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

import MultipleCurrencySupportController, {
  Props,
  configJSON,
} from "./MultipleCurrencySupportController";

export default class MultipleCurrencySupport extends MultipleCurrencySupportController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Typography variant="h6">{configJSON.labelTitleText}</Typography>
            <Typography variant="subtitle1" component="div">
              {configJSON.labelBodyText}
            </Typography>
            <Box sx={webStyle.inputStyle}>
              <InputLabel id="service-shop-name">
                {Number(this.state.txtInputValue)} {this.state.fromCurrency}
                {" <=> "}
                {this.state.currencyRatio * Number(this.state.txtInputValue)}
                {this.state.toCurrency}
              </InputLabel>
              <Input
                data-test-id={"txtInput"}
                type={this.state.enableField ? "password" : "text"}
                placeholder={configJSON.txtInputPlaceholder}
                fullWidth={true}
                disableUnderline={true}
                value={this.state.txtInputValue}
                onChange={(e) => this.setInputValue(e.target.value)}
              />
            </Box>
            <InputLabel>From</InputLabel>
            <Select
              options={this.state.currencyData}
              onChange={(item: any) => {
                this.setState({ fromCurrency: item.value }, () => {
                  this.getCurrenctRatio();
                });
              }}
            />
            <InputLabel>To</InputLabel>
            <Select
              options={this.state.currencyData}
              onChange={(item: any) => {
                this.setState({ toCurrency: item.value }, () => {
                  this.getCurrenctRatio();
                });
              }}
            />
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
// Customizable Area End
