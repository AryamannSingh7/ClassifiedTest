import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import TenantList from "../../src/TenantList.web";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { TenantStyle } from "../../src/TenantStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { tenantMockData } from "../../../../components/src/TestCase/MyTenantsMockData.web";

const TenantListProps = componentProps("TenantList", TenantStyle);

const feature = loadFeature("./__tests__/features/TenantList.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to TenantList", ({ given, when, then }) => {
    let TenantListMountWrapper: any;
    let instance: any;

    given("I am a User loading TenantList", () => {
      TenantListMountWrapper = mount(<TenantList {...TenantListProps} />);
    });

    when("I navigate to the TenantList", () => {
      instance = TenantListMountWrapper.instance();
    });

    then("TenantList will load with out errors", () => {
      expect(TenantListMountWrapper).toMatchSnapshot();
    });

    then("Should load the my tenant list", () => {
      const tenantList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      tenantList.addData(getName(MessageEnum.RestAPIResponceDataMessage), tenantList);
      tenantList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [tenantMockData, tenantMockData] });
      instance.GetTenantListCallId = tenantList;
      runEngine.sendMessage("My Tenant List", tenantList);
    });

    then("Should delete my tenant for the unit", () => {
      instance.handleDeleteTenant();

      const deleteTenant = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteTenant.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteTenant);
      deleteTenant.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200 });
      instance.DeleteTenantCallId = deleteTenant;
      runEngine.sendMessage("Delete My Tenant", deleteTenant);
    });
  });
});
