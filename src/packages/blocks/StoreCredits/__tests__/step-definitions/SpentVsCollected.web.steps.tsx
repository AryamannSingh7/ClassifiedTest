import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import SpentVsCollected from "../../src/MyExpenseReport/SpentVsCollected.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";

const SpentVsCollectedProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "SpentVsCollected",
  classes: TotalExpenseStyle,
};

const feature = loadFeature("./__tests__/features/SpentVsCollected.web.feature");

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to SpentVsCollected", ({ given, when, then }) => {
    let SpentVsCollectedMountWrapper: any;
    let instance: any;

    given("I am a User loading SpentVsCollected", () => {
      SpentVsCollectedMountWrapper = mount(<SpentVsCollected {...SpentVsCollectedProps} />);
    });

    when("I navigate to the SpentVsCollected", () => {
      instance = SpentVsCollectedMountWrapper.instance();
      console.log(instance);
    });

    then("SpentVsCollected will load with out errors", async () => {
      expect(SpentVsCollectedMountWrapper).toMatchSnapshot();
    });
  });
});
