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
import RentUnitLists from "../../src/RentUnitLists.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "RentPayments",
  location: jest.fn(),
  history: jest.fn(),
  match: jest.fn()
};

const feature = loadFeature(
    "./__tests__/features/RentUnitList-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to RentPayment Unit List", ({ given, when, then }) => {
    let RentUnitListsWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading RentPayment Unit List", () => {
      RentUnitListsWrapper = mount(<RentUnitLists {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the RentPayment Unit List", () => {
      // @ts-ignore
      instance = RentUnitListsWrapper.instance();
    });

    then("RentPayment will load with out errors Unit List", () => {
      expect(RentUnitListsWrapper).toBeTruthy();
      expect(RentUnitListsWrapper).toMatchSnapshot();
    });
  });
});
