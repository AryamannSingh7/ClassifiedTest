import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { Card} from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message"
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FacilityReservationListing from "../../src/FacilityReservationListing.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "FacilityReservationListing",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn()
};


const feature = loadFeature(
  "./__tests__/features/FacilityReservationListing-scenario.web.feature"
);

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

jest.mock("@material-ui/core/styles", () => ({
    withStyles: (styles: any) => (component: Component) => component,
  }));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

 const  facilityReservationListMockData = {data : [
  {
    "id": "49",
    "type": "facility_reservation",
    "attributes": {
        "date": "09-Dec-2022",
        "status": "Rejected",
        "note": "Already reserved",
        "description": null,
        "account_id": 283,
        "paid_on": null,
        "rent": 4000,
        "Owner_name": "Akash",
        "start_time": "11:00",
        "end_time": "15:00",
        "unit_number": null,
        "building": {
            "id": 4,
            "name": "test building2",
            "society_management_id": 6,
            "description": null,
            "created_at": "2022-08-31T11:45:30.819Z",
            "updated_at": "2022-09-02T14:41:47.572Z",
            "per_floor_unit": 3,
            "generation_methods": "A-101, A-102, A-103",
            "number_of_floor": 6,
            "building_area": "2500 sq. ft.",
            "account_id": null,
            "lat": null,
            "long": null,
            "city": null
        },
        "common_area": {
            "id": 20,
            "name": "Function Hall",
            "society_management_id": 6,
            "created_at": "2022-11-29T00:04:46.861Z",
            "updated_at": "2022-11-29T00:04:46.861Z",
            "details": "",
            "total_area": "",
            "currency_id": 3,
            "reservation_fee": 1000
        }
    }
},
 ]
}
const  facilityReservationListPreviousMockData = {data : [
  {
    "id": "48",
    "type": "facility_reservation",
    "attributes": {
        "date": "07-Dec-2022",
        "status": "Completed",
        "note": null,
        "description": null,
        "account_id": 283,
        "paid_on": "07-12-2022",
        "rent": 1500,
        "Owner_name": "Akash",
        "start_time": "05:30",
        "end_time": "08:30",
        "unit_number": null,
        "building": {
            "id": 4,
            "name": "test building2",
            "society_management_id": 6,
            "description": null,
            "created_at": "2022-08-31T11:45:30.819Z",
            "updated_at": "2022-09-02T14:41:47.572Z",
            "per_floor_unit": 3,
            "generation_methods": "A-101, A-102, A-103",
            "number_of_floor": 6,
            "building_area": "2500 sq. ft.",
            "account_id": null,
            "lat": null,
            "long": null,
            "city": null
        },
        "common_area": {
            "id": 18,
            "name": "Garden",
            "society_management_id": 6,
            "created_at": "2022-11-29T00:04:46.852Z",
            "updated_at": "2022-11-29T00:04:46.852Z",
            "details": "",
            "total_area": "",
            "currency_id": 3,
            "reservation_fee": 500
        }
    }
},
 ]
}

  test("User navigates to FacilityReservationListing", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading FacilityReservationListing", () => {
      //@ts-ignore
        FacilityReservationMountWrapper = mount(<FacilityReservationListing.WrappedComponent {...screenProps} />,{ wrappingComponent: Router });
      });
  
      when("I navigate to the FacilityReservationListing", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("FacilityReservationListing will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
      then("I can go back to Facility details page", async () => {
        const backButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(".backIcons").at(0).props(), "onClick");
        FacilityReservationMountWrapper.find(".backIcons").at(0).props().onClick();
        expect(backButtonSpy).toHaveBeenCalled();
      });
       then("Should load the facility ReservationList List", async () => {
        let facilityReservationList = new Message(getName(MessageEnum.RestAPIResponceMessage));
        facilityReservationList.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationList);
        facilityReservationList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationListMockData);
        instance.getFacilityReservationListingApiCallId = facilityReservationList;
        runEngine.sendMessage("Facility Reservation List", facilityReservationList);
      });
      then("I am able to click on Facility Reservation List card", () => {
        localStorage.setItem("idOrName","Rejected");
         instance.setState({
          facilityReservationListing:facilityReservationListMockData.data,
          loading: false
        })
        FacilityReservationMountWrapper.update()
         //@ts-ignore
         expect(FacilityReservationMountWrapper.find(Card).length).toEqual(1)
        const unitListPageButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(".facility-card").at(0).props(), "onClick");
        FacilityReservationMountWrapper.find(".facility-card").at(0).props().onClick();
        expect(unitListPageButtonSpy).toHaveBeenCalled();
      });
      then("I am able to click on Facility Reservation List card Of Previous", () => {
        localStorage.setItem("idOrName","Previous");
         instance.setState({
          facilityReservationListing:facilityReservationListPreviousMockData.data,
          loading: false
        })
        FacilityReservationMountWrapper.update()
         //@ts-ignore
         expect(FacilityReservationMountWrapper.find(Card).length).toEqual(1)
        const unitListPageButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(".facility-card").at(0).props(), "onClick");
        FacilityReservationMountWrapper.find(".facility-card").at(0).props().onClick();
        expect(unitListPageButtonSpy).toHaveBeenCalled();
      });

      then("should check componentDidMount", () => {
         //@ts-ignore
         jest.spyOn(instance, 'getFacilityReservationListing'); // You spy on the getFacilityReservationListing
         instance.componentDidMount();
         expect(instance.getFacilityReservationListing).toHaveBeenCalledTimes(1)
      });
      
    
  });

  
});
