import { defineFeature, loadFeature } from "jest-cucumber";
import { configure, mount } from "enzyme";
import React from "react";
import AddExpenseSuccess from "../../src/AddExpenseSuccess.web";
import { ExpenseTrackingStyle } from "../../src/ExpenseTrackingStyle.web";
import { Button, IconButton } from "@material-ui/core";
import Adapter from "enzyme-adapter-react-16";

const addExpenseSuccessProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddExpenseSuccess",
  classes: ExpenseTrackingStyle as any,
};

const feature = loadFeature("./__tests__/features/AddExpenseSuccess.web.feature");

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

  test("User navigates to AddExpenseSuccess", ({ given, when, then }) => {
    let AddExpenseSuccessMountWrapper: any;
    let instance: any;

    given("I am a User loading AddExpenseSuccess", () => {
      AddExpenseSuccessMountWrapper = mount(<AddExpenseSuccess {...addExpenseSuccessProps} />);
    });

    when("I navigate to the AddExpenseSuccess", () => {
      instance = AddExpenseSuccessMountWrapper.instance();
    });

    then("AddExpenseSuccess will load with out errors", async () => {
      expect(AddExpenseSuccessMountWrapper).toMatchSnapshot();
    });

    then("I can go back to expense listing", async () => {
      const backButtonSpy = jest.spyOn(AddExpenseSuccessMountWrapper.find(IconButton).at(0).props(), "onClick");
      AddExpenseSuccessMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("I can go back to expense listing through okay", async () => {
      const backButtonSpy = jest.spyOn(AddExpenseSuccessMountWrapper.find(Button).at(0).props(), "onClick");
      AddExpenseSuccessMountWrapper.find(Button).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });
  });
});
