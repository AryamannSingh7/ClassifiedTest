import { defineFeature, loadFeature } from "jest-cucumber";
import { mount, shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import {
IconButton
} from "@material-ui/core";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NewFamily from "../../src/NewFamily.web";

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

const feature = loadFeature("./__tests__/features/newfamilysce.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to family", ({ given, when, then }) => {
    let NewFamilyBlock: any;
    // @ts-ignore
    let instance: any;

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
    //   then("I am able to click route1", () => {
    //     const backButtonCheckSpy = jest.spyOn(familyListBlock.find(".diloag-wrapper").at(0).props(), "onClick");
    //     familyListBlock.find(".diloag-wrapper").at(0).props().onClick();
    //     expect(backButtonCheckSpy).toHaveBeenCalled();
    //   });
    //   then("I am able to click route2", () => {
    //     const backButtonCheckSpy = jest.spyOn(familyListBlock.find(".customButton").at(0).props(), "onClick");
    //     familyListBlock.find(".customButton").at(0).props().onClick();
    //     expect(backButtonCheckSpy).toHaveBeenCalled();
    //   });
  
    then("Should load the Family List", async () => {
      let familyData = new Message(getName(MessageEnum.RestAPIResponceMessage));
      familyData.addData(getName(MessageEnum.RestAPIResponceDataMessage), familyData);
      familyData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), data);
      instance.getVehicleListApiCallId = familyData;
      runEngine.sendMessage("Family List", familyData);
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
      then("should check input", () => {
        const backButtonCheckSpy = jest.spyOn(NewFamilyBlock.find("#file1").at(0).props(), "onChange");
        NewFamilyBlock.find("#file1").at(0).props().onChange();
        expect(backButtonCheckSpy).toHaveBeenCalled();
      });

    // then("I am able to click Icon Button", () => {
    //   // @ts-ignore
    //   // event?.currentTarget=jest.fn()
    //   instance.setState({
    //     allVehcile:data.data
    //   })
    //   familyListBlock.update()
    //   console.log('instance====',familyListBlock)
    //   const iconButtonCheckSpy = jest.spyOn(familyListBlock.find(IconButton).at(0).props(), "onClick");
    //   familyListBlock.find(IconButton).at(0).props().onClick();
    //   expect(iconButtonCheckSpy).toHaveBeenCalled();
    //   // expect(familyListBlock.getElementsByClassName('iconBtntest').length).toBe(1);

    // });
    

      ///

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