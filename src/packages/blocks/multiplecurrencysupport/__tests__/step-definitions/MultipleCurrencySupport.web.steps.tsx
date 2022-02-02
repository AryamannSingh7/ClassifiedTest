import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MultipleCurrencySupport from "../../src/MultipleCurrencySupport.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "MultipleCurrencySupport",
};

const feature = loadFeature(
  "./__tests__/features/MultipleCurrencySupport-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to MultipleCurrencySupport", ({ given, when, then }) => {
    let multipleCurrencySupport: ShallowWrapper;
    let instance: MultipleCurrencySupport;

    given("I am a User loading MultipleCurrencySupport", () => {
      multipleCurrencySupport = shallow(<MultipleCurrencySupport {...screenProps} />);
    });

    when("I navigate to the MultipleCurrencySupport", () => {
      instance = multipleCurrencySupport.instance() as MultipleCurrencySupport;
    });

    then("MultipleCurrencySupport will load with out errors", () => {
      expect(multipleCurrencySupport).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = multipleCurrencySupport.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "54" },
      };
      textInputComponent.simulate("change", event);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(multipleCurrencySupport).toBeTruthy();
    });
  });
});
