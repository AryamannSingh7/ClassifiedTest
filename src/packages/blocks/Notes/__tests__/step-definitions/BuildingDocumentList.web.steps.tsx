import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { DocumentReportStyleWeb } from "../../src/DocumentReportStyle.web";
import BuildingDocumentListWeb from "../../src/BuildingDocumentList.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { documentMockData, resolutionMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";
import { paramComponentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Card } from "@material-ui/core";

let BuildingDocumentListProps = paramComponentProps("BuildingDocumentList", DocumentReportStyleWeb, "policy");

const feature = loadFeature("./__tests__/features/BuildingDocumentList.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to BuildingDocumentList", ({ given, when, then }) => {
    let BuildingDocumentListMountWrapper: any;
    let instance: any;

    given("I am a User loading BuildingDocumentList", () => {
      BuildingDocumentListMountWrapper = mount(<BuildingDocumentListWeb {...BuildingDocumentListProps} />);
    });

    when("I navigate to the BuildingDocumentList", () => {
      instance = BuildingDocumentListMountWrapper.instance();
    });

    then("BuildingDocumentList will load with out errors", async () => {
      expect(BuildingDocumentListMountWrapper).toMatchSnapshot();
    });

    then("Should load the document list", async () => {
      let documentList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      documentList.addData(getName(MessageEnum.RestAPIResponceDataMessage), documentList);
      documentList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: [documentMockData] });
      instance.DocumentsCallId = documentList;
      runEngine.sendMessage("Document List", documentList);
    });

    then("Should load the resolution list", async () => {
      BuildingDocumentListProps = paramComponentProps("BuildingDocumentList", DocumentReportStyleWeb, "resolutions");
      BuildingDocumentListMountWrapper = mount(<BuildingDocumentListWeb {...BuildingDocumentListProps} />);
      instance.setState({ documentType: "resolutions" });
      BuildingDocumentListMountWrapper.update();

      let resolutionList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      resolutionList.addData(getName(MessageEnum.RestAPIResponceDataMessage), resolutionList);
      resolutionList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        code: 200, resolution: { data: [resolutionMockData], }
      });
      instance.ResolutionsCallId = resolutionList;
      runEngine.sendMessage("Document List", resolutionList);
    });
  });
});
