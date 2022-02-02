import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import MultipleCurrencySupport from "../../src/MultipleCurrencySupport"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "MultipleCurrencySupport"
  }

const feature = loadFeature('./__tests__/features/MultipleCurrencySupport-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to MultipleCurrencySupport', ({ given, when, then }) => {
        let multipleCurrencySupport:ShallowWrapper;
        let instance:MultipleCurrencySupport; 

        given('I am a User loading MultipleCurrencySupport', () => {
            multipleCurrencySupport = shallow(<MultipleCurrencySupport {...screenProps}/>)
        });

        when('I navigate to the MultipleCurrencySupport', () => {
             instance = multipleCurrencySupport.instance() as MultipleCurrencySupport
        });

        then('MultipleCurrencySupport will load with out errors', () => {

            const msgGetCurrenciesAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgGetCurrenciesAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgGetCurrenciesAPI.messageId
              );
              msgGetCurrenciesAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  "results":{"ALL":{"currencyName":"Albanian Lek","currencySymbol":"Lek","id":"ALL"},"USD":{"currencyName":"United States Dollar","currencySymbol":"$","id":"USD"}}
                }
              );

              instance.apiGetCurrenciesCallId = msgGetCurrenciesAPI.messageId;
              runEngine.sendMessage("Unit Test", msgGetCurrenciesAPI);


              const msgGetCurrencyRatioAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgGetCurrencyRatioAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgGetCurrencyRatioAPI.messageId
              );
              msgGetCurrencyRatioAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "USD_RUB":79.0621
                }
              );

              instance.apiGetCurrencyRatioCallId = msgGetCurrencyRatioAPI.messageId;
              runEngine.sendMessage("Unit Test", msgGetCurrencyRatioAPI);

            expect(multipleCurrencySupport).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = multipleCurrencySupport.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', '33');
        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(multipleCurrencySupport).toBeTruthy()
        });
    });


});
