import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import PropertyManagerList from "../../src/PropertyManagerList.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const PropertyManagerListProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "PropertyManagerList",
  classes: PropertyManagerStyleWeb,
};

const propertyManagerListMockData = {
  data: [
    {
      id: "25",
      attributes: {
        id: 25,
        company_name: "google",
        name: "johndow",
        properties: {
          data: [
            {
              id: "20",
              type: "property",
              attributes: {
                id: 20,
                account_id: 173,
                property_manager_request_id: 25,
                building_management: {
                  id: 3,
                  name: "First Building",
                },
                apartment_management: {
                  id: 94,
                  apartment_name: "301",
                },
              },
            },
          ],
        },
      },
    },
  ],
};

const deleteManagerMockData = {
  message: "Added",
};

const newRequestListMockData = {
  data: [{ id: "1" }, { id: "1" }],
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

const feature = loadFeature("./__tests__/features/PropertyManagerList.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PropertyManagerList", ({ given, when, then }) => {
    let PropertyManagerListMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerList", () => {
      PropertyManagerListMountWrapper = mount(<PropertyManagerList {...PropertyManagerListProps} />);
    });

    when("I navigate to the PropertyManagerList", () => {
      instance = PropertyManagerListMountWrapper.instance();
      console.log(instance);
    });

    then("PropertyManagerList will load with out errors", () => {
      expect(PropertyManagerListMountWrapper).toMatchSnapshot();
    });
  });

  test("Property Manager List and New Request Number", ({ given, when, then }) => {
    let PropertyManagerListMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerList", () => {
      PropertyManagerListMountWrapper = mount(<PropertyManagerList {...PropertyManagerListProps} />);
      instance = PropertyManagerListMountWrapper.instance();
      expect(PropertyManagerListMountWrapper).toMatchSnapshot();
    });

    when("PropertyManagerList load without error", () => {
      let propertyManagerList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      propertyManagerList.addData(getName(MessageEnum.RestAPIResponceDataMessage), propertyManagerList);
      propertyManagerList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyManagerListMockData);
      instance.GetPropertyManagerListCallId = propertyManagerList;
      runEngine.sendMessage("property Manager List", propertyManagerList);
    });

    then("Should show property manager list in web", () => {
      expect(instance.state.propertyManagerList.length).toBeGreaterThan(0);
    });

    then("NewRequest load without error", () => {
      let newRequestList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      newRequestList.addData(getName(MessageEnum.RestAPIResponceDataMessage), newRequestList);
      newRequestList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), newRequestListMockData);
      instance.GetManagerRequestCallId = newRequestList;
      runEngine.sendMessage("New Request List", newRequestList);
    });

    then("Should delete the property manager", () => {
      instance.handleDeletePropertyManager("12");

      let deleteManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteManager);
      deleteManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), deleteManagerMockData);
      instance.DeletePropertyManagerCallId = deleteManager;
      runEngine.sendMessage("Delete Property Manager", deleteManager);
    });

    then("Should update the property manager list when click on sort", () => {
      instance.handleSort("desc");

      expect(instance.state.sort).toEqual("desc");
    });
  });
});
