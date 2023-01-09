import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import SpentVsCollected from "../../src/MyExpenseReport/SpentVsCollected.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { spentVsCollectedMockData, yearListMockData } from "../../../../components/src/TestCase/ExpenseReportMockData.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";

const SpentVsCollectedProps = componentProps("SpentVsCollected", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/SpentVsCollected.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to SpentVsCollected", ({ given, when, then }) => {
    let SpentVsCollectedMountWrapper: any;
    let instance: any;

    given("I am a User loading SpentVsCollected", () => {
      SpentVsCollectedMountWrapper = mount(<SpentVsCollected {...SpentVsCollectedProps} />);
    });

    when("I navigate to the SpentVsCollected", () => {
      instance = SpentVsCollectedMountWrapper.instance();
    });

    then("SpentVsCollected will load with out errors", async () => {
      expect(SpentVsCollectedMountWrapper).toMatchSnapshot();
    });

    then("Should load spent vs collected data", async () => {
      let spentVsCollected = new Message(getName(MessageEnum.RestAPIResponceMessage));
      spentVsCollected.addData(getName(MessageEnum.RestAPIResponceDataMessage), spentVsCollected);
      spentVsCollected.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), spentVsCollectedMockData);
      instance.CollectedVsSpentCallId = spentVsCollected;
      runEngine.sendMessage("Spent Vs Collected", spentVsCollected);
    });

    then("Should load year list", async () => {
      let yearList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      yearList.addData(getName(MessageEnum.RestAPIResponceDataMessage), yearList);
      yearList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), yearListMockData);
      instance.LastYearsListCallId = yearList;
      runEngine.sendMessage("Year list", yearList);
    });

    then("Should change the year for filter by year", async () => {
      instance.handleYearFilter();

      const selectYearSpy = jest.spyOn(SpentVsCollectedMountWrapper.find("select").at(0).props(), "onChange");
      SpentVsCollectedMountWrapper.find("select").at(0).props().onChange({ target: { value: "2022" } });
      expect(selectYearSpy).toHaveBeenCalled();
    });

    then("Should change the year for filter by quarter", async () => {
      instance.handleQuarterFilter();
      instance.setState({ selectedFilter: "quarter" });
      SpentVsCollectedMountWrapper.update();

      const selectQuarterSpy = jest.spyOn(SpentVsCollectedMountWrapper.find("select").at(0).props(), "onChange");
      SpentVsCollectedMountWrapper.find("select").at(0).props().onChange({ target: { value: "2022" } });
      expect(selectQuarterSpy).toHaveBeenCalled();
    });

    then("Should change the year for filter by month", async () => {
      instance.handleMonthFilter();
      instance.setState({ selectedFilter: "month" });
      SpentVsCollectedMountWrapper.update();

      const selectMonthSpy = jest.spyOn(SpentVsCollectedMountWrapper.find("select").at(0).props(), "onChange");
      SpentVsCollectedMountWrapper.find("select").at(0).props().onChange({ target: { value: "2022" } });
      expect(selectMonthSpy).toHaveBeenCalled();
    });
  });
});
