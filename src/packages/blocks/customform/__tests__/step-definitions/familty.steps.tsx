import { defineFeature, loadFeature } from "jest-cucumber";
import { mount} from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import FamilyList from "../../src/FamilyList.web";
import {BrowserRouter} from "react-router-dom"

const screenProps = {
  navigation: {},
  id: "FamilyList",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  
};

const feature = loadFeature("./__tests__/features/family-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to family", ({ given, when, then }) => {
    let familyListBlock: any;
    // @ts-ignore
    let instance: any;

    given("I am a User loading family", () => {
      // @ts-ignore
      familyListBlock = mount(<FamilyList.WrappedComponent {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the family", () => {
      // @ts-ignore
      instance = familyListBlock.instance();
    });

    then("family will load with out errors", () => {
      expect(familyListBlock).toBeTruthy();
      expect(familyListBlock).toMatchSnapshot();
    });
    then("I am able to click Icon Button", () => {
      const backButtonCheckSpy = jest.spyOn(familyListBlock.find(".backtesticon").at(0).props(), "onClick");
      familyListBlock.find(".backtesticon").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });
    then("Should load the Family List", async () => {
      let familyData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      familyData.addData(getName(MessageEnum.RestAPIResponceDataMessage), familyData);
      familyData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), data);
      instance.getVehicleListApiCallId = familyData;
      runEngine.sendMessage("Family List", familyData);
    });
    then("I am able to click route", () => {
      const backButtonCheckSpy = jest.spyOn(familyListBlock.find(".btn").at(0).props(), "onClick");
      familyListBlock.find(".btn").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });
    then("I am able to click route1", () => {
      const backButtonCheckSpy = jest.spyOn(familyListBlock.find(".diloag-wrapper").at(0).props(), "onClick");
      familyListBlock.find(".diloag-wrapper").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });
    then("I am able to click route2", () => {
      const backButtonCheckSpy = jest.spyOn(familyListBlock.find(".customButton").at(0).props(), "onClick");
      familyListBlock.find(".customButton").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });

    

  });
});


const data={
  data:[
    {
      "id": "35",
      "type": "family",
      "attributes": {
          "id": 35,
          "name": "Ram",
          "account_id": 281,
          "relation": {
              "id": 3,
              "name": "Son"
          },
          "id_proof": {
              "id": 1,
              "name": "Aadhar"
          },
          "id_number": "14094532454646",
          "member_pic": {
              "url": "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTRCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8dcbf199e8cf38716e3bb9a89d77b9629d28c11f/blob"
          }
      }
  }
  ]
}