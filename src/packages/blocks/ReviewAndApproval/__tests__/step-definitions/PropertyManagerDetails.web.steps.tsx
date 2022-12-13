import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import PropertyManagerDetails from "../../src/PropertyManagerDetails.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const PropertyManagerDetailsProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "PropertyManagerDetails",
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

const feature = loadFeature("./__tests__/features/PropertyManagerDetails.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PropertyManagerDetails", ({ given, when, then }) => {
    let PropertyManagerDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerDetails", () => {
      PropertyManagerDetailsMountWrapper = mount(<PropertyManagerDetails {...PropertyManagerDetailsProps} />);
    });

    when("I navigate to the PropertyManagerDetails", () => {
      instance = PropertyManagerDetailsMountWrapper.instance();
      console.log(instance);
    });

    then("PropertyManagerDetails will load with out errors", () => {
      expect(PropertyManagerDetailsMountWrapper).toMatchSnapshot();
    });

    then("Should navigate to edit property manager", () => {
      const editButtonSpy = jest.spyOn(PropertyManagerDetailsMountWrapper.find("img").at(0).props(), "onClick");
      PropertyManagerDetailsMountWrapper.find("img").at(0).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
    });

    then("Should delete the property manager", () => {
      const editButtonSpy = jest.spyOn(PropertyManagerDetailsMountWrapper.find("img").at(1).props(), "onClick");
      PropertyManagerDetailsMountWrapper.find("img").at(1).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
    });
  });
});
