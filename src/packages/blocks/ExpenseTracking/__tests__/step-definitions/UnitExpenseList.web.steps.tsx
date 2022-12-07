import { defineFeature, loadFeature } from "jest-cucumber";
import { configure, mount } from "enzyme";
import React from "react";
import UnitExpenseList from "../../src/UnitExpenseList.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import Adapter from "enzyme-adapter-react-16";
import { Drawer, IconButton } from "@material-ui/core";

const unitExpenseListProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddEditExpense",
  classes: ExpenseTrackingStyle,
};

const feature = loadFeature("./__tests__/features/UnitExpenseList.web.feature");

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

    then("Should open accordion open and close", async () => {
    });
  });
});
