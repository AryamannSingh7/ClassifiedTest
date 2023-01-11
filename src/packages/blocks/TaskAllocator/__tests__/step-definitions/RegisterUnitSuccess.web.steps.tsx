import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import RegisterUnitSuccess from "../../src/RegisterUnitSuccess.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Button, IconButton } from "@material-ui/core";

const RegisterUnitSuccessProps = componentProps("RegisterUnitSuccess", MyUnitStyle);

const feature = loadFeature("./__tests__/features/RegisterUnitSuccess.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RegisterUnitSuccess", ({ given, when, then }) => {
    let RegisterUnitSuccessMountWrapper: any;

    given("I am a User loading RegisterUnitSuccess", () => {
      RegisterUnitSuccessMountWrapper = mount(<RegisterUnitSuccess {...RegisterUnitSuccessProps} />);
    });

    then("RegisterUnitSuccess will load with out errors", async () => {
      expect(RegisterUnitSuccessMountWrapper).toMatchSnapshot();
    });

    then("Should go back to list page", async () => {
      const backButtonSpy = jest.spyOn(RegisterUnitSuccessMountWrapper.find(IconButton).at(0).props(), "onClick");
      RegisterUnitSuccessMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go back to list page when click to okay", async () => {
      const okayButtonSpy = jest.spyOn(RegisterUnitSuccessMountWrapper.find(Button).at(0).props(), "onClick");
      RegisterUnitSuccessMountWrapper.find(Button).at(0).props().onClick();
      expect(okayButtonSpy).toHaveBeenCalled();
    });
  });
});
