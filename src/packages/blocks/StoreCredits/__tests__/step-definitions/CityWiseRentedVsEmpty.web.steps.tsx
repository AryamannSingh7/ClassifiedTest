import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import CityWiseRentedVsEmpty from "../../src/MyExpenseReport/CityWiseRentedVsEmpty.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { rentAndEmptyUnitListMockData } from "../../../../components/src/TestCase/ExpenseReportMockData.web";

const CityWiseRentedVsEmptyProps = componentProps("CityWiseRentedVsEmpty", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/CityWiseRentedVsEmpty.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to CityWiseRentedVsEmpty", ({ given, when, then }) => {
    let CityWiseRentedVsEmptyMountWrapper: any;
    let instance: any;

    given("I am a User loading CityWiseRentedVsEmpty", () => {
      CityWiseRentedVsEmptyMountWrapper = mount(<CityWiseRentedVsEmpty {...CityWiseRentedVsEmptyProps} />);
    });

    when("I navigate to the CityWiseRentedVsEmpty", () => {
      instance = CityWiseRentedVsEmptyMountWrapper.instance();
    });

    then("CityWiseRentedVsEmpty will load with out errors", async () => {
      expect(CityWiseRentedVsEmptyMountWrapper).toMatchSnapshot();
    });

    then("Should load city wise unit data", async () => {
      let cityWiseUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      cityWiseUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), cityWiseUnit);
      cityWiseUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), rentAndEmptyUnitListMockData);
      instance.UnitDataByCityCallId = cityWiseUnit;
      runEngine.sendMessage("City Wise Unit", cityWiseUnit);
    });
  });
});
