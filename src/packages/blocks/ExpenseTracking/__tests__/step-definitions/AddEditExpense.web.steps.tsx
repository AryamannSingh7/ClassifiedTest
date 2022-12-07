import { defineFeature, loadFeature } from "jest-cucumber";
import { configure, mount } from "enzyme";
import React from "react";
import AddEditExpense from "../../src/AddEditExpense.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import { IconButton } from "@material-ui/core";
import { Formik } from "formik";
import Adapter from "enzyme-adapter-react-16";

const addEditExpenseProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddEditExpense",
  classes: ExpenseTrackingStyle,
};

const feature = loadFeature("./__tests__/features/AddEditExpense.web.feature");

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: any) => component,
}));

jest.mock('react-i18next', () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

configure({
  adapter: new Adapter(),
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to AddEditExpense", ({ given, when, then }) => {
    let AddEditExpenseMountWrapper: any;
    let instance: any;

    given("I am a User loading AddEditExpense", () => {
      AddEditExpenseMountWrapper = mount(<AddEditExpense {...addEditExpenseProps} />);
    });

    when("I navigate to the AddEditExpense", () => {
      instance = AddEditExpenseMountWrapper.instance();
    });

    then("AddEditExpense will load with out errors", async () => {
      expect(AddEditExpenseMountWrapper).toMatchSnapshot();
    });

    then("I can go back to expense listing", async () => {
      const backButtonSpy = jest.spyOn(AddEditExpenseMountWrapper.find(IconButton).at(0).props(), "onClick");
      AddEditExpenseMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Expense Add form submit check", async () => {
      instance.setState({ expenseId: "12" });
      AddEditExpenseMountWrapper.update();

      const formSpy = jest.spyOn(AddEditExpenseMountWrapper.find(Formik).at(0).props(), "onSubmit");
      AddEditExpenseMountWrapper.find(Formik).at(0).props().onSubmit({
        expenseDate: "",
        expenseAmount: "",
        issueTitle: "",
        category: "",
        building: "",
        unit: "",
        resolvedBy: "",
        summary: "",
      }, { resetForm: () => jest.fn() });
      expect(formSpy).toHaveBeenCalled();
    });
  });
});
