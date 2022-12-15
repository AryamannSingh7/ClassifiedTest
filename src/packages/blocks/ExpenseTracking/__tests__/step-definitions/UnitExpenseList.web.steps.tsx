import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import UnitExpenseList from "../../src/UnitExpenseList.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import { Button, Drawer, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const unitExpenseListProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddEditExpense",
  classes: ExpenseTrackingStyle,
};

const expenseCategories = {
  expense_category: [
    {
      id: 1,
      title: "Plumbing",
    },
    {
      id: 2,
      title: "Electricity",
    },
  ],
};

const feature = loadFeature("./__tests__/features/UnitExpenseList.web.feature");

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const myExpenseList = {
  data: [
    {
      id: "7",
      attributes: {
        id: 7,
        expense_date: "2022-12-01",
        expense_amount: "$ 120",
        issue_title: "Issue: Plumbing",
        expense_category_id: 5,
        address: {
          currency: "SR",
        },
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
  ],
};

const selectedUnitDetails = {
  data: {
    id: "94",
    attributes: {
      apartment_name: "301",
      building_management: {
        id: 3,
        name: "First Building",
      },
    },
  },
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to UnitExpenseList", ({ given, when, then }) => {
    let UnitExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading UnitExpenseList", () => {
      UnitExpenseListMountWrapper = mount(<UnitExpenseList {...unitExpenseListProps} />);
    });

    when("I navigate to the UnitExpenseList", () => {
      instance = UnitExpenseListMountWrapper.instance();
    });

    then("UnitExpenseList will load with out errors", async () => {
      expect(UnitExpenseListMountWrapper).toMatchSnapshot();
    });

    then("Should open filter dialog when click on filter button", async () => {
      const openFilterButtonSpy = jest.spyOn(UnitExpenseListMountWrapper.find(IconButton).at(2).props(), "onClick");
      UnitExpenseListMountWrapper.find(IconButton).at(2).props().onClick();
      expect(instance.state.isFilterOpen).toEqual(true);
      expect(openFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should close filter dialog when click on close button", async () => {
      const closeFilterButtonSpy = jest.spyOn(UnitExpenseListMountWrapper.find(Drawer).at(0).props(), "onClose");
      UnitExpenseListMountWrapper.find(Drawer).at(0).props().onClose();
      expect(instance.state.isFilterOpen).toEqual(false);
      expect(closeFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should go back to My unit expense list", async () => {
      const backButtonSpy = jest.spyOn(UnitExpenseListMountWrapper.find(IconButton).at(0).props(), "onClick");
      UnitExpenseListMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go to add expense page", async () => {
      const addExpenseButtonSpy = jest.spyOn(UnitExpenseListMountWrapper.find(Button).at(0).props(), "onClick");
      UnitExpenseListMountWrapper.find(Button).at(0).props().onClick();
      expect(addExpenseButtonSpy).toHaveBeenCalled();
    });
  });

  test("Expense list and Unit Details", ({ given, when, then }) => {
    let UnitExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading UnitExpenseList", () => {
      UnitExpenseListMountWrapper = mount(<UnitExpenseList {...unitExpenseListProps} />);
      instance = UnitExpenseListMountWrapper.instance();
      expect(UnitExpenseListMountWrapper).toMatchSnapshot();
    });

    when("Getting details of unit", () => {
      let unitDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitDetails);
      unitDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), selectedUnitDetails);
      instance.GetUnitDetailsCallId = unitDetails;
      runEngine.sendMessage("Unit Details", unitDetails);
    });

    when("My Expense List is not Empty and should show in web", () => {
      let expenseList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseList.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseList);
      expenseList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), myExpenseList);
      instance.GetAllExpenseListCallId = expenseList;
      runEngine.sendMessage("Expense List", expenseList);
      expect(instance.state.expenseList.length).toBeGreaterThan(0);
      expect(instance.state.expenseList.length).not.toEqual(0);
    });

    then("Should go to Expense Detail page and Edit page", async () => {
      instance.handleNavigationToDetails("23");
      instance.handleNavigationToEditExpense("23");
    });

    then("Should delete the expense", () => {
      instance.handleDeleteExpense("12");
      let deleteExpense = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteExpense);
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), myExpenseList.data[0]);
      instance.DeleteExpenseCallId = deleteExpense;
      runEngine.sendMessage("Expense Delete", deleteExpense);
    });
  });

  test("Filter on My Expense List", ({ given, when, then }) => {
    let UnitExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading My Expense", () => {
      UnitExpenseListMountWrapper = mount(<UnitExpenseList {...unitExpenseListProps} />);
      instance = UnitExpenseListMountWrapper.instance();
      expect(UnitExpenseListMountWrapper).toMatchSnapshot();
    });

    when("Expense Category is loading", () => {
      let expenseCategoryList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseCategoryList.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseCategoryList);
      expenseCategoryList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseCategories);
      instance.GetAllExpenseCategoryListCallId = expenseCategoryList;
      runEngine.sendMessage("Expense Category List", expenseCategoryList);
    });

    then("Should show category list in filter", async () => {
      expect(instance.state.expenseCategoryList.length).toBeGreaterThan(0);
    });

    then("Should Clear the applied filter", async () => {
      instance.setState({ isFilterOpen: true });
      UnitExpenseListMountWrapper.update();

      const clearFilterButtonSpy = jest.spyOn(
        UnitExpenseListMountWrapper.find(".clear-all-text").at(0).props(),
        "onClick"
      );
      UnitExpenseListMountWrapper.find(".clear-all-text").at(0).props().onClick();
      expect(instance.state.categoryList.length).toEqual(0);
      expect(clearFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should apply the filter", async () => {
      instance.setState({ isFilterOpen: true, categoryList: [1] });
      UnitExpenseListMountWrapper.update();

      const filterButtonSpy = jest.spyOn(UnitExpenseListMountWrapper.find(Button).at(1).props(), "onClick");
      UnitExpenseListMountWrapper.find(Button).at(1).props().onClick();
      expect(filterButtonSpy).toHaveBeenCalled();
    });
  });
});
