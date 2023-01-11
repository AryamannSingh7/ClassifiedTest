import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { paramComponentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../../Notes/src/DocumentReportStyle.web";
import PersonalDocumentListWeb from "../../src/PersonalDocumentList.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { documentMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";
import { Button, Dialog, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const PersonalDocumentListProps = paramComponentProps("PersonalDocumentList", DocumentReportStyleWeb, "rent-contract");

const feature = loadFeature("./__tests__/features/PersonalDocumentList.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PersonalDocumentList", ({ given, when, then }) => {
    let PersonalDocumentListMountWrapper: any;
    let instance: any;

    given("I am a User loading PersonalDocumentList", () => {
      PersonalDocumentListMountWrapper = mount(<PersonalDocumentListWeb {...PersonalDocumentListProps} />);
    });

    when("I navigate to the PersonalDocumentList", () => {
      instance = PersonalDocumentListMountWrapper.instance();
    });

    then("PersonalDocumentList will load with out errors", async () => {
      expect(PersonalDocumentListMountWrapper).toMatchSnapshot();
    });

    then("Should load personal document list", async () => {
      let personalDocumentList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      personalDocumentList.addData(getName(MessageEnum.RestAPIResponceDataMessage), personalDocumentList);
      personalDocumentList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [documentMockData] });
      instance.DocumentsCallId = personalDocumentList;
      runEngine.sendMessage("Personal Document List", personalDocumentList);
    });

    then("Should open the add personal document dialog", async () => {
      const documentAddButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(Button).at(0).props(), "onClick");
      PersonalDocumentListMountWrapper.find(Button).at(0).props().onClick();
      expect(documentAddButtonSpy).toHaveBeenCalled();
    });

    then("Should close the add personal document dialog by click on outside", async () => {
      const closeButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(Dialog).at(0).props(), "onClose");
      PersonalDocumentListMountWrapper.find(Dialog).at(0).props().onClose();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should close the add personal document dialog by click on close icon", async () => {
      instance.setState({ isAddDocumentModalOpen: true });
      PersonalDocumentListMountWrapper.update();

      const closeIconButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(IconButton).at(2).props(), "onClick");
      PersonalDocumentListMountWrapper.find(IconButton).at(2).props().onClick();
      expect(closeIconButtonSpy).toHaveBeenCalled();
    });

    then("Should close the add personal document dialog by click on cancel icon", async () => {
      instance.setState({ isAddDocumentModalOpen: true });
      PersonalDocumentListMountWrapper.update();

      const cancelButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(Button).at(1).props(), "onClick");
      PersonalDocumentListMountWrapper.find(Button).at(1).props().onClick();
      expect(cancelButtonSpy).toHaveBeenCalled();
    });

    then("Should able to add file name", async () => {
      instance.setState({ isAddDocumentModalOpen: true });
      PersonalDocumentListMountWrapper.update();

      const fileNameSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(".add-document").find("input").at(0).props(), "onChange");
      PersonalDocumentListMountWrapper.find(".add-document").find("input").at(0).props().onChange({ target: { value: "file" } });
      expect(fileNameSpy).toHaveBeenCalled();
    });

    then("Should able to remove uploaded file", async () => {
      instance.setState({ isAddDocumentModalOpen: true, file: { name: "file" } });
      PersonalDocumentListMountWrapper.update();

      const fileSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(".add-document").find(CloseIcon).at(1).props(), "onClick");
      PersonalDocumentListMountWrapper.find(".add-document").find(CloseIcon).at(1).props().onClick();
      expect(fileSpy).toHaveBeenCalled();
    });

    then("Should create the personal document when click on submit button", async () => {
      instance.setState({ isAddDocumentModalOpen: true });
      PersonalDocumentListMountWrapper.update();

      const submitDocumentButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(".add-document").find(Button).at(1).props(), "onClick");
      PersonalDocumentListMountWrapper.find(".add-document").find(Button).at(1).props().onClick();
      expect(submitDocumentButtonSpy).toHaveBeenCalled();

      let personalDocumentCreate = new Message(getName(MessageEnum.RestAPIResponceMessage));
      personalDocumentCreate.addData(getName(MessageEnum.RestAPIResponceDataMessage), personalDocumentCreate);
      personalDocumentCreate.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.CreateDocumentCallId = personalDocumentCreate;
      runEngine.sendMessage("Create Personal Document", personalDocumentCreate);
    });

    then("Should close the delete dialog button when click on close icon", async () => {
      const deleteDialogSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(".delete-document").at(1).props(), "onClose");
      PersonalDocumentListMountWrapper.find(".delete-document").at(1).props().onClose();
      expect(deleteDialogSpy).toHaveBeenCalled();
    });

    then("Should close the delete dialog button when click on cancel icon", async () => {
      instance.setState({ isDeleteDocumentModalOpen: true });
      PersonalDocumentListMountWrapper.update();

      const cancelButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(".delete-document").find(Button).at(1).props(), "onClick");
      PersonalDocumentListMountWrapper.find(".delete-document").find(Button).at(1).props().onClick();
      expect(cancelButtonSpy).toHaveBeenCalled();
    });

    then("Should delete the document", async () => {
      instance.setState({ isDeleteDocumentModalOpen: true });
      PersonalDocumentListMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(PersonalDocumentListMountWrapper.find(".delete-document").find(Button).at(0).props(), "onClick");
      PersonalDocumentListMountWrapper.find(".delete-document").find(Button).at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let personalDocumentDelete = new Message(getName(MessageEnum.RestAPIResponceMessage));
      personalDocumentDelete.addData(getName(MessageEnum.RestAPIResponceDataMessage), personalDocumentDelete);
      personalDocumentDelete.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.DeleteDocumentCallId = personalDocumentDelete;
      runEngine.sendMessage("Personal Document Delete", personalDocumentDelete);
    });
  });
});
