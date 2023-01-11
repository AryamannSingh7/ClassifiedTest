import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import RegisterUnit from "../../src/RegisterUnit.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import {
  buildingListMockData,
  floorListMockData,
  unitListMockData,
  RentHistoryMockData,
  PendingUnitMockData
} from "../../../../components/src/TestCase/MyUnitMockData.web";
import { Button, Drawer, Select } from "@material-ui/core";
import { Formik } from "formik";

const RegisterUnitProps = componentProps("RegisterUnit", MyUnitStyle);

const feature = loadFeature("./__tests__/features/RegisterUnit.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RegisterUnit", ({ given, when, then }) => {
    let RegisterUnitMountWrapper: any;
    let instance: any;

    given("I am a User loading RegisterUnit", () => {
      RegisterUnitMountWrapper = mount(<RegisterUnit {...RegisterUnitProps} />);
    });

    when("I navigate to the RegisterUnit", () => {
      instance = RegisterUnitMountWrapper.instance();
    });

    then("RegisterUnit will load with out errors", async () => {
      expect(RegisterUnitMountWrapper).toMatchSnapshot();
    });

    then("Should load the building list", async () => {
      let buildingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingList);
      buildingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingListMockData);
      instance.GetBuildingListCallId = buildingList;
      runEngine.sendMessage("Building List", buildingList);
    });

    then("Should load the floor list after building selected", async () => {
      const buildingSpy = jest.spyOn(RegisterUnitMountWrapper.find(Select).at(0).props(), "onChange");
      RegisterUnitMountWrapper.find(Select).at(0).props().onChange({
        target: {
          value: "12"
        }
      });
      expect(buildingSpy).toHaveBeenCalled();

      let floorList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      floorList.addData(getName(MessageEnum.RestAPIResponceDataMessage), floorList);
      floorList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), floorListMockData);
      instance.GetFloorListCallId = floorList;
      runEngine.sendMessage("Floor List", floorList);
    });

    then("Should load the unit list after floor selected", async () => {
      const floorSpy = jest.spyOn(RegisterUnitMountWrapper.find(Select).at(1).props(), "onChange");
      RegisterUnitMountWrapper.find(Select).at(1).props().onChange({
        target: {
          value: "12"
        }
      });
      expect(floorSpy).toHaveBeenCalled();

      let unitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitList);
      unitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitListMockData);
      instance.GetUnitListCallId = unitList;
      runEngine.sendMessage("Unit List", unitList);
    });

    then("Should load the rent history list after unit selected", async () => {
      const unitSpy = jest.spyOn(RegisterUnitMountWrapper.find(Select).at(2).props(), "onChange");
      RegisterUnitMountWrapper.find(Select).at(2).props().onChange({
        target: {
          value: "12"
        }
      });
      expect(unitSpy).toHaveBeenCalled();

      let rentHistoryList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      rentHistoryList.addData(getName(MessageEnum.RestAPIResponceDataMessage), rentHistoryList);
      rentHistoryList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [RentHistoryMockData] });
      instance.GetRentHistoryListCallId = rentHistoryList;
      runEngine.sendMessage("Rent History List", rentHistoryList);
    });

    then("Should open add rent history modal", async () => {
      const openModalSpy = jest.spyOn(RegisterUnitMountWrapper.find(Button).at(0).props(), "onClick");
      RegisterUnitMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalSpy).toHaveBeenCalled();
    });

    then("Should close add rent history modal", async () => {
      const openModalSpy = jest.spyOn(RegisterUnitMountWrapper.find(Drawer).at(0).props(), "onClose");
      RegisterUnitMountWrapper.find(Drawer).at(0).props().onClose();
      expect(openModalSpy).toHaveBeenCalled();
    });

    then("Should add the rent history to the unit", async () => {
      instance.setState({ isRentHistoryModalOpen: true });
      RegisterUnitMountWrapper.update();

      const openModalSpy = jest.spyOn(RegisterUnitMountWrapper.find(Formik).at(1).props(), "onSubmit");
      RegisterUnitMountWrapper.find(Formik).at(1).props().onSubmit(
        {
          startDate: "",
          endDate: "",
          rentAmount: "",
          receivedAmount: "",
          tenantName: "",
        },
        { resetForm: () => jest.fn() });
      expect(openModalSpy).toHaveBeenCalled();

      let addRentHistory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      addRentHistory.addData(getName(MessageEnum.RestAPIResponceDataMessage), addRentHistory);
      addRentHistory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: RentHistoryMockData });
      instance.CreateRentHistoryCallId = addRentHistory;
      runEngine.sendMessage("Add Rent History", addRentHistory);
    });

    then("Should delete the rent history", async () => {
      instance.setState({ rentHistoryList: [RentHistoryMockData] });
      RegisterUnitMountWrapper.update();

      const RentHistoryBoxWrapper = RegisterUnitMountWrapper.find(".rent-history-box").at(0);

      const deleteButtonSpy = jest.spyOn(RentHistoryBoxWrapper.find("img").at(0).props(), "onClick");
      RentHistoryBoxWrapper.find("img").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteRentHistory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteRentHistory.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteRentHistory);
      deleteRentHistory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { message: "Done" });
      instance.DeleteRentHistoriesCallId = deleteRentHistory;
      runEngine.sendMessage("Delete Rent History", deleteRentHistory);
    });

    then("Should register the my unit", async () => {
      const unitFormSpy = jest.spyOn(RegisterUnitMountWrapper.find(Formik).at(0).props(), "onSubmit");
      RegisterUnitMountWrapper.find(Formik).at(0).props().onSubmit(
        {
          country: "",
          region: "",
          city: "",
          complex: "",
          buildingId: "",
          floorId: "",
          unitId: "",
          size: "",
          config: "",
          price: "",
          date: "",
          type: "Rented",
          income: "",
          valuation: "",
        },
        { resetForm: () => jest.fn() }
      );
      expect(unitFormSpy).toHaveBeenCalled();

      let addMyUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      addMyUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), addMyUnit);
      addMyUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: PendingUnitMockData });
      instance.RegisterUnitCallId = addMyUnit;
      runEngine.sendMessage("Add My Unit", addMyUnit);
    });
  });
});
