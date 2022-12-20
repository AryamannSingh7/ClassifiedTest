import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import {BrowserRouter} from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
// @ts-ignore
import React from "react";
import RegisterRentPayment from "../../src/RegisterRentPayment.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "ViewMyRents",
  location: jest.fn(),
  history: jest.fn(),
  match: jest.fn()
};

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const feature = loadFeature(
    "./__tests__/features/RegisterRentPayment-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Register Rent payment", ({ given, when, then }) => {
    let RegisterRentPaymentWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading Register Rent payment", () => {
      RegisterRentPaymentWrapper = mount(<RegisterRentPayment {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the Register Rent payment", () => {
      // @ts-ignore
      instance = RegisterRentPaymentWrapper.instance();
    });

    then("Register Rent payment will load with out errors", () => {
      expect(RegisterRentPaymentWrapper).toBeTruthy();
      expect(RegisterRentPaymentWrapper).toMatchSnapshot();
    });

  });
});
