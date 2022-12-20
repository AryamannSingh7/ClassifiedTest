import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PricingEngine2 from "../../src/PricingEngine2.web";
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
  "./__tests__/features/PricingEngine2-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PricingEngine2", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PricingEngine2;

    given("I am a User loading PricingEngine2", () => {
      exampleBlockA = shallow(<PricingEngine2 {...screenProps} />);
    });

    when("I navigate to the PricingEngine2", () => {
      instance = exampleBlockA.instance() as PricingEngine2;
    });

    then("PricingEngine2 will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
    });
  });
});
