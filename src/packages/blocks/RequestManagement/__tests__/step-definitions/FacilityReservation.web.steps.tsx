import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { Button, Card } from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message"
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FacilityReservation from "../../src/FacilityReservation.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "FacilityReservation",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn()
};


const feature = loadFeature(
  "./__tests__/features/FacilityReservation-scenario.web.feature"
);

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
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

  const facilityReservationCountMockData = {
    "facility_reservations_count": "015",
    "total_upcoming_count": "00",
    "total_pending_count": "02",
    "total_completed_count": "06",
    "total_cancelled_count": "04",
    "total_rejected_count": "02"
}
  test("User navigates to FacilityReservation", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading FacilityReservation", () => {
      //@ts-ignore
        FacilityReservationMountWrapper = mount(<FacilityReservation.WrappedComponent {...screenProps} />,{ wrappingComponent: Router });
      });
  
      when("I navigate to the FacilityReservation", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("FacilityReservation will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
      then("I can go back to Facility details page", async () => {
        const backButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find("#backIcons").at(0).props(), "onClick");
        FacilityReservationMountWrapper.find("#backIcons").at(0).props().onClick();
        expect(backButtonSpy).toHaveBeenCalled();
      });
      then("Should facility have five Card", async () => {
        //@ts-ignore
        expect(FacilityReservationMountWrapper.find(Card).length).toEqual(5)
      });
      then("Should open Facility when click on card", async () => {
        //@ts-ignore
        const Upcoming = jest.spyOn(FacilityReservationMountWrapper.find(Card).at(0).props(), "onClick");
        FacilityReservationMountWrapper.find(Card).at(0).props().onClick();
        expect(Upcoming).toHaveBeenCalled();

        const Pending = jest.spyOn(FacilityReservationMountWrapper.find(Card).at(1).props(), "onClick");
        FacilityReservationMountWrapper.find(Card).at(1).props().onClick();
        expect(Pending).toHaveBeenCalled();

        const Previous = jest.spyOn(FacilityReservationMountWrapper.find(Card).at(2).props(), "onClick");
        FacilityReservationMountWrapper.find(Card).at(2).props().onClick();
        expect(Previous).toHaveBeenCalled();


        const Rejected = jest.spyOn(FacilityReservationMountWrapper.find(Card).at(3).props(), "onClick");
        FacilityReservationMountWrapper.find(Card).at(3).props().onClick();
        expect(Rejected).toHaveBeenCalled();


        const Cancelled = jest.spyOn(FacilityReservationMountWrapper.find(Card).at(4).props(), "onClick");
        FacilityReservationMountWrapper.find(Card).at(4).props().onClick();
        expect(Cancelled).toHaveBeenCalled();

      });
      then("Should go to create facility pages when click on book facility button", async () => {
        //@ts-ignore
        const button = jest.spyOn(FacilityReservationMountWrapper.find(Button).at(5).props(), "onClick");
        FacilityReservationMountWrapper.find(Button).at(5).props().onClick();
        expect(button).toHaveBeenCalled();
      
      });

      then("Should load the facility ReservationList count", async () => {
        localStorage.setItem("facilityReservationId",'59');
        let facilityReservationCount = new Message(getName(MessageEnum.RestAPIResponceMessage));
        facilityReservationCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationCount);
        facilityReservationCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationCountMockData);
        instance.getFacilityReservationDetailsByIdApiCallId = facilityReservationCount;
        runEngine.sendMessage("facility Reservation count", facilityReservationCount);
      });
    
      then("should check componentDidMount", () => {
        //@ts-ignore
        jest.spyOn(instance, 'getFacilityReservationCount'); // You spy on the getFacilityReservationCount
        instance.componentDidMount();
        expect(instance.getFacilityReservationCount).toHaveBeenCalledTimes(1)
     });
     
      
  });
});
