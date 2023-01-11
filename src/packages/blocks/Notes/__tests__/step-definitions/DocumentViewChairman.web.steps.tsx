import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { paramComponentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../src/DocumentReportStyle.web";
import { BrowserRouter } from "react-router-dom";
import DocumentViewChairmanWeb from "../../src/DocumentViewChairman.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { documentMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";

const DocumentViewChairmanProps = paramComponentProps("DocumentViewChairman", DocumentReportStyleWeb, "policy");

const feature = loadFeature("./__tests__/features/DocumentViewChairman.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DocumentViewChairman", ({ given, when, then }) => {
    let DocumentViewChairmanMountWrapper: any;
    let instance: any;

    given("I am a User loading DocumentViewChairman", () => {
      DocumentViewChairmanMountWrapper = mount(<DocumentViewChairmanWeb {...DocumentViewChairmanProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the DocumentViewChairman", () => {
      instance = DocumentViewChairmanMountWrapper.instance();
    });

    then("DocumentViewChairman will load with out errors", async () => {
      expect(DocumentViewChairmanMountWrapper).toMatchSnapshot();
    });

    then("Should load the chairman document for view", async () => {
      let chairmanBuildingDocument = new Message(getName(MessageEnum.RestAPIResponceMessage));
      chairmanBuildingDocument.addData(getName(MessageEnum.RestAPIResponceDataMessage), chairmanBuildingDocument);
      chairmanBuildingDocument.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.GetDocumentCallId = chairmanBuildingDocument;
      runEngine.sendMessage("Building Document", chairmanBuildingDocument);
    });
  });
});
