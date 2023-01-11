import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { paramComponentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../../Notes/src/DocumentReportStyle.web";
import ViewPersonalDocumentWeb from "../../src/ViewPersonalDocument.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { documentMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";

const ViewPersonalDocumentProps = paramComponentProps("ViewPersonalDocument", DocumentReportStyleWeb, "other-documents");

const feature = loadFeature("./__tests__/features/ViewPersonalDocument.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ViewPersonalDocument", ({ given, when, then }) => {
    let ViewPersonalDocumentMountWrapper: any;
    let instance: any;

    given("I am a User loading ViewPersonalDocument", () => {
      ViewPersonalDocumentMountWrapper = mount(<ViewPersonalDocumentWeb {...ViewPersonalDocumentProps} />);
    });

    when("I navigate to the ViewPersonalDocument", () => {
      instance = ViewPersonalDocumentMountWrapper.instance();
    });

    then("ViewPersonalDocument will load with out errors", async () => {
      expect(ViewPersonalDocumentMountWrapper).toMatchSnapshot();
    });

    then("Should load the personal document", async () => {
      let personalDocument = new Message(getName(MessageEnum.RestAPIResponceMessage));
      personalDocument.addData(getName(MessageEnum.RestAPIResponceDataMessage), personalDocument);
      personalDocument.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.GetDocumentCallId = personalDocument;
      runEngine.sendMessage("Personal Document", personalDocument);
    });
  });
});
