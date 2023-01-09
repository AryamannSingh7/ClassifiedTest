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
import RentUnitLists from "../../src/RentUnitLists.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "RentUnitLists",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: {
    params:{
      id:1
    }
  },
  t:jest.fn()
};

const feature = loadFeature(
    "./__tests__/features/RentUnitList-scenario.web.feature"
);

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const unitListMockData = {
  "data": [
    {
      "id": "5",
      "type": "rent_payment_apartment",
      "attributes": {
        "amount": 400,
        "building_name": "A Block 2",
        "apartment_management": {
          "id": 183,
          "society_management_id": 8,
          "building_management_id": 6,
          "created_at": "2022-09-23T05:03:17.916Z",
          "updated_at": "2022-10-03T08:12:30.839Z",
          "apartment_name": "A-102",
          "floor_number": 1,
          "size": null,
          "purchase_price": null,
          "configuration": null,
          "purchase_date": null,
          "unit_type": null,
          "status": "No-Own",
          "current_valuation": null,
          "monthly_renting_income": null,
          "rent_payment_id": null,
          "account_id": null
        }
      }
    }
  ]
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to RentPayment Unit List", ({ given, when, then }) => {
    let RentUnitListsWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading RentPayment Unit List", () => {
      // @ts-ignore
      RentUnitListsWrapper = mount(<RentUnitLists.WrappedComponent {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the RentPayment Unit List", () => {
      // @ts-ignore
      instance = RentUnitListsWrapper.instance();
    });

    then("RentPayment will load with out errors Unit List", () => {
      expect(RentUnitListsWrapper).toBeTruthy();
      expect(RentUnitListsWrapper).toMatchSnapshot();
    });

    then("I am able to click Back Button", () => {
      const backButtonCheckSpy = jest.spyOn(RentUnitListsWrapper.find(".rentUnitBackBtn").at(0).props(), "onClick");
      RentUnitListsWrapper.find(".rentUnitBackBtn").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });

    then("I am able to Move to Register Rent Payment Page", () => {
      const registerRentPaymentButtonSpy = jest.spyOn(RentUnitListsWrapper.find(".RegisterRentPayment").at(0).props(), "onClick");
      RentUnitListsWrapper.find(".RegisterRentPayment").at(0).props().onClick();
      expect(registerRentPaymentButtonSpy).toHaveBeenCalled();
    });

    then("Should load the Unit List", async () => {
      let unitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitList);
      unitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitListMockData);
      instance.getRentUnitListId = unitList;
      runEngine.sendMessage("Unit List", unitList);
    });

    then("I am able to click on Rent List page", () => {
      instance.setState({
        UnitListing:unitListMockData.data,
        buildingName:"Test Building"
      })
      RentUnitListsWrapper.update()
      const unitListPageButtonSpy = jest.spyOn(RentUnitListsWrapper.find(".rentUnitListBox").at(0).props(), "onClick");
      RentUnitListsWrapper.find(".rentUnitListBox").at(0).props().onClick();
      expect(unitListPageButtonSpy).toHaveBeenCalled();
    });
  });
});
