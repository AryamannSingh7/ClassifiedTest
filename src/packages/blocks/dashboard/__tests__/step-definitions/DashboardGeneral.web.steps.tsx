import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import DashboardGeneralWeb from "../../src/DashboardGeneral.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";

const DashboardGeneralProps = componentProps("DashboardGeneral", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/DashboardGeneral.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DashboardGeneral", ({ given, when, then }) => {
    let DashboardGeneralMountWrapper: any;
    let instance: any;

    given("I am a User loading DashboardGeneral", () => {
      DashboardGeneralMountWrapper = mount(<DashboardGeneralWeb {...DashboardGeneralProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the DashboardGeneral", () => {
      instance = DashboardGeneralMountWrapper.instance();
      console.log(instance);
    });

    then("DashboardGeneral will load with out errors", () => {
      expect(DashboardGeneralMountWrapper).toMatchSnapshot();
    });
  });
});
