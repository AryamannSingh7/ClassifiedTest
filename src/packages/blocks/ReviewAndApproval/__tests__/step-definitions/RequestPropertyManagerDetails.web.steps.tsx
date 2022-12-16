import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import RequestPropertyManagerDetails from "../../src/RequestPropertyManagerDetails.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Button } from "@material-ui/core";
import {
  componentProps,
  propertyManagerMockData,
} from "../../../../components/src/TestCase/PropertyManagerMockData.web";

const RequestPropertyManagerDetailsProps = componentProps("RequestPropertyManagerDetails", PropertyManagerStyleWeb);

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const feature = loadFeature("./__tests__/features/RequestPropertyManagerDetails.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RequestPropertyManagerDetails", ({ given, when, then }) => {
    let RequestPropertyManagerDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading RequestPropertyManagerDetails", () => {
      RequestPropertyManagerDetailsMountWrapper = mount(
        <RequestPropertyManagerDetails {...RequestPropertyManagerDetailsProps} />
      );
    });

    when("I navigate to the RequestPropertyManagerDetails", () => {
      instance = RequestPropertyManagerDetailsMountWrapper.instance();
    });

    then("RequestPropertyManagerDetails will load with out errors", () => {
      expect(RequestPropertyManagerDetailsMountWrapper).toMatchSnapshot();
    });

    then("Should accept the request of property manager", () => {
      const acceptButtonSpy = jest.spyOn(
        RequestPropertyManagerDetailsMountWrapper.find(Button).at(0).props(),
        "onClick"
      );
      RequestPropertyManagerDetailsMountWrapper.find(Button).at(0).props().onClick();
      expect(acceptButtonSpy).toHaveBeenCalled();
    });

    then("Should decline the request of property manager", () => {
      const declineButtonSpy = jest.spyOn(
        RequestPropertyManagerDetailsMountWrapper.find(Button).at(1).props(),
        "onClick"
      );
      RequestPropertyManagerDetailsMountWrapper.find(Button).at(1).props().onClick();
      expect(declineButtonSpy).toHaveBeenCalled();

      let updateManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      updateManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), updateManager);
      updateManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {});
      instance.EditManagerRequestCallId = updateManager;
      runEngine.sendMessage("Property Manager Details", updateManager);
    });

    then("Should load property manager details", () => {
      let propertyManagerDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      propertyManagerDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), propertyManagerDetails);
      propertyManagerDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyManagerMockData);
      instance.GetPropertyManagerDetailsCallId = propertyManagerDetails;
      runEngine.sendMessage("Property Manager Details", propertyManagerDetails);
    });
  });
});
