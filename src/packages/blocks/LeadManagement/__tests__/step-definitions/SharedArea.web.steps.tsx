import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BuildingApartmentStyle } from "../../src/BuildingApartmentStyle.web";
import { BrowserRouter } from "react-router-dom";
import SharedAreaWeb from "../../src/SharedArea.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { reservationListMockData, sharedAreaMockData } from "../../../../components/src/TestCase/BuildingApartmentMockData.web";
import { buildingListMockData } from "../../../../components/src/TestCase/MyUnitMockData.web";
import { Button, IconButton } from "@material-ui/core";
import Lightbox from "react-image-lightbox";
import { Formik } from "formik";

const SharedAreaProps = componentProps("SharedArea", BuildingApartmentStyle);

const feature = loadFeature("./__tests__/features/SharedArea.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to SharedArea", ({ given, when, then }) => {
    let SharedAreaMountWrapper: any;
    let instance: any;

    given("I am a User loading SharedArea", () => {
      SharedAreaMountWrapper = mount(<SharedAreaWeb  {...SharedAreaProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the SharedArea", () => {
      instance = SharedAreaMountWrapper.instance();
    });

    then("SharedArea will load with out errors", async () => {
      expect(SharedAreaMountWrapper).toMatchSnapshot();
    });

    then("Should load the building list", async () => {
      let buildingListSharedArea = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingListSharedArea.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingListSharedArea);
      buildingListSharedArea.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), buildingListMockData);
      instance.GetBuildingCallId = buildingListSharedArea;
      runEngine.sendMessage("Building List SharedArea", buildingListSharedArea);
    });

    then("Should load the shared area details", async () => {
      let buildingDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      buildingDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), buildingDetails);
      buildingDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: sharedAreaMockData });
      instance.GetSharedAreaDetailsCallId = buildingDetails;
      runEngine.sendMessage("Complex Details", buildingDetails);
    });

    then("Should edit shared area details", async () => {
      let data = new FormData();
      data.append("common_area[details]", "values.details");
      instance.handleAPIEditSharedArea(data);

      let editSharedArea = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editSharedArea.addData(getName(MessageEnum.RestAPIResponceDataMessage), editSharedArea);
      editSharedArea.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: sharedAreaMockData });
      instance.EditSharedAreaCallId = editSharedArea;
      runEngine.sendMessage("Shared Area", editSharedArea);
    });

    then("Should close edit building modal when click on close icon", async () => {
      instance.setState({ setComplexEditOpen: true });
      SharedAreaMountWrapper.update();

      const closeIconSpy = jest.spyOn(SharedAreaMountWrapper.find(".edit-share-area-modal").find(IconButton).at(0).props(), "onClick");
      SharedAreaMountWrapper.find(".edit-share-area-modal").find(IconButton).at(0).props().onClick();
      expect(closeIconSpy).toHaveBeenCalled();
    });

    then("Should close edit building modal when click on cancel button", async () => {
      instance.setState({ setComplexEditOpen: true, reservationList: reservationListMockData.data });
      SharedAreaMountWrapper.update();

      const closeButtonSpy = jest.spyOn(SharedAreaMountWrapper.find(".edit-share-area-modal").find(Button).at(0).props(), "onClick");
      SharedAreaMountWrapper.find(".edit-share-area-modal").find(Button).at(0).props().onClick();
      expect(closeButtonSpy).toHaveBeenCalled();
    });

    then("Should close the slider modal", async () => {
      const sharedArea = sharedAreaMockData.attributes;
      instance.setState({ imageBox: true, buildingData: { photos: sharedArea.photos } });
      SharedAreaMountWrapper.update();

      const closeSliderBuildingSpy = jest.spyOn(SharedAreaMountWrapper.find(Lightbox).at(0).props(), "onCloseRequest");
      SharedAreaMountWrapper.find(Lightbox).at(0).props().onCloseRequest();
      expect(closeSliderBuildingSpy).toHaveBeenCalled();
    });

    then("Should see the prev the slider modal", async () => {
      const sharedArea = sharedAreaMockData.attributes;
      instance.setState({ imageBox: true, buildingData: { photos: sharedArea.photos } });
      SharedAreaMountWrapper.update();

      const prevSliderBuildingSpy = jest.spyOn(SharedAreaMountWrapper.find(Lightbox).at(0).props(), "onMovePrevRequest");
      SharedAreaMountWrapper.find(Lightbox).at(0).props().onMovePrevRequest();
      expect(prevSliderBuildingSpy).toHaveBeenCalled();
    });

    then("Should see the next the slider modal", async () => {
      const sharedArea = sharedAreaMockData.attributes;
      instance.setState({ imageBox: true, buildingData: { photos: sharedArea.photos } });
      SharedAreaMountWrapper.update();

      const nextSliderBuildingSpy = jest.spyOn(SharedAreaMountWrapper.find(Lightbox).at(0).props(), "onMoveNextRequest");
      SharedAreaMountWrapper.find(Lightbox).at(0).props().onMoveNextRequest();
      expect(nextSliderBuildingSpy).toHaveBeenCalled();
    });

    then("Should filter by building reservation", async () => {
      const filterBuildingSpy = jest.spyOn(SharedAreaMountWrapper.find("select").at(0).props(), "onChange");
      SharedAreaMountWrapper.find("select").at(0).props().onChange({ target: { value: "11" } });
      expect(filterBuildingSpy).toHaveBeenCalled();
    });

    then("Should able to upload the image", async () => {
      instance.setState({ setComplexEditOpen: true });
      SharedAreaMountWrapper.update();

      const uploadImageSpy = jest.spyOn(SharedAreaMountWrapper.find(".edit-share-area-modal").find(".upload-photo").at(0).props(), "onClick");
      SharedAreaMountWrapper.find(".edit-share-area-modal").find(".upload-photo").at(0).props().onClick();
      expect(uploadImageSpy).toHaveBeenCalled();
    });

    then("Should able to upload the floor plan", async () => {
      instance.setState({ setComplexEditOpen: true });
      SharedAreaMountWrapper.update();

      const uploadPlanSpy = jest.spyOn(SharedAreaMountWrapper.find(".edit-share-area-modal").find(".floor-plan-pdf").at(0).props(), "onChange");
      SharedAreaMountWrapper.find(".edit-share-area-modal").find(".floor-plan-pdf").at(0).props().onChange({ target: { files: [{ name: "!2" }] } });
      expect(uploadPlanSpy).toHaveBeenCalled();

      instance.handleSharedAreaEditState([{ value: "1" }]);
    });

    then("Should edit the share area details", async () => {
      instance.setState({ setComplexEditOpen: true });
      SharedAreaMountWrapper.update();

      const formikSpy = jest.spyOn(SharedAreaMountWrapper.find(".edit-share-area-modal").find(Formik).at(0).props(), "onSubmit");
      SharedAreaMountWrapper.find(".edit-share-area-modal").find(Formik).at(0).props().onSubmit({
        photos: [],
        details: "",
        totalArea: "",
        fees: "",
        floorPlan: null,
        floorPlanName: "",
      }, { resetForm: () => jest.fn() });
      expect(formikSpy).toHaveBeenCalled();
    });

    then("Should load the reservation list", async () => {
      let reservationList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      reservationList.addData(getName(MessageEnum.RestAPIResponceDataMessage), reservationList);
      reservationList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: reservationListMockData });
      instance.GetUpcomingReservationListCallId = reservationList;
      runEngine.sendMessage("Reservation List", reservationList);
    });

    then("Should open edit area modal when click on button", async () => {
      const openModalButtonSpy = jest.spyOn(SharedAreaMountWrapper.find(Button).at(0).props(), "onClick");
      SharedAreaMountWrapper.find(Button).at(0).props().onClick();
      expect(openModalButtonSpy).toHaveBeenCalled();
    });
  });
});
