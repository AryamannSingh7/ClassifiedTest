import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import RentedAndEmpty from "../../src/MyExpenseReport/RentedAndEmpty.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { rentAndEmptyUnitListMockData } from "../../../../components/src/TestCase/ExpenseReportMockData.web";

const RentedAndEmptyProps = componentProps("RentedAndEmpty", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/RentedAndEmpty.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RentedAndEmpty", ({ given, when, then }) => {
    let RentedAndEmptyMountWrapper: any;
    let instance: any;

    given("I am a User loading RentedAndEmpty", () => {
      RentedAndEmptyMountWrapper = mount(<RentedAndEmpty {...RentedAndEmptyProps} />);
    });

    when("I navigate to the RentedAndEmpty", () => {
      instance = RentedAndEmptyMountWrapper.instance();
    });

    then("RentedAndEmpty will load with out errors", async () => {
      expect(RentedAndEmptyMountWrapper).toMatchSnapshot();
    });

    then("Should load rent and empty unit data", async () => {
      let rentAndEmptyUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      rentAndEmptyUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), rentAndEmptyUnit);
      rentAndEmptyUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), rentAndEmptyUnitListMockData);
      instance.RentAndCollectedCallId = rentAndEmptyUnit;
      runEngine.sendMessage("Rent And Empty", rentAndEmptyUnit);
    });
  });
});
