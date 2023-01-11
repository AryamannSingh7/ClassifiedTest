import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { paramComponentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { DocumentReportStyleWeb } from "../../../Notes/src/DocumentReportStyle.web";
import ViewBuildingDocumentWeb from "../../src/ViewBuildingDocument.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { documentMockData, resolutionMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";

let ViewBuildingDocumentProps = paramComponentProps("ViewBuildingDocument", DocumentReportStyleWeb, "resolutions");

const feature = loadFeature("./__tests__/features/ViewBuildingDocument.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to ViewBuildingDocument", ({ given, when, then }) => {
    let ViewBuildingDocumentMountWrapper: any;
    let instance: any;

    given("I am a User loading ViewBuildingDocument", () => {
      ViewBuildingDocumentMountWrapper = mount(<ViewBuildingDocumentWeb {...ViewBuildingDocumentProps} />);
    });

    when("I navigate to the ViewBuildingDocument", () => {
      instance = ViewBuildingDocumentMountWrapper.instance();
    });

    then("ViewBuildingDocument will load with out errors", async () => {
      expect(ViewBuildingDocumentMountWrapper).toMatchSnapshot();
    });

    then("Should load the resolution document", async () => {
      let resolutionDocument = new Message(getName(MessageEnum.RestAPIResponceMessage));
      resolutionDocument.addData(getName(MessageEnum.RestAPIResponceDataMessage), resolutionDocument);
      resolutionDocument.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, data: resolutionMockData });
      instance.GetResolutionCallId = resolutionDocument;
      runEngine.sendMessage("Resolution Document", resolutionDocument);
    });

    then("Should able to share meeting minute document", async () => {
      instance.setState({ documentType: "resolutions", document: resolutionMockData });
      ViewBuildingDocumentMountWrapper.update();

      const shareButtonSpy = jest.spyOn(ViewBuildingDocumentMountWrapper.find("img").at(2).props(), "onClick");
      ViewBuildingDocumentMountWrapper.find("img").at(2).props().onClick();
      expect(shareButtonSpy).toHaveBeenCalled();
    });

    then("Should load the building document", async () => {
      ViewBuildingDocumentProps = paramComponentProps("ViewBuildingDocument", DocumentReportStyleWeb, "policy");
      ViewBuildingDocumentMountWrapper = mount(<ViewBuildingDocumentWeb {...ViewBuildingDocumentProps} />);
      ViewBuildingDocumentMountWrapper.update();

      let buildingDocument = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingDocument.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingDocument);
      buildingDocument.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: documentMockData });
      instance.GetDocumentCallId = buildingDocument;
      runEngine.sendMessage("Building Document", buildingDocument);
    });
  });
});
