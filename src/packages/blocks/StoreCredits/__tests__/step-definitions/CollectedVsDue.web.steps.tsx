import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import CollectedVsDue from "../../src/MyExpenseReport/CollectedVsDue.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";

const CollectedVsDueProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "CollectedVsDue",
  classes: TotalExpenseStyle,
};

const feature = loadFeature("./__tests__/features/CollectedVsDue.web.feature");

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

  test("User navigates to CollectedVsDue", ({ given, when, then }) => {
    let CollectedVsDueMountWrapper: any;
    let instance: any;

    given("I am a User loading CollectedVsDue", () => {
      CollectedVsDueMountWrapper = mount(<CollectedVsDue {...CollectedVsDueProps} />);
    });

    when("I navigate to the CollectedVsDue", () => {
      instance = CollectedVsDueMountWrapper.instance();
      console.log(instance);
    });

    then("CollectedVsDue will load with out errors", async () => {
      expect(CollectedVsDueMountWrapper).toMatchSnapshot();
    });
  });
});
