import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import {BrowserRouter} from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
// @ts-ignore
import React from "react";
import ViewMyRents from "../../src/ViewMyRents.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "ViewMyRents",
  location: jest.fn(),
  history: jest.fn(),
  match: {
    params:{
      id:1
    }
  },
  t:jest.fn()
};

const ViewRentsMockData = {
  data:[
    {
      "id": "15",
      "type": "rent_payment_month",
      "attributes": {
        "amount": 400,
        "month": "June",
        "payment_type": "partial_payment",
        "year": null,
        "building_management_id": 6,
        "apartment_management_id": 182,
        "building_name": "Rang Rash",
        "unit_no": "A-101",
        "status": "partially_paid",
        "partial_payment": null,
        "tenant_name": "newTenant"
      }
    }
  ]
}

const feature = loadFeature(
    "./__tests__/features/ViewMyRents-scenario.web.feature"
);

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ViewMyRents", ({ given, when, then }) => {
    let ViewMyRentsWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading ViewMyRents", () => {
      ViewMyRentsWrapper = mount(<ViewMyRents {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the ViewMyRents", () => {
      // @ts-ignore
      instance = ViewMyRentsWrapper.instance();
    });

    then("ViewMyRents will load with out errors", () => {
      expect(ViewMyRentsWrapper).toBeTruthy();
      expect(ViewMyRentsWrapper).toMatchSnapshot();
    });

    then("Should load the Rent List", async () => {
      let buildingListDropdown = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingListDropdown.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingListDropdown);
      buildingListDropdown.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), ViewRentsMockData);
      instance.getRentBuildingListId = buildingListDropdown;
      runEngine.sendMessage("Bulding List", buildingListDropdown);
    });

  });
});
