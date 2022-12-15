import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import RentedAndEmpty from "../../src/MyExpenseReport/RentedAndEmpty.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";

const RentedAndEmptyProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "RentedAndEmpty",
  classes: TotalExpenseStyle,
};

const feature = loadFeature("./__tests__/features/RentedAndEmpty.web.feature");

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

  test("User navigates to RentedAndEmpty", ({ given, when, then }) => {
    let RentedAndEmptyMountWrapper: any;
    let instance: any;

    given("I am a User loading RentedAndEmpty", () => {
      RentedAndEmptyMountWrapper = mount(<RentedAndEmpty {...RentedAndEmptyProps} />);
    });

    when("I navigate to the RentedAndEmpty", () => {
      instance = RentedAndEmptyMountWrapper.instance();
      console.log(instance);
    });

    then("RentedAndEmpty will load with out errors", async () => {
      expect(RentedAndEmptyMountWrapper).toMatchSnapshot();
    });
  });
});
