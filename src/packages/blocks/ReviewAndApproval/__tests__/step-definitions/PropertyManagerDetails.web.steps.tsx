import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import PropertyManagerDetails from "../../src/PropertyManagerDetails.web";
import { mount } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Drawer } from "@material-ui/core";
import { Formik } from "formik";
import {
  componentProps,
  complexDetailsMockData,
  propertyManagerMockData,
} from "../../../../components/src/TestCase/PropertyManagerMockData.web";

const PropertyManagerDetailsProps = componentProps("PropertyManagerDetails", PropertyManagerStyleWeb);

const feature = loadFeature("./__tests__/features/PropertyManagerDetails.feature");

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
      propertyManagerDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyManagerMockData);
      instance.GetPropertyManagerDetailsCallId = propertyManagerDetails;
      runEngine.sendMessage("Property Manager Details", propertyManagerDetails);
    });

    then("Should delete the property manager", () => {
      let deletePropertyManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deletePropertyManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), deletePropertyManager);
      deletePropertyManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        message: "Delete",
      });
      instance.DeletePropertyManagerCallId = deletePropertyManager;
      runEngine.sendMessage("Delete Property Manager", deletePropertyManager);
    });

    then("Should delete the property when there is multiple property", () => {
      instance.setState({
        propertyManagerDetails: {
          propertyList: propertyManagerMockData.data.attributes.properties.data,
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
      deleteProperty.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), propertyManagerMockData);
      instance.DeletePropertyCallId = deleteProperty;
      runEngine.sendMessage("Delete Property", deleteProperty);
    });

    then("Should delete the property manager when there is single property", () => {
      instance.setState({
        propertyManagerDetails: {
          propertyList: [propertyManagerMockData.data.attributes.properties.data[0]],
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
          propertyList: propertyManagerMockData.data.attributes.properties.data,
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
