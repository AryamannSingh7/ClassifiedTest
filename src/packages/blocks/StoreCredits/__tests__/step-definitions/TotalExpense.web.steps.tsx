import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import TotalExpense from "../../src/MyExpenseReport/TotalExpense.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Button, Checkbox, Drawer, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const TotalExpenseProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "TotalExpense",
  classes: TotalExpenseStyle,
};

const ExpenseDetailsMockData = {
  data: {
    id: "173",
    type: "expense_report",
    attributes: {
      total_expense: { expense: 0, currency: "USD" },
      category_wise_expense: [{ title: "Electricity", currency: "USD", expenses: 0 }],
      unit_wise_expense: [
        { id: 94, unit_name: "301", building_id: 3, building_name: "First Building", currency: "USD", expenses: 0 },
        { id: 89, unit_name: "102", building_id: 3, building_name: "First Building", currency: "USD", expenses: 0 },
      ],
      city_wise_expenses: [
        {
          city_name: "Bhopal",
          society_management_id: 5,
          society_management_name: "New Society",
          currency: "USD",
          expenses: 0,
        },
      ],
    },
  },
};

const feature = loadFeature("./__tests__/features/TotalExpense.web.feature");

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

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
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), ExpenseDetailsMockData);
      instance.ExpenseReportCallId = expenseDetails;
      runEngine.sendMessage("Expense Details", expenseDetails);
    });
  });
});
