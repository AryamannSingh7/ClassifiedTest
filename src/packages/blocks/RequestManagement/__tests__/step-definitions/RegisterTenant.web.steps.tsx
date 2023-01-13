import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import RegisterTenant from "../../src/RegisterTenant.web";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { TenantStyle } from "../../src/TenantStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { fileMockData, tenantMockData, myTenantForm } from "../../../../components/src/TestCase/MyTenantsMockData.web";
import { buildingListMockData, idTypeListMockData, unitListMockData } from "../../../../components/src/TestCase/PropertyManagerMockData.web";
import { Formik } from "formik";
import { Button, IconButton, Input, Select } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const RegisterTenantProps = componentProps("RegisterTenant", TenantStyle);

const feature = loadFeature("./__tests__/features/RegisterTenant.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to RegisterTenant", ({ given, when, then }) => {
    let RegisterTenantMountWrapper: any;
    let instance: any;

    given("I am a User loading RegisterTenant", () => {
      RegisterTenantMountWrapper = mount(<RegisterTenant {...RegisterTenantProps} />);
    });

    when("I navigate to the RegisterTenant", () => {
      instance = RegisterTenantMountWrapper.instance();
    });

    then("RegisterTenant will load with out errors", () => {
      expect(RegisterTenantMountWrapper).toMatchSnapshot();
    });

    then("Should load the building list", () => {
      const ownBuildingList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      ownBuildingList.addData(getName(MessageEnum.RestAPIResponceDataMessage), ownBuildingList);
      ownBuildingList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingListMockData);
      instance.GetBuildingListCallId = ownBuildingList;
      runEngine.sendMessage("Building List", ownBuildingList);
    });

    then("Should load the Id type list", () => {
      const idTypeList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      idTypeList.addData(getName(MessageEnum.RestAPIResponceDataMessage), idTypeList);
      idTypeList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), idTypeListMockData);
      instance.GetIDTypeListCallId = idTypeList;
      runEngine.sendMessage("ID Type List", idTypeList);
    });

    then("Should load the unit list when building select", () => {
      const selectBuildingSpy = jest.spyOn(RegisterTenantMountWrapper.find(Select).at(2).props(), "onChange");
      RegisterTenantMountWrapper.find(Select).at(2).props().onChange({ target: { value: "12" } });
      expect(selectBuildingSpy).toHaveBeenCalled();

      const ownUnitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      ownUnitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), ownUnitList);
      ownUnitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), unitListMockData);
      instance.GetUnitListCallId = ownUnitList;
      runEngine.sendMessage("Own Unit List", ownUnitList);
    });

    then("Should check tenant exist for selected unit", () => {
      const selectUnitSpy = jest.spyOn(RegisterTenantMountWrapper.find(Select).at(3).props(), "onChange");
      RegisterTenantMountWrapper.find(Select).at(3).props().onChange({ target: { value: "12" } });
      expect(selectUnitSpy).toHaveBeenCalled();

      const checkTenant = new Message(getName(MessageEnum.RestAPIResponceMessage));
      checkTenant.addData(getName(MessageEnum.RestAPIResponceDataMessage), checkTenant);
      checkTenant.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { account: tenantMockData });
      instance.IsTenantExistCallId = checkTenant;
      runEngine.sendMessage("Check Tenant Exist", checkTenant);
    });

    then("Should select tenant type", () => {
      const tenantTypeSpy = jest.spyOn(RegisterTenantMountWrapper.find(Select).at(0).props(), "onChange");
      RegisterTenantMountWrapper.find(Select).at(0).props().onChange({ target: { value: "12" } });
      expect(tenantTypeSpy).toHaveBeenCalled();
    });

    then("Should change tenant name", () => {
      const tenantNameSpy = jest.spyOn(RegisterTenantMountWrapper.find(Input).at(0).props(), "onChange");
      RegisterTenantMountWrapper.find(Input).at(0).props().onChange({ target: { value: "12" } });
      expect(tenantNameSpy).toHaveBeenCalled();
    });

    then("Should select the country code", () => {
      const countryCodeSpy = jest.spyOn(RegisterTenantMountWrapper.find(Select).at(1).props(), "onChange");
      RegisterTenantMountWrapper.find(Select).at(1).props().onChange({ target: { value: "12" } });
      expect(countryCodeSpy).toHaveBeenCalled();
    });

    then("Should change the phone number", () => {
      const phoneSpy = jest.spyOn(RegisterTenantMountWrapper.find(Input).at(1).props(), "onChange");
      RegisterTenantMountWrapper.find(Input).at(1).props().onChange({ target: { value: "12" } });
      expect(phoneSpy).toHaveBeenCalled();
    });

    then("Should change the email", () => {
      const emailSpy = jest.spyOn(RegisterTenantMountWrapper.find(Input).at(2).props(), "onChange");
      RegisterTenantMountWrapper.find(Input).at(2).props().onChange({ target: { value: "12" } });
      expect(emailSpy).toHaveBeenCalled();
    });

    then("Should select the id type", () => {
      const idTypeSpy = jest.spyOn(RegisterTenantMountWrapper.find(Select).at(4).props(), "onChange");
      RegisterTenantMountWrapper.find(Select).at(4).props().onChange({ target: { value: "12" } });
      expect(idTypeSpy).toHaveBeenCalled();
    });

    then("Should change the id number", () => {
      const idNumberSpy = jest.spyOn(RegisterTenantMountWrapper.find(Input).at(3).props(), "onChange");
      RegisterTenantMountWrapper.find(Input).at(3).props().onChange({ target: { value: "12" } });
      expect(idNumberSpy).toHaveBeenCalled();
    });

    then("Should change the id expiry date", () => {
      const idDateSpy = jest.spyOn(RegisterTenantMountWrapper.find(Input).at(4).props(), "onChange");
      RegisterTenantMountWrapper.find(Input).at(4).props().onChange({ target: { value: "12" } });
      expect(idDateSpy).toHaveBeenCalled();
    });

    then("Should upload the id card file", () => {
      const idFileSpy = jest.spyOn(RegisterTenantMountWrapper.find(".upload-box").at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(".upload-box").at(0).props().onClick();
      expect(idFileSpy).toHaveBeenCalled();

      instance.setState({ registerTenantForm: { idCard: [fileMockData], otherDocument: [fileMockData] } });
      RegisterTenantMountWrapper.update();
    });

    then("Should upload the other document files", () => {
      const otherFileSpy = jest.spyOn(RegisterTenantMountWrapper.find(".upload-box").at(1).props(), "onClick");
      RegisterTenantMountWrapper.find(".upload-box").at(1).props().onClick();
      expect(otherFileSpy).toHaveBeenCalled();
    });

    then("Should remove the id card file", () => {
      instance.setState({ registerTenantForm: { idCard: [fileMockData], otherDocument: [fileMockData] } });
      RegisterTenantMountWrapper.update();

      const idFileCloseSpy = jest.spyOn(RegisterTenantMountWrapper.find(CloseIcon).at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(CloseIcon).at(0).props().onClick();
      expect(idFileCloseSpy).toHaveBeenCalled();
    });

    then("Should remove the other document files", () => {
      instance.setState({ registerTenantForm: { idCard: [fileMockData], otherDocument: [fileMockData] } });
      RegisterTenantMountWrapper.update();

      const otherFileCloseSpy = jest.spyOn(RegisterTenantMountWrapper.find(CloseIcon).at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(CloseIcon).at(0).props().onClick();
      expect(otherFileCloseSpy).toHaveBeenCalled();
    });

    then("Should change the page when submit the form", () => {
      const formSpy = jest.spyOn(RegisterTenantMountWrapper.find(Formik).at(0).props(), "onSubmit");
      RegisterTenantMountWrapper.find(Formik).at(0).props().onSubmit(myTenantForm, { resetForm: () => jest.fn() });
      expect(formSpy).toHaveBeenCalled();
    });
  });

  test("Contract page", ({ given, when, then }) => {
    let RegisterTenantMountWrapper: any;
    let instance: any;

    given("I am a User loading RegisterTenant", () => {
      RegisterTenantMountWrapper = mount(<RegisterTenant {...RegisterTenantProps} />);
    });

    when("RegisterTenant will load with out errors", () => {
      instance = RegisterTenantMountWrapper.instance();
      expect(RegisterTenantMountWrapper).toMatchSnapshot();
    });

    then("Should go back to register tenant page", () => {
      instance.setState({ isRegisterTenantOpen: false });
      RegisterTenantMountWrapper.update();

      const backButtonSpy = jest.spyOn(RegisterTenantMountWrapper.find(IconButton).at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });

    then("Should remove contract", () => {
      instance.setState({ isRegisterTenantOpen: false, contract: fileMockData });
      RegisterTenantMountWrapper.update();

      const removeButtonSpy = jest.spyOn(RegisterTenantMountWrapper.find(IconButton).at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(IconButton).at(0).props().onClick();
      expect(removeButtonSpy).toHaveBeenCalled();
    });

    then("Should submit tenant for contract", () => {
      instance.setState({ isRegisterTenantOpen: false, contract: fileMockData });
      RegisterTenantMountWrapper.update();

      const submitButtonSpy = jest.spyOn(RegisterTenantMountWrapper.find(Button).at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(Button).at(0).props().onClick();
      expect(submitButtonSpy).toHaveBeenCalled();

      const createTenant = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createTenant.addData(getName(MessageEnum.RestAPIResponceDataMessage), createTenant);
      createTenant.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: { id: "12" } });
      instance.CreateTenantForContractCallId = createTenant;
      runEngine.sendMessage("Create Tenant", createTenant);
    });

    then("Should load the tenant details", () => {
      const tenantDetail = new Message(getName(MessageEnum.RestAPIResponceMessage));
      tenantDetail.addData(getName(MessageEnum.RestAPIResponceDataMessage), tenantDetail);
      tenantDetail.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, tenant: { data: tenantMockData } });
      instance.GetTenantDetailsCallId = tenantDetail;
      runEngine.sendMessage("Tenant Details", tenantDetail);

      const createContract = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createContract.addData(getName(MessageEnum.RestAPIResponceDataMessage), createContract);
      createContract.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200 });
      instance.CreateContractCallId = createContract;
      runEngine.sendMessage("Create Contract", createContract);
    });

    then("Should upload the contract", () => {
      instance.setState({ isRegisterTenantOpen: false, contract: null });
      RegisterTenantMountWrapper.update();

      const uploadButtonSpy = jest.spyOn(RegisterTenantMountWrapper.find(".upload-box").at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(".upload-box").at(0).props().onClick();
      expect(uploadButtonSpy).toHaveBeenCalled();
    });

    then("Should issue the contract now", () => {
      instance.setState({ isRegisterTenantOpen: false, contract: null });
      RegisterTenantMountWrapper.update();

      const nowButtonSpy = jest.spyOn(RegisterTenantMountWrapper.find(Button).at(0).props(), "onClick");
      RegisterTenantMountWrapper.find(Button).at(0).props().onClick();
      expect(nowButtonSpy).toHaveBeenCalled();
    });

    then("Should issue the contract later", () => {
      instance.setState({ isRegisterTenantOpen: false, contract: null });
      RegisterTenantMountWrapper.update();

      const laterButtonSpy = jest.spyOn(RegisterTenantMountWrapper.find(Button).at(1).props(), "onClick");
      RegisterTenantMountWrapper.find(Button).at(1).props().onClick();
      expect(laterButtonSpy).toHaveBeenCalled();

      const createOnlyTenant = new Message(getName(MessageEnum.RestAPIResponceMessage));
      createOnlyTenant.addData(getName(MessageEnum.RestAPIResponceDataMessage), createOnlyTenant);
      createOnlyTenant.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: { id: "12" } });
      instance.CreateTenantCallId = createOnlyTenant;
      runEngine.sendMessage("Create Tenant", createOnlyTenant);
    });
  });
});
