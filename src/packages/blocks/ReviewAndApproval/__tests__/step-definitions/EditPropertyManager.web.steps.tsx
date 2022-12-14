import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import EditPropertyManager from "../../src/EditPropertyManager.web";
import { mount } from "enzyme";
import { Drawer, ExpansionPanelActions, IconButton, Select } from "@material-ui/core";
import { Formik } from "formik";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";

const EditPropertyManagerProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "EditPropertyManager",
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

const feature = loadFeature("./__tests__/features/EditPropertyManager.feature");

const propertyManagerMockData = {
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
        data: [
          {
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
          },
        ],
      },
      id_proof: { id: 1, name: "Aadhar" },
      image: {
        url: "https://ti1finalleap-158677-ruby.b158677.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--99a5fc4d7dbe095d90dd11c37d60f835bcb28b61/sample.pdf",
      },
    },
  },
};

const idTypeListMockData = { relaions: [{ id: 1, name: "Aadhar" }] };

const propertyListMockData = {
  data: [
    {
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
    },
  ],
};

const createPropertyMockData = {
  data: {
    id: "28",
    type: "property",
    attributes: {
      id: 28,
      building_management_id: 3,
      apartment_management_id: 94,
      start_date: "2022-12-01",
      end_date: "2022-12-30",
      fees_type: "Fixed Amount",
      fixed_persentage_of_rent: "10 %",
      account_id: 173,
      property_manager_request_id: 38,
      building_management: {
        id: 3,
        name: "First Building",
      },
      apartment_management: {
        id: 94,
        apartment_name: "301",
      },
    },
  },
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to EditPropertyManager", ({ given, when, then }) => {
    let EditPropertyManagerMountWrapper: any;
    let instance: any;

    given("I am a User loading EditPropertyManager", () => {
      EditPropertyManagerMountWrapper = mount(<EditPropertyManager {...EditPropertyManagerProps} />);
    });

    when("I navigate to the EditPropertyManager", () => {
      instance = EditPropertyManagerMountWrapper.instance();
    });

    then("EditPropertyManager will load with out errors", () => {
      expect(EditPropertyManagerMountWrapper).toMatchSnapshot();
    });

    then("Should go back to property manager details", () => {
      const backButtonSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(IconButton).at(0).props(), "onClick");
      EditPropertyManagerMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should edit the property manager", () => {
      const formSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Formik).at(0).props(), "onSubmit");
      EditPropertyManagerMountWrapper.find(Formik)
        .at(0)
        .props()
        .onSubmit(
          {
            companyName: "",
            managerName: "",
            email: "",
            countryCode: "+971",
            mobileNumber: "",
            idType: "",
            idNumber: "",
            idDate: "",
            idCardFile: {},
          },
          { resetForm: () => jest.fn() }
        );
      expect(formSpy).toHaveBeenCalled();

      let editPropertyManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editPropertyManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), editPropertyManager);
      editPropertyManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: {} });
      instance.EditPropertyManagerCallId = editPropertyManager;
      runEngine.sendMessage("Edit Property Manager", editPropertyManager);
    });

    then("Should load the property manager details", () => {
      let propertyManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      propertyManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), propertyManager);
      propertyManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyManagerMockData);
      instance.GetPropertyManagerDetailCallId = propertyManager;
      runEngine.sendMessage("Property Manager Details", propertyManager);
    });

    then("Should open add property modal", () => {
      const addButtonSpy = jest.spyOn(
        EditPropertyManagerMountWrapper.find(".add-rent-history-btn").at(0).props(),
        "onClick"
      );
      EditPropertyManagerMountWrapper.find(".add-rent-history-btn").at(0).props().onClick();
      expect(addButtonSpy).toHaveBeenCalled();
    });

    then("Should close add property modal", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      EditPropertyManagerMountWrapper.update();

      const closeButtonSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Drawer).at(0).props(), "onClose");
      EditPropertyManagerMountWrapper.find(Drawer).at(0).props().onClose();
      expect(closeButtonSpy).toHaveBeenCalled();
      expect(instance.state.isAddPropertyModalOpen).toEqual(false);
    });

    then("Should load property list", () => {
      let propertyList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      propertyList.addData(getName(MessageEnum.RestAPIResponceDataMessage), propertyList);
      propertyList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyListMockData);
      instance.GetPropertyListCallId = propertyList;
      runEngine.sendMessage("Property List", propertyList);
    });

    then("Should open the edit property modal", () => {
      instance.setState({ propertyList: propertyListMockData.data });
      EditPropertyManagerMountWrapper.update();

      const editButtonSpy = jest.spyOn(
        EditPropertyManagerMountWrapper.find("img.edit-property-icon").at(0).props(),
        "onClick"
      );
      EditPropertyManagerMountWrapper.find("img.edit-property-icon").at(0).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
      expect(instance.state.isAddPropertyModalOpen).toEqual(true);
    });

    then("Should delete the property", () => {
      instance.setState({ propertyList: propertyListMockData.data });
      EditPropertyManagerMountWrapper.update();

      const deleteButtonSpy = jest.spyOn(
        EditPropertyManagerMountWrapper.find("img.delete-property-icon").at(0).props(),
        "onClick"
      );
      EditPropertyManagerMountWrapper.find("img.delete-property-icon").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();

      let deleteProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteProperty);
      deleteProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {});
      instance.DeletePropertyCallId = deleteProperty;
      runEngine.sendMessage("Delete Property", deleteProperty);
    });

    then("Should load the ID type list", () => {
      instance.setState({ idTypeList: idTypeListMockData.relaions });
      EditPropertyManagerMountWrapper.update();

      expect(instance.state.idTypeList.length).toBeGreaterThan(0);
    });

    then("Should add the property for property manager", () => {
      instance.setState({ isAddPropertyModalOpen: true, propertyId: "", editManagerId: "12" });
      EditPropertyManagerMountWrapper.update();

      const formSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Formik).at(1).props(), "onSubmit");
      EditPropertyManagerMountWrapper.find(Formik)
        .at(1)
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

      let createProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), createProperty);
      createProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), createPropertyMockData);
      instance.CreatePropertyCallId = createProperty;
      runEngine.sendMessage("Create Property", createProperty);
    });

    then("Should edit the property for property manager", () => {
      instance.setState({ isAddPropertyModalOpen: true, propertyId: "12", editManagerId: "12" });
      EditPropertyManagerMountWrapper.update();

      const formSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Formik).at(1).props(), "onSubmit");
      EditPropertyManagerMountWrapper.find(Formik)
        .at(1)
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

      let editProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), editProperty);
      editProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), createPropertyMockData);
      instance.EditPropertyCallId = editProperty;
      runEngine.sendMessage("Edit Property", editProperty);
    });

    then("Should check property manager available for unit", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      EditPropertyManagerMountWrapper.update();

      const unitSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Select).at(3).props(), "onChange");
      EditPropertyManagerMountWrapper.find(Select)
        .at(3)
        .props()
        .onChange({ target: { value: "12" } });
      expect(unitSpy).toHaveBeenCalled();
    });

    then("Should call the unit api when building change", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      EditPropertyManagerMountWrapper.update();

      const unitSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Select).at(2).props(), "onChange");
      EditPropertyManagerMountWrapper.find(Select)
        .at(2)
        .props()
        .onChange({ target: { value: "12" } });
      expect(unitSpy).toHaveBeenCalled();
    });
  });
});
