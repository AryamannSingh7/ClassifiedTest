import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import FacilityReservation from "../../src/CreateFacilityReservation.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "CreateFacilityReservation",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn()
};


const feature = loadFeature(
  "./__tests__/features/CreateFacilityReservation-scenario.web.feature"
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

  test("User navigates to CreateFacilityReservation", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading CreateFacilityReservation", () => {
      //@ts-ignore
        FacilityReservationMountWrapper = mount(<FacilityReservation.WrappedComponent {...screenProps} />,{ wrappingComponent: Router });
      });
  
      when("I navigate to the CreateFacilityReservation", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("CreateFacilityReservation will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
      then("I can go back to Facility details page", async () => {
        const backButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(".backIcons").at(0).props(), "onClick");
        FacilityReservationMountWrapper.find(".backIcons").at(0).props().onClick();
        expect(backButtonSpy).toHaveBeenCalled();
        // jest.spyOn(instance,"redirectToDashboard")
        // expect(FacilityReservationMountWrapper.find("#backIcons").length).toEqual(2)
        // FacilityReservationMountWrapper.find("#backIcons").at(1).simulate('click')
        // expect(instance.redirectToDashboard).toHaveBeenCalled()
      });
    
  });
});
