import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import TotalExpense from "../../src/MyExpenseReport/TotalExpense.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import {
  expenseDetailsMockData,
  yearListMockData,
} from "../../../../components/src/TestCase/ExpenseReportMockData.web";

const TotalExpenseProps = componentProps("TotalExpense", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/TotalExpense.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to TotalExpense", ({ given, when, then }) => {
    let TotalExpenseMountWrapper: any;
    let instance: any;

    given("I am a User loading TotalExpense", () => {
      TotalExpenseMountWrapper = mount(<TotalExpense {...TotalExpenseProps} />);
    });

    when("I navigate to the TotalExpense", () => {
      instance = TotalExpenseMountWrapper.instance();
    });

    then("TotalExpense will load with out errors", async () => {
      expect(TotalExpenseMountWrapper).toMatchSnapshot();
    });

    then("Should load the total expense, unit wise, city wise and category wise expense", async () => {
      let expenseDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseDetails);
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: expenseDetailsMockData });
      instance.ExpenseReportCallId = expenseDetails;
      runEngine.sendMessage("Expense Details", expenseDetails);
    });

    then("Should load year list", async () => {
      let yearList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      yearList.addData(getName(MessageEnum.RestAPIResponceDataMessage), yearList);
      yearList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), yearListMockData);
      instance.LastYearsListCallId = yearList;
      runEngine.sendMessage("Year list", yearList);
    });

    then("Should change the year for filter by year", async () => {
      const selectYearSpy = jest.spyOn(TotalExpenseMountWrapper.find("select").at(0).props(), "onChange");
      TotalExpenseMountWrapper.find("select").at(0).props().onChange({ target: { value: "2022" } });
      expect(selectYearSpy).toHaveBeenCalled();
    });
  });
});
