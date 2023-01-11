import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import TenantProfile from "../../src/TenantProfile.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import { TenantDetailsMockData } from "../../../../components/src/TestCase/MyUnitMockData.web";
import { IconButton } from "@material-ui/core";

const TenantProfileProps = componentProps("TenantProfile", MyUnitStyle);

const feature = loadFeature("./__tests__/features/TenantProfile.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to TenantProfile", ({ given, when, then }) => {
    let TenantProfileMountWrapper: any;
    let instance: any;

    given("I am a User loading TenantProfile", () => {
      TenantProfileMountWrapper = mount(<TenantProfile {...TenantProfileProps} />);
    });

    when("I navigate to the TenantProfile", () => {
      instance = TenantProfileMountWrapper.instance();
    });

    then("TenantProfile will load with out errors", async () => {
      expect(TenantProfileMountWrapper).toMatchSnapshot();
    });

    then("Should go back to my unit details page", async () => {
      const backButtonSpy = jest.spyOn(
        TenantProfileMountWrapper.find(IconButton)
          .at(0)
          .props(),
        "onClick"
      );
      TenantProfileMountWrapper.find(IconButton)
        .at(0)
        .props()
        .onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should load profile details", async () => {
      let profileDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      profileDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), profileDetails);
      profileDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: TenantDetailsMockData });
      instance.GetProfileDetailsCallId = profileDetails;
      runEngine.sendMessage("Tenant Profile Details", profileDetails);
    });
  });
});
