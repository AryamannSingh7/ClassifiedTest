import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { paramComponentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../src/DocumentReportStyle.web";
import { BrowserRouter } from "react-router-dom";
import DocumentListChairmanWeb from "../../src/DocumentListChairman.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { documentMockData, meetingMinuteMockData, resolutionMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";
import { Button, IconButton } from "@material-ui/core";
import { Formik } from "formik";
import CloseIcon from "@material-ui/icons/Close";

let DocumentListChairmanProps = paramComponentProps("DocumentListChairman", DocumentReportStyleWeb, "policy");

const feature = loadFeature("./__tests__/features/DocumentListChairman.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DocumentListChairman", ({ given, when, then }) => {
    let DocumentListChairmanMountWrapper: any;
    let instance: any;

    given("I am a User loading DocumentListChairman", () => {
      DocumentListChairmanMountWrapper = mount(<DocumentListChairmanWeb {...DocumentListChairmanProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the DocumentListChairman", () => {
      instance = DocumentListChairmanMountWrapper.instance();
    });

    then("DocumentListChairman will load with out errors", async () => {
      expect(DocumentListChairmanMountWrapper).toMatchSnapshot();
    });

    then("Should load the documents list", async () => {
      let chairmanDocumentList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      chairmanDocumentList.addData(getName(MessageEnum.RestAPIResponceDataMessage), chairmanDocumentList);
      chairmanDocumentList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [documentMockData] });
      instance.ChairmanDocumentsCallId = chairmanDocumentList;
      runEngine.sendMessage("Chairman Document List", chairmanDocumentList);
    });

    then("Should open the add document modal", async () => {
      const openModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(Button).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalButtonSpy).toHaveBeenCalled();
    });

    then("Should open the add resolution modal", async () => {
      instance.setState({ docName: "resolutions" });
      DocumentListChairmanMountWrapper.update();

      const openModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(Button).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalButtonSpy).toHaveBeenCalled();
    });

    then("Should close the add document modal when click on outside", async () => {
      const closeModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document").at(0).props(), "onClose");
      DocumentListChairmanMountWrapper.find(".add-document").at(0).props().onClose();
      expect(closeModalButtonSpy).toHaveBeenCalled();
    });

    then("Should close the add document modal when click on close icon", async () => {
      const closeModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document").find(IconButton).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document").find(IconButton).at(0).props().onClick();
      expect(closeModalButtonSpy).toHaveBeenCalled();
    });

    then("Should submit the add document when click on submit", async () => {
      const formikSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document").find(Formik).at(0).props(), "onSubmit");
      DocumentListChairmanMountWrapper.find(".add-document").find(Formik).at(0).props().onSubmit({
        title: "file",
        file: { name: "file" }
      }, { resetForm: () => jest.fn() });
      expect(formikSpy).toHaveBeenCalled();

      let addDocument = new Message(getName(MessageEnum.RestAPIResponceMessage));
      addDocument.addData(getName(MessageEnum.RestAPIResponceDataMessage), addDocument);
      addDocument.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.CreateDocumentCallId = addDocument;
      runEngine.sendMessage("Add Document", addDocument);
    });

    then("Should close the add document modal when click on cancel button", async () => {
      const closeModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document").find(Button).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document").find(Button).at(0).props().onClick();
      expect(closeModalButtonSpy).toHaveBeenCalled();
    });

    then("Should close the delete document modal when click on outside", async () => {
      const closeModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".delete-document").at(3).props(), "onClose");
      DocumentListChairmanMountWrapper.find(".delete-document").at(3).props().onClose();
      expect(closeModalButtonSpy).toHaveBeenCalled();
    });

    then("Should close the delete document modal when click on cancel button", async () => {
      instance.setState({ isDeleteDocumentModalOpen: true });
      DocumentListChairmanMountWrapper.update();

      const closeModalButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".delete-document").at(3).find(Button).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".delete-document").at(3).find(Button).at(0).props().onClick();
      expect(closeModalButtonSpy).toHaveBeenCalled();
    });

    then("Should delete the document", async () => {
      instance.setState({ isDeleteDocumentModalOpen: true, docName: "policy" });
      DocumentListChairmanMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".delete-document").at(3).find(Button).at(1).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".delete-document").at(3).find(Button).at(1).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteDocument = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteDocument.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteDocument);
      deleteDocument.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.DeleteDocumentCallId = deleteDocument;
      runEngine.sendMessage("Delete Document", deleteDocument);
    });

    then("Should delete the resolution", async () => {
      instance.setState({ isDeleteDocumentModalOpen: true, docName: "resolutions" });
      DocumentListChairmanMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".delete-document").at(3).find(Button).at(1).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".delete-document").at(3).find(Button).at(1).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteResolution = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteResolution.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteResolution);
      deleteResolution.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: resolutionMockData });
      instance.DeleteResolutionCallId = deleteResolution;
      runEngine.sendMessage("Delete Resolution", deleteResolution);
    });

    then("Should close the resolution button when click on outside", async () => {
      const closeButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").at(0).props(), "onClose");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").at(0).props().onClose();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should close the resolution button when click on close icon", async () => {
      const closeButtonSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(IconButton).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(IconButton).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should able to add resolution name", async () => {
      const resolutionTitleSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find("input").at(0).props(), "onChange");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find("input").at(0).props().onChange({ target: { value: "file" } });
      expect(resolutionTitleSpy).toHaveBeenCalled();
    });

    then("Should able to remove the uploaded resolution file", async () => {
      instance.setState({ isAddResolutionModalOpen: true, file: { name: "resolutions" } });
      DocumentListChairmanMountWrapper.update();

      const resolutionFileSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(CloseIcon).at(1).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(CloseIcon).at(1).props().onClick();
      expect(resolutionFileSpy).toHaveBeenCalled();
    });

    then("Should open meeting minute module when click on choose meeting", async () => {
      const meetingModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(".choose-meeting").at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(".choose-meeting").at(0).props().onClick();
      expect(meetingModalSpy).toHaveBeenCalled();
    });

    then("Should open meeting minute module when click on change meeting", async () => {
      instance.setState({ isAddResolutionModalOpen: true, selectedMeeting: { attributes: { title: "Resolution" } } });
      DocumentListChairmanMountWrapper.update();

      const meetingModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(".change-meeting").find("span").at(1).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(".change-meeting").find("span").at(1).props().onClick();
      expect(meetingModalSpy).toHaveBeenCalled();
    });

    then("Should close resolution modal when click on cancel modal", async () => {
      const closeModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(Button).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(Button).at(0).props().onClick();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("Should create the resolution", async () => {
      instance.setState({ isAddResolutionModalOpen: true, selectedMeeting: { id: 2, attributes: { title: "Resolution" } } });
      DocumentListChairmanMountWrapper.update();

      const closeModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(Button).at(1).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".add-document.resolutions").find(Button).at(1).props().onClick();
      expect(closeModalSpy).toHaveBeenCalled();

      let createResolution = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createResolution.addData(getName(MessageEnum.RestAPIResponceDataMessage), createResolution);
      createResolution.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, resolution: { data: resolutionMockData } });
      instance.CreateResolutionCallId = createResolution;
      runEngine.sendMessage("Create Resolution", createResolution);
    });

    then("Should close the select meeting minute modal when click on outside", async () => {
      const closeModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".select-meeting").at(0).props(), "onClose");
      DocumentListChairmanMountWrapper.find(".select-meeting").at(0).props().onClose();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("Should close the select meeting minute modal when click on close icon", async () => {
      const closeModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".select-meeting").find(IconButton).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".select-meeting").find(IconButton).at(0).props().onClick();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("Should close the select meeting minute modal when click on cancel button", async () => {
      const closeModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".select-meeting").find(Button).at(0).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".select-meeting").find(Button).at(0).props().onClick();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("Should close the select meeting minute modal when click on create button", async () => {
      const closeModalSpy = jest.spyOn(DocumentListChairmanMountWrapper.find(".select-meeting").find(Button).at(1).props(), "onClick");
      DocumentListChairmanMountWrapper.find(".select-meeting").find(Button).at(1).props().onClick();
      expect(closeModalSpy).toHaveBeenCalled();
    });

    then("DocumentListChairman resolution documents load", async () => {
      DocumentListChairmanProps = paramComponentProps("DocumentListChairman", DocumentReportStyleWeb, "resolutions");
      DocumentListChairmanMountWrapper = mount(<DocumentListChairmanWeb {...DocumentListChairmanProps} />, { wrappingComponent: BrowserRouter });
      instance.setState({ docName: "resolutions" });
      DocumentListChairmanMountWrapper.update();

      let resolutionDocumentList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      resolutionDocumentList.addData(getName(MessageEnum.RestAPIResponceDataMessage), resolutionDocumentList);
      resolutionDocumentList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, resolution: { data: [resolutionMockData] } });
      instance.ResolutionsCallId = resolutionDocumentList;
      runEngine.sendMessage("Chairman Resolution  Document List", resolutionDocumentList);
    });

    then("Should load the meeting minute", async () => {
      let meetingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      meetingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), meetingList);
      meetingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, meeting: { data: [meetingMinuteMockData] } });
      instance.MeetingsCallId = meetingList;
      runEngine.sendMessage("Meeting List", meetingList);
    });
  });
});
