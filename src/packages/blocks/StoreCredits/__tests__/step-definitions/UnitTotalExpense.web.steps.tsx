import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import UnitTotalExpense from "../../src/MyExpenseReport/UnitTotalExpense.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Button, Checkbox, Drawer, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const UnitTotalExpenseProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "UnitTotalExpense",
  classes: TotalExpenseStyle,
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

const feature = loadFeature("./__tests__/features/UnitTotalExpense.web.feature");

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

  test("User navigates to UnitTotalExpense", ({ given, when, then }) => {
    let UnitTotalExpenseMountWrapper: any;
    let instance: any;

    given("I am a User loading UnitTotalExpense", () => {
      UnitTotalExpenseMountWrapper = mount(<UnitTotalExpense {...UnitTotalExpenseProps} />);
    });

    when("I navigate to the UnitTotalExpense", () => {
      instance = UnitTotalExpenseMountWrapper.instance();
    });

    then("UnitTotalExpense will load with out errors", async () => {
      expect(UnitTotalExpenseMountWrapper).toMatchSnapshot();
    });

    then("Should open filter dialog when click on filter button", async () => {
      const openFilterButtonSpy = jest.spyOn(UnitTotalExpenseMountWrapper.find(IconButton).at(1).props(), "onClick");
      UnitTotalExpenseMountWrapper.find(IconButton).at(1).props().onClick();
      expect(instance.state.isFilterOpen).toEqual(true);
      expect(openFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should close filter dialog when click on close button", async () => {
      const closeFilterButtonSpy = jest.spyOn(UnitTotalExpenseMountWrapper.find(Drawer).at(0).props(), "onClose");
      UnitTotalExpenseMountWrapper.find(Drawer).at(0).props().onClose();
      expect(instance.state.isFilterOpen).toEqual(false);
      expect(closeFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should load the expense category list", async () => {
      let expenseCategoryList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseCategoryList.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseCategoryList);
      expenseCategoryList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseCategories);
      instance.GetAllExpenseCategoryListCallId = expenseCategoryList;
      runEngine.sendMessage("Expense Category List", expenseCategoryList);
      expect(instance.state.expenseCategoryList.length).toBeGreaterThan(0);
    });

    then("Should load the unit details", async () => {
      let unitDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitDetails);
      unitDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), selectedUnitDetails);
      instance.GetUnitDetailsCallId = unitDetails;
      runEngine.sendMessage("Unit Details", unitDetails);
    });

    then("Should load the unit expense list", async () => {
      let expenseList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseList.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseList);
      expenseList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), myExpenseList);
      instance.GetAllExpenseListCallId = expenseList;
      runEngine.sendMessage("Expense List", expenseList);
      expect(instance.state.expenseList.length).toBeGreaterThan(0);
      expect(instance.state.expenseList.length).not.toEqual(0);
    });

    then("Should Clear the applied filter", async () => {
      instance.setState({ isFilterOpen: true });
      UnitTotalExpenseMountWrapper.update();

      const clearFilterButtonSpy = jest.spyOn(
        UnitTotalExpenseMountWrapper.find(".clear-all-text").at(0).props(),
        "onClick"
      );
      UnitTotalExpenseMountWrapper.find(".clear-all-text").at(0).props().onClick();
      expect(instance.state.categoryList.length).toEqual(0);
      expect(clearFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should apply the filter", async () => {
      instance.setState({ isFilterOpen: true, categoryList: [1] });
      UnitTotalExpenseMountWrapper.update();

      const filterButtonSpy = jest.spyOn(UnitTotalExpenseMountWrapper.find(Button).at(0).props(), "onClick");
      UnitTotalExpenseMountWrapper.find(Button).at(0).props().onClick();
      expect(filterButtonSpy).toHaveBeenCalled();
    });

    then("Should add selected category id into list when checked", async () => {
      instance.setState({ isFilterOpen: true });
      UnitTotalExpenseMountWrapper.update();

      const checkboxSpy = jest.spyOn(UnitTotalExpenseMountWrapper.find(Checkbox).at(0).props(), "onChange");
      UnitTotalExpenseMountWrapper.find(Checkbox)
        .at(0)
        .props()
        .onChange({
          target: { checked: true },
        });
      expect(checkboxSpy).toHaveBeenCalled();
    });

    then("Should remove selected category id into list when unchecked", async () => {
      instance.setState({ isFilterOpen: true });
      UnitTotalExpenseMountWrapper.update();

      const checkboxSpy = jest.spyOn(UnitTotalExpenseMountWrapper.find(Checkbox).at(0).props(), "onChange");
      UnitTotalExpenseMountWrapper.find(Checkbox)
        .at(0)
        .props()
        .onChange({
          target: { checked: false },
        });
      expect(checkboxSpy).toHaveBeenCalled();
    });
  });
});
