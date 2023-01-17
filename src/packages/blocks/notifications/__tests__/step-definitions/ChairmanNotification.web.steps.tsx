import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import ChairmanNotification from "../../src/ChairmanNotification.web";
import { NotificationStyle } from "../../src/NotificationStyle.web";
import { BrowserRouter } from "react-router-dom";
import { runEngine } from "../../../../framework/src/RunEngine";
import { notificationMockData } from "../../../../components/src/TestCase/NotificationMockData.web";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { Tab } from "@material-ui/core";

const ChairmanNotificationProps = componentProps("ChairmanNotification", NotificationStyle);

const feature = loadFeature("./__tests__/features/ChairmanNotification.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ChairmanNotification", ({ given, when, then }) => {
    let ChairmanNotificationMountWrapper: any;
    let instance: any;

    given("I am a User loading ChairmanNotification", () => {
      ChairmanNotificationMountWrapper = mount(<ChairmanNotification {...ChairmanNotificationProps} />, {
        wrappingComponent: BrowserRouter,
      });
    });

    when("I navigate to the ChairmanNotification", () => {
      instance = ChairmanNotificationMountWrapper.instance();
    });

    then("ChairmanNotification will load with out errors", async () => {
      expect(ChairmanNotificationMountWrapper).toMatchSnapshot();
    });

    then("Should load task notification", async () => {
      const taskTabSpy = jest.spyOn(ChairmanNotificationMountWrapper.find(Tab).at(0).props(), "onClick");
      ChairmanNotificationMountWrapper.find(Tab).at(0).props().onClick();
      expect(taskTabSpy).toHaveBeenCalled();

      let taskNotificationList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      taskNotificationList.addData(getName(MessageEnum.RestAPIResponceDataMessage), taskNotificationList);
      taskNotificationList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [notificationMockData] });
      instance.GetChairmanNotificationListCallId = taskNotificationList;
      runEngine.sendMessage("Notification", taskNotificationList);
    });

    then("Should load message notification", async () => {
      const messageTabSpy = jest.spyOn(ChairmanNotificationMountWrapper.find(Tab).at(1).props(), "onClick");
      ChairmanNotificationMountWrapper.find(Tab).at(1).props().onClick();
      expect(messageTabSpy).toHaveBeenCalled();

    });

    then("Should delete the single notification", async () => {
      instance.deleteSingleNotification(1);

      let deleteSingleNotification = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteSingleNotification.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteSingleNotification);
      deleteSingleNotification.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [notificationMockData] });
      instance.DeleteNotificationCallId = deleteSingleNotification;
      runEngine.sendMessage("Notification", deleteSingleNotification);
    });

    then("Should update read un-read status of notification", async () => {
      instance.updateReadNotificationStatus(1, true);

      let statusNotification = new Message(getName(MessageEnum.RestAPIResponceMessage));
      statusNotification.addData(getName(MessageEnum.RestAPIResponceDataMessage), statusNotification);
      statusNotification.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [notificationMockData] });
      instance.UpdateReadStatusCallId = statusNotification;
      runEngine.sendMessage("Notification", statusNotification);
    });
  });
});
