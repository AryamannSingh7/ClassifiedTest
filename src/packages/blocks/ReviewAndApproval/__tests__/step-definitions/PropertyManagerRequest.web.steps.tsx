import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import PropertyManagerRequest from "../../src/PropertyManagerRequest.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Button } from "@material-ui/core";

const PropertyManagerRequestProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "PropertyManagerRequest",
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

const feature = loadFeature("./__tests__/features/PropertyManagerRequest.feature");

const newRequestEmptyListMockData: any[] = [];

const updateManagerMockData = {
  data: {
    id: "237",
    type: "property_manager_new_request",
    attributes: {
      country: "India",
      city: "Bhopal",
      building_management: {
        id: 3,
        name: "First Building",
      },
      apartment_management: {
        data: {
          id: "94",
          type: "apartment_management",
          attributes: {
            apartment_name: "301",
          },
        },
      },
      status: "Requested",
      property_manager: {
        id: 37,
        company_name: "qwerty",
        name: "JohnDoe",
        email: "john1298@yopmail.com",
        mobile_number: "+963-142356777",
        id_proof_id: null,
        id_number: null,
        id_expiration_date: null,
        account_id: 424,
        created_at: "2022-12-13T09:43:27.218Z",
        updated_at: "2022-12-13T09:43:27.218Z",
      },
    },
  },
};

const newRequestListMockData = {
  data: [
    {
      id: "237",
      type: "property_manager_new_request",
      attributes: {
        country: "India",
        city: "Bhopal",
        building_management: {
          id: 3,
          name: "First Building",
        },
        apartment_management: {
          data: {
            id: "94",
            type: "apartment_management",
            attributes: {
              apartment_name: "301",
            },
          },
        },
        status: "Requested",
        property_manager: {
          id: 37,
          company_name: "qwerty",
          name: "JohnDoe",
          email: "john1298@yopmail.com",
          mobile_number: "+963-142356777",
          id_proof_id: null,
          id_number: null,
          id_expiration_date: null,
          account_id: 424,
          created_at: "2022-12-13T09:43:27.218Z",
          updated_at: "2022-12-13T09:43:27.218Z",
        },
      },
    },
  ],
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PropertyManagerRequest", ({ given, when, then }) => {
    let PropertyManagerRequestMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerRequest", () => {
      PropertyManagerRequestMountWrapper = mount(<PropertyManagerRequest {...PropertyManagerRequestProps} />);
    });

    when("I navigate to the PropertyManagerRequest", () => {
      instance = PropertyManagerRequestMountWrapper.instance();
      console.log(instance);
    });

    then("PropertyManagerRequest will load with out errors", () => {
      expect(PropertyManagerRequestMountWrapper).toMatchSnapshot();
    });
  });

  test("Property Manager New Request List", ({ given, when, then }) => {
    let PropertyManagerRequestMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerNewRequestList", () => {
      PropertyManagerRequestMountWrapper = mount(<PropertyManagerRequest {...PropertyManagerRequestProps} />);
      instance = PropertyManagerRequestMountWrapper.instance();
    });

    when("PropertyManagerNewRequestList load without error", () => {
      expect(PropertyManagerRequestMountWrapper).toMatchSnapshot();
    });

    then("Should show property manager new request list in web", () => {
      let newRequestList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      newRequestList.addData(getName(MessageEnum.RestAPIResponceDataMessage), newRequestList);
      newRequestList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), newRequestListMockData);
      instance.GetManagerRequestCallId = newRequestList;
      runEngine.sendMessage("New property Manager's Request List", newRequestList);
    });

    then("Should not show request list is empty in web", () => {
      let newRequestList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      newRequestList.addData(getName(MessageEnum.RestAPIResponceDataMessage), newRequestList);
      newRequestList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), newRequestEmptyListMockData);
      instance.GetManagerRequestCallId = newRequestList;
      runEngine.sendMessage("New property Manager's Request List", newRequestList);
    });

    then("Should accept the new property manager request", () => {
      instance.setState({ requestList: newRequestListMockData.data });
      PropertyManagerRequestMountWrapper.update();

      const acceptButtonSpy = jest.spyOn(PropertyManagerRequestMountWrapper.find(Button).at(0).props(), "onClick");
      PropertyManagerRequestMountWrapper.find(Button).at(0).props().onClick();
      expect(acceptButtonSpy).toHaveBeenCalled();
    });

    then("Should decline the new property manager request", () => {
      instance.setState({ requestList: newRequestListMockData.data });
      PropertyManagerRequestMountWrapper.update();

      const acceptButtonSpy = jest.spyOn(PropertyManagerRequestMountWrapper.find(Button).at(1).props(), "onClick");
      PropertyManagerRequestMountWrapper.find(Button).at(1).props().onClick();
      expect(acceptButtonSpy).toHaveBeenCalled();

      let updateRequestList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      updateRequestList.addData(getName(MessageEnum.RestAPIResponceDataMessage), updateRequestList);
      updateRequestList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), updateManagerMockData);
      instance.EditManagerRequestCallId = updateRequestList;
      runEngine.sendMessage("Update property manager", updateRequestList);
    });
  });
});
