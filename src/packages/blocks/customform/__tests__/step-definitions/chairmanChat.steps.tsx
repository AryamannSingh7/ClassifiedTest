import { defineFeature, loadFeature } from "jest-cucumber";
import { mount} from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import VeichleList from "../../src/ChairmanChat.web";

import {BrowserRouter} from "react-router-dom"

const screenProps = {
  navigation: {},
  id: "VeichleList",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  // t:jest.fn(),
  // classes : dashBoard
};

const feature = loadFeature("./__tests__/features/chairmanChat.feature");
jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, 
        t: () => "" ,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
          },
    };
    return Component;
  },
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));
defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to family", ({ given, when, then }) => {
    let VeichleListBlock: any;
    // @ts-ignore
    let instance: any;

    given("I am a User loading family", () => {
      
      // @ts-ignore
      VeichleListBlock = mount(<VeichleList.WrappedComponent {...screenProps} />,{ wrappingComponent: BrowserRouter });
    });

    when("I navigate to the family", () => {
      // @ts-ignore
      instance = VeichleListBlock.instance();
    });

    then("family will load with out errors", () => {
      expect(VeichleListBlock).toBeTruthy();
      expect(VeichleListBlock).toMatchSnapshot();
    });
    
  
    then("Should load the Family List", async () => {
      let familyData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      familyData.addData(getName(MessageEnum.RestAPIResponceDataMessage), familyData);
      familyData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), data);
      instance.getVehicleListApiCallId = familyData;
      runEngine.sendMessage("Family List", familyData);
    });
    then("should check componentDidMount", () => {
        //@ts-ignore
        jest.spyOn(instance, 'getInbox');
        jest.spyOn(instance, 'getProfile'); 
        jest.spyOn(instance, 'markUnread');
        jest.spyOn(instance, 'updateChatRoom'); 
        instance.componentDidMount();
        expect(instance.getInbox).toHaveBeenCalledTimes(1)
        expect(instance.getProfile).toHaveBeenCalledTimes(1)
        expect(instance.markUnread).toHaveBeenCalledTimes(1)
        expect(instance.updateChatRoom).toHaveBeenCalledTimes(0)



     });
   

  });
});


const data={
  data:[
    {
        "id": "270",
        "type": "vehicle",
        "attributes": {
            "owner_name": "dsd",
            "plate_number": "sdsd",
            "company_name": "sdsdsd",
            "model_number": "sdsdsd",
            "color": "sdsds",
            "status": "Pending Approval",
            "description": null,
            "address": null,
            "building_management": {
                "id": 2,
                "name": "A Block 2",
                "society_management_id": 4,
                "description": "it's big block. qwert",
                "created_at": "2022-07-04T08:23:43.802Z",
                "updated_at": "2022-11-04T06:43:16.098Z",
                "per_floor_unit": 4,
                "generation_methods": "101, 102, 103",
                "number_of_floor": 5,
                "building_area": "1200 Sq. Ft.",
                "account_id": null,
                "lat": null,
                "long": null,
                "city": null
            },
            "apartment_management": null,
            "registration_card_copy": {
                "url": "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2tEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a379dc9796f199332bc4e33ba59c1738eec13b54/blob",
                "content_type": "image/png",
                "file_name": "blob"
            }
        }
    }
  ]
}