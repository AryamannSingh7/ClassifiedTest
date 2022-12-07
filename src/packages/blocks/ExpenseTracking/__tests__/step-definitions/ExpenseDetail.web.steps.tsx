import { defineFeature, loadFeature } from "jest-cucumber";
import { configure, mount } from "enzyme";
import React from "react";
import ExpenseDetail from "../../src/ExpenseDetail.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import Adapter from "enzyme-adapter-react-16";
import { Dialog, IconButton } from "@material-ui/core";

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
  });
});
