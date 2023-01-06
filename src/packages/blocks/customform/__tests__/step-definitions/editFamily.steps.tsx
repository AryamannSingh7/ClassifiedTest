import { defineFeature, loadFeature } from "jest-cucumber";
import { mount} from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import {

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NewFamily from "../../src/EditFamily.web";

import {BrowserRouter} from "react-router-dom"

const screenProps = {
  navigation: {},
  id: "NewFamily",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  // t:jest.fn()
};
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
export const localStorageMock = (() => {
  let store: any = {};

  return {
    getItem(key: any) {
      return store[key] || null;
    },
    setItem(key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: any) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

const feature = loadFeature("./__tests__/features/editFamily.feature");
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    window.localStorage.setItem("selectFamily",JSON.stringify(data.data[0]));
  });

  test("User navigates to family", ({ given, when, then }) => {
    let NewFamilyBlock: any;
    // @ts-ignore
    let instance: any;
      // @ts-ignore
     window.localStorage.setItem("selectFamily",JSON.stringify(data.data[0]));
    given("I am a User loading family", () => {
      // @ts-ignore
      NewFamilyBlock = mount(<NewFamily.WrappedComponent {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the family", () => {
      // @ts-ignore
      instance = NewFamilyBlock.instance();
    });

    then("family will load with out errors", () => {
      expect(NewFamilyBlock).toBeTruthy();
      expect(NewFamilyBlock).toMatchSnapshot();
    });
    // then("I am able to click Icon Button", () => {
    //   const backButtonCheckSpy = jest.spyOn(NewFamilyBlock.find(".backtesticon").at(0).props(), "onClick");
    //   NewFamilyBlock.find(".backtesticon").at(0).props().onClick();
    //   expect(backButtonCheckSpy).toHaveBeenCalled();
    // });
    then("I am able to click route", () => {
        const backButtonCheckSpy = jest.spyOn(NewFamilyBlock.find(".btn").at(0).props(), "onClick");
        NewFamilyBlock.find(".btn").at(0).props().onClick();
        expect(backButtonCheckSpy).toHaveBeenCalled();
      });
  
    then("Should load the Family List", async () => {
      let familyData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      familyData.addData(getName(MessageEnum.RestAPIResponceDataMessage), familyData);
      familyData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), data);
      instance.getVehicleListApiCallId = familyData;
      runEngine.sendMessage("Family List", familyData);
      localStorage.setItem("selectFamily",JSON.stringify(data.data[0]));
    });
    then("should check componentDidMount", () => {
        //@ts-ignore
        jest.spyOn(instance, 'getRelation'); 
        jest.spyOn(instance, 'getIdType'); // You spy on the getFacilityReservationListing
        // You spy on the getFacilityReservationListing
        instance.componentDidMount();
        expect(instance.getRelation).toHaveBeenCalledTimes(1)
        expect(instance.getIdType).toHaveBeenCalledTimes(1)

     });
     then("should check form", () => {
        const backButtonCheckSpy = jest.spyOn(NewFamilyBlock.find("#formik").at(0).props(), "onSubmit");
        NewFamilyBlock.find("#formik").at(0).props().onSubmit();
        expect(backButtonCheckSpy).toHaveBeenCalled();
      });
  
  });
});



