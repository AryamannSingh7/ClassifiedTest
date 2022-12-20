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
import ViewMyRents from "../../src/ViewMyRents.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "ViewMyRents",
  location: jest.fn(),
  history: jest.fn(),
  match: jest.fn()
};

const feature = loadFeature(
    "./__tests__/features/ViewMyRents-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ViewMyRents", ({ given, when, then }) => {
    let ViewMyRentsWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading ViewMyRents", () => {
      ViewMyRentsWrapper = mount(<ViewMyRents {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the ViewMyRents", () => {
      // @ts-ignore
      instance = ViewMyRentsWrapper.instance();
    });

    then("ViewMyRents will load with out errors", () => {
      expect(ViewMyRentsWrapper).toBeTruthy();
      expect(ViewMyRentsWrapper).toMatchSnapshot();
    });
  });
});
