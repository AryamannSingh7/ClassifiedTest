import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  currencyData: any;
  fromCurrency: string;
  toCurrency: string;
  currencyRatio: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class MultipleCurrencySupportController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetCurrenciesCallId: string = "";
  apiGetCurrencyRatioCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "0",
      enableField: false,
      currencyData: [],
      fromCurrency: "USD",
      toCurrency: "USD",
      currencyRatio: 1.0,
      // Customizable Area Start
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.getCurrencies();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (this.apiGetCurrenciesCallId === apiRequestCallId) {
        if (responseJson.error) {
          this.showAlert("Error", responseJson.error);
        } else {
          let currencyData = [];
          for (const [key, value] of Object.entries(responseJson.results)) {
            console.log(key, value);
            currencyData.push({ value: key, label: key });
          }
          this.setState({ currencyData: currencyData });
        }
      } else if (this.apiGetCurrencyRatioCallId === apiRequestCallId) {
        if (responseJson.error) {
          this.showAlert("Error", responseJson.error);
        } else {
          for (const [key, value] of Object.entries(responseJson)) {
            console.log(key, value);
            this.setState({ currencyRatio: value });
          }
        }
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  getCurrencies() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetCurrenciesCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.currenciesAPiEndPoint + configJSON.apiKey
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getCurrenctRatio() {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetCurrencyRatioCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      (configJSON.currenciesRateAPiEndPoint + configJSON.apiKey)
        .replace("FROMCID", this.state.fromCurrency)
        .replace("TOCID", this.state.toCurrency)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  // Customizable Area Start
  // Customizable Area End
}
