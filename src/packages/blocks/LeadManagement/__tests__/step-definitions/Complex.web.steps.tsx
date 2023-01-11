import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import Complex from "../../src/Complex.web";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BuildingApartmentStyle } from "../../src/BuildingApartmentStyle.web";
import { BrowserRouter } from "react-router-dom";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { buildingDocumentCountMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import { complexDetailMockData } from "../../../../components/src/TestCase/BuildingApartmentMockData.web";
import { localStorageMock } from "../../../../components/src/TestCase/LocalStorageMock.web";
import { Button, IconButton, TextField } from "@material-ui/core";
import { Formik } from "formik";
import Lightbox from "react-image-lightbox";

const ComplexProps = componentProps("Complex", BuildingApartmentStyle);

const feature = loadFeature("./__tests__/features/Complex.web.feature");

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Complex", ({ given, when, then }) => {
    let ComplexMountWrapper: any;
    let instance: any;

    given("I am a User loading Complex", () => {
      window.sessionStorage.setItem("selectUserType", "Chairman");
      ComplexMountWrapper = mount(<Complex {...ComplexProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the Complex", () => {
      instance = ComplexMountWrapper.instance();
    });

    then("Complex will load with out errors", async () => {
      expect(ComplexMountWrapper).toMatchSnapshot();
    });

    then("Should load the document count", async () => {
      let chairmanDocumentCount = new Message(getName(MessageEnum.RestAPIResponceMessage));
      chairmanDocumentCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), chairmanDocumentCount);
      chairmanDocumentCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDocumentCountMockData });
      instance.GetDocumentCountCallId = chairmanDocumentCount;
      runEngine.sendMessage("Document Count", chairmanDocumentCount);
    });

    then("Should load the complex details", async () => {
      let complexDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      complexDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), complexDetails);
      complexDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: complexDetailMockData });
      instance.GetComplexDetailsCallId = complexDetails;
      runEngine.sendMessage("Complex Details", complexDetails);
    });

    then("Should open edit complex modal when click on button", async () => {
      const openModalButtonSpy = jest.spyOn(ComplexMountWrapper.find(Button).at(0).props(), "onClick");
      ComplexMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalButtonSpy).toHaveBeenCalled();
    });

    then("Should open map modal on click view text", async () => {
      const openMapModalButtonSpy = jest.spyOn(ComplexMountWrapper.find(".building-info-right").at(0).props(), "onClick");
      ComplexMountWrapper.find(".building-info-right").at(0).props().onClick();
      expect(openMapModalButtonSpy).toHaveBeenCalled();
    });

    then("Should open slide image modal", async () => {
      const complex = complexDetailMockData.attributes;
      instance.setState({ complexData: { photos: complex.photos, buildingList: complex.building_list, sharedAreaList: complex.shared_area } });
      ComplexMountWrapper.update();

      const openMapModalButtonSpy = jest.spyOn(ComplexMountWrapper.find(".slider-image-box").at(0).props(), "onClick");
      ComplexMountWrapper.find(".slider-image-box").at(0).props().onClick();
      expect(openMapModalButtonSpy).toHaveBeenCalled();
    });

    then("Should change filter by building", async () => {
      const searchFilterSpy = jest.spyOn(ComplexMountWrapper.find(TextField).at(0).props(), "onChange");
      ComplexMountWrapper.find(TextField).at(0).props().onChange({ target: { value: "building" } });
      expect(searchFilterSpy).toHaveBeenCalled();
    });

    then("Should open shared area page", async () => {
      instance.setState({ currentTab: 1 });
      ComplexMountWrapper.update();

      const sharedAreaSpy = jest.spyOn(ComplexMountWrapper.find(".shared-area-item").at(0).props(), "onClick");
      ComplexMountWrapper.find(".shared-area-item").at(0).props().onClick();
      expect(sharedAreaSpy).toHaveBeenCalled();
    });

    then("Should close edit complex modal when click on close icon", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      ComplexMountWrapper.update();

      const closeIconSpy = jest.spyOn(ComplexMountWrapper.find(".edit-complex-details").find(IconButton).at(0).props(), "onClick");
      ComplexMountWrapper.find(".edit-complex-details").find(IconButton).at(0).props().onClick();
      expect(closeIconSpy).toHaveBeenCalled();
    });

    then("Should close edit complex modal when click on cancel button", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      ComplexMountWrapper.update();

      const closeButtonSpy = jest.spyOn(ComplexMountWrapper.find(".edit-complex-details").find(Button).at(0).props(), "onClick");
      ComplexMountWrapper.find(".edit-complex-details").find(Button).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should able to change logo of complex", async () => {
      const logoTextSpy = jest.spyOn(ComplexMountWrapper.find(".edit-complex-details").find(".logo-text").at(0).props(), "onClick");
      ComplexMountWrapper.find(".edit-complex-details").find(".logo-text").at(0).props().onClick();
      expect(logoTextSpy).toHaveBeenCalled();
    });

    then("Should able to upload the image", async () => {
      const uploadButtonSpy = jest.spyOn(ComplexMountWrapper.find(".edit-complex-details").find(".upload-photo").at(0).props(), "onClick");
      ComplexMountWrapper.find(".edit-complex-details").find(".upload-photo").at(0).props().onClick();
      expect(uploadButtonSpy).toHaveBeenCalled();
    });

    then("Should edit the complex details", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      ComplexMountWrapper.update();

      const formikSpy = jest.spyOn(ComplexMountWrapper.find(".edit-complex-details").find(Formik).at(0).props(), "onSubmit");
      ComplexMountWrapper.find(".edit-complex-details").find(Formik).at(0).props().onSubmit({
        logo: { name: "file" },
        displayLogo: "123456",
        photos: [{ name: "file" }],
        complexArea: "123",
        aboutUs: "123",
        totalUnits: "12",
        totalBuilding: 0,
        lat: "12",
        long: "12",
      }, { resetForm: () => jest.fn() });
      expect(formikSpy).toHaveBeenCalled();

      let editComplexDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editComplexDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), editComplexDetails);
      editComplexDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: complexDetailMockData });
      instance.EditComplexDetailCallId = editComplexDetails;
      runEngine.sendMessage("Edit Complex Details", editComplexDetails);
    });

    then("Should close the map modal when click on close icon", async () => {
      const closeButtonSpy = jest.spyOn(ComplexMountWrapper.find(".chairman-map-modal").find(IconButton).at(0).props(), "onClick");
      ComplexMountWrapper.find(".chairman-map-modal").find(IconButton).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should close the slider modal", async () => {
      const complex = complexDetailMockData.attributes;
      instance.setState({ imageBox: true, complexData: { photos: complex.photos, buildingList: complex.building_list, sharedAreaList: complex.shared_area } });
      ComplexMountWrapper.update();

      const closeSliderSpy = jest.spyOn(ComplexMountWrapper.find(Lightbox).at(0).props(), "onCloseRequest");
      ComplexMountWrapper.find(Lightbox).at(0).props().onCloseRequest();
      expect(closeSliderSpy).toHaveBeenCalled();
    });

    then("Should see the prev the slider modal", async () => {
      const complex = complexDetailMockData.attributes;
      instance.setState({ imageBox: true, complexData: { photos: complex.photos, buildingList: complex.building_list, sharedAreaList: complex.shared_area } });
      ComplexMountWrapper.update();

      const prevSliderSpy = jest.spyOn(ComplexMountWrapper.find(Lightbox).at(0).props(), "onMovePrevRequest");
      ComplexMountWrapper.find(Lightbox).at(0).props().onMovePrevRequest();
      expect(prevSliderSpy).toHaveBeenCalled();

      let data = new FormData();
      data.append("society_management[description]", "values.aboutUs");
      instance.handleEditComplexAPICall(data);
    });

    then("Should see the next the slider modal", async () => {
      const complex = complexDetailMockData.attributes;
      instance.setState({ imageBox: true, complexData: { photos: complex.photos, buildingList: complex.building_list, sharedAreaList: complex.shared_area } });
      ComplexMountWrapper.update();

      const nextSliderSpy = jest.spyOn(ComplexMountWrapper.find(Lightbox).at(0).props(), "onMoveNextRequest");
      ComplexMountWrapper.find(Lightbox).at(0).props().onMoveNextRequest();
      expect(nextSliderSpy).toHaveBeenCalled();

      instance.updateStateOpenBuildingModal([{ key: "1", value: "12" }])
    });
  });
});
