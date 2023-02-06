import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";
import DashboardTicket from "../../src/DashboardTicket.web";

const DashboardTicketProps = componentProps("DashboardTicket", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/DashboardTicket.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DashboardTicket", ({ given, when, then }) => {
    let DashboardTicketMountWrapper: any;
    let instance: any;

    given("I am a User loading DashboardTicket", () => {
      DashboardTicketMountWrapper = mount(<DashboardTicket {...DashboardTicketProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the DashboardTicket", () => {
      instance = DashboardTicketMountWrapper.instance();
      console.log(instance);
    });

    then("DashboardTicket will load with out errors", () => {
      expect(DashboardTicketMountWrapper).toMatchSnapshot();
    });
  });
});
