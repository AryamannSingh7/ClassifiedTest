import { defineFeature, loadFeature } from "jest-cucumber";
import React, { Component } from "react";
import { PropertyManagerStyleWeb } from "../../src/PropertyManagerStyle.web";
import RegisterPropertyManager from "../../src/RegisterPropertyManager.web";
import { mount } from "enzyme";
import { Drawer, Select } from "@material-ui/core";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Formik } from "formik";

const RegisterPropertyManagerProps = {
  navigation: {
    getParam: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "RegisterPropertyManager",
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

const feature = loadFeature("./__tests__/features/RegisterPropertyManager.feature");

const propertyListMockData = [
  {
    country: "India",
    city: "Bhopal",
    buildingId: "3",
    unitId: "3",
    buildingName: "DFG",
    unitName: "123",
    startDate: "12-12-2022",
    endDate: "12-01-2023",
    feeType: "Fixed Payment",
    rent: "1200",
  },
];

const buildingListMockData = {
  buildings: [
    {
      id: 3,
      name: "First Building",
    },
  ],
};

const unitListMockData = {
  apartments: [
    {
      id: 94,
      apartment_name: "301",
    },
    {
      id: 89,
      apartment_name: "102",
    },
  ],
};

const idTypeListMockData = { relaions: [{ id: 1, name: "Aadhar" }] };

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

const localStorageMock = (() => {
  let store: any = {};

  return {
    getItem(key: any) {
      return store[key] || null;
    },
    setItem(key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: any) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: localStorageMock,
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    window.sessionStorage.clear();
  });

  test("User navigates to RegisterPropertyManager", ({ given, when, then }) => {
    beforeEach(() => {
      window.sessionStorage.setItem("propertyList", JSON.stringify(propertyListMockData));
    });
    let RegisterPropertyManagerMountWrapper: any;
    let instance: any;

    given("I am a User loading RegisterPropertyManager", () => {
      RegisterPropertyManagerMountWrapper = mount(<RegisterPropertyManager {...RegisterPropertyManagerProps} />);
    });

    when("I navigate to the RegisterPropertyManager", () => {
      instance = RegisterPropertyManagerMountWrapper.instance();
    });

    then("RegisterPropertyManager will load with out errors", () => {
      expect(RegisterPropertyManagerMountWrapper).toMatchSnapshot();
    });

    then("Should open the edit modal", () => {
      const editButtonSpy = jest.spyOn(
        RegisterPropertyManagerMountWrapper.find("img.edit-property-icon").at(0).props(),
        "onClick"
      );
      RegisterPropertyManagerMountWrapper.find("img.edit-property-icon").at(0).props().onClick();
      expect(editButtonSpy).toHaveBeenCalled();
      expect(instance.state.isAddPropertyModalOpen).toEqual(true);
    });

    then("Should delete the property at local level", () => {
      const deleteButtonSpy = jest.spyOn(
        RegisterPropertyManagerMountWrapper.find("img.delete-property-icon").at(0).props(),
        "onClick"
      );
      RegisterPropertyManagerMountWrapper.find("img.delete-property-icon").at(0).props().onClick();
      expect(deleteButtonSpy).toHaveBeenCalled();
    });

    then("Should open add property modal", () => {
      const addButtonSpy = jest.spyOn(
        RegisterPropertyManagerMountWrapper.find(".add-rent-history-btn").at(0).props(),
        "onClick"
      );
      RegisterPropertyManagerMountWrapper.find(".add-rent-history-btn").at(0).props().onClick();
      expect(addButtonSpy).toHaveBeenCalled();
    });

    then("Should close add property modal", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      RegisterPropertyManagerMountWrapper.update();

      const closeButtonSpy = jest.spyOn(RegisterPropertyManagerMountWrapper.find(Drawer).at(0).props(), "onClose");
      RegisterPropertyManagerMountWrapper.find(Drawer).at(0).props().onClose();
      expect(closeButtonSpy).toHaveBeenCalled();
      expect(instance.state.isAddPropertyModalOpen).toEqual(false);
    });

    then("Should load the ID type list", () => {
      let idTypeList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      idTypeList.addData(getName(MessageEnum.RestAPIResponceDataMessage), idTypeList);
      idTypeList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), idTypeListMockData);
      instance.GetIDTypeListCallId = idTypeList;
      runEngine.sendMessage("ID Type List", idTypeList);
    });

    then("Should register the property manager", () => {
      instance.setState({ propertyList: propertyListMockData });
      RegisterPropertyManagerMountWrapper.update();

      const formSpy = jest.spyOn(RegisterPropertyManagerMountWrapper.find(Formik).at(0).props(), "onSubmit");
      RegisterPropertyManagerMountWrapper.find(Formik)
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
            idCardFile: null,
          },
          { resetForm: () => jest.fn() }
        );
      expect(formSpy).toHaveBeenCalled();

      let createPropertyManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createPropertyManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), createPropertyManager);
      createPropertyManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: {} });
      instance.CreatePropertyManagerCallId = createPropertyManager;
      runEngine.sendMessage("Create Property Manager", createPropertyManager);
    });
  });

  test("Add And Edit Property", ({ given, when, then }) => {
    let RegisterPropertyManagerMountWrapper: any;
    let instance: any;

    given("I am a User loading RegisterPropertyManager", () => {
      RegisterPropertyManagerMountWrapper = mount(<RegisterPropertyManager {...RegisterPropertyManagerProps} />);
      instance = RegisterPropertyManagerMountWrapper.instance();
    });

    when("I navigate to the RegisterPropertyManager", () => {
      expect(RegisterPropertyManagerMountWrapper).toMatchSnapshot();
    });

    then("Should load the building list", () => {
      instance.setState({ isAddPropertyModalOpen: true, buildingList: buildingListMockData.buildings });
      RegisterPropertyManagerMountWrapper.update();

      let buildingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingList);
      buildingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingListMockData);
      instance.GetBuildingListCallId = buildingList;
      runEngine.sendMessage("Building List", buildingList);
    });

    then("Should load the unit list", () => {
      instance.setState({ isAddPropertyModalOpen: true, unitList: unitListMockData.apartments });
      RegisterPropertyManagerMountWrapper.update();

      let unitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitList);
      unitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitListMockData);
      instance.GetUnitListCallId = unitList;
      runEngine.sendMessage("Unit List", unitList);
    });

    then("Should load complex details", () => {
      let complexDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      complexDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), complexDetails);
      complexDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), complexDetailsMockData);
      instance.GetComplexDetailsCallId = complexDetails;
      runEngine.sendMessage("Complex Details", complexDetails);
    });

    then("Should call the unit api when building change", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      RegisterPropertyManagerMountWrapper.update();

      const unitSpy = jest.spyOn(RegisterPropertyManagerMountWrapper.find(Select).at(2).props(), "onChange");
      RegisterPropertyManagerMountWrapper.find(Select)
        .at(2)
        .props()
        .onChange({ target: { value: "12" } });
      expect(unitSpy).toHaveBeenCalled();
    });

    then("Should check property manager available for unit", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      RegisterPropertyManagerMountWrapper.update();

      const unitSpy = jest.spyOn(RegisterPropertyManagerMountWrapper.find(Select).at(3).props(), "onChange");
      RegisterPropertyManagerMountWrapper.find(Select)
        .at(3)
        .props()
        .onChange({ target: { value: "12" } });
      expect(unitSpy).toHaveBeenCalled();

      let isAvailableManager = new Message(getName(MessageEnum.RestAPIResponceMessage));
      isAvailableManager.addData(getName(MessageEnum.RestAPIResponceDataMessage), isAvailableManager);
      isAvailableManager.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { message: "yes" });
      instance.CheckPropertyManagerAvailableCallId = isAvailableManager;
      runEngine.sendMessage("Check Property Manager Available", isAvailableManager);
    });

    then("Should add the property", () => {
      instance.setState({ isAddPropertyModalOpen: true });
      RegisterPropertyManagerMountWrapper.update();

      const formSpy = jest.spyOn(RegisterPropertyManagerMountWrapper.find(Formik).at(1).props(), "onSubmit");
      RegisterPropertyManagerMountWrapper.find(Formik)
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
    });

    then("Should edit the property", () => {
      instance.setState({ isAddPropertyModalOpen: true, propertyId: "12" });
      RegisterPropertyManagerMountWrapper.update();

      const formSpy = jest.spyOn(RegisterPropertyManagerMountWrapper.find(Formik).at(1).props(), "onSubmit");
      RegisterPropertyManagerMountWrapper.find(Formik)
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
    });
  });
});
