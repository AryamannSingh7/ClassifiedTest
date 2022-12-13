import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import PropertyManagerDetails from "../../src/PropertyManagerDetails.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Drawer } from "@material-ui/core";
import { Formik } from "formik";

const PropertyManagerDetailsProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "PropertyManagerDetails",
  classes: PropertyManagerStyleWeb,
};

jest.mock("@material-ui/core/styles", () => ({
  withStyles: (styles: any) => (component: Component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));

const feature = loadFeature("./__tests__/features/PropertyManagerDetails.feature");

const propertyList = {
  id: "27",
  type: "property",
  attributes: {
    id: 27,
    building_management_id: 3,
    apartment_management_id: 89,
    start_date: "2022-12-01",
    end_date: "2022-12-30",
    fees_type: "Fixed Percentage",
    fixed_persentage_of_rent: "10 %",
    account_id: 173,
    property_manager_request_id: 38,
    building_management: {
      id: 3,
      name: "First Building",
    },
    apartment_management: {
      id: 89,
      apartment_name: "102",
    },
  },
};

const propertyManagerDetailsMockData = {
  data: {
    id: "38",
    type: "property_manager_request",
    attributes: {
      id: 38,
      company_name: "google",
      name: "JohnDeo",
      email: "johndow147@yopmail.com",
      mobile_number: "+1284-14245672",
      id_number: "1234 1212 2323 4546",
      id_expiration_date: "2022-12-01",
      properties: {
        data: [propertyList, propertyList],
      },
      id_proof: { id: 1, name: "Aadhar" },
      account: {
        id: 425,
        full_phone_number: "+1284-14245672",
        email: "johndow147@yopmail.com",
        full_name: "JohnDeo",
      },
      image: {
        url: "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--99a5fc4d7dbe095d90dd11c37d60f835bcb28b61/sample.pdf",
      },
    },
  },
};

const deletePropertyManagerMockData = {
  message: "Delete",
};

const complexDetailsMockData = {
  complex: {
    id: 5,
    name: "New Society",
  },
  complex_address: {
    id: 5,
    country: "India",
    latitude: 23.9998,
    longitude: 12.345,
    address: "1, Plaza",
    state: "Madya Pradesh",
    city: "Bhopal",
    region: "",
  },
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to PropertyManagerDetails", ({ given, when, then }) => {
    let PropertyManagerDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading PropertyManagerDetails", () => {
      PropertyManagerDetailsMountWrapper = mount(<PropertyManagerDetails {...PropertyManagerDetailsProps} />);
    });

    when("I navigate to the PropertyManagerDetails", () => {
      instance = PropertyManagerDetailsMountWrapper.instance();
      console.log(instance);
    });

    then("PropertyManagerDetails will load with out errors", () => {
      expect(PropertyManagerDetailsMountWrapper).toMatchSnapshot();
    });

    then("Should navigate to edit property manager", () => {
      const editButtonSpy = jest.spyOn(PropertyManagerDetailsMountWrapper.find("img").at(0).props(), "onClick");
      PropertyManagerDetailsMountWrapper.find("img").at(0).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
    });

    then("Should delete the property manager", () => {
      const editButtonSpy = jest.spyOn(PropertyManagerDetailsMountWrapper.find("img").at(1).props(), "onClick");
      PropertyManagerDetailsMountWrapper.find("img").at(1).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
    });

    then("Should load property manager details", () => {
      let propertyManagerDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      propertyManagerDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), propertyManagerDetails);
      propertyManagerDetails.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        propertyManagerDetailsMockData
      );
      instance.GetPropertyManagerDetailsCallId = propertyManagerDetails;
      runEngine.sendMessage("Property Manager Details", propertyManagerDetails);
    });

    then("Should delete the property manager", () => {
      let deletePropertyManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deletePropertyManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), deletePropertyManager);
      deletePropertyManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), deletePropertyManagerMockData);
      instance.DeletePropertyManagerCallId = deletePropertyManager;
      runEngine.sendMessage("Delete Property Manager", deletePropertyManager);
    });

    then("Should delete the property when there is multiple property", () => {
      instance.setState({
        propertyManagerDetails: {
          propertyList: propertyManagerDetailsMockData.data.attributes.properties.data,
        },
      });
      PropertyManagerDetailsMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(
        PropertyManagerDetailsMountWrapper.find("img.delete-property-image").at(0).props(),
        "onClick"
      );
      PropertyManagerDetailsMountWrapper.find("img.delete-property-image").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteProperty);
      deleteProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyManagerDetailsMockData);
      instance.DeletePropertyCallId = deleteProperty;
      runEngine.sendMessage("Delete Property", deleteProperty);
    });

    then("Should delete the property manager when there is single property", () => {
      instance.setState({
        propertyManagerDetails: {
          propertyList: [propertyList],
        },
      });
      PropertyManagerDetailsMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(
        PropertyManagerDetailsMountWrapper.find("img.delete-property-image").at(0).props(),
        "onClick"
      );
      PropertyManagerDetailsMountWrapper.find("img.delete-property-image").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();
    });

    then("Should load complex details in form", () => {
      let complexDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      complexDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), complexDetails);
      complexDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), complexDetailsMockData);
      instance.GetComplexDetailsCallId = complexDetails;
      runEngine.sendMessage("Complex Details", complexDetails);
    });

    then("Should edit the property", () => {
      instance.setState({
        propertyManagerDetails: {
          propertyList: propertyManagerDetailsMockData.data.attributes.properties.data,
        },
      });
      PropertyManagerDetailsMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(
        PropertyManagerDetailsMountWrapper.find("img.edit-property-image").at(0).props(),
        "onClick"
      );
      PropertyManagerDetailsMountWrapper.find("img.edit-property-image").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();
      expect(instance.state.isEditPropertyModalOpen).toEqual(true);

      let editProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), editProperty);
      editProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {});
      instance.EditPropertyCallId = editProperty;
      runEngine.sendMessage("Edit Property", editProperty);
    });

    then("Should close the edit modal when click outside of modal", () => {
      const editModalSpy = jest.spyOn(PropertyManagerDetailsMountWrapper.find(Drawer).at(0).props(), "onClose");
      PropertyManagerDetailsMountWrapper.find(Drawer).at(0).props().onClose();
      expect(editModalSpy).toHaveBeenCalled();
      expect(instance.state.isEditPropertyModalOpen).toEqual(false);
    });

    then("Should submit the edit form", () => {
      instance.setState({ isEditPropertyModalOpen: true });
      PropertyManagerDetailsMountWrapper.update();

      const formSpy = jest.spyOn(PropertyManagerDetailsMountWrapper.find(Formik).at(0).props(), "onSubmit");
      PropertyManagerDetailsMountWrapper.find(Formik)
        .at(0)
        .props()
        .onSubmit(
          {
            country: "",
            city: "",
            buildingId: "",
            unitId: "",
            buildingName: "",
            unitName: "",
            startDate: "",
            endDate: "",
            feeType: "",
            rent: "",
          },
          { resetForm: () => jest.fn() }
        );
      expect(formSpy).toHaveBeenCalled();
    });
  });
});
