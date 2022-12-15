import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import AddEditExpense from "../../src/AddEditExpense.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import { IconButton, Select } from "@material-ui/core";
import { Formik } from "formik";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

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
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const categoryList = {
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

const buildingList = {
  buildings: [
    {
      id: 3,
      name: "First Building",
    },
  ],
};

const allComplexList = {
  data: [
    {
      id: "5",
      attributes: {
        name: "New Society",
      },
    },
    {
      id: "6",
      attributes: {
        name: "Ti1",
      },
    },
  ],
};

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

const unitList = {
  apartments: [
    {
      id: 94,
      apartment_name: "301",
    },
    {
      id: 89,
      apartment_name: "102",
    },
  ],
};

const expenseResponse = {
  data: {
    id: "8",
    attributes: {
      id: 8,
      expense_date: "2022-12-01",
      expense_amount: "$ 120",
      issue_title: "Issue: Plumbing",
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
        id: 2,
        title: "Electricity",
      },
    },
  },
};

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

    then("Should go back to expense listing when Add Expense", async () => {
      instance.setState({ isComingFromMainPage: true });
      AddEditExpenseMountWrapper.update();

      const backButtonSpy = jest.spyOn(AddEditExpenseMountWrapper.find(IconButton).at(0).props(), "onClick");
      AddEditExpenseMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go back to unit expense listing when Add Expense", async () => {
      instance.setState({ isComingFromMainPage: false });
      AddEditExpenseMountWrapper.update();

      const backButtonSpy = jest.spyOn(AddEditExpenseMountWrapper.find(IconButton).at(0).props(), "onClick");
      AddEditExpenseMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go back to Expense Details when Edit Expense", async () => {
      instance.setState({ expenseId: "12" });
      AddEditExpenseMountWrapper.update();

      const backButtonSpy = jest.spyOn(AddEditExpenseMountWrapper.find(IconButton).at(0).props(), "onClick");
      AddEditExpenseMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should load the expense category", async () => {
      let expenseCategory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseCategory.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseCategory);
      expenseCategory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), categoryList);
      instance.GetAllExpenseCategoryListCallId = expenseCategory;
      runEngine.sendMessage("Expense Category", expenseCategory);
    });

    then("Should load the Complex list", async () => {
      let complexList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      complexList.addData(getName(MessageEnum.RestAPIResponceDataMessage), complexList);
      complexList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), allComplexList);
      instance.GetComplexListCallId = complexList;
      runEngine.sendMessage("complex list", complexList);
    });

    then("Should load the Expense details when edit", async () => {
      instance.setState({ expenseId: "12" });
      AddEditExpenseMountWrapper.update();

      let expenseDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseDetails);
      expenseDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseDetailsByID);
      instance.GetExpenseDetailsCallId = expenseDetails;
      runEngine.sendMessage("Expense Details", expenseDetails);
    });
  });

  test("Expense Form", ({ given, when, then }) => {
    let AddEditExpenseMountWrapper: any;
    let instance: any;

    given("I am a User loading AddEditExpense", () => {
      AddEditExpenseMountWrapper = mount(<AddEditExpense {...addEditExpenseProps} />);
      instance = AddEditExpenseMountWrapper.instance();
    });

    when("ExpenseDetail loaded without error", () => {
      instance.setState({ expenseId: "12" });
      AddEditExpenseMountWrapper.update();
      instance.componentDidMount();

      expect(AddEditExpenseMountWrapper).toMatchSnapshot();
    });

    then("Should Add expense when submit", async () => {
      const formSpy = jest.spyOn(AddEditExpenseMountWrapper.find(Formik).at(0).props(), "onSubmit");
      AddEditExpenseMountWrapper.find(Formik)
        .at(0)
        .props()
        .onSubmit(
          {
            expenseDate: "",
            expenseAmount: "",
            issueTitle: "",
            category: "",
            building: "",
            unit: "",
            resolvedBy: "",
            summary: "",
          },
          { resetForm: () => jest.fn() }
        );
      expect(formSpy).toHaveBeenCalled();

      let addExpense = new Message(getName(MessageEnum.RestAPIResponceMessage));
      addExpense.addData(getName(MessageEnum.RestAPIResponceDataMessage), addExpense);
      addExpense.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseResponse);
      instance.AddExpenseCallId = addExpense;
      runEngine.sendMessage("Add Expense", addExpense);
    });

    then("Should Edit expense when submit", async () => {
      instance.setState({ expenseId: "12" });
      AddEditExpenseMountWrapper.update();

      const formSpy = jest.spyOn(AddEditExpenseMountWrapper.find(Formik).at(0).props(), "onSubmit");
      AddEditExpenseMountWrapper.find(Formik)
        .at(0)
        .props()
        .onSubmit(
          {
            expenseDate: "",
            expenseAmount: "",
            issueTitle: "",
            category: "",
            building: "",
            unit: "",
            resolvedBy: "",
            summary: "",
          },
          { resetForm: () => jest.fn() }
        );
      expect(formSpy).toHaveBeenCalled();

      let editExpense = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editExpense.addData(getName(MessageEnum.RestAPIResponceDataMessage), editExpense);
      editExpense.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), expenseResponse);
      instance.EditExpenseCallId = editExpense;
      runEngine.sendMessage("Edit Expense", editExpense);
    });

    then("Should load the unit list after building change", async () => {
      const selectSpy = jest.spyOn(AddEditExpenseMountWrapper.find(Select).at(2).props(), "onChange");
      AddEditExpenseMountWrapper.find(Select)
        .at(2)
        .props()
        .onChange({ target: { value: "12" } });
      expect(selectSpy).toHaveBeenCalled();

      let ownUnitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      ownUnitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), ownUnitList);
      ownUnitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitList);
      instance.GetUnitListCallId = ownUnitList;
      runEngine.sendMessage("Expense Details", ownUnitList);
    });

    then("Should load the building list after complex change", async () => {
      const selectSpy = jest.spyOn(AddEditExpenseMountWrapper.find(Select).at(1).props(), "onChange");
      AddEditExpenseMountWrapper.find(Select)
        .at(1)
        .props()
        .onChange({ target: { value: "12" } });
      expect(selectSpy).toHaveBeenCalled();

      let ownBuildingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      ownBuildingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), ownBuildingList);
      ownBuildingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingList);
      instance.GetBuildingListCallId = ownBuildingList;
      runEngine.sendMessage("Building List", ownBuildingList);
    });
  });
});
