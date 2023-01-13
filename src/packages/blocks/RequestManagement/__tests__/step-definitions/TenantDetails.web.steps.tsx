import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import TenantDetails from "../../src/TenantDetails.web";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { TenantStyle } from "../../src/TenantStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { tenantMockData } from "../../../../components/src/TestCase/MyTenantsMockData.web";

const TenantDetailsProps = componentProps("TenantDetails", TenantStyle);

const feature = loadFeature("./__tests__/features/TenantDetails.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to TenantDetails", ({ given, when, then }) => {
    let TenantDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading TenantDetails", () => {
      TenantDetailsMountWrapper = mount(<TenantDetails {...TenantDetailsProps} />);
    });

    when("I navigate to the TenantDetails", () => {
      instance = TenantDetailsMountWrapper.instance();
    });

    then("TenantDetails will load with out errors", () => {
      expect(TenantDetailsMountWrapper).toMatchSnapshot();
    });

    then("Should load the my tenant details", () => {
      const tenantDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      tenantDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), tenantDetails);
      tenantDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, tenant: { data: tenantMockData } });
      instance.GetTenantDetailsCallId = tenantDetails;
      runEngine.sendMessage("My Tenant Details", tenantDetails);
    });

    then("Should delete the my tenant", () => {
      const deleteButtonSpy = jest.spyOn(TenantDetailsMountWrapper.find("img").at(0).props(), "onClick");
      TenantDetailsMountWrapper.find("img").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();
    });

    then("Should go to edit tenant page", () => {
      const editButtonSpy = jest.spyOn(TenantDetailsMountWrapper.find("img").at(1).props(), "onClick");
      TenantDetailsMountWrapper.find("img").at(1).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
    });
  });
});
