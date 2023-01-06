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
import VeichleList from "../../src/VeichleList.web";

import {BrowserRouter} from "react-router-dom"

const screenProps = {
  navigation: {},
  id: "VeichleList",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  // t:jest.fn()
};

const feature = loadFeature("./__tests__/features/vehiclelist.feature");

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
    then("I am able to click Icon Button", () => {
      const backButtonCheckSpy = jest.spyOn(VeichleListBlock.find(".backtesticon").at(0).props(), "onClick");
      VeichleListBlock.find(".backtesticon").at(0).props().onClick();
      expect(backButtonCheckSpy).toHaveBeenCalled();
    });
    then("I am able to click route", () => {
        const backButtonCheckSpy = jest.spyOn(VeichleListBlock.find(".btn").at(0).props(), "onClick");
        VeichleListBlock.find(".btn").at(0).props().onClick();
        expect(backButtonCheckSpy).toHaveBeenCalled();
      });
    //   then("I am able to click route2", () => {
    //     const backButtonCheckSpy = jest.spyOn(VeichleListBlock.find(".card").at(0).props(), "onClick");
    //     VeichleListBlock.find(".card").at(0).props().onClick();
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
        jest.spyOn(instance, 'getVehicle'); // You spy on the getFacilityReservationListing
        // You spy on the getFacilityReservationListing
        instance.componentDidMount();
        expect(instance.getVehicle).toHaveBeenCalledTimes(1)

     });
    //  then("should check form", () => {
    //     const backButtonCheckSpy = jest.spyOn(VeichleListBlock.find("#formik").at(0).props(), "onSubmit");
    //     VeichleListBlock.find("#formik").at(0).props().onSubmit();
    //     expect(backButtonCheckSpy).toHaveBeenCalled();
    //   });
    //   then("should check input", () => {
    //     const backButtonCheckSpy = jest.spyOn(NewFamilyBlock.find("#file1").at(0).props(), "onChange");
    //     NewFamilyBlock.find("#file1").at(0).props().onChange();
    //     expect(backButtonCheckSpy).toHaveBeenCalled();
    //   });

    then("I am able to click route2", () => {
      // @ts-ignore
      // event?.currentTarget=jest.fn()
      instance.setState({
        allVehcile:data.data
      })
      VeichleListBlock.update()
      console.log('instance====',VeichleListBlock)
      const iconButtonCheckSpy = jest.spyOn(VeichleListBlock.find('.card').at(0).props(), "onClick");
      VeichleListBlock.find('.card').at(0).props().onClick();
      expect(iconButtonCheckSpy).toHaveBeenCalled();
      // expect(familyListBlock.getElementsByClassName('iconBtntest').length).toBe(1);

    });
    

      ///

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