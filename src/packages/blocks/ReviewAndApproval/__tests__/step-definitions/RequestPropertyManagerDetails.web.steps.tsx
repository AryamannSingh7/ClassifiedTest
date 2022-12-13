import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import RequestPropertyManagerDetails from "../../src/RequestPropertyManagerDetails.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Button } from "@material-ui/core";

const RequestPropertyManagerDetailsProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "RequestPropertyManagerDetails",
  classes: PropertyManagerStyleWeb,
};

const propertyManagerDetailsMockData = {
  data: {
    id: "38",
    type: "property_manager_request",
    attributes: {
      id: 38,
      company_name: "google",
      name: "JohnDeo",
      email: "johndow147@yopmail.com",
      mobile_number: "+1284-14245672",
      id_number: "1234 1212 2323 4546",
      id_expiration_date: "2022-12-01",
      properties: {
        data: [
          {
            id: "27",
            type: "property",
            attributes: {
              id: 27,
              building_management_id: 3,
              apartment_management_id: 89,
              start_date: "2022-12-01",
              end_date: "2022-12-30",
              fees_type: "Fixed Percentage",
              fixed_persentage_of_rent: "10 %",
              account_id: 173,
              property_manager_request_id: 38,
              building_management: {
                id: 3,
                name: "First Building",
              },
              apartment_management: {
                id: 89,
                apartment_name: "102",
              },
            },
          },
        ],
      },
      id_proof: { id: 1, name: "Aadhar" },
      account: {
        id: 425,
        full_phone_number: "+1284-14245672",
        email: "johndow147@yopmail.com",
        full_name: "JohnDeo",
      },
      image: {
        url: "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--99a5fc4d7dbe095d90dd11c37d60f835bcb28b61/sample.pdf",
      },
    },
  },
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
      propertyManagerDetails.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        propertyManagerDetailsMockData
      );
      instance.GetPropertyManagerDetailsCallId = propertyManagerDetails;
      runEngine.sendMessage("Property Manager Details", propertyManagerDetails);
    });
  });
});
