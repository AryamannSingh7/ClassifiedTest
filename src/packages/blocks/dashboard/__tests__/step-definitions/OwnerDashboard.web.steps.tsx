import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";
import OwnerDashboardWeb from "../../src/OwnerDashboard.web";

const OwnerDashboardProps = componentProps("OwnerDashboard", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/OwnerDashboard.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to OwnerDashboard", ({ given, when, then }) => {
    let OwnerDashboardMountWrapper: any;
    let instance: any;

    given("I am a User loading OwnerDashboard", () => {
      OwnerDashboardMountWrapper = mount(<OwnerDashboardWeb {...OwnerDashboardProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the OwnerDashboard", () => {
      instance = OwnerDashboardMountWrapper.instance();
      console.log(instance);
    });

    then("OwnerDashboard will load with out errors", () => {
      expect(OwnerDashboardMountWrapper).toMatchSnapshot();
    });
  });
});
