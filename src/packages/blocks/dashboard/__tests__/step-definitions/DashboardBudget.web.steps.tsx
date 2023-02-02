import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import DashboardBudgetWeb from "../../src/DashboardBudget.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";

const DashboardBudgetProps = componentProps("DashboardBudget", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/DashboardBudget.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DashboardBudget", ({ given, when, then }) => {
    let DashboardBudgetMountWrapper: any;
    let instance: any;

    given("I am a User loading DashboardBudget", () => {
      DashboardBudgetMountWrapper = mount(<DashboardBudgetWeb {...DashboardBudgetProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the DashboardBudget", () => {
      instance = DashboardBudgetMountWrapper.instance();
      console.log(instance);
    });

    then("DashboardBudget will load with out errors", () => {
      expect(DashboardBudgetMountWrapper).toMatchSnapshot();
    });
  });
});
