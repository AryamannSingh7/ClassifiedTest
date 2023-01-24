import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import React from "react";
import { componentProps } from "../../../../components/src/TestCase/ComponentProps.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import OwnerComplexWeb from "../../src/OwnerComplex.web";
import { BuildingApartmentStyle } from "../../src/BuildingApartmentStyle.web";
import { complexDetailMockData } from "../../../../components/src/TestCase/BuildingApartmentMockData.web";
import { IconButton } from "@material-ui/core";

const OwnerComplexProps = componentProps("OwnerComplex", BuildingApartmentStyle);

const feature = loadFeature("./__tests__/features/OwnerComplex.web.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to OwnerComplex", ({ given, when, then }) => {
    let OwnerComplexMountWrapper: any;
    let instance: any;

    given("I am a User loading OwnerComplex", () => {
      OwnerComplexMountWrapper = mount(<OwnerComplexWeb {...OwnerComplexProps} />);
    });

    when("I navigate to the OwnerComplex", () => {
      instance = OwnerComplexMountWrapper.instance();
    });

    then("OwnerComplex will load with out errors", async () => {
      expect(OwnerComplexMountWrapper).toMatchSnapshot();
    });

    then("Should load the complex details", async () => {
      let ownerComplexDetails = new Message(getName(MessageEnum.RestAPIResponceMessage));
      ownerComplexDetails.addData(getName(MessageEnum.RestAPIResponceDataMessage), ownerComplexDetails);
      ownerComplexDetails.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), { data: complexDetailMockData });
      instance.GetComplexDetailsCallId = ownerComplexDetails;
      runEngine.sendMessage("Complex Details", ownerComplexDetails);
    });

    then("Should go to respective dashboard when click on back button", async () => {
      const backButtonSpy = jest.spyOn(OwnerComplexMountWrapper.find(IconButton).at(0).props(), "onClick");
      OwnerComplexMountWrapper.find(IconButton).at(0).props().onClick();
      expect(backButtonSpy).toHaveBeenCalled();
    });
  });
});
