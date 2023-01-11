import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import BuildingDocumentsWeb from "../../src/BuildingDocuments.web";
import { DocumentReportStyleWeb } from "../../../Notes/src/DocumentReportStyle.web";
import { IconButton } from "@material-ui/core";
import { buildingDocumentCountMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";

const BuildingDocumentsProps = componentProps("BuildingDocuments", DocumentReportStyleWeb);

const feature = loadFeature("./__tests__/features/BuildingDocuments.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to BuildingDocuments", ({ given, when, then }) => {
    let BuildingDocumentsMountWrapper: any;
    let instance: any;

    given("I am a User loading BuildingDocuments", () => {
      BuildingDocumentsMountWrapper = mount(<BuildingDocumentsWeb {...BuildingDocumentsProps} />);
    });

    when("I navigate to the BuildingDocuments", () => {
      instance = BuildingDocumentsMountWrapper.instance();
    });

    then("BuildingDocuments will load with out errors", async () => {
      expect(BuildingDocumentsMountWrapper).toMatchSnapshot();
    });

    then("Should go to dashboard when click to back button", async () => {
      const backButtonSpy = jest.spyOn(BuildingDocumentsMountWrapper.find(IconButton).at(0).props(), "onClick");
      BuildingDocumentsMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should load the document counts", async () => {
      let documentCount = new Message(getName(MessageEnum.RestAPIResponceMessage));
      documentCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), documentCount);
      documentCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDocumentCountMockData });
      instance.GetDocumentCountCallId = documentCount;
      runEngine.sendMessage("Document Count", documentCount);
    });
  });
});
