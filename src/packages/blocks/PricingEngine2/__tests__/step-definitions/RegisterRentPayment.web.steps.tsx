import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import {BrowserRouter} from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import {Select} from "@material-ui/core"
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
// @ts-ignore
import React from "react";
import RegisterRentPayment from "../../src/RegisterRentPayment.web";
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

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

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


const feature = loadFeature(
    "./__tests__/features/RegisterRentPayment-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Register Rent payment", ({ given, when, then }) => {
    let RegisterRentPaymentWrapper:any;
    // @ts-ignore
    let instance:any;

    given("I am a User loading Register Rent payment", () => {
      // @ts-ignore
      RegisterRentPaymentWrapper = mount(<RegisterRentPayment.WrappedComponent {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the Register Rent payment", () => {
      // @ts-ignore
      instance = RegisterRentPaymentWrapper.instance();
    });

    then("Register Rent payment will load with out errors", () => {
      expect(RegisterRentPaymentWrapper).toBeTruthy();
      expect(RegisterRentPaymentWrapper).toMatchSnapshot();
    });

    then("I am able to click Back Button", () => {
      const backButtonCheckRegisterPaymentSpy = jest.spyOn(RegisterRentPaymentWrapper.find(".backButtonRegisterRent").at(0).props(), "onClick");
      RegisterRentPaymentWrapper.find(".backButtonRegisterRent").at(0).props().onClick();
      expect(backButtonCheckRegisterPaymentSpy).toHaveBeenCalled();
    });

    then("Should load the Building List Dropdown", async () => {
      let buildingListDropdown = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingListDropdown.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingListDropdown);
      buildingListDropdown.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingListMockData);
      instance.getRentBuildingListId = buildingListDropdown;
      runEngine.sendMessage("Bulding List", buildingListDropdown);
    });

    then("Should Select Month From Dropdown", () => {
      const monthListDropdownSpy = jest.spyOn(RegisterRentPaymentWrapper.find(Select).at(0).props(), "onChange");
      RegisterRentPaymentWrapper.find(Select).at(0).props().onChange({ target: { value: 1 } });
      expect(monthListDropdownSpy).toHaveBeenCalled();
    })

    then("Should Select Building List From Dropdown", () => {
      const buildingListDropdownSpy = jest.spyOn(RegisterRentPaymentWrapper.find(Select).at(1).props(), "onChange");
      RegisterRentPaymentWrapper.find(Select).at(1).props().onChange({ target: { value: "6" } });
      expect(buildingListDropdownSpy).toHaveBeenCalled();
    })

    then("Should Select Unit List From Dropdown", () => {
      const unitListDropdownSpy = jest.spyOn(RegisterRentPaymentWrapper.find(Select).at(2).props(), "onChange");
      RegisterRentPaymentWrapper.find(Select).at(2).props().onChange({ target: { value: "6" } });
      expect(unitListDropdownSpy).toHaveBeenCalled();
    })

    then('get Building List API Call Should be pass', async () => {
      expect(await instance.getRentBuildingList()).toBe(true);
    });

    then('get Unit List API Call Should be pass', async () => {
      expect(await instance.getRentBuildingList(6)).toBe(true);
    });

    then("Should load the Unit List  Dropdown", async () => {
      instance.setState({
        selectedBuilding:6
      })
      RegisterRentPaymentWrapper.update()
      let unitListDropDown = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitListDropDown.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitListDropDown);
      unitListDropDown.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitListMockData);
      instance.getRentUnitListId = unitListDropDown;
      runEngine.sendMessage("Unit List", unitListDropDown);
    });


  });
});
