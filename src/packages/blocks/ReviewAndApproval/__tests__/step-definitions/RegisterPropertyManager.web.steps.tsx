import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import RegisterPropertyManager from "../../src/RegisterPropertyManager.web";
import { mount } from "enzyme";

const RegisterPropertyManagerProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "RegisterPropertyManager",
  classes: PropertyManagerStyleWeb,
};

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const feature = loadFeature("./__tests__/features/RegisterPropertyManager.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RegisterPropertyManager", ({ given, when, then }) => {
    let RegisterPropertyManagerMountWrapper: any;
    let instance: any;

    given("I am a User loading RegisterPropertyManager", () => {
      RegisterPropertyManagerMountWrapper = mount(<RegisterPropertyManager {...RegisterPropertyManagerProps} />);
    });

    when("I navigate to the RegisterPropertyManager", () => {
      instance = RegisterPropertyManagerMountWrapper.instance();
      console.log(instance);
    });

    then("RegisterPropertyManager will load with out errors", () => {
      expect(RegisterPropertyManagerMountWrapper).toMatchSnapshot();
    });
  });
});
