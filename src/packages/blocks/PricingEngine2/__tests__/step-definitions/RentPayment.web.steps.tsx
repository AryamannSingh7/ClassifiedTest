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
import RentPayments from "../../src/RentPayments.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "RentPayments",
  location: jest.fn(),
  history: jest.fn(),
  match: jest.fn()
};

const feature = loadFeature(
    "./__tests__/features/RentPayment-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to RentPayment", ({ given, when, then }) => {
    let RentPaymentsWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading RentPayment", () => {
      RentPaymentsWrapper = mount(<RentPayments {...screenProps} />,{ wrappingComponent: BrowserRouter });
      console.log("Check For Wrapper",RentPaymentsWrapper)
    });

    when("I navigate to the RentPayment", () => {
      // @ts-ignore
      instance = RentPaymentsWrapper.instance();
      console.log("CHECK FOR INSTANCE",instance)
    });

    then("RentPayment will load with out errors", () => {
      expect(RentPaymentsWrapper).toBeTruthy();
      expect(RentPaymentsWrapper).toMatchSnapshot();
    });

    then("I am able to click Back Button", () => {
      console.log("CHECK FOR INSTANCE",instance)
    });

  });
});
