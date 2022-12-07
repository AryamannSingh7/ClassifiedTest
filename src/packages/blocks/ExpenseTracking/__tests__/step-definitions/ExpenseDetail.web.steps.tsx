import { defineFeature, loadFeature } from "jest-cucumber";
import { configure, mount } from "enzyme";
import React from "react";
import ExpenseDetail from "../../src/ExpenseDetail.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import Adapter from "enzyme-adapter-react-16";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const expenseDetailsProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "ExpenseDetail",
  classes: ExpenseTrackingStyle,
};

const feature = loadFeature("./__tests__/features/ExpenseDetail.web.feature");

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: any) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const expenseDetailsByID = {
  data: {
    id: "7",
    attributes: {
      id: 7,
      expense_date: "2022-12-01",
      expense_amount: "$ 120",
      issue_title: "Issue: Plumbing",
      expense_category_id: 5,
      building_management: {
        id: 3,
        name: "First Building",
      },
      apartment_management: {
        id: 94,
        apartment_name: "301",
      },
      society_management: {
        id: 5,
        name: "New Society",
      },
      resolved_by: "John Doe",
      summary: "Issue: Plumbing ",
      expense_category: {
        id: 5,
        title: "Renovation",
      },
    },
  },
};

configure({
  adapter: new Adapter(),
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ExpenseDetail", ({ given, when, then }) => {
    let ExpenseDetailMountWrapper: any;
    let instance: any;

    given("I am a User loading ExpenseDetail", () => {
      ExpenseDetailMountWrapper = mount(<ExpenseDetail {...expenseDetailsProps} />);
    });

    when("I navigate to the ExpenseDetail", () => {
      instance = ExpenseDetailMountWrapper.instance();
    });

    then("ExpenseDetail will load with out errors", async () => {
      expect(ExpenseDetailMountWrapper).toMatchSnapshot();
    });

    then("I can go back to expense details page", async () => {
      const backButtonSpy = jest.spyOn(ExpenseDetailMountWrapper.find(IconButton).at(2).props(), "onClick");
      ExpenseDetailMountWrapper.find(IconButton).at(2).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should open delete dialog when click on delete button", async () => {
      const openDialogButtonSpy = jest.spyOn(ExpenseDetailMountWrapper.find(IconButton).at(1).props(), "onClick");
      ExpenseDetailMountWrapper.find(IconButton).at(1).props().onClick();
      expect(instance.state.isExpenseModalOpen).toEqual(true);
      expect(openDialogButtonSpy).toHaveBeenCalled();
    });

    then("Should close delete dialog when click on close button", async () => {
      const closeDialogButton = jest.spyOn(ExpenseDetailMountWrapper.find(Dialog).at(0).props(), "onClose");
      ExpenseDetailMountWrapper.find(Dialog).at(0).props().onClose();
      expect(instance.state.isExpenseModalOpen).toEqual(false);
      expect(closeDialogButton).toHaveBeenCalled();
    });

    then("Should go to my expense list", async () => {
      const addExpenseButtonSpy = jest.spyOn(ExpenseDetailMountWrapper.find(IconButton).at(0).props(), "onClick");
      ExpenseDetailMountWrapper.find(IconButton).at(0).props().onClick();
      expect(addExpenseButtonSpy).toHaveBeenCalled();
    });
  });

  test("Delete Expense Details", ({ given, when, then }) => {
    let ExpenseDetailMountWrapper: any;
    let instance: any;

    given("I am a User loading ExpenseDetail", () => {
      ExpenseDetailMountWrapper = mount(<ExpenseDetail {...expenseDetailsProps} />);
      instance = ExpenseDetailMountWrapper.instance();
      expect(ExpenseDetailMountWrapper).toMatchSnapshot();
    });

    when("ExpenseDetail loaded without error", () => {
      let expenseDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseDetails);
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseDetailsByID);
      instance.GetExpenseDetailsCallId = expenseDetails;
      runEngine.sendMessage("Expense Details", expenseDetails);
    });

    then("Should delete the expense details", async () => {
      instance.setState({ isExpenseModalOpen: true });
      ExpenseDetailMountWrapper.update();

      const deleteButton = jest.spyOn(ExpenseDetailMountWrapper.find(Button).at(0).props(), "onClick");
      ExpenseDetailMountWrapper.find(Button).at(0).props().onClick();
      expect(deleteButton).toHaveBeenCalled();

      let deleteExpense = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteExpense);
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseDetailsByID);
      instance.DeleteExpenseCallId = deleteExpense;
      runEngine.sendMessage("Expense Delete", deleteExpense);
    });

    then("Should cancel delete the expense", async () => {
      instance.setState({ isExpenseModalOpen: true });
      ExpenseDetailMountWrapper.update();

      const closeDialogButton = jest.spyOn(ExpenseDetailMountWrapper.find(Button).at(1).props(), "onClick");
      ExpenseDetailMountWrapper.find(Button).at(1).props().onClick();
      expect(instance.state.isExpenseModalOpen).toEqual(false);
      expect(closeDialogButton).toHaveBeenCalled();
    });
  });
});
