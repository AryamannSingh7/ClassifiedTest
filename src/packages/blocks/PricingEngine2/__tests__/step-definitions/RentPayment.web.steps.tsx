import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow,mount } from "enzyme";
import {BrowserRouter} from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import {Button} from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
// @ts-ignore
import React from "react";
import RentPayments from "../../src/RentPayments.web";
import {IconButton} from "@material-ui/core";
import RentDetails from "../../src/RentDetails.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "RentPayments",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn()
};
const buildingListMockData = {
  "data": [
  {
    "id": "6",
    "type": "rent_payment_building_management",
    "attributes": {
      "name": "Rang Rash",
      "description": null,
      "per_floor_unit": 4,
      "generation_methods": "A-101, A-102, A-103",
      "building_area": "100000",
      "society_management": {
        "id": 8,
        "name": "Rang Rash",
        "description": "",
        "created_at": "2022-09-22T11:36:04.071Z",
        "updated_at": "2022-09-22T11:36:04.071Z",
        "complex_area": "1000",
        "maintenance_per_square_feet": 10
      },
      "city": null,
      "lat": null,
      "long": null
    }
  }
]
}
const feature = loadFeature(
    "./__tests__/features/RentPayment-scenario.web.feature"
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

  test("User navigates to RentPayment", ({ given, when, then }) => {
    let RentPaymentsWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading RentPayment", () => {
      // @ts-ignore
      RentPaymentsWrapper = mount(<RentPayments.WrappedComponent {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the RentPayment", () => {
      // @ts-ignore
      instance = RentPaymentsWrapper.instance();
    });

    then("RentPayment will load with out errors", () => {
      expect(RentPaymentsWrapper).toBeTruthy();
      expect(RentPaymentsWrapper).toMatchSnapshot();
    });

    then("I am able to click Back Button", () => {
      const backButtonCheckSpy = jest.spyOn(RentPaymentsWrapper.find(".rentPaymentsBackBtn").at(0).props(), "onClick");
      RentPaymentsWrapper.find(".rentPaymentsBackBtn").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });

    then("I am able to Move to Register Rent Payment Page", () => {
      const registerRentPaymentButtonSpy = jest.spyOn(RentPaymentsWrapper.find(".RegisterRentPayment").at(0).props(), "onClick");
      RentPaymentsWrapper.find(".RegisterRentPayment").at(0).props().onClick();
      expect(registerRentPaymentButtonSpy).toHaveBeenCalled();
    });

    then("Should load the Building List", async () => {
      let buildingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingList);
      buildingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingListMockData);
      instance.getRentBuildingListId = buildingList;
      runEngine.sendMessage("Bulding List", buildingList);
    });

    then("I am able to click on Unit List page", () => {
      instance.setState({
        BuildingListing:buildingListMockData.data
      })
      RentPaymentsWrapper.update()
      const unitListPageButtonSpy = jest.spyOn(RentPaymentsWrapper.find(".unitListBox").at(0).props(), "onClick");
      RentPaymentsWrapper.find(".unitListBox").at(0).props().onClick();
      expect(unitListPageButtonSpy).toHaveBeenCalled();
    });

    then("I am able to click on Map Link", () => {
      window.open = jest.fn()
      instance.setState({
        BuildingListing:buildingListMockData.data
      })
      RentPaymentsWrapper.update()
      const unitListPageButtonSpy = jest.spyOn(RentPaymentsWrapper.find(".rentPaymentBuildingMapBtn").at(0).props(), "onClick");
      RentPaymentsWrapper.find(".rentPaymentBuildingMapBtn").at(0).props().onClick();
      expect(unitListPageButtonSpy).toHaveBeenCalled();
    });


  });
});
