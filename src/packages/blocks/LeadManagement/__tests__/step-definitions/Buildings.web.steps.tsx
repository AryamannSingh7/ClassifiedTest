import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BuildingApartmentStyle } from "../../src/BuildingApartmentStyle.web";
import { BrowserRouter } from "react-router-dom";
import BuildingsWeb from "../../src/Buildings.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { buildingDocumentCountMockData } from "../../../../components/src/TestCase/DocumentsMockData.web";
import { buildingDetailMockData, buildingUnitListMockData } from "../../../../components/src/TestCase/BuildingApartmentMockData.web";
import { Button, IconButton, TextField } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import TabPanel from "../../../Polling/src/TabPanel.web";
import { Formik } from "formik";

const BuildingsProps = componentProps("Buildings", BuildingApartmentStyle);

const feature = loadFeature("./__tests__/features/Buildings.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Buildings", ({ given, when, then }) => {
    let BuildingsMountWrapper: any;
    let instance: any;

    given("I am a User loading Buildings", () => {
      BuildingsMountWrapper = mount(<BuildingsWeb {...BuildingsProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the Buildings", () => {
      instance = BuildingsMountWrapper.instance();
    });

    then("Buildings will load with out errors", async () => {
      expect(BuildingsMountWrapper).toMatchSnapshot();
    });

    then("Should load the document count", async () => {
      let buildingDocumentCount = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingDocumentCount.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingDocumentCount);
      buildingDocumentCount.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDocumentCountMockData });
      instance.GetDocumentCountCallId = buildingDocumentCount;
      runEngine.sendMessage("Document Count", buildingDocumentCount);
    });

    then("Should load the building details", async () => {
      let buildingDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingDetails);
      buildingDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDetailMockData });
      instance.GetBuildingDetailsCallId = buildingDetails;
      runEngine.sendMessage("Complex Details", buildingDetails);
    });

    then("Should load the unit list", async () => {
      let unitList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      unitList.addData(getName(MessageEnum.RestAPIResponceDataMessage), unitList);
      unitList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingUnitListMockData);
      instance.GetUnitListCallId = unitList;
      runEngine.sendMessage("Unit List", unitList);
    });

    then("Should open edit building modal when click on button", async () => {
      const openModalButtonSpy = jest.spyOn(BuildingsMountWrapper.find(Button).at(0).props(), "onClick");
      BuildingsMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalButtonSpy).toHaveBeenCalled();

      instance.handleOpenEditBuildingState([{ key: "", value: "" }]);
    });

    then("Should open map modal on click view text", async () => {
      const openMapModalButtonSpy = jest.spyOn(BuildingsMountWrapper.find(".building-info-right").at(0).props(), "onClick");
      BuildingsMountWrapper.find(".building-info-right").at(0).props().onClick();
      expect(openMapModalButtonSpy).toHaveBeenCalled();
    });

    then("Should open slide image modal", async () => {
      const building = buildingDetailMockData.attributes;
      instance.setState({ buildingData: { photos: building.photos, sharedAreaList: building.shared_area } });
      BuildingsMountWrapper.update();

      const openMapModalButtonSpy = jest.spyOn(BuildingsMountWrapper.find(".slider-image-box").at(0).props(), "onClick");
      BuildingsMountWrapper.find(".slider-image-box").at(0).props().onClick();
      expect(openMapModalButtonSpy).toHaveBeenCalled();
    });

    then("Should close the slider modal", async () => {
      const building = buildingDetailMockData.attributes;
      instance.setState({ imageBox: true, buildingData: { photos: building.photos, sharedAreaList: building.shared_area } });
      BuildingsMountWrapper.update();

      const closeSliderBuildingSpy = jest.spyOn(BuildingsMountWrapper.find(Lightbox).at(0).props(), "onCloseRequest");
      BuildingsMountWrapper.find(Lightbox).at(0).props().onCloseRequest();
      expect(closeSliderBuildingSpy).toHaveBeenCalled();
    });

    then("Should see the prev the slider modal", async () => {
      const building = buildingDetailMockData.attributes;
      instance.setState({ imageBox: true, buildingData: { photos: building.photos, sharedAreaList: building.shared_area } });
      BuildingsMountWrapper.update();

      const prevSliderBuildingSpy = jest.spyOn(BuildingsMountWrapper.find(Lightbox).at(0).props(), "onMovePrevRequest");
      BuildingsMountWrapper.find(Lightbox).at(0).props().onMovePrevRequest();
      expect(prevSliderBuildingSpy).toHaveBeenCalled();
    });

    then("Should see the next the slider modal", async () => {
      const building = buildingDetailMockData.attributes;
      instance.setState({ imageBox: true, buildingData: { photos: building.photos, sharedAreaList: building.shared_area } });
      BuildingsMountWrapper.update();

      const nextSliderBuildingSpy = jest.spyOn(BuildingsMountWrapper.find(Lightbox).at(0).props(), "onMoveNextRequest");
      BuildingsMountWrapper.find(Lightbox).at(0).props().onMoveNextRequest();
      expect(nextSliderBuildingSpy).toHaveBeenCalled();
    });

    then("Should close edit building modal when click on close icon", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      BuildingsMountWrapper.update();

      const closeIconSpy = jest.spyOn(BuildingsMountWrapper.find(".edit-building-modal").find(IconButton).at(0).props(), "onClick");
      BuildingsMountWrapper.find(".edit-building-modal").find(IconButton).at(0).props().onClick();
      expect(closeIconSpy).toHaveBeenCalled();
    });

    then("Should close edit building modal when click on cancel button", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      BuildingsMountWrapper.update();

      const closeButtonSpy = jest.spyOn(BuildingsMountWrapper.find(".edit-building-modal").find(Button).at(0).props(), "onClick");
      BuildingsMountWrapper.find(".edit-building-modal").find(Button).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should able to change logo of building", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      BuildingsMountWrapper.update();

      const logoTextSpy = jest.spyOn(BuildingsMountWrapper.find(".edit-building-modal").find(".logo-text").at(0).props(), "onClick");
      BuildingsMountWrapper.find(".edit-building-modal").find(".logo-text").at(0).props().onClick();
      expect(logoTextSpy).toHaveBeenCalled();
    });

    then("Should able to upload the image", async () => {
      instance.setState({ isEditBuildingModalOpen: true });
      BuildingsMountWrapper.update();

      const uploadButtonSpy = jest.spyOn(BuildingsMountWrapper.find(".edit-building-modal").find(".upload-photo").at(0).props(), "onClick");
      BuildingsMountWrapper.find(".edit-building-modal").find(".upload-photo").at(0).props().onClick();
      expect(uploadButtonSpy).toHaveBeenCalled();
    });

    then("Should edit the building details", async () => {
      const building = buildingDetailMockData.attributes;
      instance.setState({ isEditBuildingModalOpen: true, buildingData: { photos: building.photos, sharedAreaList: building.shared_area } });
      BuildingsMountWrapper.update();

      const formikSpy = jest.spyOn(BuildingsMountWrapper.find(".edit-building-modal").find(Formik).at(0).props(), "onSubmit");
      BuildingsMountWrapper.find(".edit-building-modal").find(Formik).at(0).props().onSubmit({
        logo: { name: "file" },
        displayLogo: "1234",
        photos: [],
        buildingArea: "123",
        aboutBuilding: "123",
        buildingName: "123",
        totalUnits: "123",
        totalFloor: "123",
        country: "123",
      }, { resetForm: () => jest.fn() });
      expect(formikSpy).toHaveBeenCalled();

      let data = new FormData();
      data.append("building_management[name]", "values.aboutUs");
      instance.handleAPICallEditBuilding(data);

      let editBuilding = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editBuilding.addData(getName(MessageEnum.RestAPIResponceDataMessage), editBuilding);
      editBuilding.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDetailMockData });
      instance.EditBuildingDetailCallId = editBuilding;
      runEngine.sendMessage("Edit Building", editBuilding);
    });

    then("Should close the map modal when click on close icon", async () => {
      const closeButtonSpy = jest.spyOn(BuildingsMountWrapper.find(".chairman-map-modal").find(IconButton).at(0).props(), "onClick");
      BuildingsMountWrapper.find(".chairman-map-modal").find(IconButton).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });
  });
});
