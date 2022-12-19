import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import MyUnitList from "../../src/MyUnitList.web";
import { MyUnitStyle } from "../../src/MyUnitStyle.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import { PendingUnitMockData } from "../../../../components/src/TestCase/MyUnitMockData.web";
import { Button, Dialog } from "@material-ui/core";

const MyUnitListProps = componentProps("MyUnitList", MyUnitStyle);

const feature = loadFeature("./__tests__/features/MyUnitList.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to MyUnitList", ({ given, when, then }) => {
    let MyUnitListMountWrapper: any;
    let instance: any;

    given("I am a User loading MyUnitList", () => {
      MyUnitListMountWrapper = mount(<MyUnitList {...MyUnitListProps} />);
    });

    when("I navigate to the MyUnitList", () => {
      instance = MyUnitListMountWrapper.instance();
    });

    then("MyUnitList will load with out errors", async () => {
      expect(MyUnitListMountWrapper).toMatchSnapshot();
    });

    then("Should load unit list", async () => {
      let unitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitList);
      unitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [PendingUnitMockData, PendingUnitMockData] });
      instance.GetMyUnitListCallId = unitList;
      runEngine.sendMessage("My Unit List", unitList);
    });

    then("Should open the delete modal", async () => {
      instance.handleOpenDeleteUnitModal("12");
      expect(instance.state.isDeleteUnitModalOpen).toEqual(true);
    });

    then("Should Close the delete modal when click outside the modal", async () => {
      instance.setState({ isDeleteUnitModalOpen: true });
      MyUnitListMountWrapper.update();

      const dialogSpy = jest.spyOn(MyUnitListMountWrapper.find(Dialog).at(0).props(), "onClose");
      MyUnitListMountWrapper.find(Dialog).at(0).props().onClose();
      expect(dialogSpy).toHaveBeenCalled();
    });

    then("Should Close the delete modal when click close button", async () => {
      instance.setState({ isDeleteUnitModalOpen: true });
      MyUnitListMountWrapper.update();

      const closeButtonSpy = jest.spyOn(MyUnitListMountWrapper.find(Button).at(8).props(), "onClick");
      MyUnitListMountWrapper.find(Button).at(8).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should delete the unit", async () => {
      instance.setState({ isDeleteUnitModalOpen: true });
      MyUnitListMountWrapper.update();

      const closeButtonSpy = jest.spyOn(MyUnitListMountWrapper.find(Button).at(7).props(), "onClick");
      MyUnitListMountWrapper.find(Button).at(7).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();

      let deleteUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteUnit);
      deleteUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, message: "Done" });
      instance.DeLinkUnitCallId = deleteUnit;
      runEngine.sendMessage("Delete My Unit", deleteUnit);
    });

    then("Should delete the unit pending request", async () => {
      let deleteUnit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteUnit.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteUnit);
      deleteUnit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, message: "Done" });
      instance.DeleteRequestUnitCallId = deleteUnit;
      runEngine.sendMessage("Delete My Unit", deleteUnit);
    });
  });
});
