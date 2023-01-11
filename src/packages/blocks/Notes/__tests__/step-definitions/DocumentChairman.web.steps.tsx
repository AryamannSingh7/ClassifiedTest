import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../../Notes/src/DocumentReportStyle.web";
import DocumentChairmanWeb from "../../src/DocumentChairman.web";
import { BrowserRouter } from "react-router-dom";
import { buildingDocumentCountMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";

const DocumentChairmanProps = componentProps("DocumentChairman", DocumentReportStyleWeb);

const feature = loadFeature("./__tests__/features/DocumentChairman.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to DocumentChairman", ({ given, when, then }) => {
    let DocumentChairmanMountWrapper: any;
    let instance: any;

    given("I am a User loading DocumentChairman", () => {
      DocumentChairmanMountWrapper = mount(<DocumentChairmanWeb {...DocumentChairmanProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the DocumentChairman", () => {
      instance = DocumentChairmanMountWrapper.instance();
    });

    then("DocumentChairman will load with out errors", async () => {
      expect(DocumentChairmanMountWrapper).toMatchSnapshot();
    });

    then("Should load the document counts", async () => {
      let chairmanDocumentCount = new Message(getName(MessageEnum.RestAPIResponceMessage));
      chairmanDocumentCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), chairmanDocumentCount);
      chairmanDocumentCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDocumentCountMockData });
      instance.GetDocumentCountCallId = chairmanDocumentCount;
      runEngine.sendMessage("Chairman Document Count", chairmanDocumentCount);
    });
  });
});
