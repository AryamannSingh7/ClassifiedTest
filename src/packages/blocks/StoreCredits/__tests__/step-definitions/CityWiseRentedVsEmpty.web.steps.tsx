import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import CityWiseRentedVsEmpty from "../../src/MyExpenseReport/CityWiseRentedVsEmpty.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";

const CityWiseRentedVsEmptyProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "CityWiseRentedVsEmpty",
  classes: TotalExpenseStyle,
};

const feature = loadFeature("./__tests__/features/CityWiseRentedVsEmpty.web.feature");

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

  test("User navigates to CityWiseRentedVsEmpty", ({ given, when, then }) => {
    let CityWiseRentedVsEmptyMountWrapper: any;
    let instance: any;

    given("I am a User loading CityWiseRentedVsEmpty", () => {
      CityWiseRentedVsEmptyMountWrapper = mount(<CityWiseRentedVsEmpty {...CityWiseRentedVsEmptyProps} />);
    });

    when("I navigate to the CityWiseRentedVsEmpty", () => {
      instance = CityWiseRentedVsEmptyMountWrapper.instance();
      console.log(instance);
    });

    then("CityWiseRentedVsEmpty will load with out errors", async () => {
      expect(CityWiseRentedVsEmptyMountWrapper).toMatchSnapshot();
    });
  });
});
