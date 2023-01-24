import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import RentHistory from "../../src/RentHistory.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Button, Checkbox, Drawer, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { RentHistoryMockData } from "../../../../components/src/TestCase/MyUnitMockData.web";
import { Formik } from "formik";

const RentHistoryProps = componentProps("RentHistory", MyUnitStyle);

const feature = loadFeature("./__tests__/features/RentHistory.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RentHistory", ({ given, when, then }) => {
    let RentHistoryMountWrapper: any;
    let instance: any;

    given("I am a User loading RentHistory", () => {
      RentHistoryMountWrapper = mount(<RentHistory {...RentHistoryProps} />);
    });

    when("I navigate to the RentHistory", () => {
      instance = RentHistoryMountWrapper.instance();
    });

    then("RentHistory will load with out errors", async () => {
      expect(RentHistoryMountWrapper).toMatchSnapshot();
    });

    then("Should go back to unit details page", async () => {
      const backButtonSpy = jest.spyOn(RentHistoryMountWrapper.find(IconButton).at(0).props(), "onClick");
      RentHistoryMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should open for select to delete histories", async () => {
      instance.setState({ isDeleteOpen: false });
      RentHistoryMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(RentHistoryMountWrapper.find("img").at(0).props(), "onClick");
      RentHistoryMountWrapper.find("img").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();
    });

    then("Should select all the rent histories", async () => {
      instance.setState({ isDeleteOpen: true, rentHistory: [RentHistoryMockData] });
      RentHistoryMountWrapper.update();

      const selectAllSpy = jest.spyOn(RentHistoryMountWrapper.find("p").at(0).props(), "onClick");
      RentHistoryMountWrapper.find("p").at(0).props().onClick();
      expect(selectAllSpy).toHaveBeenCalled();
    });

    then("Should delete the selected rent histories", async () => {
      instance.setState({ isDeleteOpen: true });
      RentHistoryMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(RentHistoryMountWrapper.find("img").at(0).props(), "onClick");
      RentHistoryMountWrapper.find("img").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteRentHistory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteRentHistory.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteRentHistory);
      deleteRentHistory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { message: "Done" });
      instance.DeleteRentHistoriesCallId = deleteRentHistory;
      runEngine.sendMessage("Delete Rent History", deleteRentHistory);
    });

    then("Should add another history to the unit", async () => {
      instance.setState({ isDeleteOpen: false });
      RentHistoryMountWrapper.update();

      const addButtonSpy = jest.spyOn(RentHistoryMountWrapper.find(Button).at(0).props(), "onClick");
      RentHistoryMountWrapper.find(Button).at(0).props().onClick();
      expect(addButtonSpy).toHaveBeenCalled();
    });

    then("Should close the add rent history modal", async () => {
      const closeButtonSpy = jest.spyOn(RentHistoryMountWrapper.find(Drawer).at(0).props(), "onClose");
      RentHistoryMountWrapper.find(Drawer).at(0).props().onClose();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should load rent histories list", async () => {
      let rentHistory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      rentHistory.addData(getName(MessageEnum.RestAPIResponceDataMessage), rentHistory);
      rentHistory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [RentHistoryMockData, RentHistoryMockData] });
      instance.GetRentHistoryCallId = rentHistory;
      runEngine.sendMessage("Rent History", rentHistory);
    });

    then("Should select the check box and history id add into selectedRentHistory", async () => {
      instance.setState({ isDeleteOpen: true });
      RentHistoryMountWrapper.update();

      const checkboxSpy = jest.spyOn(RentHistoryMountWrapper.find(Checkbox).at(0).props(), "onChange");
      RentHistoryMountWrapper.find(Checkbox).at(0).props().onChange({
        target: {
          checked: true
        }
      });
      expect(checkboxSpy).toHaveBeenCalled();
    });

    then("Should unselect the check box and history id remove into selectedRentHistory", async () => {
      instance.setState({ isDeleteOpen: true });
      RentHistoryMountWrapper.update();

      const checkboxSpy = jest.spyOn(RentHistoryMountWrapper.find(Checkbox).at(0).props(), "onChange");
      RentHistoryMountWrapper.find(Checkbox).at(0).props().onChange({
        target: {
          checked: false
        }
      });
      expect(checkboxSpy).toHaveBeenCalled();
    });

    then("Should submit and add the rent history to list", async () => {
      instance.setState({ isRentHistoryModalOpen: true });
      RentHistoryMountWrapper.update();

      const addHistorySpy = jest.spyOn(RentHistoryMountWrapper.find(Formik).at(0).props(), "onSubmit");
      RentHistoryMountWrapper.find(Formik).at(0).props().onSubmit(
        {
          startDate: "",
          endDate: "",
          rentAmount: "",
          receivedAmount: "",
          tenantName: "",
        },
        { resetForm: () => jest.fn() });
      expect(addHistorySpy).toHaveBeenCalled();

      let addRentHistory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      addRentHistory.addData(getName(MessageEnum.RestAPIResponceDataMessage), addRentHistory);
      addRentHistory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: RentHistoryMockData });
      instance.CreateRentHistoryCallId = addRentHistory;
      runEngine.sendMessage("Add Rent History", addRentHistory);
    });
  });
});
