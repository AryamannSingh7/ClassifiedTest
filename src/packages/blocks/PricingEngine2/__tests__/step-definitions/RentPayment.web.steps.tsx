import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import RentPayments from "../../src/RentPayments.web"
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "PricingEngine2",
};

const RentPaymentsProps = {
  navigation: navigation,
  id: "RentPayments",
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
    let exampleBlockA: ShallowWrapper;

    given("I am a User loading RentPayment", () => {
      exampleBlockA = shallow(<RentPayments {...RentPaymentsProps} />);
    });

    when("I navigate to the RentPayment", () => {

    });

    then("RentPayment will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

  });
});