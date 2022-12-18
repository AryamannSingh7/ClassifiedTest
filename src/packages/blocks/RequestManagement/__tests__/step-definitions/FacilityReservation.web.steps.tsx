import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FacilityReservation from "../../src/FacilityReservation.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "FacilityReservation",
};

const feature = loadFeature(
  "./__tests__/features/FacilityReservation-scenario.web.feature"
);

jest.mock("@material-ui/core/styles", () => ({
    withStyles: (styles: any) => (component: Component) => component,
  }));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to FacilityReservation", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading FacilityReservation", () => {
        FacilityReservationMountWrapper = mount(<Router><FacilityReservation {...screenProps} /></Router>);
        console.log("FacilityReservationMountWrapper=================>",FacilityReservationMountWrapper.debug())
      });
  
      when("I navigate to the FacilityReservation", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("Then FacilityReservation will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
  });
});
