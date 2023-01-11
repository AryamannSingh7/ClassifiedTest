import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import OwnerBuildingsWeb from "../../src/OwnerBuildings.web";
import { BuildingApartmentStyle } from "../../src/BuildingApartmentStyle.web";
import { buildingDetailMockData } from "../../../../components/src/TestCase/BuildingApartmentMockData.web";

const OwnerBuildingsProps = componentProps("OwnerBuildings", BuildingApartmentStyle);

const feature = loadFeature("./__tests__/features/OwnerBuildings.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to OwnerBuildings", ({ given, when, then }) => {
    let OwnerBuildingsMountWrapper: any;
    let instance: any;

    given("I am a User loading OwnerBuildings", () => {
      OwnerBuildingsMountWrapper = mount(<OwnerBuildingsWeb {...OwnerBuildingsProps} />);
    });

    when("I navigate to the OwnerBuildings", () => {
      instance = OwnerBuildingsMountWrapper.instance();
    });

    then("OwnerBuildings will load with out errors", async () => {
      expect(OwnerBuildingsMountWrapper).toMatchSnapshot();
    });

    then("Should load the building details", async () => {
      let ownerBuildingDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      ownerBuildingDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), ownerBuildingDetails);
      ownerBuildingDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: buildingDetailMockData });
      instance.GetBuildingDetailsCallId = ownerBuildingDetails;
      runEngine.sendMessage("Building Details", ownerBuildingDetails);
    });
  });
});
