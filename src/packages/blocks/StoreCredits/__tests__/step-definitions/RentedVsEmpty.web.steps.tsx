import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import RentedVsEmpty from "../../src/MyExpenseReport/RentedVsEmpty.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { rentVsEmptyMockData } from "../../../../components/src/TestCase/ExpenseReportMockData.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";

const RentedVsEmptyProps = componentProps("RentedVsEmpty", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/RentedVsEmpty.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RentedVsEmpty", ({ given, when, then }) => {
    let RentedVsEmptyMountWrapper: any;
    let instance: any;

    given("I am a User loading RentedVsEmpty", () => {
      RentedVsEmptyMountWrapper = mount(<RentedVsEmpty {...RentedVsEmptyProps} />);
    });

    when("I navigate to the RentedVsEmpty", () => {
      instance = RentedVsEmptyMountWrapper.instance();
    });

    then("RentedVsEmpty will load with out errors", async () => {
      expect(RentedVsEmptyMountWrapper).toMatchSnapshot();
    });

    then("Should load rent vs empty unit data", async () => {
      let rentVsEmpty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      rentVsEmpty.addData(getName(MessageEnum.RestAPIResponceDataMessage), rentVsEmpty);
      rentVsEmpty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), rentVsEmptyMockData);
      instance.RentVsEmptyCallId = rentVsEmpty;
      runEngine.sendMessage("Rent Vs Empty", rentVsEmpty);
    });
  });
});
