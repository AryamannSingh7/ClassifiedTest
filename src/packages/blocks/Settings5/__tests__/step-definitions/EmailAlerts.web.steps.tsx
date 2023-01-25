import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import EmailAlertsWeb from "../../src/EmailAlerts.web";
import { EmailAlertsStyle } from "../../src/EmailAlertsStyle.web";

const EmailAlertsProps = componentProps("EmailAlerts", EmailAlertsStyle);

const feature = loadFeature("./__tests__/features/EmailAlerts.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to EmailAlerts", ({ given, when, then }) => {
    let EmailAlertsMountWrapper: any;
    let instance: any;

    given("I am a User loading EmailAlerts", () => {
      EmailAlertsMountWrapper = mount(<EmailAlertsWeb {...EmailAlertsProps} />);
    });

    when("I navigate to the EmailAlerts", () => {
      instance = EmailAlertsMountWrapper.instance();
      console.log(instance);
    });

    then("EmailAlerts will load with out errors", async () => {
      expect(EmailAlertsMountWrapper).toMatchSnapshot();
    });
  });
});
