import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import ChairmanSidebarWeb from "../../src/ChairmanSidebar.web";
import { BrowserRouter } from "react-router-dom";
import { DashboardStyleWeb } from "../../src/DashboardStyle.web";

const ChairmanSidebarProps = componentProps("ChairmanSidebar", DashboardStyleWeb);

const feature = loadFeature("./__tests__/features/ChairmanSidebar.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ChairmanSidebar", ({ given, when, then }) => {
    let ChairmanSidebarMountWrapper: any;
    let instance: any;

    given("I am a User loading ChairmanSidebar", () => {
      ChairmanSidebarMountWrapper = mount(<ChairmanSidebarWeb {...ChairmanSidebarProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the ChairmanSidebar", () => {
      instance = ChairmanSidebarMountWrapper.instance();
      console.log(instance);
    });

    then("ChairmanSidebar will load with out errors", () => {
      expect(ChairmanSidebarMountWrapper).toMatchSnapshot();
    });
  });
});
