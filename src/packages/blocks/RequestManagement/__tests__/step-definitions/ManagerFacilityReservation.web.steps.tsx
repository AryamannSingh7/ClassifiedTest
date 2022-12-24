import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { Button, Card, IconButton } from "@material-ui/core";
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
      then("I can go back to Facility details page", async () => {
        // const backButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(".backIcons").at(0).props(), "onClick");
        // FacilityReservationMountWrapper.find(".backIcons").at(0).props().onClick();
        // expect(backButtonSpy).toHaveBeenCalled();

      });
    
  });
});
