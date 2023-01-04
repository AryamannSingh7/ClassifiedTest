import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import FacilityReservation from "../../src/FacilityReservationReportedSuccessfully.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "FacilityReservationReportedSuccessfully",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn()
};


const feature = loadFeature(
  "./__tests__/features/FacilityReservationReportedSuccessfully-scenario.web.feature"
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

  test("User navigates to FacilityReservationReportedSuccessfully", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading FacilityReservationReportedSuccessfully", () => {
      //@ts-ignore
        FacilityReservationMountWrapper = mount(<FacilityReservation.WrappedComponent {...screenProps} />,{ wrappingComponent: Router });
      });
  
      when("I navigate to the FacilityReservationReportedSuccessfully", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("FacilityReservationReportedSuccessfully will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
    
    
  });
});
