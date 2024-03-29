import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import PropertyManagerSuccess from "../../src/PropertyManagerSuccess.web";
import { mount } from "enzyme";
import { Button, IconButton } from "@material-ui/core";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";

const PropertyManagerSuccessProps = componentProps("PropertyManagerSuccess", PropertyManagerStyleWeb);

const feature = loadFeature("./__tests__/features/PropertyManagerSuccess.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PropertyManagerSuccess", ({ given, when, then }) => {
    let PropertyManagerSuccessMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerSuccess", () => {
      PropertyManagerSuccessMountWrapper = mount(<PropertyManagerSuccess {...PropertyManagerSuccessProps} />);
    });

    when("I navigate to the PropertyManagerSuccess", () => {
      instance = PropertyManagerSuccessMountWrapper.instance();
      console.log(instance);
    });

    then("PropertyManagerSuccess will load with out errors", () => {
      expect(PropertyManagerSuccessMountWrapper).toMatchSnapshot();
    });

    then("Should go to property manager list on click to back button", () => {
      const backButtonSpy = jest.spyOn(PropertyManagerSuccessMountWrapper.find(IconButton).at(0).props(), "onClick");
      PropertyManagerSuccessMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go to property manager list on click to okay button", () => {
      const okayButtonSpy = jest.spyOn(PropertyManagerSuccessMountWrapper.find(Button).at(0).props(), "onClick");
      PropertyManagerSuccessMountWrapper.find(Button).at(0).props().onClick();
      expect(okayButtonSpy).toHaveBeenCalled();
    });
  });
});
