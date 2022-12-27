import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import EditPropertyManager from "../../src/EditPropertyManager.web";
import { mount } from "enzyme";
import { Drawer, IconButton, Select } from "@material-ui/core";
import { Formik } from "formik";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import {
  propertyManagerMockData,
  idTypeListMockData,
  propertyListMockData,
  buildingListMockData,
  unitListMockData,
  propertyFormMockData,
} from "../../../../components/src/TestCase/PropertyManagerMockData.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";

const EditPropertyManagerProps = componentProps("EditPropertyManager", PropertyManagerStyleWeb);

const feature = loadFeature("./__tests__/features/EditPropertyManager.feature");

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
        .onSubmit(propertyFormMockData[0], { resetForm: () => jest.fn() });
      expect(formSpy).toHaveBeenCalled();

      let createProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), createProperty);
      createProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: {} });
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
        .onSubmit(propertyFormMockData[0], { resetForm: () => jest.fn() });
      expect(formSpy).toHaveBeenCalled();

      let editProperty = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editProperty.addData(getName(MessageEnum.RestAPIResponceDataMessage), editProperty);
      editProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: {} });
      instance.EditPropertyCallId = editProperty;
      runEngine.sendMessage("Edit Property", editProperty);
    });

    then("Should check property manager available for unit", () => {
      instance.setState({ isAddPropertyModalOpen: true, unitList: unitListMockData.apartments });
      EditPropertyManagerMountWrapper.update();

      const unitSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Select).at(3).props(), "onChange");
      EditPropertyManagerMountWrapper.find(Select)
        .at(3)
        .props()
        .onChange({ target: { value: "12" } });
      expect(unitSpy).toHaveBeenCalled();
    });

    then("Should call the unit api when building change", () => {
      instance.setState({ isAddPropertyModalOpen: true, buildingList: buildingListMockData.buildings });
      EditPropertyManagerMountWrapper.update();

      const buildingSpy = jest.spyOn(EditPropertyManagerMountWrapper.find(Select).at(2).props(), "onChange");
      EditPropertyManagerMountWrapper.find(Select)
        .at(2)
        .props()
        .onChange({ target: { value: "12" } });
      expect(buildingSpy).toHaveBeenCalled();
    });
  });
});
