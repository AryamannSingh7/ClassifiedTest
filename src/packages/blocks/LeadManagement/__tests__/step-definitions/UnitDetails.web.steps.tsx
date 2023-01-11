import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { BuildingApartmentStyle } from "../../src/BuildingApartmentStyle.web";
import { BrowserRouter } from "react-router-dom";
import UnitDetails from "../../src/UnitDetails.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { chairmanUnitDetailsMockData, relationListMockData } from "../../../../components/src/TestCase/BuildingApartmentMockData.web";
import { idTypeListMockData } from "../../../../components/src/TestCase/PropertyManagerMockData.web";
import Lightbox from "react-image-lightbox";
import { Button, IconButton } from "@material-ui/core";
import { Formik } from "formik";

const UnitDetailsProps = componentProps("UnitDetails", BuildingApartmentStyle);

const feature = loadFeature("./__tests__/features/UnitDetails.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to UnitDetails", ({ given, when, then }) => {
    let UnitDetailsMountWrapper: any;
    let instance: any;

    given("I am a User loading UnitDetails", () => {
      UnitDetailsMountWrapper = mount(<UnitDetails {...UnitDetailsProps} />, { wrappingComponent: BrowserRouter });
    });

    when("I navigate to the UnitDetails", () => {
      instance = UnitDetailsMountWrapper.instance();
    });

    then("UnitDetails will load with out errors", async () => {
      expect(UnitDetailsMountWrapper).toMatchSnapshot();
    });

    then("Should load the unit details", async () => {
      let mainUnitDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      mainUnitDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), mainUnitDetails);
      mainUnitDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), chairmanUnitDetailsMockData);
      instance.GetUnitDetailsCallId = mainUnitDetails;
      runEngine.sendMessage("Shared Area", mainUnitDetails);
    });

    then("Should load the relation list", async () => {
      let relationList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      relationList.addData(getName(MessageEnum.RestAPIResponceDataMessage), relationList);
      relationList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), relationListMockData);
      instance.GetRelationListCallId = relationList;
      runEngine.sendMessage("Relation List", relationList);
    });

    then("Should load the id proof list", async () => {
      let idProofList = new Message(getName(MessageEnum.RestAPIResponceMessage));
      idProofList.addData(getName(MessageEnum.RestAPIResponceDataMessage), idProofList);
      idProofList.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), idTypeListMockData);
      instance.GetIDProofListCallId = idProofList;
      runEngine.sendMessage("ID Proof List", idProofList);
    });

    then("Should open the map modal", async () => {
      const mapSpy = jest.spyOn(UnitDetailsMountWrapper.find(".map-modal").at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".map-modal").at(0).props().onClick();
      expect(mapSpy).toHaveBeenCalled();
    });

    then("Should open the edit unit modal", async () => {
      const mapSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-modal").at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".edit-modal").at(0).props().onClick();
      expect(mapSpy).toHaveBeenCalled();
    });

    then("Should open the slider image modal", async () => {
      const unitData = chairmanUnitDetailsMockData.data.attributes;
      instance.setState({ unitData: { photos: unitData.photos, relatedPeople: unitData.related_people, familyList: unitData.family_members.data, activeIncidents: unitData.active_incidents.data, vehicleDetails: unitData.vehicle_details.data, rentHistory: unitData.rent_history.data } });
      UnitDetailsMountWrapper.update();

      const mapSpy = jest.spyOn(UnitDetailsMountWrapper.find(".slider-image").at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".slider-image").at(0).props().onClick();
      expect(mapSpy).toHaveBeenCalled();
    });

    then("Should close the slider modal", async () => {
      const unitData = chairmanUnitDetailsMockData.data.attributes;
      instance.setState({ imageBox: true, unitData: { photos: unitData.photos, relatedPeople: unitData.related_people, familyList: unitData.family_members.data, activeIncidents: unitData.active_incidents.data, vehicleDetails: unitData.vehicle_details.data, rentHistory: unitData.rent_history.data } });
      UnitDetailsMountWrapper.update();

      const closeSliderUnitSpy = jest.spyOn(UnitDetailsMountWrapper.find(Lightbox).at(0).props(), "onCloseRequest");
      UnitDetailsMountWrapper.find(Lightbox).at(0).props().onCloseRequest();
      expect(closeSliderUnitSpy).toHaveBeenCalled();
    });

    then("Should see the prev the slider modal", async () => {
      const unitData = chairmanUnitDetailsMockData.data.attributes;
      instance.setState({ imageBox: true, unitData: { photos: unitData.photos, relatedPeople: unitData.related_people, familyList: unitData.family_members.data, activeIncidents: unitData.active_incidents.data, vehicleDetails: unitData.vehicle_details.data, rentHistory: unitData.rent_history.data } });
      UnitDetailsMountWrapper.update();

      const prevSliderUnitSpy = jest.spyOn(UnitDetailsMountWrapper.find(Lightbox).at(0).props(), "onMovePrevRequest");
      UnitDetailsMountWrapper.find(Lightbox).at(0).props().onMovePrevRequest();
      expect(prevSliderUnitSpy).toHaveBeenCalled();
    });

    then("Should see the next the slider modal", async () => {
      const unitData = chairmanUnitDetailsMockData.data.attributes;
      instance.setState({ imageBox: true, unitData: { photos: unitData.photos, relatedPeople: unitData.related_people, familyList: unitData.family_members.data, activeIncidents: unitData.active_incidents.data, vehicleDetails: unitData.vehicle_details.data, rentHistory: unitData.rent_history.data } });
      UnitDetailsMountWrapper.update();

      const nextSliderUnitSpy = jest.spyOn(UnitDetailsMountWrapper.find(Lightbox).at(0).props(), "onMoveNextRequest");
      UnitDetailsMountWrapper.find(Lightbox).at(0).props().onMoveNextRequest();
      expect(nextSliderUnitSpy).toHaveBeenCalled();
    });

    then("Should close the map modal when click on close icon", async () => {
      instance.setState({ isOpenMapModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".unit-map-modal").find(IconButton).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".unit-map-modal").find(IconButton).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the delete member modal when click on close icon", async () => {
      instance.setState({ isDeleteFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".unit-delete-member-modal").at(0).props(), "onClose");
      UnitDetailsMountWrapper.find(".unit-delete-member-modal").at(0).props().onClose();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the delete member when click on Cancel button", async () => {
      instance.setState({ isDeleteFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".unit-delete-member-modal").find(Button).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".unit-delete-member-modal").find(Button).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should delete family member", async () => {
      instance.setState({ isDeleteFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".unit-delete-member-modal").find(Button).at(1).props(), "onClick");
      UnitDetailsMountWrapper.find(".unit-delete-member-modal").find(Button).at(1).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();

      let deleteFamilyMember = new Message(getName(MessageEnum.RestAPIResponceMessage));
      deleteFamilyMember.addData(getName(MessageEnum.RestAPIResponceDataMessage), deleteFamilyMember);
      deleteFamilyMember.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {});
      instance.DeleteFamilyMemberCallId = deleteFamilyMember;
      runEngine.sendMessage("ID Proof List", deleteFamilyMember);
    });

    then("Should close the delink member modal when click on close icon", async () => {
      instance.setState({ isDeleteFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".unit-delink-member-modal").at(0).props(), "onClose");
      UnitDetailsMountWrapper.find(".unit-delink-member-modal").at(0).props().onClose();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the delink member when click on Cancel button", async () => {
      instance.setState({ isDeleteFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".unit-delink-member-modal").find(Button).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".unit-delink-member-modal").find(Button).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the suspend member modal when click on close icon", async () => {
      instance.setState({ setSuspendOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".uni-suspend-member-modal").at(0).props(), "onClose");
      UnitDetailsMountWrapper.find(".uni-suspend-member-modal").at(0).props().onClose();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the suspend member when click on Cancel button", async () => {
      instance.setState({ setSuspendOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".uni-suspend-member-modal").find(Button).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".uni-suspend-member-modal").find(Button).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the edit member modal when click on close icon", async () => {
      instance.setState({ isEditFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-family-modal").find(IconButton).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".edit-family-modal").find(IconButton).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the edit member when click on Cancel button", async () => {
      instance.setState({ isEditFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-family-modal").find(Button).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".edit-family-modal").find(Button).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should edit the family member", async () => {
      instance.setState({ isEditFamilyModalOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-family-modal").find(Formik).at(0).props(), "onSubmit");
      UnitDetailsMountWrapper.find(".edit-family-modal").find(Formik).at(0).props().onSubmit({
        name: "12",
        relation: "12",
        idProof: "12",
        idNumber: "12",
      }, { resetForm: () => jest.fn() });
      expect(closeMapModalSpy).toHaveBeenCalled();

      const unitData = chairmanUnitDetailsMockData.data.attributes;
      let editFamilyMember = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editFamilyMember.addData(getName(MessageEnum.RestAPIResponceDataMessage), editFamilyMember);
      editFamilyMember.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: unitData.family_members.data[0] });
      instance.EditFamilyMemberCallId = editFamilyMember;
      runEngine.sendMessage("Edit Family Member", editFamilyMember);
    });

    then("Should close the edit unit modal when click on close icon", async () => {
      instance.setState({ setUnitOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-unit").find(IconButton).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".edit-unit").find(IconButton).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should close the edit unit when click on Cancel button", async () => {
      instance.setState({ setUnitOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-unit").find(Button).at(0).props(), "onClick");
      UnitDetailsMountWrapper.find(".edit-unit").find(Button).at(0).props().onClick();
      expect(closeMapModalSpy).toHaveBeenCalled();
    });

    then("Should edit the unit", async () => {
      instance.setState({ setUnitOpen: true });
      UnitDetailsMountWrapper.update();

      const closeMapModalSpy = jest.spyOn(UnitDetailsMountWrapper.find(".edit-unit").find(Formik).at(0).props(), "onSubmit");
      UnitDetailsMountWrapper.find(".edit-unit").find(Formik).at(0).props().onSubmit({
        complexName: "1",
        buildingName: "1",
        unitName: "1",
        size: "1",
        configuration: "1",
        purchasePrice: "1",
        purchaseDate: "1",
        currentValuation: "1",
      }, { resetForm: () => jest.fn() });
      expect(closeMapModalSpy).toHaveBeenCalled();

      const unitData = chairmanUnitDetailsMockData.data.attributes;
      let editUnitMember = new Message(getName(MessageEnum.RestAPIResponceMessage));
      editUnitMember.addData(getName(MessageEnum.RestAPIResponceDataMessage), editUnitMember);
      editUnitMember.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: unitData });
      instance.EditUnitDetailCallId = editUnitMember;
      runEngine.sendMessage("Edit Unit", editUnitMember);
    });
  });
});
