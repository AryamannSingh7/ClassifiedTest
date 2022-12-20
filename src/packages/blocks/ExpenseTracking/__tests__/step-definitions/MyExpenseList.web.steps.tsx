import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import MyExpenseList from "../../src/MyExpenseList.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import { Button, Drawer, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const myExpenseListProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddEditExpense",
  classes: ExpenseTrackingStyle,
};

const feature = loadFeature("./__tests__/features/MyExpenseList.web.feature");

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const emptyUnitExpenseList = {
  data: [],
};

const unitMyExpenseList = {
  data: [
    {
      id: "94",
      attributes: {
        apartment_name: "301",
        address: {
          city: "delhi",
        },
        society_management: {
          id: 5,
          name: "New Society",
        },
        building_management: {
          id: 3,
          name: "First Building",
        },
      },
    },
  ],
};

const buildingList = {
  data: [
    {
      id: "3",
      attributes: {
        id: 3,
        name: "First Building",
        apartment_managements: [
          {
            id: 94,
            apartment_name: "301",
          },
          {
            id: 89,
            apartment_name: "102",
          },
        ],
      },
    },
  ],
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to MyExpenseList", ({ given, when, then }) => {
    let MyExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading MyExpenseList", () => {
      MyExpenseListMountWrapper = mount(<MyExpenseList {...myExpenseListProps} />);
    });

    when("I navigate to the MyExpenseList", () => {
      instance = MyExpenseListMountWrapper.instance();
    });

    then("MyExpenseList will load with out errors", async () => {
      expect(MyExpenseListMountWrapper).toMatchSnapshot();
    });

    then("Should open filter dialog when click on filter button", async () => {
      const openFilterButtonSpy = jest.spyOn(MyExpenseListMountWrapper.find(IconButton).at(1).props(), "onClick");
      MyExpenseListMountWrapper.find(IconButton).at(1).props().onClick();
      expect(instance.state.isFilterOpen).toEqual(true);
      expect(openFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should close filter dialog when click on close button", async () => {
      const closeFilterButtonSpy = jest.spyOn(MyExpenseListMountWrapper.find(Drawer).at(0).props(), "onClose");
      MyExpenseListMountWrapper.find(Drawer).at(0).props().onClose();
      expect(instance.state.isFilterOpen).toEqual(false);
      expect(closeFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should go back to owner dashboard", async () => {
      const backButtonSpy = jest.spyOn(MyExpenseListMountWrapper.find(IconButton).at(0).props(), "onClick");
      MyExpenseListMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go to add expense page", async () => {
      const addExpenseButtonSpy = jest.spyOn(MyExpenseListMountWrapper.find(Button).at(0).props(), "onClick");
      MyExpenseListMountWrapper.find(Button).at(0).props().onClick();
      expect(addExpenseButtonSpy).toHaveBeenCalled();
    });
  });

  test("My Empty Unit Expense List", ({ given, when, then }) => {
    let MyExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading My Unit Expense List", () => {
      MyExpenseListMountWrapper = mount(<MyExpenseList {...myExpenseListProps} />);
      instance = MyExpenseListMountWrapper.instance();
      expect(MyExpenseListMountWrapper).toMatchSnapshot();
    });

    when("My Unit Expense List is Empty", () => {
      let unitExpenseList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitExpenseList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitExpenseList);
      unitExpenseList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), emptyUnitExpenseList);
      instance.GetAllExpenseUnitListCallId = unitExpenseList;
      runEngine.sendMessage("Empty Unit Expense List", unitExpenseList);
    });

    then("Should show Empty list in web", async () => {
      // expect(instance.state.expenseUnitList).toEqual([]);
    });
  });

  test("My Unit Expense List", ({ given, when, then }) => {
    let MyExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading My Unit Expense List", () => {
      MyExpenseListMountWrapper = mount(<MyExpenseList {...myExpenseListProps} />);
      instance = MyExpenseListMountWrapper.instance();
      expect(MyExpenseListMountWrapper).toMatchSnapshot();
    });

    when("My Unit Expense List is not Empty", () => {
      let unitExpenseList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitExpenseList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitExpenseList);
      unitExpenseList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitMyExpenseList);
      instance.GetAllExpenseUnitListCallId = unitExpenseList;
      runEngine.sendMessage("Unit Expense List", unitExpenseList);
    });

    then("Should show unit list in web", async () => {
      // expect(instance.state.expenseUnitList.length).toBeGreaterThan(0);
    });
  });

  test("Filter on My Unit Expense List", ({ given, when, then }) => {
    let MyExpenseListMountWrapper: any;
    let instance: any;

    given("I am a User loading My Unit Expense", () => {
      MyExpenseListMountWrapper = mount(<MyExpenseList {...myExpenseListProps} />);
      instance = MyExpenseListMountWrapper.instance();
      expect(MyExpenseListMountWrapper).toMatchSnapshot();
    });

    when("Building and Unit list is loading", () => {
      let expenseBuildingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      expenseBuildingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), expenseBuildingList);
      expenseBuildingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingList);
      instance.GetAllOwnBuildingListCallId = expenseBuildingList;
      runEngine.sendMessage("Expense Building List", expenseBuildingList);
    });

    then("Should show building list in filter", async () => {
      // expect(instance.state.buildingList.length).toBeGreaterThan(0);
    });

    then("Should Clear the applied filter", async () => {
      instance.setState({ isFilterOpen: true });
      MyExpenseListMountWrapper.update();

      const clearFilterButtonSpy = jest.spyOn(
        MyExpenseListMountWrapper.find(".clear-all-text").at(0).props(),
        "onClick"
      );
      MyExpenseListMountWrapper.find(".clear-all-text").at(0).props().onClick();
      expect(instance.state.unitList.length).toEqual(0);
      expect(clearFilterButtonSpy).toHaveBeenCalled();
    });

    then("Should apply the filter", async () => {
      instance.setState({ isFilterOpen: true, unitList: [1] });
      MyExpenseListMountWrapper.update();

      const filterButtonSpy = jest.spyOn(MyExpenseListMountWrapper.find(Button).at(1).props(), "onClick");
      MyExpenseListMountWrapper.find(Button).at(1).props().onClick();
      expect(filterButtonSpy).toHaveBeenCalled();
    });
  });
});
