import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import UnitDetails from "../../src/UnitDetails.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { PendingUnitMockData, RentHistoryMockData } from "../../../../components/src/TestCase/MyUnitMockData.web";

const UnitDetailsProps = componentProps("UnitDetails", MyUnitStyle);

const feature = loadFeature("./__tests__/features/UnitDetails.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to UnitDetails", ({ given, when, then }) => {
    let UnitDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading UnitDetails", () => {
      UnitDetailsMountWrapper = mount(<UnitDetails {...UnitDetailsProps} />);
    });

    when("I navigate to the UnitDetails", () => {
      instance = UnitDetailsMountWrapper.instance();
    });

    then("UnitDetails will load with out errors", async () => {
      expect(UnitDetailsMountWrapper).toMatchSnapshot();
    });

    then("Should open the delete modal when unit is not in pending", async () => {
      const dialogSpy = jest.spyOn(UnitDetailsMountWrapper.find("img").at(0).props(), "onClick");
      UnitDetailsMountWrapper.find("img").at(0).props().onClick();
      expect(dialogSpy).toHaveBeenCalled();
      expect(instance.state.isDeleteUnitModalOpen).toEqual(true);
    });

    then("Should Close the delete modal when click outside the modal", async () => {
      instance.setState({ isDeleteUnitModalOpen: true });
      UnitDetailsMountWrapper.update();

      const dialogSpy = jest.spyOn(UnitDetailsMountWrapper.find(Dialog).at(0).props(), "onClose");
      UnitDetailsMountWrapper.find(Dialog).at(0).props().onClose();
      expect(dialogSpy).toHaveBeenCalled();
    });

    then("Should Close the delete modal when click close button", async () => {
      const DialogWrapper = UnitDetailsMountWrapper.find(Dialog).at(0);

      const closeButtonSpy = jest.spyOn(DialogWrapper.find(Button).at(0).props(), "onClick");
      DialogWrapper.find(Button).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should delete the unit", async () => {
      const DialogWrapper = UnitDetailsMountWrapper.find(Dialog).at(0);

      const closeButtonSpy = jest.spyOn(DialogWrapper.find(Button).at(1).props(), "onClick");
      DialogWrapper.find(Button).at(1).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();

      let deleteUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteUnit);
      deleteUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, message: "Done" });
      instance.DeLinkUnitCallId = deleteUnit;
      runEngine.sendMessage("Delete My Unit", deleteUnit);
    });

    then("Should go back to unit list when unit is not in pending", async () => {
      instance.setState({ unitDetails: { isPendingRequest: true } });
      UnitDetailsMountWrapper.update();

      const backButtonSpy = jest.spyOn(UnitDetailsMountWrapper.find(IconButton).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should go back to unit list when click on okay button", async () => {
      instance.setState({ unitDetails: { isPendingRequest: true } });
      UnitDetailsMountWrapper.update();

      const backButtonSpy = jest.spyOn(UnitDetailsMountWrapper.find(Button).at(1).props(), "onClick");
      UnitDetailsMountWrapper.find(Button).at(1).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should delete pending unit request", async () => {
      instance.setState({ unitDetails: { isPendingRequest: true } });
      UnitDetailsMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(UnitDetailsMountWrapper.find(Button).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(Button).at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteUnitRequest = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteUnitRequest.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteUnitRequest);
      deleteUnitRequest.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, message: "Done" });
      instance.DeleteRequestUnitCallId = deleteUnitRequest;
      runEngine.sendMessage("Delete My Unit Request", deleteUnitRequest);
    });

    then("Should load unit details", async () => {
      let unitDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitDetails);
      unitDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: PendingUnitMockData });
      instance.GetMyUnitDetailsCallId = unitDetails;
      runEngine.sendMessage("Unit Details", unitDetails);
    });

    then("Should load rent history", async () => {
      let rentHistory = new Message(getName(MessageEnum.RestAPIResponceMessage));
      rentHistory.addData(getName(MessageEnum.RestAPIResponceDataMessage), rentHistory);
      rentHistory.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [RentHistoryMockData, RentHistoryMockData] });
      instance.GetRentHistoryCallId = rentHistory;
      runEngine.sendMessage("Rent History", rentHistory);
    });

    then("Should go to rent history page", async () => {
      instance.setState({ rentHistory: [RentHistoryMockData, RentHistoryMockData] });
      UnitDetailsMountWrapper.update();

      const rentButtonSpy = jest.spyOn(UnitDetailsMountWrapper.find(".view-all-text").at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".view-all-text").at(0).props().onClick();
      expect(rentButtonSpy).toHaveBeenCalled();
    });
  });
});
