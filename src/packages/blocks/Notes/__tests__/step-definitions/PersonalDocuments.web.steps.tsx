import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../../Notes/src/DocumentReportStyle.web";
import { IconButton } from "@material-ui/core";
import PersonalDocumentsWeb from "../../src/PersonalDocuments.web";
import { personalDocumentCountMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";

const PersonalDocumentsProps = componentProps("PersonalDocuments", DocumentReportStyleWeb);

const feature = loadFeature("./__tests__/features/PersonalDocuments.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PersonalDocuments", ({ given, when, then }) => {
    let PersonalDocumentsMountWrapper: any;
    let instance: any;

    given("I am a User loading PersonalDocuments", () => {
      PersonalDocumentsMountWrapper = mount(<PersonalDocumentsWeb {...PersonalDocumentsProps} />);
    });

    when("I navigate to the PersonalDocuments", () => {
      instance = PersonalDocumentsMountWrapper.instance();
    });

    then("PersonalDocuments will load with out errors", async () => {
      expect(PersonalDocumentsMountWrapper).toMatchSnapshot();
    });

    then("Should go to dashboard when click to back button", async () => {
      const backButtonSpy = jest.spyOn(PersonalDocumentsMountWrapper.find(IconButton).at(0).props(), "onClick");
      PersonalDocumentsMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should load the document counts", async () => {
      let personalDocumentCount = new Message(getName(MessageEnum.RestAPIResponceMessage));
      personalDocumentCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), personalDocumentCount);
      personalDocumentCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: personalDocumentCountMockData });
      instance.GetDocumentCountCallId = personalDocumentCount;
      runEngine.sendMessage("Personal Document Count", personalDocumentCount);
    });
  });
});
