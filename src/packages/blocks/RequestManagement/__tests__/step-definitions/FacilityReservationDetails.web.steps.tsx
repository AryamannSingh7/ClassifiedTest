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
        localStorage.setItem("facilityReservationId",'50');
        let facilityReservationDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
        facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), facilityReservationDetails);
        facilityReservationDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsMockData);
        instance.getFacilityReservationDetailsByIdApiCallId = facilityReservationDetails;
        runEngine.sendMessage("facility Reservation Details", facilityReservationDetails);
      });
    
      then("should check componentDidMount", () => {
        localStorage.setItem("facilityReservationId",'50');
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
      deleteExpense.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), facilityReservationDetailsMockData);
      instance.DeleteExpenseCallId = deleteExpense;
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

    then("I can go back to Create Facility Reservation page", async () => {
      const backButtonSpy = jest.spyOn(FacilityReservationMountWrapper.find(Button).at(0).props(), "onClick");
     console.log("backButtonSpy ==============>",FacilityReservationMountWrapper.find(Button).at(0).debug())
      FacilityReservationMountWrapper.find(Button).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });
     
  });
});
