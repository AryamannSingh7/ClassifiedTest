import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import UnitTotalExpense from "../../src/MyExpenseReport/UnitTotalExpense.web";
import { TotalExpenseStyle } from "../../src/MyExpenseReport/TotalExpenseStyle.web";
import { Button, Checkbox, Drawer, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { expenseCategoryMockData, myExpenseListMockData, unitDetailsMockData } from "../../../../components/src/TestCase/ExpenseReportMockData.web";

const UnitTotalExpenseProps = componentProps("UnitTotalExpense", TotalExpenseStyle);

const feature = loadFeature("./__tests__/features/UnitTotalExpense.web.feature");

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
      expenseCategoryList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        expense_category: expenseCategoryMockData
      });
      instance.GetAllExpenseCategoryListCallId = expenseCategoryList;
      runEngine.sendMessage("Expense Category List", expenseCategoryList);
      expect(instance.state.expenseCategoryList.length).toBeGreaterThan(0);
    });

    then("Should load the unit details", async () => {
      let unitDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitDetails);
      unitDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: unitDetailsMockData
      });
      instance.GetUnitDetailsCallId = unitDetails;
      runEngine.sendMessage("Unit Details", unitDetails);
    });

    then("Should load the unit expense list", async () => {
      let expenseList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseList.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseList);
      expenseList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: myExpenseListMockData,
      });
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
