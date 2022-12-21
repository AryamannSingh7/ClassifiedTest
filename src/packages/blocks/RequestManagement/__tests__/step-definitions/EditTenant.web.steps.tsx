import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import EditTenant from "../../src/EditTenant.web";
import { mount } from "enzyme";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { TenantStyle } from "../../src/TenantStyle.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { fileMockData, tenantMockData, myTenantForm } from "../../../../components/src/TestCase/MyTenantsMockData.web";
import { BrowserRouter } from 'react-router-dom';
import { Input, Select } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import { idTypeListMockData } from "../../../../components/src/TestCase/PropertyManagerMockData.web";

const EditTenantProps = componentProps("EditTenant", TenantStyle);

const feature = loadFeature("./__tests__/features/EditTenant.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to EditTenant", ({ given, when, then }) => {
    let EditTenantMountWrapper: any;
    let instance: any;

    given("I am a User loading EditTenant", () => {
      EditTenantMountWrapper = mount(<EditTenant {...EditTenantProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the EditTenant", () => {
      instance = EditTenantMountWrapper.instance();
    });

    then("EditTenant will load with out errors", () => {
      expect(EditTenantMountWrapper).toMatchSnapshot();
    });

    then("Should load tenant details for edit", () => {
      let tenantDetailsForEdit = new Message(getName(MessageEnum.RestAPIResponceMessage));
      tenantDetailsForEdit.addData(getName(MessageEnum.RestAPIResponceDataMessage), tenantDetailsForEdit);
      tenantDetailsForEdit.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { code: 200, tenant: { data: tenantMockData } });
      instance.GetTenantDetailsForEditCallId = tenantDetailsForEdit;
      runEngine.sendMessage("My Tenant Details", tenantDetailsForEdit);
    });

    then("Should select tenant type", () => {
      const tenantTypeEditSpy = jest.spyOn(EditTenantMountWrapper.find(Select).at(0).props(), "onChange");
      EditTenantMountWrapper.find(Select).at(0).props().onChange({ target: { value: "12" } });
      expect(tenantTypeEditSpy).toHaveBeenCalled();
    });

    then("Should change tenant name", () => {
      const tenantNameEditSpy = jest.spyOn(EditTenantMountWrapper.find(Input).at(0).props(), "onChange");
      EditTenantMountWrapper.find(Input).at(0).props().onChange({ target: { value: "12" } });
      expect(tenantNameEditSpy).toHaveBeenCalled();
    });

    then("Should select the country code", () => {
      const countryCodeEditSpy = jest.spyOn(EditTenantMountWrapper.find(Select).at(1).props(), "onChange");
      EditTenantMountWrapper.find(Select).at(1).props().onChange({ target: { value: "12" } });
      expect(countryCodeEditSpy).toHaveBeenCalled();
    });

    then("Should change the phone number", () => {
      const phoneEditSpy = jest.spyOn(EditTenantMountWrapper.find(Input).at(1).props(), "onChange");
      EditTenantMountWrapper.find(Input).at(1).props().onChange({ target: { value: "12" } });
      expect(phoneEditSpy).toHaveBeenCalled();
    });

    then("Should select the id type", () => {
      instance.setState({ idTypeList: idTypeListMockData.relaions });
      EditTenantMountWrapper.update();

      const idTypeEditSpy = jest.spyOn(EditTenantMountWrapper.find(Select).at(2).props(), "onChange");
      EditTenantMountWrapper.find(Select).at(2).props().onChange({ target: { value: "12" } });
      expect(idTypeEditSpy).toHaveBeenCalled();
    });

    then("Should change the id number", () => {
      const idNumberEditSpy = jest.spyOn(EditTenantMountWrapper.find(Input).at(5).props(), "onChange");
      EditTenantMountWrapper.find(Input).at(5).props().onChange({ target: { value: "12" } });
      expect(idNumberEditSpy).toHaveBeenCalled();
    });

    then("Should change the id expiry date", () => {
      const idDateEditSpy = jest.spyOn(EditTenantMountWrapper.find(Input).at(6).props(), "onChange");
      EditTenantMountWrapper.find(Input).at(6).props().onChange({ target: { value: "12" } });
      expect(idDateEditSpy).toHaveBeenCalled();
    });

    then("Should upload the id card file", () => {
      const idFileEditSpy = jest.spyOn(EditTenantMountWrapper.find(".upload-box").at(0).props(), "onClick");
      EditTenantMountWrapper.find(".upload-box").at(0).props().onClick();
      expect(idFileEditSpy).toHaveBeenCalled();

      instance.setState({ registerTenantForm: { idCard: [fileMockData], otherDocument: [fileMockData] } });
      EditTenantMountWrapper.update();
    });

    then("Should upload the other document files", () => {
      const otherFileEditSpy = jest.spyOn(EditTenantMountWrapper.find(".upload-box").at(1).props(), "onClick");
      EditTenantMountWrapper.find(".upload-box").at(1).props().onClick();
      expect(otherFileEditSpy).toHaveBeenCalled();
    });

    then("Should remove the id card file", () => {
      instance.setState({ registerTenantForm: { idCard: [fileMockData], otherDocument: [fileMockData] } });
      EditTenantMountWrapper.update();

      const idFileCloseEditSpy = jest.spyOn(EditTenantMountWrapper.find(CloseIcon).at(0).props(), "onClick");
      EditTenantMountWrapper.find(CloseIcon).at(0).props().onClick();
      expect(idFileCloseEditSpy).toHaveBeenCalled();
    });

    then("Should remove the other document files", () => {
      instance.setState({ registerTenantForm: { idCard: [fileMockData], otherDocument: [fileMockData] } });
      EditTenantMountWrapper.update();

      const otherFileCloseEditSpy = jest.spyOn(EditTenantMountWrapper.find(CloseIcon).at(0).props(), "onClick");
      EditTenantMountWrapper.find(CloseIcon).at(0).props().onClick();
      expect(otherFileCloseEditSpy).toHaveBeenCalled();
    });

    then("Should edit the my tenant", () => {
      const formEditSpy = jest.spyOn(EditTenantMountWrapper.find(Formik).at(0).props(), "onSubmit");
      EditTenantMountWrapper.find(Formik).at(0).props().onSubmit({ myTenantForm }, { resetForm: () => jest.fn() });
      expect(formEditSpy).toHaveBeenCalled();

      const editTenant = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editTenant.addData(getName(MessageEnum.RestAPIResponceDataMessage), editTenant);
      editTenant.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { account: tenantMockData });
      instance.EditTenantCallId = editTenant;
      runEngine.sendMessage("Edit Tenant", editTenant);
    });
  });
});
