import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { NotificationStyle } from "../../src/NotificationStyle.web";
import { BrowserRouter } from "react-router-dom";
import OwnerNotificationWeb from "../../src/OwnerNotification.web";
import { Button, Checkbox, Dialog, IconButton } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { notificationMockData } from "../../../../components/src/TestCase/NotificationMockData.web";

const OwnerNotificationProps = componentProps("OwnerNotification", NotificationStyle);

const feature = loadFeature("./__tests__/features/OwnerNotification.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to OwnerNotification", ({ given, when, then }) => {
    let OwnerNotificationMountWrapper: any;
    let instance: any;

    given("I am a User loading OwnerNotification", () => {
      OwnerNotificationMountWrapper = mount(<OwnerNotificationWeb {...OwnerNotificationProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the OwnerNotification", () => {
      instance = OwnerNotificationMountWrapper.instance();
    });

    then("OwnerNotification will load with out errors", async () => {
      expect(OwnerNotificationMountWrapper).toMatchSnapshot();
    });

    then("Should load all notification", async () => {
      let notificationList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      notificationList.addData(getName(MessageEnum.RestAPIResponceDataMessage), notificationList);
      notificationList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [notificationMockData] });
      instance.GetNotificationListCallId = notificationList;
      runEngine.sendMessage("Notification", notificationList);
    });

    then("Should go back to dashboard", async () => {
      const closeButtonSpy = jest.spyOn(OwnerNotificationMountWrapper.find(IconButton).at(0).props(), "onClick");
      OwnerNotificationMountWrapper.find(IconButton).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should handle the delete notification modal", async () => {
      instance.setState({ isDeleteOpen: true });
      OwnerNotificationMountWrapper.update();

      const modalSpy = jest.spyOn(OwnerNotificationMountWrapper.find("img").at(0).props(), "onClick");
      OwnerNotificationMountWrapper.find("img").at(0).props().onClick();
      expect(modalSpy).toHaveBeenCalled();
    });

    then("Should handle the delete notification", async () => {
      instance.setState({ isDeleteOpen: false });
      OwnerNotificationMountWrapper.update();

      const deleteSpy = jest.spyOn(OwnerNotificationMountWrapper.find("img").at(1).props(), "onClick");
      OwnerNotificationMountWrapper.find("img").at(1).props().onClick();
      expect(deleteSpy).toHaveBeenCalled();
    });

    then("Should close delete notification modal when click on outside modal", async () => {
      instance.setState({ isDeleteNotificationModalOpen: true });
      OwnerNotificationMountWrapper.update();

      const closeModalSpy = jest.spyOn(OwnerNotificationMountWrapper.find(".delete-notification-owner-modal").at(0).props(), "onClose");
      OwnerNotificationMountWrapper.find(".delete-notification-owner-modal").at(0).props().onClose();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("Should close delete notification modal when click on cancel button", async () => {
      instance.setState({ isDeleteNotificationModalOpen: true });
      OwnerNotificationMountWrapper.update();

      const closeModalSpy = jest.spyOn(OwnerNotificationMountWrapper.find(".delete-notification-owner-modal").find(Button).at(1).props(), "onClick");
      OwnerNotificationMountWrapper.find(".delete-notification-owner-modal").find(Button).at(1).props().onClick();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("Should select all notification for delete", async () => {
      instance.setState({ isDeleteOpen: true });
      OwnerNotificationMountWrapper.update();

      const selectNotificationSpy = jest.spyOn(OwnerNotificationMountWrapper.find(".select-text").at(0).props(), "onClick");
      OwnerNotificationMountWrapper.find(".select-text").at(0).props().onClick();
      expect(selectNotificationSpy).toHaveBeenCalled();
    });

    then("Should delete the notification", async () => {
      instance.setState({ isDeleteNotificationModalOpen: true });
      OwnerNotificationMountWrapper.update();

      const deleteNotificationSpy = jest.spyOn(OwnerNotificationMountWrapper.find(".delete-notification-owner-modal").find(Button).at(0).props(), "onClick");
      OwnerNotificationMountWrapper.find(".delete-notification-owner-modal").find(Button).at(0).props().onClick();
      expect(deleteNotificationSpy).toHaveBeenCalled();

      let deleteNotification = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteNotification.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteNotification);
      deleteNotification.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { message: "deleted" });
      instance.DeleteNotificationCallId = deleteNotification;
      runEngine.sendMessage("Delete Notification", deleteNotification);
    });

    then("Should able to select notification", async () => {
      instance.setState({ isDeleteOpen: true, notificationList: [notificationMockData] });
      OwnerNotificationMountWrapper.update();

      const deleteNotificationSpy = jest.spyOn(OwnerNotificationMountWrapper.find(Checkbox).at(0).props(), "onChange");
      OwnerNotificationMountWrapper.find(Checkbox).at(0).props().onChange({ target: { checked: false } });
      expect(deleteNotificationSpy).toHaveBeenCalled();
    });
  });
});
