import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";
import ResidentDashboardWeb from "../../src/ResidentDashboard.web";

const ResidentDashboardProps = componentProps("ResidentDashboard", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/ResidentDashboard.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ResidentDashboard", ({ given, when, then }) => {
    let ResidentDashboardMountWrapper: any;
    let instance: any;

    given("I am a User loading ResidentDashboard", () => {
      ResidentDashboardMountWrapper = mount(<ResidentDashboardWeb {...ResidentDashboardProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the ResidentDashboard", () => {
      instance = ResidentDashboardMountWrapper.instance();
      console.log(instance);
    });

    then("ResidentDashboard will load with out errors", () => {
      expect(ResidentDashboardMountWrapper).toMatchSnapshot();
    });
  });
});
