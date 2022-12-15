import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import RentedVsEmpty from "../../src/MyExpenseReport/RentedVsEmpty.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";

const RentedVsEmptyProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "RentedVsEmpty",
  classes: TotalExpenseStyle,
};

const feature = loadFeature("./__tests__/features/RentedVsEmpty.web.feature");

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

  test("User navigates to RentedVsEmpty", ({ given, when, then }) => {
    let RentedVsEmptyMountWrapper: any;
    let instance: any;

    given("I am a User loading RentedVsEmpty", () => {
      RentedVsEmptyMountWrapper = mount(<RentedVsEmpty {...RentedVsEmptyProps} />);
    });

    when("I navigate to the RentedVsEmpty", () => {
      instance = RentedVsEmptyMountWrapper.instance();
      console.log(instance);
    });

    then("RentedVsEmpty will load with out errors", async () => {
      expect(RentedVsEmptyMountWrapper).toMatchSnapshot();
    });
  });
});
