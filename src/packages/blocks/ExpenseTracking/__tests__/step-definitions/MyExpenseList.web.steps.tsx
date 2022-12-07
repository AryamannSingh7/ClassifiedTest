import { defineFeature, loadFeature } from "jest-cucumber";
import { configure, mount } from "enzyme";
import React from "react";
import MyExpenseList from "../../src/MyExpenseList.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import Adapter from "enzyme-adapter-react-16";
import { Drawer, IconButton } from "@material-ui/core";

const myExpenseListProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddEditExpense",
  classes: ExpenseTrackingStyle as any,
};

const feature = loadFeature("./__tests__/features/MyExpenseList.web.feature");

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

    then("Should open accordion open and close", async () => {
    });
  });
});
