import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";
import TicketGeneratedYearWeb from "../../src/TicketGeneratedYear.web";

const TicketGeneratedYearProps = componentProps("TicketGeneratedYear", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/TicketGeneratedYear.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to TicketGeneratedYear", ({ given, when, then }) => {
    let TicketGeneratedYearMountWrapper: any;
    let instance: any;

    given("I am a User loading TicketGeneratedYear", () => {
      TicketGeneratedYearMountWrapper = mount(<TicketGeneratedYearWeb {...TicketGeneratedYearProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the TicketGeneratedYear", () => {
      instance = TicketGeneratedYearMountWrapper.instance();
      console.log(instance);
    });

    then("TicketGeneratedYear will load with out errors", () => {
      expect(TicketGeneratedYearMountWrapper).toMatchSnapshot();
    });
  });
});
