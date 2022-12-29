import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom"
import * as helpers from "../../../../framework/src/Helpers";
import { Button, Card, IconButton } from "@material-ui/core";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message"
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import FacilityReservation from "../../src/FacilityReservationDetails.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {},
  id: "FacilityReservationDetails",
  location: jest.fn(),
  history: {
    push:jest.fn(),
  },
  match: jest.fn(),
  t:jest.fn()
};


const feature = loadFeature(
  "./__tests__/features/FacilityReservationDetails-scenario.web.feature"
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

  const facilityReservationDetailsMockData = { "data": {
    "id": "50",
    "type": "facility_reservation",
    "attributes": {
        "date": "08-Dec-2022",
        "status": "Completed",
        "note": null,
        "description": null,
        "account_id": 283,
        "paid_on": "08-12-2022",
        "rent": 700,
        "Owner_name": "Akash",
        "start_time": "08:30",
        "end_time": "09:50",
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
            "id": 19,
            "name": "Swimmingpool",
            "society_management_id": 6,
            "created_at": "2022-11-29T00:04:46.859Z",
            "updated_at": "2022-11-29T00:04:46.859Z",
            "details": "",
            "total_area": "",
            "currency_id": 3,
            "reservation_fee": 700
        }
    }
}
  }

  const facilityReservationDetailsUpcomingMockData = { "data": 
  {
    "id": "48",
    "type": "facility_reservation",
    "attributes": {
        "date": "31-Dec-2022",
        "status": "Upcoming",
        "note": "This is note for details",
        "description": null,
        "account_id": 283,
        "paid_on": "31-12-2022",
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
}
  }

  const facilityReservationDetailsPendingMockData = { "data": 
  {
    "id": "59",
    "type": "facility_reservation",
    "attributes": {
        "date": "16-Dec-2022",
        "status": "Pending",
        "note": null,
        "description": null,
        "account_id": 421,
        "paid_on": null,
        "rent": 300,
        "Owner_name": "testnewr",
        "start_time": "01:00",
        "end_time": "02:00",
        "unit_number": null,
        "building": {
            "id": 5,
            "name": "Sola-1",
            "society_management_id": 7,
            "description": null,
            "created_at": "2022-09-02T04:36:08.120Z",
            "updated_at": "2022-09-02T04:36:25.971Z",
            "per_floor_unit": 2,
            "generation_methods": "101, 102, 103",
            "number_of_floor": 20,
            "building_area": "",
            "account_id": null,
            "lat": null,
            "long": null,
            "city": null
        },
        "common_area": {
            "id": 8,
            "name": "Garden",
            "society_management_id": 7,
            "created_at": "2022-09-02T04:36:08.110Z",
            "updated_at": "2022-12-15T10:28:23.734Z",
            "details": "",
            "total_area": "",
            "currency_id": 3,
            "reservation_fee": 300
        }
    }
}
  }




  test("User navigates to FacilityReservationDetails", ({given,when,then}) => {
    let FacilityReservationMountWrapper: any;
    let instance: any;
    given("I am a User loading FacilityReservationDetails", () => {
      //@ts-ignore
        FacilityReservationMountWrapper = mount(<FacilityReservation.WrappedComponent {...screenProps} />,{ wrappingComponent: Router });
      });
  
      when("I navigate to the FacilityReservationDetails", () => {
        instance = FacilityReservationMountWrapper.instance();
      });
  
      then("FacilityReservationDetails will load with out errors", async () => {
        expect(FacilityReservationMountWrapper).toMatchSnapshot();
      });
      then("I can go back to Facility details page", async () => {
        const backButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(".backIcons").at(0).props(), "onClick");
        FacilityReservationMountWrapper.find(".backIcons").at(0).props().onClick();
        expect(backButtonSpy).toHaveBeenCalled();
        // jest.spyOn(instance,"redirectToDashboard")
        // expect(FacilityReservationMountWrapper.find("#backIcons").length).toEqual(2)
        // FacilityReservationMountWrapper.find("#backIcons").at(1).simulate('click')
        // expect(instance.redirectToDashboard).toHaveBeenCalled()
      });

      then("Should load the facility ReservationList Details", async () => {
        localStorage.setItem("facilityReservationId",'59');
        let facilityReservationDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
        facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationDetails);
        facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsPendingMockData);
        instance.getFacilityReservationDetailsByIdApiCallId = facilityReservationDetails;
        runEngine.sendMessage("facility Reservation Details", facilityReservationDetails);
      });
    
      then("should check componentDidMount", () => {
        localStorage.setItem("facilityReservationId",'59');
        //@ts-ignore
        jest.spyOn(instance, 'getFacilityReservationDetailsById'); // You spy on the getFacilityReservationDetailsById
        instance.componentDidMount();
        expect(instance.getFacilityReservationDetailsById).toHaveBeenCalledTimes(1)
     });
     
     then("Should delete the facility Reservation details", async () => {
      instance.setState({ deleteShowDialog: true });
      FacilityReservationMountWrapper.update()

      const deleteButton = jest.spyOn(FacilityReservationMountWrapper.find(Button).at(0).props(), "onClick");
      FacilityReservationMountWrapper.find(Button).at(0).props().onClick();
      expect(deleteButton).toHaveBeenCalled();

      let deleteExpense = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteExpense);
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsPendingMockData);
      instance.deleteFacilityReservationsApiCallId = deleteExpense;
      runEngine.sendMessage("facility Reservation details Delete", deleteExpense);
    });

    then("Should cancel delete the facility Reservation details", async () => {
      instance.setState({ deleteShowDialog: true });
      FacilityReservationMountWrapper.update();

      const closeDialogButton = jest.spyOn(FacilityReservationMountWrapper.find(".delete-btn").at(0).props(), "onClick");
      FacilityReservationMountWrapper.find(".delete-btn").at(0).props().onClick();
      expect(instance.state.deleteShowDialog).toEqual(false);
      expect(closeDialogButton).toHaveBeenCalled();
    });

    then("Should load the Upcoming facility ReservationList Details", async () => {
      localStorage.setItem("facilityReservationId",'48');
      let facilityReservationDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationDetails);
      facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsUpcomingMockData);
      instance.getFacilityReservationDetailsByIdApiCallId = facilityReservationDetails;
      runEngine.sendMessage("facility Reservation Details", facilityReservationDetails);

      instance.setState({ showDialog: true });
      FacilityReservationMountWrapper.update();

      const DialogButton = jest.spyOn(FacilityReservationMountWrapper.find(Button).at(0).props(), "onClick");
      FacilityReservationMountWrapper.find(Button).at(0).props().onClick();
      expect(DialogButton).toHaveBeenCalled();

      let updateFacility= new Message(getName(MessageEnum.RestAPIResponceMessage));
      updateFacility.addData(getName(MessageEnum.RestAPIResponceDataMessage), updateFacility);
      updateFacility.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsPendingMockData);
      instance.apiCancelUpcomingFacilityReservationCallId = updateFacility;
      runEngine.sendMessage("facility Reservation details Delete", updateFacility);
    });
   
    then("Should cancel update the facility Reservation details", async () => {
      localStorage.setItem("facilityReservationId",'48');
      let facilityReservationDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationDetails);
      facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsUpcomingMockData);
      instance.getFacilityReservationDetailsByIdApiCallId = facilityReservationDetails;
      runEngine.sendMessage("facility Reservation Details", facilityReservationDetails);

      instance.setState({ ShowDialog: true });
      FacilityReservationMountWrapper.update();

      const DialogButton = jest.spyOn(FacilityReservationMountWrapper.find(Button).at(1).props(), "onClick");
      FacilityReservationMountWrapper.find(Button).at(1).props().onClick();
      expect(instance.state.showDialog).toEqual(false);
      expect(DialogButton).toHaveBeenCalled();
    });
   
  });
});
