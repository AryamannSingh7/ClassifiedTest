import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";
import TicketGeneratedDaysWeb from "../../src/TicketGeneratedDays.web";

const TicketGeneratedDaysProps = componentProps("TicketGeneratedDays", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/TicketGeneratedDays.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to TicketGeneratedDays", ({ given, when, then }) => {
    let TicketGeneratedDaysMountWrapper: any;
    let instance: any;

    given("I am a User loading TicketGeneratedDays", () => {
      TicketGeneratedDaysMountWrapper = mount(<TicketGeneratedDaysWeb {...TicketGeneratedDaysProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the TicketGeneratedDays", () => {
      instance = TicketGeneratedDaysMountWrapper.instance();
      console.log(instance);
    });

    then("TicketGeneratedDays will load with out errors", () => {
      expect(TicketGeneratedDaysMountWrapper).toMatchSnapshot();
    });
  });
});
