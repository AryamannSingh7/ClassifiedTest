import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import EditUnit from "../../src/EditUnit.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Button, Drawer, IconButton } from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { complexDetailsMockData } from "../../../../components/src/TestCase/PropertyManagerMockData.web";
import { PendingUnitMockData, RentHistoryMockData } from "../../../../components/src/TestCase/MyUnitMockData.web";
import { Formik } from "formik";

const EditUnitProps = componentProps("EditUnit", MyUnitStyle);

const feature = loadFeature("./__tests__/features/EditUnit.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to EditUnit", ({ given, when, then }) => {
    let EditUnitMountWrapper: any;
    let instance: any;

    given("I am a User loading EditUnit", () => {
      EditUnitMountWrapper = mount(<EditUnit {...EditUnitProps} />);
    });

    when("I navigate to the EditUnit", () => {
      instance = EditUnitMountWrapper.instance();
    });

    then("EditUnit will load with out errors", async () => {
      expect(EditUnitMountWrapper).toMatchSnapshot();
    });

    then("Should go back to unit details page", async () => {
      const backButtonSpy = jest.spyOn(EditUnitMountWrapper.find(IconButton).at(0).props(), "onClick");
      EditUnitMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should load complex details", async () => {
      let complexDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      complexDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), complexDetails);
      complexDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), complexDetailsMockData);
      instance.GetComplexDetailsCallId = complexDetails;
      runEngine.sendMessage("Complex Details", complexDetails);
    });

    then("Should load unit details", async () => {
      let unitDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitDetails);
      unitDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: PendingUnitMockData });
      instance.GetEditUnitDetailsCallId = unitDetails;
      runEngine.sendMessage("Unit Details", unitDetails);
    });

    then("Should open add rent history modal", async () => {
      const openModalSpy = jest.spyOn(EditUnitMountWrapper.find(Button).at(0).props(), "onClick");
      EditUnitMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalSpy).toHaveBeenCalled();
    });

    then("Should close add rent history modal", async () => {
      const openModalSpy = jest.spyOn(EditUnitMountWrapper.find(Drawer).at(0).props(), "onClose");
      EditUnitMountWrapper.find(Drawer).at(0).props().onClose();
      expect(openModalSpy).toHaveBeenCalled();
    });

    then("Should add the rent history to the unit", async () => {
      instance.setState({ isRentHistoryModalOpen: true });
      EditUnitMountWrapper.update();

      const openModalSpy = jest.spyOn(EditUnitMountWrapper.find(Formik).at(1).props(), "onSubmit");
      EditUnitMountWrapper.find(Formik).at(1).props().onSubmit(
        {
          startDate: "",
          endDate: "",
          rentAmount: "",
          receivedAmount: "",
          tenantName: "",
        },
        { resetForm: () => jest.fn() });
      expect(openModalSpy).toHaveBeenCalled();
    });

    then("Should delete the rent history", async () => {
      instance.setState({ rentHistoryList: [RentHistoryMockData] });
      EditUnitMountWrapper.update();

      const RentHistoryBoxWrapper = EditUnitMountWrapper.find(".rent-history-box").at(0);

      const deleteButtonSpy = jest.spyOn(RentHistoryBoxWrapper.find("img").at(0).props(), "onClick");
      RentHistoryBoxWrapper.find("img").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();
    });

    then("Should edit the my unit", async () => {
      const unitFormSpy = jest.spyOn(EditUnitMountWrapper.find(Formik).at(0).props(), "onSubmit");
      EditUnitMountWrapper.find(Formik).at(0).props().onSubmit(
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

      let editMyUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editMyUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), editMyUnit);
      editMyUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: PendingUnitMockData });
      instance.EditRegisterUnitCallId = editMyUnit;
      runEngine.sendMessage("Edit My Unit", editMyUnit);
    });
  });
});
