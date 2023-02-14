import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import BudgetDetailsWeb from "../../src/BudgetDetails.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";

const BudgetDetailsProps = componentProps("BudgetDetails", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/BudgetDetails.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to BudgetDetails", ({ given, when, then }) => {
    let BudgetDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading BudgetDetails", () => {
      BudgetDetailsMountWrapper = mount(<BudgetDetailsWeb {...BudgetDetailsProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the BudgetDetails", () => {
      instance = BudgetDetailsMountWrapper.instance();
      console.log(instance);
    });

    then("BudgetDetails will load with out errors", () => {
      expect(BudgetDetailsMountWrapper).toMatchSnapshot();
    });
  });
});
