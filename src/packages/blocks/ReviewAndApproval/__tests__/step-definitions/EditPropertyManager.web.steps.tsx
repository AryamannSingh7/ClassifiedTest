import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import EditPropertyManager from "../../src/EditPropertyManager.web";
import { mount } from "enzyme";

const EditPropertyManagerProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "EditPropertyManager",
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

const feature = loadFeature("./__tests__/features/EditPropertyManager.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to EditPropertyManager", ({ given, when, then }) => {
    let EditPropertyManagerMountWrapper: any;
    let instance: any;

    given("I am a User loading EditPropertyManager", () => {
      EditPropertyManagerMountWrapper = mount(<EditPropertyManager {...EditPropertyManagerProps} />);
    });

    when("I navigate to the EditPropertyManager", () => {
      instance = EditPropertyManagerMountWrapper.instance();
      console.log(instance);
    });

    then("EditPropertyManager will load with out errors", () => {
      expect(EditPropertyManagerMountWrapper).toMatchSnapshot();
    });
  });
});
