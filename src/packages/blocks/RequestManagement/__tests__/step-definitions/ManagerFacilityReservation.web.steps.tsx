import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { Button, Card, Grid, IconButton } from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message"
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import {dashBoard}  from "../../src/ManagerFacilityReservation.web";
import FacilityReservation from "../../src/ManagerFacilityReservation.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "ManagerFacilityReservation",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn(),
  classes : dashBoard
};


const feature = loadFeature(
  "./__tests__/features/ManagerFacilityReservation-scenario.web.feature"
);

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, 
        t: () => "" ,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
          },
    };
    return Component;
  },
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));


jest.mock("@material-ui/core/styles", () => ({
    withStyles: (styles: any) => (component: Component) => component,
  }));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  const  facilityReservationListPreviousMockData = {data : [
    {
      "id": "48",
      "type": "facility_reservation",
      "attributes": {
          "date": "07-Dec-2022",
          "status": "Completed",
          "note": null,
          "description": null,
          "account_id": 283,
          "paid_on": "07-12-2022",
          "rent": 1500,
          "Owner_name": "Akash",
          "start_time": "05:30",
          "end_time": "08:30",
          "unit_number": null,
          "building": {
              "id": 4,
              "name": "test building2",
              "society_management_id": 6,
              "description": null,
              "created_at": "2022-08-31T11:45:30.819Z",
              "updated_at": "2022-09-02T14:41:47.572Z",
              "per_floor_unit": 3,
              "generation_methods": "A-101, A-102, A-103",
              "number_of_floor": 6,
              "building_area": "2500 sq. ft.",
              "account_id": null,
              "lat": null,
              "long": null,
              "city": null
          },
          "common_area": {
              "id": 18,
              "name": "Garden",
              "society_management_id": 6,
              "created_at": "2022-11-29T00:04:46.852Z",
              "updated_at": "2022-11-29T00:04:46.852Z",
              "details": "",
              "total_area": "",
              "currency_id": 3,
              "reservation_fee": 500
          }
      }
  },
   ]
  }

  test("User navigates to ManagerFacilityReservation", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading ManagerFacilityReservation", () => {
      //@ts-ignore
        FacilityReservationMountWrapper = mount(<FacilityReservation.WrappedComponent {...screenProps} />,{ wrappingComponent: Router });
      });
  
      when("I navigate to the ManagerFacilityReservation", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("ManagerFacilityReservation will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
      then("Should load the facility ReservationList List", async () => {
        let facilityReservationList = new Message(getName(MessageEnum.RestAPIResponceMessage));
        facilityReservationList.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationList);
        facilityReservationList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationListPreviousMockData);
        instance.getFacilityReservationListingApiCallId = facilityReservationList;
        runEngine.sendMessage("Facility Reservation List", facilityReservationList);
      });
     then("should I am able to click on Facility Reservation List card", () => {
       instance.setState({
        facilityReservationListing:facilityReservationListPreviousMockData.data,
        loading: false
      })
      FacilityReservationMountWrapper.update()
       //@ts-ignore
       expect(FacilityReservationMountWrapper.find(Card).length).toEqual(1)
      const unitListPageButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find("#card1").at(0).props(), "onClick");
      FacilityReservationMountWrapper.find("#card1").at(0).props().onClick();
      expect(unitListPageButtonSpy).toHaveBeenCalled();
    });
    then("should check componentDidMount",() => {
      //@ts-ignore
      jest.spyOn(instance, 'getFacilityReservationListing'); // You spy on the getFacilityReservationListing
      instance.componentDidMount();
      expect(instance.getFacilityReservationListing).toHaveBeenCalledTimes(1)
   });
  });
});
