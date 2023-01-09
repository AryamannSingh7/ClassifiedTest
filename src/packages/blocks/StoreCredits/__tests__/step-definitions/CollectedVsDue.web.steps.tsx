import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import CollectedVsDue from "../../src/MyExpenseReport/CollectedVsDue.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { collectedVsDueMockData, yearListMockData } from "../../../../components/src/TestCase/ExpenseReportMockData.web";

const CollectedVsDueProps = componentProps("CollectedVsDue", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/CollectedVsDue.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to CollectedVsDue", ({ given, when, then }) => {
    let CollectedVsDueMountWrapper: any;
    let instance: any;

    given("I am a User loading CollectedVsDue", () => {
      CollectedVsDueMountWrapper = mount(<CollectedVsDue {...CollectedVsDueProps} />);
    });

    when("I navigate to the CollectedVsDue", () => {
      instance = CollectedVsDueMountWrapper.instance();
    });

    then("CollectedVsDue will load with out errors", async () => {
      expect(CollectedVsDueMountWrapper).toMatchSnapshot();
    });

    then("Should load collected vs due amount data", async () => {
      let collectedVsDue = new Message(getName(MessageEnum.RestAPIResponceMessage));
      collectedVsDue.addData(getName(MessageEnum.RestAPIResponceDataMessage), collectedVsDue);
      collectedVsDue.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), collectedVsDueMockData);
      instance.CollectedVsDueCallId = collectedVsDue;
      runEngine.sendMessage("Collected Vs Due", collectedVsDue);
    });

    then("Should load year list", async () => {
      let yearList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      yearList.addData(getName(MessageEnum.RestAPIResponceDataMessage), yearList);
      yearList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), yearListMockData);
      instance.LastYearsListCallId = yearList;
      runEngine.sendMessage("Year list", yearList);
    });

    then("Should change the year for filter by year", async () => {
      const selectYearSpy = jest.spyOn(CollectedVsDueMountWrapper.find("select").at(0).props(), "onChange");
      CollectedVsDueMountWrapper.find("select").at(0).props().onChange({ target: { value: "2022" } });
      expect(selectYearSpy).toHaveBeenCalled();
    });
  });
});
