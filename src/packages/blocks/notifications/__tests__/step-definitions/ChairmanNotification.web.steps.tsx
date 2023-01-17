import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import ChairmanNotification from "../../src/ChairmanNotification.web";
import { NotificationStyle } from "../../src/NotificationStyle.web";
import { BrowserRouter } from "react-router-dom";

const ChairmanNotificationProps = componentProps("ChairmanNotification", NotificationStyle);

const feature = loadFeature("./__tests__/features/ChairmanNotification.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ChairmanNotification", ({ given, when, then }) => {
    let ChairmanNotificationMountWrapper: any;
    let instance: any;

    given("I am a User loading ChairmanNotification", () => {
      ChairmanNotificationMountWrapper = mount(<ChairmanNotification {...ChairmanNotificationProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the ChairmanNotification", () => {
      instance = ChairmanNotificationMountWrapper.instance();
    });

    then("ChairmanNotification will load with out errors", async () => {
      expect(ChairmanNotificationMountWrapper).toMatchSnapshot();
    });
  });
});
