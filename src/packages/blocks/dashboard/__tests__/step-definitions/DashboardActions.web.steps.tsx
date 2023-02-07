import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import DashboardActionsWeb from "../../src/DashboardActions.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";

const DashboardActionsProps = componentProps("DashboardActions", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/DashboardActions.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DashboardActions", ({ given, when, then }) => {
    let DashboardActionsMountWrapper: any;
    let instance: any;

    given("I am a User loading DashboardActions", () => {
      DashboardActionsMountWrapper = mount(<DashboardActionsWeb {...DashboardActionsProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the DashboardActions", () => {
      instance = DashboardActionsMountWrapper.instance();
      console.log(instance);
    });

    then("DashboardActions will load with out errors", () => {
      expect(DashboardActionsMountWrapper).toMatchSnapshot();
    });
  });
});
